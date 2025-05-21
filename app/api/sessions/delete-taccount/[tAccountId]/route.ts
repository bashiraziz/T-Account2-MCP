import { NextResponse } from "next/server";
import { prisma, authOptions } from "@/lib";
import { getServerSession } from "next-auth";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ tAccountId: string }> }
) {
  try {
    const { tAccountId } = await params;

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!tAccountId) {
      return NextResponse.json(
        { error: "T-Account ID is required" },
        { status: 400 }
      );
    }

    // Check if the T-Account exists and belongs to the user
    const existingTAccount = await prisma.tAccount.findUnique({
      where: { id: tAccountId },
      select: { session: { select: { userId: true } } },
    });

    if (!existingTAccount) {
      return NextResponse.json(
        { error: "T-Account not found" },
        { status: 404 }
      );
    }

    if (existingTAccount.session.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Delete the T-Account (entries will be deleted due to cascade)
    await prisma.tAccount.delete({ where: { id: tAccountId } });

    return NextResponse.json(
      { message: "T-Account deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting T-Account:", error);
    return NextResponse.json(
      { error: "Failed to delete T-Account" },
      { status: 500 }
    );
  }
}
