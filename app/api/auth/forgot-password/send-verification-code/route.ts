import { NextResponse } from "next/server";
import { prisma } from "@/lib";
import { sendVerificationEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.upsert({
      where: { email },
      update: {
        code: resetCode,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      },
      create: {
        email,
        code: resetCode,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      },
    });

    await sendVerificationEmail(email, resetCode);
    return NextResponse.json({ message: "Reset code sent to email" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
