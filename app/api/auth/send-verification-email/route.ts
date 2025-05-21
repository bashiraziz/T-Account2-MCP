import { NextResponse } from "next/server";
import { prisma } from "@/lib";
import { sendVerificationEmail } from "@/lib";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Generate a new 6-digit verification code
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Store verification code in the database (valid for 15 minutes)
    await prisma.verificationCode.upsert({
      where: { email },
      update: {
        code: verificationCode,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      },
      create: {
        email,
        code: verificationCode,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      },
    });

    // Send the verification email
    await sendVerificationEmail(email, verificationCode);

    return NextResponse.json({ message: "Verification email sent" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send verification email" },
      { status: 500 }
    );
  }
}
