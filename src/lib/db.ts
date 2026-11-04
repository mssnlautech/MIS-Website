import dns from "node:dns";
import { Client } from "pg";

// Prevent Windows Node getaddrinfo ENOTFOUND issues by prioritizing IPv4 for poolers.
// This changes DNS for the whole process, so keep it to local Windows dev only.
if (process.platform === "win32") {
  dns.setDefaultResultOrder("ipv4first");
}

export async function withDb<T>(fn: (db: Client) => Promise<T>): Promise<T> {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("Missing DATABASE_URL environment variable.");
  }

  const client = new Client({ connectionString });
  await client.connect();
  try {
    return await fn(client);
  } finally {
    await client.end();
  }
}
