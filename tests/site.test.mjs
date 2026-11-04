import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { JSDOM } from "jsdom";
const html = fs.readFileSync("index.html", "utf8");
const script = fs.readFileSync("script.js", "utf8");
const tick = () => new Promise((resolve) => setTimeout(resolve, 10));
function page(fetcher, search = "") {
  const dom = new JSDOM(html, {
    url: `https://manyminds.de/${search}`,
    runScripts: "outside-only",
    pretendToBeVisual: true,
  });
  dom.window.fetch = fetcher;
  dom.window.AbortSignal = AbortSignal;
  dom.window.HTMLDialogElement.prototype.showModal = function () {
    this.open = true;
  };
  dom.window.HTMLDialogElement.prototype.close = function () {
    this.open = false;
    this.dispatchEvent(new dom.window.Event("close"));
  };
  dom.window.eval(script + "\nwindow.testTranslations = translations.en;");
  return dom;
}
const slots = { "2027-01-05": ["10:00"], "2027-02-02": ["10:00"] };
const ok = (body) => new Response(JSON.stringify(body));

test("project indicators match individually visible project entries in every category", () => {
  const doc = new JSDOM(html).window.document;
  const categories = doc.querySelectorAll(".case-notes details");
  assert.equal(categories.length, 7);
  for (const category of categories) {
    const entries = [...category.querySelectorAll(".practice-examples > li")];
    const count = Number.parseInt(category.querySelector(".case-count").textContent, 10);
    const title = category.querySelector(".case-category").textContent;
    assert.equal(count, entries.length, title);
    const names = entries.map(entry => entry.querySelector("strong").textContent);
    assert.equal(new Set(names).size, entries.length, `${title}: duplicate project`);
  }
});

