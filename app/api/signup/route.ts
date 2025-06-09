import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

const USERS_FILE = path.join(process.cwd(), "users.json");

export async function POST(request: NextRequest) {
  const { username, email, password, phone } = await request.json();

  // Read existing users
  let users = [];
  try {
    const data = await fs.readFile(USERS_FILE, "utf-8");
    users = JSON.parse(data);
  } catch {
    users = [];
  }

  // Check if email already exists
  if (users.some((u: any) => u.email === email)) {
    return NextResponse.json(
      { success: false, message: "Email already registered" },
      { status: 400 }
    );
  }

  // Create new user
  const newUser = {
    id: randomUUID(),
    username,
    email,
    password, // In production, hash the password!
    phone,
  };

  users.push(newUser);

  // Save users back to file
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));

  // Don't return password
  const { password: _, ...userWithoutPassword } = newUser;

  return NextResponse.json({ success: true, user: userWithoutPassword });
}