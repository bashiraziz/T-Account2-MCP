import { NextResponse } from "next/server";
import { defaultCOA, prisma } from "@/lib";
import bcrypt from "bcryptjs";
import { authOptions } from "@/lib";
import { getServerSession } from "next-auth";
import { ChartOfAccountsType } from "@/types";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Received Data:", body);

    const { firstName, lastName, username, email, phoneNumber, password } =
      body;

    if (!firstName || !lastName || !username || !email || !password) {
      return NextResponse.json(
        { error: "All fields except phone number are required" },
        { status: 400 }
      );
    }

    // Check if email was verified
    const verification = await prisma.verificationCode.findUnique({
      where: { email },
    });

    if (!verification || !verification.verified) {
      return NextResponse.json(
        { error: "Email not verified" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        username,
        email,
        phoneNumber: phoneNumber || null,
        password: hashedPassword,
        hasSeenTour: false,
      },
    });

    if (!newUser) {
      return NextResponse.json(
        { error: "User creation failed" },
        { status: 500 }
      );
    }

    // Insert Default COA with UUIDs
    const userId = newUser.id;
    const coaEntries = defaultCOA.map((coa) => ({
      id: uuidv4(), // Assign unique UUID
      userId,
      accountCode: coa.accountCode,
      accountName: coa.accountName,
      userDefined1: coa.classification,
      userDefined2: coa.type,
      userDefined3: coa.detailType || null,
    }));

    // Insert into the database
    await prisma.chartOfAccount.createMany({
      data: coaEntries,
      skipDuplicates: true,
    });

    // Delete verification code after signup
    await prisma.verificationCode.delete({ where: { email } });

    // ✅ Remove password before returning the user
    const { password: _, ...user } = newUser;

    // ✅ Auto-login user after signup (uses NextAuth session)
    const session = await getServerSession(authOptions);

    return NextResponse.json({
      message: "Signup successful",
      user: user,
      session,
    });
  } catch (error: any) {
    console.error("❌ Signup Error:", error);

    return NextResponse.json(
      {
        error: "Failed to register user",
        details: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
