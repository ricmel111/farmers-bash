import { Handler } from '@netlify/functions';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { checkRateLimit } from './utils/rate-limit';

const SUBMISSIONS_DIR = path.join(process.cwd(), 'submissions');

// Ensure submissions directory exists
if (!fs.existsSync(SUBMISSIONS_DIR)) {
  fs.mkdirSync(SUBMISSIONS_DIR, { recursive: true });
}

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { name, email, message, formType } = JSON.parse(event.body || '{}');

    // Validate required fields
    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email is required' }),
      };
    }

    // Get client IP
    const ip = event.headers['client-ip'] || event.headers['x-forwarded-for'] || 'unknown';

    // Check rate limits
    const rateLimit = checkRateLimit(ip, email, formType);
    if (!rateLimit.allowed) {
      return {
        statusCode: 429,
        body: JSON.stringify({ error: rateLimit.message }),
      };
    }

    // Set subject and from email based on form type
    let subject = 'New Contact Form Submission';
    const fromEmail = process.env.ADMIN_EMAIL || 'noreply@farmersbash.com';
    let replyTo = '';

    if (formType === 'newsletter') {
      subject = 'FB Newsletter Subscription';
    } else if (formType === 'contact') {
      subject = 'FB Contact Form Message';
      replyTo = email; // Set reply-to to the sender's email
    }

    // Create a timestamp for the filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${formType || 'submission'}-${timestamp}.json`;
    const filepath = path.join(SUBMISSIONS_DIR, filename);

    // Prepare submission data
    const submissionData = {
      timestamp: new Date().toISOString(),
      formType,
      name,
      email,
      message,
      userAgent: event.headers['user-agent'],
      ip,
    };

    // Write to file
    fs.writeFileSync(filepath, JSON.stringify(submissionData, null, 2));

    // Configure email transport
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${fromEmail}>`,
      replyTo: replyTo || undefined, // Only include replyTo if it's set
      to: process.env.ADMIN_EMAIL,
      subject: subject,
      text: `
Name: ${name}
Email: ${email}
Message: ${message || 'No message provided'}
      `.trim(),
      html: `
<h2>New ${formType === 'newsletter' ? 'Newsletter Subscription' : 'Contact Form Submission'}</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
      `.trim(),
    };

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