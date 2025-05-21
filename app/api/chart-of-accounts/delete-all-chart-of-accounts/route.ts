import { NextResponse } from "next/server";
import { prisma } from "@/lib";

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    await prisma.chartOfAccount.deleteMany({ where: { userId } });
    return NextResponse.json({ message: "All COAs deleted successfully" });
  } catch (error) {
    console.error("Error deleting COA list:", error);
    return NextResponse.json(
      { error: "Failed to delete COA list" },
      { status: 500 }
    );
  }
}
