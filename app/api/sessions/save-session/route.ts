import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma, authOptions } from "@/lib";
import { Entry } from "@/types";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, date, referenceNumber, description, tAccounts } =
      await req.json();

    if (!date || !referenceNumber || !tAccounts || !Array.isArray(tAccounts)) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    for (const tAccount of tAccounts) {
      if (!tAccount.accountNumber || !tAccount.accountName) {
        return NextResponse.json(
          {
            error: "Each T-Account must have an account selected",
          },
          { status: 400 }
        );
      }
    }

    let savedSession;

    if (id) {
      // ✅ Update existing session
      savedSession = await prisma.session.update({
        where: { id, userId: session.user.id },
        data: {
          date,
          referenceNumber,
          description,
          tAccounts: {
            deleteMany: {}, // Clear old T-Accounts before inserting new ones
            create: tAccounts.map((tAccount) => ({
              accountNumber: tAccount.accountNumber,
              accountName: tAccount.accountName,
              entries: {
                create: tAccount.entries.map(
                  ({
                    referenceNumber,
                    description,
                    amount,
                    entryType,
                  }: Entry) => ({
                    referenceNumber,
                    description,
                    amount,
                    entryType,
                  })
                ),
              },
            })),
          },
        },
        include: { tAccounts: { include: { entries: true } } },
      });
    } else {
      // ✅ Create new session
      savedSession = await prisma.session.create({
        data: {
          userId: session.user.id,
          date,
          referenceNumber,
          description,
          tAccounts: {
            create: tAccounts.map((tAccount) => ({
              accountNumber: tAccount.accountNumber,
              accountName: tAccount.accountName,
              entries: {
                create: tAccount.entries.map(
                  ({
                    referenceNumber,
                    description,
                    amount,
                    entryType,
                  }: Entry) => ({
                    referenceNumber,
                    description,
                    amount,
                    entryType,
                  })
                ),
              },
            })),
          },
        },
        include: { tAccounts: { include: { entries: true } } },
      });
    }

    return NextResponse.json(savedSession);
  } catch (error) {
    console.error("Error saving session:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
