import { NextResponse } from "next/server";
import { prisma } from "@/lib";

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    // Find the verification record
    const verification = await prisma.verificationCode.findUnique({
      where: { email },
    });

    if (!verification || verification.code !== code) {
      return NextResponse.json(
        { error: "Invalid verification code" },
        { status: 400 }
      );
    }

    // Check if code is expired
    if (new Date() > verification.expiresAt) {
      return NextResponse.json(
        { error: "Verification code expired" },
        { status: 400 }
      );
    }

    // ✅ Mark the email as verified and remove the code (so it can't be reused)
    await prisma.verificationCode.update({
      where: { email },
      data: { verified: true, code: null }, // Mark verified and remove the code
    });

    return NextResponse.json({ message: "Email verified successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
