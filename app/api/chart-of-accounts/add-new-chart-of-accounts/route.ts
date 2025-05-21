import { NextResponse } from "next/server";
import { prisma, normalizeKeys } from "@/lib";
import { parse } from "csv-parse/sync";

// Update entire list of COA (Deletes existing and adds new)
export async function PUT(req: Request) {
  try {
    const formData = await req.formData();
    const userId = formData.get("userId")?.toString();
    const file = formData.get("file") as File;
    let accounts = [];

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    if (file) {
      const fileBuffer = await file.arrayBuffer();
      const fileText = new TextDecoder().decode(fileBuffer);
      const fileName = file.name.toLowerCase();

      if (fileName.endsWith(".csv")) {
        accounts = parse(fileText, {
          columns: true,
          skip_empty_lines: true,
        }).map(normalizeKeys);
      } else if (fileName.endsWith(".json")) {
        accounts = JSON.parse(fileText).map(normalizeKeys);
      } else {
        return NextResponse.json(
          { error: "Unsupported file format" },
          { status: 400 }
        );
      }
    } else {
      const body = await req.json();
      accounts = body.accounts?.map(normalizeKeys) || [];
    }

    if (!Array.isArray(accounts) || accounts.length === 0) {
      return NextResponse.json(
        { error: "Invalid or empty account list" },
        { status: 400 }
      );
    }

    // Delete existing COAs
    await prisma.chartOfAccount.deleteMany({ where: { userId } });

    // Insert new COAs
    await prisma.chartOfAccount.createMany({
      data: accounts.map((account) => ({
        ...account,
        userId,
      })),
    });

    return NextResponse.json({ message: "COA list updated successfully" });
  } catch (error) {
    console.error("Error updating COA list:", error);
    return NextResponse.json(
      { error: "Failed to update COA list" },
      { status: 500 }
    );
  }
}
