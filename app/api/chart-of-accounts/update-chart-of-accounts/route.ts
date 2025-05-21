import { NextResponse } from "next/server";
import { prisma, normalizeKeys } from "@/lib";
import { parse } from "csv-parse/sync";

// Upload new COAs while preventing duplicates
export async function POST(req: Request) {
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

    // Fetch existing account codes
    const existingCodes = new Set(
      (
        await prisma.chartOfAccount.findMany({
          where: { userId },
          select: { accountCode: true },
        })
      ).map((a) => a.accountCode)
    );

    const newAccounts = accounts.filter(
      (account) =>
        account.accountCode && !existingCodes.has(account.accountCode)
    );

    if (newAccounts.length > 0) {
      await prisma.chartOfAccount.createMany({
        data: newAccounts.map((account) => ({
          ...account,
          userId,
        })),
      });
    }

    return NextResponse.json({
      message: "COA list uploaded successfully",
      added: newAccounts.length,
    });
  } catch (error) {
    console.error("Error uploading COA list:", error);
    return NextResponse.json(
      { error: "Failed to upload COA list" },
      { status: 500 }
    );
  }
}
