import { NextResponse } from "next/server";
import { authOptions, prisma } from "@/lib";
import { getServerSession } from "next-auth";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // ✅ Ensure the COA belongs to the logged-in user
    const existingCOA = await prisma.chartOfAccount.findFirst({
      where: { id, userId: session.user.id },
    });

    if (!existingCOA) {
      return NextResponse.json(
        { error: "COA not found or doesn't belong to the user" },
        { status: 404 }
      );
    }

    await prisma.chartOfAccount.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Chart of Account deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Chart of Account:", error);
    return NextResponse.json(
      { error: "Failed to delete COA" },
      { status: 500 }
    );
  }
}
