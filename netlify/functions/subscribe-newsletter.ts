import { Handler } from '@netlify/functions';
import { MongoClient } from 'mongodb';

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { email } = JSON.parse(event.body || '{}');

    // Validate email
    if (!email) {
      return { statusCode: 400, body: 'Email is required' };
    }

    // Get MongoDB URI from environment variables
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MongoDB URI is not configured');
    }

    // Connect to MongoDB
    const client = new MongoClient(mongoUri);
    await client.connect();

    // Get the database and collection
    const db = client.db('farmers-bash');
    const collection = db.collection('newsletter-subscribers');

    // Check if email already exists
    const existingSubscriber = await collection.findOne({ email });
    if (existingSubscriber) {
      await client.close();
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email already subscribed' }),
      };
    }

    // Insert new subscriber
    await collection.insertOne({
      email,
      subscribedAt: new Date(),
    });

    await client.close();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Successfully subscribed to newsletter' }),
    };
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to subscribe to newsletter' }),
    };
  }
};

export { handler }; 