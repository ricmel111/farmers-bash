import { Handler } from '@netlify/functions';
import nodemailer from 'nodemailer';

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { email } = JSON.parse(event.body || '{}');

    // Validate email
    if (!email) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Email is required' }) };
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Check if email exists in the mailing list
    // Note: This is a simple implementation. In a production environment,
    // you would want to use a proper database to store subscribers
    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: 'Check Subscriber',
      text: `Check if ${email} is already subscribed`,
    };

    await transporter.sendMail(mailOptions);

    // For now, we'll return false to allow all subscriptions
    // In a production environment, you would check your database here
    return {
      statusCode: 200,
      body: JSON.stringify({ exists: false }),
    };
  } catch (error) {
    console.error('Error checking subscriber:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to check subscriber status' }),
    };
  }
};

export { handler }; 