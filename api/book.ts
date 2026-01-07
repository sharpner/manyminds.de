import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { AVAILABLE_SLOTS } from './slots';

const resend = new Resend(process.env.RESEND_API_KEY);

function isValidSlot(slot: string): boolean {
  const [date, time] = slot.split('T');
  const availableTimes = AVAILABLE_SLOTS[date];
  if (!availableTimes) return false;
  return availableTimes.includes(time);
}

function generateICalEvent(slot: string, name: string, email: string, company?: string): string {
  const startDate = new Date(slot);
  const endDate = new Date(startDate.getTime() + 30 * 60 * 1000); // 30 min meeting

  const formatDate = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const uid = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}@manyminds.de`;

  const description = company
    ? `Erstgespräch mit ${name} (${company})`
    : `Erstgespräch mit ${name}`;

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//manyminds.de//Booking//DE',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${formatDate(new Date())}`,
    `DTSTART:${formatDate(startDate)}`,
    `DTEND:${formatDate(endDate)}`,
    `SUMMARY:Erstgespräch KI Beratung`,
    `DESCRIPTION:${description}\\nEmail: ${email}`,
    `ORGANIZER;CN=Nino Wagensonner:mailto:n.wagensonner@manyminds.de`,
    `ATTENDEE;CN=${name};RSVP=TRUE:mailto:${email}`,
    'LOCATION:Remote (Link folgt)',
    'STATUS:TENTATIVE',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
}

interface BookingRequest {
  name: string;
  email: string;
  company?: string;
  slot: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, company, slot } = req.body as BookingRequest;

  if (!name || !email || !slot) {
    const missing: string[] = [];
    if (!name) missing.push('Name');
    if (!email) missing.push('E-Mail');
    if (!slot) missing.push('Termin');
    return res.status(400).json({
      error: `Bitte füllen Sie folgende Felder aus: ${missing.join(', ')}`
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: 'Bitte geben Sie eine gültige E-Mail-Adresse ein (z.B. name@firma.de)'
    });
  }

  if (!isValidSlot(slot)) {
    return res.status(400).json({
      error: 'Dieser Termin wurde bereits gebucht. Bitte wählen Sie einen anderen Termin.'
    });
  }

  const slotDate = new Date(slot);
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
            <td style="padding: 8px; border: 1px solid #ddd;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td>
            <td style="padding: 8px; border: 1px solid #ddd;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          ${company ? `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Firma</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${company}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Wunschtermin</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${formattedDate}</td>
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
