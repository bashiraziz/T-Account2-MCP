import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma, authOptions } from "@/lib";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const fullSession = await prisma.session.findUnique({
      where: { id: sessionId, userId: session.user.id },
      include: {
        tAccounts: {
          include: {
            entries: true, // Fetch all entries inside each T-Account
          },
        },
      },
    });

    if (!fullSession) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    return NextResponse.json(fullSession);
  } catch (error) {
    console.error("Error fetching session:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
