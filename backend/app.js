import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const COUNTER_FILE = join(__dirname, 'views.json');

function getViews() {
  if (!existsSync(COUNTER_FILE)) return 0;
  try { return JSON.parse(readFileSync(COUNTER_FILE, 'utf8')).views || 0; }
  catch { return 0; }
}

function incrementViews() {
  const v = getViews() + 1;
  try { writeFileSync(COUNTER_FILE, JSON.stringify({ views: v })); } catch {}
  return v;
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Pranav Portfolio API running' });
});

// View counter
app.post('/api/views', (req, res) => {
  const views = incrementViews();
  res.json({ views });
});

app.get('/api/views', (req, res) => {
  res.json({ views: getViews() });
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #8b5cf6;">New message from your portfolio</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <hr style="border-color: #e2e8f0;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    console.error('Nodemailer error:', err.message);
    res.status(500).json({ error: 'Failed to send message.', detail: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
