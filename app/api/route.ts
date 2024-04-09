import { NeonQueryFunction, neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/db/schema";
import { users } from "@/db/schema";
import { count } from "drizzle-orm";

export const client = neon(process.env.DATABASE_URL!);
export const db = drizzle(client, { schema });

export const runtime = "edge";

export const totalUsers = await db.select({ count: count() }).from(users);

export async function getUserbyEmail(email: string) {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  });
  if (user) return user;
  else return null;
}

export async function insertUser(
  email: string,
  password: string,
  name: string
) {
    const hashedPassword = await digestMessage(password);
  await db.insert(users).values({
    id: (totalUsers[0].count + 1).toString(),
    email: email,
    password: hashedPassword,
    name: name,
  });
}

export async function digestMessage(message: string) {
  const secret_message = message + process.env.SECRET_MESSAGE;
  const msgUint8 = new TextEncoder().encode(secret_message); // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest("SHA-512", msgUint8); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // convert bytes to hex string
  return hashHex;
}
