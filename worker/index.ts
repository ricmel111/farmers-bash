import type { Collection, Document } from "mongodb";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body: { message?: string; error?: string }, status = 200): Response {
  return Response.json(body, { status });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

async function readJson(request: Request): Promise<Record<string, unknown> | null> {
  try {
    const value: unknown = await request.json();
    return isRecord(value) ? value : null;
  } catch {
    return null;
  }
}

function readString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email);
}

async function withMongoCollection<T>(
  uri: string,
  collectionName: string,
  fn: (collection: Collection<Document>) => Promise<T>,
): Promise<T> {
  const { MongoClient } = await import("mongodb");
  const client = new MongoClient(uri);
  try {
    await client.connect();
    return await fn(client.db("farmers-bash").collection(collectionName));
  } finally {
    await client.close();
  }
}

async function subscribeNewsletter(request: Request, env: Env): Promise<Response> {
  if (request.method !== "POST") {
    return json({ error: "Method Not Allowed" }, 405);
  }

  const body = await readJson(request);
  const email = readString(body?.email).toLowerCase();

  if (!email) {
    return json({ error: "Email is required" }, 400);
  }

  if (!isValidEmail(email)) {
    return json({ error: "Invalid email address" }, 400);
  }

  if (!env.MONGODB_URI) {
    console.error(JSON.stringify({ event: "newsletter.missing_uri" }));
    return json({ error: "Failed to subscribe to newsletter" }, 500);
  }

  try {
    const alreadySubscribed = await withMongoCollection(
      env.MONGODB_URI,
      "newsletter-subscribers",
      async (collection) => {
        const existing = await collection.findOne({ email });
        if (existing) {
          return true;
        }
        await collection.insertOne({
          email,
          subscribedAt: new Date(),
        });
        return false;
      },
    );

    if (alreadySubscribed) {
      return json({ error: "Email already subscribed" }, 400);
    }

    return json({ message: "Successfully subscribed to newsletter" });
  } catch (error) {
    console.error(
      JSON.stringify({
        event: "newsletter.subscribe_failed",
        error: error instanceof Error ? error.message : "unknown",
      }),
    );
    return json({ error: "Failed to subscribe to newsletter" }, 500);
  }
}

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/subscribe-newsletter") {
      return subscribeNewsletter(request, env);
    }

    return new Response(null, { status: 404 });
  },
} satisfies ExportedHandler<Env>;
