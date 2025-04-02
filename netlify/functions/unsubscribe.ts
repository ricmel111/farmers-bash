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

    // Update the subscriber's status
    const result = await collection.updateOne(
      { email },
      { 
        $set: { 
          unsubscribed: true,
          unsubscribedAt: new Date()
        } 
      }
    );

    await client.close();

    if (result.matchedCount === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Subscriber not found' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Successfully unsubscribed from newsletter' }),
    };
  } catch (error) {
    console.error('Error unsubscribing from newsletter:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to unsubscribe from newsletter' }),
    };
  }
};

export { handler }; 