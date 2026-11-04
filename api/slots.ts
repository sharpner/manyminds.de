import type { ApiRequest, ApiResponse } from "./http";

export type SlotsByDate = Record<string, string[]>;

const ALLOWED_ORIGINS = new Set([
  "https://manyminds.de",
  "https://www.manyminds.de",
  "http://localhost:3000",
  "http://localhost:5173",
]);
const MONTHS_TO_PUBLISH = 4;
const MAX_SLOTS_PER_MONTH = 5;
const berlinDate = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Berlin",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const SLOT_RULES = [
  { weekday: 2, times: ["10:00"] },
  { weekday: 3, times: ["14:00"] },
  { weekday: 5, times: ["09:00", "15:00"] },
];

function applyCors(req: ApiRequest, res: ApiResponse): void {
  const origin = req.headers.origin;
  if (typeof origin !== "string") return;
  if (!ALLOWED_ORIGINS.has(origin)) return;

  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Vary", "Origin");
}

function getMinDate(now = new Date()): Date {
  const parts = Object.fromEntries(
    berlinDate.formatToParts(now).map(({ type, value }) => [type, value]),
  );
  // UTC arithmetic represents Berlin calendar dates, not appointment instants.
  const date = new Date(Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day)));
  const daysUntilNextMonday = (8 - date.getUTCDay()) % 7 || 7;
  date.setUTCDate(date.getUTCDate() + daysUntilNextMonday);
  return date;
}

function formatDateKey(date: Date): string {
  return [
    date.getUTCFullYear(),
    String(date.getUTCMonth() + 1).padStart(2, "0"),
    String(date.getUTCDate()).padStart(2, "0"),
  ].join("-");
}

function slotTimesForDate(date: Date): string[] {
  const rule = SLOT_RULES.find((item) => item.weekday === date.getUTCDay());
  if (!rule) return [];

  return rule.times;
}

function addMonthSlots(slots: SlotsByDate, year: number, month: number, minDate: Date): void {
  let published = 0;
  const lastDay = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();

  for (let day = 1; day <= lastDay; day++) {
    if (published >= MAX_SLOTS_PER_MONTH) return;

    const date = new Date(Date.UTC(year, month, day));
    if (date < minDate) continue;
    const times = slotTimesForDate(date);
    if (times.length === 0) continue;

    const remaining = MAX_SLOTS_PER_MONTH - published;
    const publishedTimes = times.slice(0, remaining);
    if (publishedTimes.length === 0) return;

    slots[formatDateKey(date)] = publishedTimes;
    published += publishedTimes.length;
  }
}

export function getAvailableSlots(now = new Date()): SlotsByDate {
  const minDate = getMinDate(now);
  const slots: SlotsByDate = {};

  for (let offset = 0; offset < MONTHS_TO_PUBLISH; offset++) {
    const monthDate = new Date(Date.UTC(
      minDate.getUTCFullYear(),
      minDate.getUTCMonth() + offset,
      1,
    ));
    addMonthSlots(slots, monthDate.getUTCFullYear(), monthDate.getUTCMonth(), minDate);
  }

  return slots;
}

export function isAvailableSlot(slot: string, now = new Date()): boolean {
  const [date, time] = slot.split("T");
  if (!date || !time) return false;

  const availableTimes = getAvailableSlots(now)[date];
  if (!availableTimes) return false;

  return availableTimes.includes(time);
}

function getAvailableSlotsResponse(): SlotsByDate {
  const now = new Date();
  return getAvailableSlots(now);
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  applyCors(req, res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  return res.status(200).json({ slots: getAvailableSlotsResponse() });
}
