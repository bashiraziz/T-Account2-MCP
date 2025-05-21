import { NextResponse } from "next/server";
import { prisma } from "@/lib";
import bcrypt from "bcryptjs";

export async function PATCH(req: Request) {
  try {
    const { email, code, newPassword } = await req.json();
    if (!email || !code || !newPassword) {
      return NextResponse.json(
        { error: "All fields are required" },
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

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });
    await prisma.verificationCode.delete({ where: { email } });

    return NextResponse.json({ message: "Password reset successful" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
