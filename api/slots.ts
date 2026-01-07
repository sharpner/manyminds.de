import type { VercelRequest, VercelResponse } from '@vercel/node';

// All available slots (internal)
const ALL_SLOTS: Record<string, string[]> = {
  // März 2026
  '2026-03-03': ['14:00'],
  '2026-03-10': ['10:00'],
  '2026-03-13': ['09:00', '15:00'],
  '2026-03-19': ['11:00'],
  '2026-03-25': ['14:00'],
  '2026-03-31': ['10:00'],
  // April 2026
  '2026-04-02': ['10:00'],
  '2026-04-08': ['14:00'],
  '2026-04-15': ['09:00', '15:00'],
  '2026-04-22': ['11:00'],
  '2026-04-29': ['14:00'],
  // Mai 2026
  '2026-05-06': ['10:00'],
  '2026-05-13': ['14:00'],
  '2026-05-20': ['09:00', '15:00'],
  '2026-05-27': ['11:00']
};

// Filter slots to only show month+2 onwards
function getAvailableSlots(): Record<string, string[]> {
  const now = new Date();
  const minMonth = now.getMonth() + 2; // 0-indexed, so +2 means "ab überübernächsten Monat"
  const minYear = minMonth > 11 ? now.getFullYear() + 1 : now.getFullYear();
  const adjustedMonth = minMonth % 12;

  const minDate = new Date(minYear, adjustedMonth, 1);

  const filtered: Record<string, string[]> = {};
  for (const [date, times] of Object.entries(ALL_SLOTS)) {
    const slotDate = new Date(date);
    if (slotDate >= minDate) {
      filtered[date] = times;
    }
  }
  return filtered;
}

// Export for validation in book.ts
export const AVAILABLE_SLOTS = ALL_SLOTS;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  return res.status(200).json({ slots: getAvailableSlots() });
}
