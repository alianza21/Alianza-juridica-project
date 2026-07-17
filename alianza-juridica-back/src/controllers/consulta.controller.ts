import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import Counter from '../models/counter.model';
import Consulta from '../models/consulta.model';
import { sendMail } from '../utils/mailer';

export const getAllConsultas = async (_req: Request, res: Response) => {
  try {
    const consultas = await Consulta.find().lean();
    return res.status(200).json({ ok: true, consultas });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, message: 'Error al obtener las consultas' });
  }
};

export const consulta = async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      documentId,
      email,
      phone,
      problemDescription,
      town,
      contactMethod,
      privacyPolicy,
    } = req.body as {
      fullName?: string;
      documentId?: string;
      email?: string;
      phone?: string;
      problemDescription?: string;
      town?: string;
      contactMethod?: string;
      privacyPolicy?: boolean;
    };

    // Validaciones básicas
    if (!fullName || !documentId || !phone || !problemDescription || !town || !privacyPolicy) {
      return res.status(400).json({ message: 'Faltan campos obligatorios.' });
    }

    // Obtener y actualizar el contador global de forma atómica
    const counter = await Counter.findOneAndUpdate(
      { name: 'radicadoCounter' },
      { $inc: { count: 1 } },
      { returnDocument: 'after', upsert: true }
    ).lean();

    const countValue = (counter && (counter as any).count) ? (counter as any).count : 1;

    // Generar identificador con padding correcto (ej: Rad. 00001)
    const expIdentifier = `Rad. ${String(countValue).padStart(5, '0')}`;

    // Guardar la consulta en BD
    const newConsulta = new Consulta({
      expIdentifier,
      fullName,
      documentId,
      email,
      phone,
      problemDescription,
      town,
      contactMethod,
      privacyPolicy,
    });

    await newConsulta.save();

    // Preparar contenido de correo
    const mainEmailContent = `
      <p>Nuevo Caso recibido</p>
      <p>Se ha registrado una nueva consulta con los siguientes detalles:</p>
      <p><strong>Identificador:</strong> ${expIdentifier}</p>
      <p><strong>Nombre completo:</strong> ${fullName}</p>
      <p><strong>Teléfono:</strong> ${phone}</p>
      <p><strong>Descripción del problema:</strong> ${problemDescription}</p>
      <p><strong>Ciudad:</strong> ${town}</p>
      <p><strong>Método de contacto:</strong> ${contactMethod}</p>
    `;

    // Enviar correo al despacho (usa utilitario sendMail)
    const notifyEmail = process.env.NOTIFY_EMAIL || process.env.SMTP_USER || '';
    if (!notifyEmail) {
      console.warn('No se encontró NOTIFY_EMAIL en .env; se omitirá el envío al despacho.');
    } else {
      await sendMail({
        to: notifyEmail,
        subject: 'Consulta Recibida',
        html: mainEmailContent,
        headers: { 'X-Google-Labels': 'recepción-de-clientes' },
      });
    }

    // Enviar confirmación al usuario si proporcionó email
    if (email) {
      const confirmationEmailContent = `
        <p>Hola ${fullName},</p>
        <p>Hemos recibido tu consulta con los siguientes detalles:</p>
        <p><strong>Identificador:</strong> ${expIdentifier}</p>
        <p><strong>Nombre completo:</strong> ${fullName}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Descripción del problema:</strong> ${problemDescription}</p>
        <p><strong>Ciudad:</strong> ${town}</p>
        <p><strong>Método de contacto:</strong> ${contactMethod}</p>
        <p>Nos pondremos en contacto contigo pronto a través de ${contactMethod}.</p>
        <p>Gracias por confiar en <strong>Soto Argel & Asociados</strong>.</p>
      `;

      await sendMail({
        to: email,
        subject: 'Confirmación de tu consulta',
        html: confirmationEmailContent,
      });
    }

    return res.status(200).json({
      message: 'Consulta registrada y correos enviados con éxito.',
      Radicado: expIdentifier,
    });
  } catch (err) {
    console.error('Error al procesar la consulta:', err);
    return res.status(500).json({ message: 'Error al procesar la solicitud.' });
  }
};
