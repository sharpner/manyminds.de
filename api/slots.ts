import type { VercelRequest, VercelResponse } from '@vercel/node';

export type SlotsByDate = Record<string, string[]>;

const ALLOWED_ORIGINS = new Set([
  'https://manyminds.de',
  'https://www.manyminds.de',
  'http://localhost:3000',
  'http://localhost:5173'
]);
const MONTHS_AHEAD = 2;
const MONTHS_TO_PUBLISH = 4;
const MAX_SLOTS_PER_MONTH = 5;

const SLOT_RULES = [
  { weekday: 2, times: ['10:00'] },
  { weekday: 3, times: ['14:00'] },
  { weekday: 5, times: ['09:00', '15:00'] }
];

function applyCors(req: VercelRequest, res: VercelResponse): void {
  const origin = req.headers.origin;
  if (typeof origin !== 'string') return;
  if (!ALLOWED_ORIGINS.has(origin)) return;

  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Vary', 'Origin');
}

function getMinDate(now = new Date()): Date {
  const minMonth = now.getMonth() + MONTHS_AHEAD;
  const minYear = minMonth > 11 ? now.getFullYear() + 1 : now.getFullYear();
  const adjustedMonth = minMonth % 12;

  return new Date(minYear, adjustedMonth, 1);
}

function formatDateKey(date: Date): string {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0')
  ].join('-');
}

function slotTimesForDate(date: Date): string[] {
  const rule = SLOT_RULES.find(item => item.weekday === date.getDay());
  if (!rule) return [];

  return rule.times;
}

function addMonthSlots(slots: SlotsByDate, year: number, month: number): void {
  let published = 0;
  const lastDay = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= lastDay; day++) {
    if (published >= MAX_SLOTS_PER_MONTH) return;

    const date = new Date(year, month, day);
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
    const monthDate = new Date(minDate.getFullYear(), minDate.getMonth() + offset, 1);
    addMonthSlots(slots, monthDate.getFullYear(), monthDate.getMonth());
  }

  return slots;
}

export function isAvailableSlot(slot: string, now = new Date()): boolean {
  const [date, time] = slot.split('T');
  if (!date || !time) return false;

  const availableTimes = getAvailableSlots(now)[date];
  if (!availableTimes) return false;

  return availableTimes.includes(time);
}

function getAvailableSlotsResponse(): SlotsByDate {
  const now = new Date();
  return getAvailableSlots(now);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  applyCors(req, res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  return res.status(200).json({ slots: getAvailableSlotsResponse() });
}
