import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma, authOptions } from "@/lib";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch only essential session details
    const sessions = await prisma.session.findMany({
      where: { userId: session.user.id },
      select: {
        id: true,
        date: true,
        referenceNumber: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(sessions);
  } catch (error) {
    console.error("Error fetching sessions:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
