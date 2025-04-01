import { Handler } from '@netlify/functions';
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

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Submission recorded successfully' }),
    };
  } catch (error) {
    console.error('Error writing submission:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to record submission' }),
    };
  }
};

export { handler }; 