test("all local assets and fragment targets resolve, IDs are unique, semantic page landmarks exist", () => {
  const doc = new JSDOM(html).window.document;
  const ids = [...doc.querySelectorAll("[id]")].map((e) => e.id);
  assert.equal(ids.length, new Set(ids).size);
  assert.equal(doc.querySelectorAll("h1").length, 1);
  assert.ok(doc.querySelector("main"));
  for (const node of doc.querySelectorAll("[href],[src]")) {
    const path = node.getAttribute("href") ?? node.getAttribute("src");
    if (path.startsWith("#")) {
      assert.ok(doc.getElementById(path.slice(1)), path);
      continue;
    }
    if (/^(?:https?:|mailto:)/.test(path)) continue;
    const assetUrl = new URL(path, "https://manyminds.de/");
    const filename = decodeURIComponent(assetUrl.pathname).replace(/^\//, "");
    assert.ok(fs.existsSync(filename), path);
  }
});
test("design colors meet AA text contrast", () => {
  const luminance = (hex) => {
    const channels = hex
      .match(/\w\w/g)
      .map((n) => parseInt(n, 16) / 255)
      .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
  };
  const css = fs.readFileSync("styles.css", "utf8");
  const token = (name) => {
    const value = css.match(new RegExp("--" + name + ":\\s*#([a-f0-9]{6})"));
    assert.ok(value, name);
    return value[1];
  };
  for (const [foreground, background] of [
    ["ffffff", token("primary")],
    [token("muted"), token("paper")],
    [token("ink"), "ffffff"],
    ["b6d7c9", token("dark")],
    ["cfddd5", token("dark")],
  ]) {
    const a = luminance(foreground),
      b = luminance(background);
    assert.ok(
      (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05) >= 4.5,
      `${foreground}/${background}`,
    );
  }
});
test("calendar and language work without local storage; month changes clear old time slots", async (t) => {
  const dom = page(async () => ok({ slots }));
  t.after(() => dom.window.close());
  await tick();
  const doc = dom.window.document;
  assert.match(doc.getElementById("calendarMonth").textContent, /Januar 2027/);
  doc.querySelector("[data-date]").click();
  assert.equal(doc.querySelectorAll("[data-time]").length, 1);
  doc.getElementById("nextMonth").click();
  assert.equal(doc.querySelectorAll("[data-time]").length, 0);
  doc.getElementById("langToggle").click();
  assert.equal(doc.documentElement.lang, "en");
  assert.match(doc.getElementById("calendarMonth").textContent, /February/);
  doc.getElementById("langToggle").click();
  assert.match(doc.querySelector("h1").textContent, /Technische Beratung/);
  doc.getElementById("mobileToggle").click();
  assert.equal(
    doc.getElementById("mobileToggle").getAttribute("aria-expanded"),
    "true",
  );
  doc.dispatchEvent(new dom.window.KeyboardEvent("keydown", { key: "Escape" }));
  assert.equal(
    doc.getElementById("mobileToggle").getAttribute("aria-expanded"),
    "false",
  );
});
test("failed slots fetch exposes retry and recovery, not fabricated availability", async (t) => {
  let fails = true;
  const dom = page(async () => {
    if (fails) throw new Error("Offline");
    return ok({ slots });
  });
  t.after(() => dom.window.close());
  await tick();
  const doc = dom.window.document;
  assert.equal(doc.getElementById("retrySlots").hidden, false);
  assert.equal(doc.querySelectorAll("[data-date]").length, 0);
  fails = false;
  doc.getElementById("retrySlots").click();
  await tick();
  assert.equal(doc.getElementById("retrySlots").hidden, true);
  assert.equal(doc.querySelectorAll("[data-date]").length, 1);
});
test("booking failure retains form and retry; success requires positive server result and restores focus", async (t) => {
  let accepted = false;
  const calls = [];
  const dom = page(async (url, options) => {
    if (url === "/api/slots") return ok({ slots });
    calls.push(JSON.parse(options.body));
    return ok({ success: accepted });
  });
  t.after(() => dom.window.close());
  await tick();
  const doc = dom.window.document;
  doc.querySelector("[data-date]").click();
  doc.querySelector("[data-time]").click();
  assert.equal(doc.getElementById("bookingModal").open, true);
  assert.equal(doc.activeElement.id, "bookingName");
  doc.getElementById("bookingName").value = "Test";
  doc.getElementById("bookingEmail").value = "test@example.org";
  const submit = () =>
    doc
      .getElementById("bookingForm")
      .dispatchEvent(new dom.window.Event("submit", { cancelable: true }));
  submit();
  submit();
  await tick();
  assert.equal(calls.length, 1);
  assert.equal(doc.getElementById("formError").hidden, false);
  assert.equal(doc.querySelector(".form-submit").disabled, false);
  accepted = true;
  submit();
  await tick();
  assert.equal(doc.getElementById("modalSuccess").hidden, false);
  assert.equal(calls[1].slot, "2027-01-05T10:00");
  doc.getElementById("closeModal").click();
  assert.equal(doc.getElementById("bookingModal").open, false);
  assert.equal(doc.activeElement.dataset.date, "2027-01-05");
});

test("new positioning is consistent across visible copy and metadata without the disproved claims", () => {
  const doc = new JSDOM(html).window.document;
  assert.match(doc.querySelector("h1").textContent, /Technische Beratung/);
  assert.match(doc.querySelector(".experience").textContent, /20/);
  assert.match(doc.querySelector("#approach").textContent, /Generalist/);
  assert.match(doc.title, /Nino Wagensonner/);
  for (const content of [
    html,
    script,
    fs.readFileSync("llms.txt", "utf8"),
    fs.readFileSync("llms-en.txt", "utf8"),
  ]) {
    assert.doesNotMatch(
      content,
      /78%|6%|40%|ohne Ausfälle|without downtime|Bist du dabei|gain market share/,
    );
  }
  for (const img of doc.querySelectorAll(".client-logo img")) {
    assert.ok(img.alt.length > 0);
    assert.ok(fs.existsSync(img.getAttribute("src")));
  }
});

test("every translated element has an English entry and German is restored", async (t) => {
  const dom = page(async () => ok({ slots }));
  t.after(() => dom.window.close());
  const nodes = [...dom.window.document.querySelectorAll("[data-i18n]")];
  const before = nodes.map((node) => node.innerHTML);
  await tick();
  const translated = dom.window.testTranslations;
  for (const node of nodes) {
    if (node.dataset.i18n.startsWith("ui.")) continue;
    assert.ok(translated[node.dataset.i18n], node.dataset.i18n);
  }
  dom.window.document.getElementById("langToggle").click();
  assert.match(dom.window.document.title, /Technical consulting/);
  dom.window.document.getElementById("langToggle").click();
  nodes.forEach((node, index) => assert.equal(node.innerHTML, before[index]));
});
test("empty and malformed slot responses are distinct and never yield active days", async (t) => {
  for (const [data, retry] of [
    [{ slots: {} }, false],
    [{ slots: { "2027-01-05": ["<script>"] } }, true],
  ]) {
    const dom = page(async () => ok(data));
    t.after(() => dom.window.close());
    await tick();
    const doc = dom.window.document;
    assert.equal(doc.querySelectorAll("[data-date]").length, 0);
    assert.equal(doc.getElementById("retrySlots").hidden, !retry);
    assert.ok(doc.getElementById("calendarStatus").textContent.length > 0);
  }
});
