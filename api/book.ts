import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { isAvailableSlot } from './slots';

const resend = new Resend(process.env.RESEND_API_KEY);
const ALLOWED_ORIGINS = new Set([
  'https://manyminds.de',
  'https://www.manyminds.de',
  'http://localhost:3000',
  'http://localhost:5173'
]);
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_COMPANY_LENGTH = 120;
const SLOT_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
const EMAIL_PATTERN = /^[A-Za-z0-9.!#$'*+/=^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/;

function applyCors(req: VercelRequest, res: VercelResponse): void {
  const origin = req.headers.origin;
  if (typeof origin !== 'string') return;
  if (!ALLOWED_ORIGINS.has(origin)) return;

  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Vary', 'Origin');
}

function isValidSlot(slot: string): boolean {
  return isAvailableSlot(slot);
}

function parseSlotParts(slot: string): [number, number, number, number, number] {
  const [date, time] = slot.split('T');
  const [year, month, day] = date.split('-').map(Number);
  const [hour, minute] = time.split(':').map(Number);

  return [year, month, day, hour, minute];
}

function formatICalDateTime(year: number, month: number, day: number, hour: number, minute: number): string {
  return [
    String(year).padStart(4, '0'),
    String(month).padStart(2, '0'),
    String(day).padStart(2, '0'),
    'T',
    String(hour).padStart(2, '0'),
    String(minute).padStart(2, '0'),
    '00'
  ].join('');
}

function addMinutesToSlot(slot: string, minutesToAdd: number): [number, number, number, number, number] {
  const [year, month, day, hour, minute] = parseSlotParts(slot);
  const normalized = new Date(Date.UTC(year, month - 1, day, hour, minute + minutesToAdd));

  return [
    normalized.getUTCFullYear(),
    normalized.getUTCMonth() + 1,
    normalized.getUTCDate(),
    normalized.getUTCHours(),
    normalized.getUTCMinutes()
  ];
}

function escapeICalText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\r\n/g, '\\n')
    .replace(/\r/g, '\\n')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;');
}

function escapeICalParameter(value: string): string {
  return value
    .replace(/[\r\n]/g, ' ')
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"');
}

