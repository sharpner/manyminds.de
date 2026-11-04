import test from "node:test";
import assert from "node:assert/strict";
import type { ApiRequest, ApiResponse } from "../api/http";
import handler from "../api/book";
import slotsHandler, { getAvailableSlots, isAvailableSlot } from "../api/slots";

function response() {
  return {
    code: 0,
    body: undefined as unknown,
    headers: {} as Record<string, string>,
    setHeader(key: string, value: string) {
      this.headers[key] = value;
    },
    status(code: number) {
      this.code = code;
      return this;
    },
    json(body: unknown) {
      this.body = body;
      return this;
    },
    end() {
      return this;
    },
  };
}
function request(
  body: unknown,
  method = "POST",
  origin = "https://manyminds.de",
) {
  return { method, body, headers: { origin } } as ApiRequest;
}
function availableSlot() {
  const [date, times] = Object.entries(getAvailableSlots())[0];
  return `${date}T${times[0]}`;
}
const payload = () => ({
  name: "Test Person",
  email: "test@example.org",
  company: "Test",
  slot: availableSlot(),
});

test("slot publication starts next week and is the validation source", () => {
  const now = new Date("2026-11-04T12:00:00Z");
  const slots = getAvailableSlots(now);
  assert.equal(Object.keys(slots)[0], "2026-11-10");
  assert.equal(Object.values(slots).flat().length, 20);
  for (const [date, times] of Object.entries(slots)) {
    for (const time of times)
      assert.equal(isAvailableSlot(`${date}T${time}`, now), true);
  }
  assert.equal(isAvailableSlot("2026-11-04T00:00", now), false);
  assert.equal(isAvailableSlot("2026-11-06T09:00", now), false);
});
test("next week follows Berlin calendar boundaries, including month, year and DST changes", () => {
  for (const [instant, firstDate] of [
    ["2026-11-08T22:30:00Z", "2026-11-10"],
    ["2026-11-08T23:30:00Z", "2026-11-17"],
    ["2026-11-25T12:00:00Z", "2026-12-01"],
    ["2026-12-30T12:00:00Z", "2027-01-05"],
    ["2026-03-29T22:30:00Z", "2026-04-07"],
  ]) {
    const slots = getAvailableSlots(new Date(instant));
    assert.equal(Object.keys(slots)[0], firstDate, instant);
    assert.ok(Object.keys(slots).every(date => date >= firstDate));
  }
});
test("GET slots returns actual service data and refuses POST", async () => {
  const res = response();
  await slotsHandler(request(null, "GET"), res as unknown as ApiResponse);
  assert.equal(res.code, 200);
  assert.deepEqual(res.body, { slots: getAvailableSlots() });
  await slotsHandler(request(null), res as unknown as ApiResponse);
  assert.equal(res.code, 405);
});
test("booking rejects invalid inputs, slots, methods and foreign browser origins before sending", async () => {
  for (const [body, method, origin, code] of [
    [{}, "POST", "https://manyminds.de", 400],
    [{ ...payload(), email: "bad@" }, "POST", "https://manyminds.de", 400],
    [
      { ...payload(), slot: "2000-01-01T10:00" },
      "POST",
      "https://manyminds.de",
      400,
    ],
    [{ ...payload(), company: 3 }, "POST", "https://manyminds.de", 400],
    [payload(), "GET", "https://manyminds.de", 405],
    [payload(), "POST", "https://untrusted.example", 403],
  ] as const) {
    const res = response();
    await handler(request(body, method, origin), res as unknown as ApiResponse);
    assert.equal(res.code, code);
  }
});
test("missing mail configuration is unavailable, never success", async () => {
  const key = process.env.RESEND_API_KEY;
  delete process.env.RESEND_API_KEY;
  try {
    const res = response();
    await handler(request(payload()), res as unknown as ApiResponse);
    assert.equal(res.code, 503);
  } finally {
    if (key) process.env.RESEND_API_KEY = key;
  }
});
test("mail rejection is surfaced; confirmed provider acceptance returns success with escaped email and valid ICS", async (t) => {
  process.env.RESEND_API_KEY = "re_test_only";
  t.after(() => {
    delete process.env.RESEND_API_KEY;
  });
  const fetchMock = t.mock.method(
    globalThis,
    "fetch",
    async () =>
      new Response(
        JSON.stringify({ name: "validation_error", message: "Rejected" }),
        { status: 422 },
      ),
  );
  const rejected = response();
  await handler(request(payload()), rejected as unknown as ApiResponse);
  assert.equal(rejected.code, 502);
  let sent: Record<string, any> = {};
  fetchMock.mock.mockImplementation(async (_url, init) => {
    sent = JSON.parse(String(init?.body));
    return new Response(JSON.stringify({ id: "test-provider-id" }), {
      status: 200,
    });
  });
  const accepted = response();
  await handler(
    request({
      ...payload(),
      name: "<script>alert(1)</script>",
      company: "A&B",
    }),
    accepted as unknown as ApiResponse,
  );
  assert.equal(accepted.code, 200);
  assert.equal((accepted.body as { success: boolean }).success, true);
  assert.match(sent.html, /&lt;script&gt;/);
  assert.doesNotMatch(sent.html, /<script>/);
  assert.match(sent.html, /A&amp;B/);
  const ics = Buffer.from(sent.attachments[0].content, "base64").toString();
  assert.match(ics, /DTSTART;TZID=Europe\/Berlin:/);
  assert.match(ics, /STATUS:TENTATIVE/);
});
