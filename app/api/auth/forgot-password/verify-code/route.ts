import { NextResponse } from "next/server";
import { prisma } from "@/lib";

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();
    if (!email || !code) {
      return NextResponse.json(
        { error: "Email and code are required" },
        { status: 400 }
      );
    }

    const verification = await prisma.verificationCode.findUnique({
      where: { email },
    });
    if (
      !verification ||
      verification.code !== code ||
      new Date() > verification.expiresAt
    ) {
      return NextResponse.json(
        { error: "Invalid or expired code" },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Code verified successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
