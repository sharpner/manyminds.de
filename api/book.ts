import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { AVAILABLE_SLOTS } from './slots';

const resend = new Resend(process.env.RESEND_API_KEY);

function isValidSlot(slot: string): boolean {
  // slot format: "2026-01-14T10:00"
  const [date, time] = slot.split('T');
  const availableTimes = AVAILABLE_SLOTS[date];
  if (!availableTimes) return false;
  return availableTimes.includes(time);
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
    return res.status(400).json({ error: 'Name, Email und Termin sind erforderlich' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Ungültige Email-Adresse' });
  }

  if (!isValidSlot(slot)) {
    return res.status(400).json({ error: 'Dieser Termin ist nicht verfügbar' });
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
      `
    });

    return res.status(200).json({ success: true, message: 'Anfrage gesendet' });
  } catch (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ error: 'Email konnte nicht gesendet werden' });
  }
}
