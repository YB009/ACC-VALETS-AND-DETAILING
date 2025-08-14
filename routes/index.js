const express = require('express');
const router = express.Router();

// Home page with some example data (adjust as you like)
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Home',
    services: [
      'Mobile & unit car valeting',
      'Deep interior and exterior clean',
      'Paint correction and polishing',
      'Ceramic coatings (up to 10 years)',
      'Headlight restoration',
      'Engine bay cleaning'
    ],
    areas: [
      'Newcastle upon Tyne',
      'Gateshead',
      'Sunderland',
      'South Shields',
      'North Shields',
      'Durham',
    ]
  });
});

/**
 * POST /api/book
 * Accepts JSON and sends booking details via EMAIL only (Nodemailer).
 *
 * Defaults:
 *   Email TO:    owohdaniel09@gmail.com
 *
 * Enable real sending via env vars (choose SMTP or Gmail):
 *   SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS
 *   or
 *   GMAIL_USER, GMAIL_PASS  (App Password recommended)
 * Optional overrides:
 *   BOOKING_TO, BOOKING_FROM
 */
router.post('/api/book', async (req, res) => {
  try {
    const {
      fullName, email, phone, vehicle, service, date, message
    } = req.body || {};

    if (!fullName || !phone || !service) {
      return res.status(400).json({ error: 'fullName, phone and service are required.' });
    }

    const summary =
      `New ACC Booking\n\n` +
      `Name: ${fullName}\n` +
      `Email: ${email || '-'}\n` +
      `Phone: ${phone}\n` +
      `Vehicle: ${vehicle || '-'}\n` +
      `Service: ${service}\n` +
      `Preferred date: ${date || '-'}\n` +
      `Message: ${message || '-'}\n`;

    // === EMAIL via Nodemailer ===
    let emailOk = false, emailErr = null;
    try {
      const nodemailer = require('nodemailer');
      let transporter;

      if (process.env.SMTP_HOST) {
        // SMTP pathway
        transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 587),
          secure: String(process.env.SMTP_SECURE || 'false') === 'true',
          auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined
        });
      } else if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
        // Gmail (use App Password)
        transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS }
        });
      } else {
        // Fallback: log as JSON (does not send)
        transporter = nodemailer.createTransport({ jsonTransport: true });
      }

      const toEmail = process.env.BOOKING_TO || 'owohdaniel09@gmail.com';
      const fromEmail = process.env.BOOKING_FROM || 'website@acc-valets.local';

      await transporter.sendMail({
        from: fromEmail,
        to: toEmail,
        subject: 'New booking — ACC Valets & Detailing',
        text: summary
      });

      emailOk = true;
    } catch (e) { emailErr = e; }

    return res.json({
      ok: true,
      email: emailOk ? 'sent' : (emailErr ? String(emailErr) : 'skipped')
    });
  } catch (err) {
    console.error('Booking failed:', err);
    return res.status(500).json({ error: 'Booking failed' });
  }
});

module.exports = router;
