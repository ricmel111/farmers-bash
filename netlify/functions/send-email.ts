import { Handler } from '@netlify/functions';
import nodemailer from 'nodemailer';

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { name, email, message, formType } = JSON.parse(event.body || '{}');

    // Validate required fields
    if (!email) {
      return { statusCode: 400, body: 'Email is required' };
    }

    // Set subject and from email based on form type
    let subject = 'New Contact Form Submission';
    let fromEmail = process.env.ADMIN_EMAIL || 'noreply@farmersbash.com';
    let replyTo = '';

    if (formType === 'newsletter') {
      subject = 'Farmers Bash Newsletter Subscription';
      fromEmail = process.env.ADMIN_EMAIL || 'noreply@farmersbash.com';
    } else if (formType === 'contact') {
      subject = "Farmer's Bash Contact Form";
      fromEmail = process.env.ADMIN_EMAIL || 'noreply@farmersbash.com';
      replyTo = email; // Set reply-to to the sender's email address
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

    // Email content
    const mailOptions = {
      from: `"${name}" <${fromEmail}>`,
      to: process.env.ADMIN_EMAIL,
      replyTo: replyTo || undefined, // Only include replyTo if it's set
      subject: subject,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `.trim(),
      html: `
<h2>${subject}</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Message:</strong> ${message}</p>
      `.trim(),
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email' }),
    };
  }
};

export { handler }; 