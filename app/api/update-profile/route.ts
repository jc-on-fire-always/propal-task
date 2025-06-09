import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const USERS_FILE = path.join(process.cwd(), "users.json");

export async function POST(request: NextRequest) {
  const { id, email, password } = await request.json();

  let users = [];
  try {
    const data = await fs.readFile(USERS_FILE, "utf-8");
    users = JSON.parse(data);
  } catch {
    return NextResponse.json({ success: false, message: "No users found" }, { status: 400 });
  }

  const userIndex = users.findIndex((u: any) => u.id === id);

  if (userIndex === -1) {
    return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
  }

  // Update fields
  if (email) users[userIndex].email = email;
  if (password) users[userIndex].password = password;

  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));

  const { password: _, ...userWithoutPassword } = users[userIndex];

  return NextResponse.json({ success: true, user: userWithoutPassword });
}