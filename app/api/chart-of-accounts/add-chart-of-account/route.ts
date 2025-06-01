import { NextResponse } from "next/server";
import { prisma } from "@/lib";

export async function POST(req: Request) {
  try {
    const {
      userId,
      accountCode,
      accountName,
      userDefined1,
      userDefined2,
      userDefined3,
    } = await req.json();

    if (!userId || !accountCode || !accountName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if accountCode already exists for this user
    const existingAccountCode = await prisma.chartOfAccount.findFirst({
      where: { userId, accountCode },
    });

    if (existingAccountCode) {
      return NextResponse.json(
        { error: "An account with this account code already exists." },
        { status: 400 }
      );
    }

    // Check if accountName already exists for this user
    const existingAccountName = await prisma.chartOfAccount.findFirst({
      where: { userId, accountName },
    });

    if (existingAccountName) {
      return NextResponse.json(
        { error: "An account with this account name already exists." },
        { status: 400 }
      );
    }

    const newAccount = await prisma.chartOfAccount.create({
      data: {
        userId,
        accountCode,
        accountName,
        userDefined1,
        userDefined2,
        userDefined3,
      },
    });

    return NextResponse.json(newAccount, { status: 201 });
  } catch (error) {
    console.error("Error adding Chart of Account:", error);
    return NextResponse.json(
      { error: "Failed to add Chart of Account" },
      { status: 500 }
    );
  }
}
