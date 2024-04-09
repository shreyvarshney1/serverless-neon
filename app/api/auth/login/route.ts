import { digestMessage, getUserbyEmail, insertUser } from "../../route";

export const runtime = "edge";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const existingUser = await getUserbyEmail(email);
  const hashedPassword = await digestMessage(password);
  if (existingUser?.password === hashedPassword)
    return Response.json({ success: "Logged in successfully!" });
  else return Response.json({ error: "Wrong Email or Password" });
}