function encodeMailtoAddress(email: string): string {
  return `mailto:${encodeURIComponent(email)}`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function readString(value: unknown, maxLength: number): string | undefined {
  if (typeof value !== 'string') return undefined;

  const trimmed = value.replace(/[\r\n]+/g, ' ').trim();
  if (trimmed.length === 0) return undefined;
  if (trimmed.length > maxLength) return undefined;

  return trimmed;
}

function readOptionalString(value: unknown, maxLength: number): string | undefined {
  if (value === undefined || value === null) return undefined;
  if (typeof value !== 'string') return undefined;

  const trimmed = value.replace(/[\r\n]+/g, ' ').trim();
  if (trimmed.length === 0) return undefined;
  if (trimmed.length > maxLength) return undefined;

  return trimmed;
}

function generateICalEvent(slot: string, name: string, email: string, company?: string): string {
  const start = parseSlotParts(slot);
  const end = addMinutesToSlot(slot, 30);
  const uid = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}@manyminds.de`;
  const escapedName = escapeICalText(name);
  const escapedNameParameter = escapeICalParameter(name);
  const escapedEmail = escapeICalText(email);
  const escapedCompany = company ? escapeICalText(company) : '';
  const mailtoAddress = encodeMailtoAddress(email);

  const description = escapedCompany
    ? `Erstgespräch mit ${escapedName} (${escapedCompany})`
    : `Erstgespräch mit ${escapedName}`;

  const dtstamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//manyminds.de//Booking//DE',
    'CALSCALE:GREGORIAN',
    'X-WR-TIMEZONE:Europe/Berlin',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART;TZID=Europe/Berlin:${formatICalDateTime(...start)}`,
    `DTEND;TZID=Europe/Berlin:${formatICalDateTime(...end)}`,
    `SUMMARY:Erstgespräch KI Beratung`,
    `DESCRIPTION:${description}\\nEmail: ${escapedEmail}`,
    `ORGANIZER;CN=Nino Wagensonner:mailto:n.wagensonner@manyminds.de`,
    `ATTENDEE;CN="${escapedNameParameter}";RSVP=TRUE:${mailtoAddress}`,
    'LOCATION:Remote (Link folgt)',
    'STATUS:TENTATIVE',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  applyCors(req, res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body && typeof req.body === 'object' ? req.body as Record<string, unknown> : {};
  const name = readString(body.name, MAX_NAME_LENGTH);
  const email = readString(body.email, MAX_EMAIL_LENGTH);
  const company = readOptionalString(body.company, MAX_COMPANY_LENGTH);
  const slot = readString(body.slot, 32);

  if (!name || !email || !slot) {
    const missing: string[] = [];
    if (!name) missing.push('Name');
    if (!email) missing.push('E-Mail');
    if (!slot) missing.push('Termin');
    return res.status(400).json({
      error: `Bitte füllen Sie folgende Felder aus: ${missing.join(', ')}`
    });
  }

  if (body.company !== undefined && body.company !== null && typeof body.company !== 'string') {
    return res.status(400).json({
      error: 'Bitte geben Sie ein gültiges Unternehmen an.'
    });
  }

  if (typeof body.company === 'string' && body.company.trim().length > MAX_COMPANY_LENGTH) {
    return res.status(400).json({
      error: 'Bitte kürzen Sie den Unternehmensnamen.'
    });
  }

  if (!EMAIL_PATTERN.test(email)) {
    return res.status(400).json({
      error: 'Bitte geben Sie eine gültige E-Mail-Adresse ein (z.B. name@firma.de)'
    });
  }

  if (!SLOT_PATTERN.test(slot)) {
    return res.status(400).json({
      error: 'Bitte wählen Sie einen gültigen Termin.'
    });
  }

  if (!isValidSlot(slot)) {
    return res.status(400).json({
      error: 'Dieser Termin wurde bereits gebucht. Bitte wählen Sie einen anderen Termin.'
    });
  }

  const [slotYear, slotMonth, slotDay, slotHour, slotMinute] = parseSlotParts(slot);
  const slotDate = new Date(slotYear, slotMonth - 1, slotDay, slotHour, slotMinute);
  const formattedDate = slotDate.toLocaleDateString('de-DE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  try {
    const icalContent = generateICalEvent(slot, name, email, company);
    const icalBase64 = Buffer.from(icalContent).toString('base64');
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMailtoAddress = escapeHtml(encodeMailtoAddress(email));
    const safeCompany = company ? escapeHtml(company) : '';
    const safeFormattedDate = escapeHtml(formattedDate);

    // Email an Nino
    await resend.emails.send({
      from: 'Buchung <info@chronicleforge.app>',
      to: 'n.wagensonner@manyminds.de',
      subject: `Neue Terminanfrage: ${name}${company ? ` (${company})` : ''}`,
      html: `
        <h2>Neue Terminanfrage über manyminds.de</h2>
        <table style="border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Name</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td>
            <td style="padding: 8px; border: 1px solid #ddd;"><a href="${safeMailtoAddress}">${safeEmail}</a></td>
          </tr>
          ${company ? `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Firma</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${safeCompany}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Wunschtermin</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${safeFormattedDate}</td>
          </tr>
        </table>
        <p style="color: #666; font-size: 12px;">Gesendet über manyminds.de Buchungsformular</p>
      `,
      attachments: [{
        filename: 'termin.ics',
        content: icalBase64,
      }]
    });

    // Kunde kriegt Einladung automatisch wenn Nino das iCal akzeptiert
    return res.status(200).json({ success: true, message: 'Anfrage gesendet' });
  } catch (error) {
    console.error('Resend error:', error);
    return res.status(500).json({
      error: 'Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie mich direkt unter n.wagensonner@manyminds.de'
    });
  }
}
