import { NextResponse } from "next/server";
import { prisma } from "@/lib";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const {
      userId,
      accountCode,
      accountName,
      userDefined1,
      userDefined2,
      userDefined3,
    } = await req.json();

    if (!id || !userId) {
      return NextResponse.json(
        { error: "ID and userId are required" },
        { status: 400 }
      );
    }

    // ✅ Check if accountCode already exists for the same user (excluding current account)
    const existingAccountCode = await prisma.chartOfAccount.findFirst({
      where: {
        userId,
        accountCode,
        id: { not: id },
      },
    });

    if (existingAccountCode) {
      return NextResponse.json(
        { error: "An account with this code already exists." },
        { status: 400 }
      );
    }

    // ✅ Check if accountName already exists for the same user (excluding current account)
    const existingAccountName = await prisma.chartOfAccount.findFirst({
      where: {
        userId,
        accountName,
        id: { not: id },
      },
    });

    if (existingAccountName) {
      return NextResponse.json(
        { error: "An account with this name already exists." },
        { status: 400 }
      );
    }

    const updatedCOA = await prisma.chartOfAccount.update({
      where: { id },
      data: {
        accountCode,
        accountName,
        userDefined1,
        userDefined2,
        userDefined3,
      },
    });

    return NextResponse.json(updatedCOA);
  } catch (error) {
    console.error("Error updating Chart of Account:", error);
    return NextResponse.json(
      { error: "Failed to update COA" },
      { status: 500 }
    );
  }
}
