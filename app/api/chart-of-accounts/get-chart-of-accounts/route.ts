import { NextResponse } from "next/server";
import { prisma } from "@/lib";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const query = searchParams.get("query");
    const offset = parseInt(searchParams.get("offset") || "0");
    const limit = 10;

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const chartOfAccounts = await prisma.chartOfAccount.findMany({
      where: {
        userId,
        OR: query
          ? [
              { accountName: { contains: query, mode: "insensitive" } },
              { accountCode: { contains: query, mode: "insensitive" } },
              { classification: { contains: query, mode: "insensitive" } },
            ]
          : undefined,
      },
      skip: offset, // Pagination: Offset
      take: limit, // Pagination: Limit
    });

    return NextResponse.json(chartOfAccounts);
  } catch (error) {
    console.error("Error fetching Chart of Accounts:", error);
    return NextResponse.json(
      { error: "Failed to fetch Chart of Accounts" },
      { status: 500 }
    );
  }
}
