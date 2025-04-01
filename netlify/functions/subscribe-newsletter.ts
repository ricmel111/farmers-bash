import { Handler } from '@netlify/functions';
import fs from 'fs';
import path from 'path';

const SUBSCRIBERS_FILE = path.join(process.cwd(), 'subscribers.json');

// Ensure subscribers file exists
if (!fs.existsSync(SUBSCRIBERS_FILE)) {
  fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify([]));
}

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

    // Read current subscribers
    const subscribers = JSON.parse(fs.readFileSync(SUBSCRIBERS_FILE, 'utf-8'));

    // Check if email already exists
    if (subscribers.includes(email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email already subscribed' }),
      };
    }

    // Add new subscriber
    subscribers.push(email);

    // Save updated subscribers
    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Successfully subscribed' }),
    };
  } catch (error) {
    console.error('Error handling subscription:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process subscription' }),
    };
  }
};

export { handler }; 