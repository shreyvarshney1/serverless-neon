import { getUserbyEmail, insertUser } from "../../route";

export const runtime = "edge";

export async function POST(request: Request) {
  const { email, password, name } = await request.json();
  const existingUser = await getUserbyEmail(email);
  if (existingUser) Response.json({ error: "User already exists with this email!" });
  await insertUser(email, password, name);
  return Response.json({ success: "User registered successfully!" });
}
