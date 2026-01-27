import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { email, password, name } = await req.json();

 if (!email || !password || !name) {
  return NextResponse.json({ error: "Missing fields" }, { status: 400 });
}

if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  return NextResponse.json({ error: "Invalid email" }, { status: 400 });
}

if (password.length < 6) {
  return NextResponse.json({ error: "Password too short" }, { status: 400 });
}

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  return NextResponse.json({ message: "User created", user: { id: user.id, email: user.email, name: user.name } });
}