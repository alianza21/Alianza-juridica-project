// src/utils/mailer.ts
import nodemailer, { SendMailOptions } from 'nodemailer';

const user = process.env.SMTP_USER || process.env.EMAIL;
const pass = process.env.SMTP_PASS || process.env.PASSWORD;
const host = process.env.SMTP_HOST || 'smtp.gmail.com';
const port = Number(process.env.SMTP_PORT || 587);
const secure = (process.env.SMTP_SECURE === 'true') || false;

const transporter = nodemailer.createTransport({
  host,
  port,
  secure,
  auth: user && pass ? { user, pass } : undefined,
  tls: { rejectUnauthorized: process.env.NODE_ENV === 'production' }
});

transporter.verify()
  .then(() => console.log('Mailer: transporter listo'))
  .catch((err) => console.warn('Mailer: no se pudo verificar transporter', err));

export type MailParams = {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  from?: string;
  headers?: Record<string, string>;
};

export const sendMail = async (params: MailParams) => {
  const from = params.from || user || `no-reply@${host}`;
  const mailOptions: SendMailOptions = {
    from,
    to: params.to,
    subject: params.subject,
    text: params.text,
    html: params.html,
    headers: params.headers
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return { ok: true, info };
  } catch (error) {
    console.error('sendMail error:', error);
    return { ok: false, error };
  }
};
