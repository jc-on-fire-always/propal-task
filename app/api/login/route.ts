import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const USERS_FILE = path.join(process.cwd(), "users.json");

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  let users = [];
  try {
    const data = await fs.readFile(USERS_FILE, "utf-8");
    users = JSON.parse(data);
  } catch {
    return NextResponse.json({ success: false, message: "No users found" }, { status: 400 });
  }

  const user = users.find((u: any) => u.email === email && u.password === password);

  if (!user) {
    return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 });
  }

  // Don't send password back
  const { password: _, ...userWithoutPassword } = user;

  return NextResponse.json({ success: true, user: userWithoutPassword });
}