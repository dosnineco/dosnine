// pages/api/create-event.js
import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const { eventDetails, accessToken } = req.body;

  const oAuth2Client = new google.auth.OAuth2();
  oAuth2Client.setCredentials({ access_token: accessToken });

  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

  const event = {
    summary: eventDetails.summary,
    description: eventDetails.description,
    start: {
      dateTime: eventDetails.start,
      timeZone: 'America/Los_Angeles',
    },
    end: {
      dateTime: eventDetails.end,
      timeZone: 'America/Los_Angeles',
    },
  };

  try {
    await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });
    res.status(200).json({ message: 'Event created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
