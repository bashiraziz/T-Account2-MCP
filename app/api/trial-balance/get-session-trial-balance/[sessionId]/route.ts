import { NextResponse } from "next/server";
import { prisma, authOptions } from "@/lib";
import { getServerSession } from "next-auth";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    // Fetch session details along with T-Accounts and Entries
    const sessionData = await prisma.session.findUnique({
      where: { id: sessionId },
      select: {
        date: true,
        referenceNumber: true,
        tAccounts: {
          select: {
            id: true,
            accountNumber: true,
            accountName: true,
            entries: {
              select: {
                amount: true,
                entryType: true,
              },
            },
          },
        },
      },
    });

    if (!sessionData) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    let totalDebitAmount = 0;
    let totalCreditAmount = 0;

    // Process T-Accounts
    const tAccounts = sessionData.tAccounts.map((tAccount) => {
      let totalDebit = 0;
      let totalCredit = 0;

      tAccount.entries.forEach((entry) => {
        if (entry.entryType === "DEBIT") {
          totalDebit += entry.amount;
        } else {
          totalCredit += entry.amount;
        }
      });

      totalDebitAmount += totalDebit;
      totalCreditAmount += totalCredit;

      return {
        accountNumber: tAccount.accountNumber,
        accountName: tAccount.accountName,
        totalDebit,
        totalCredit,
        debitBalance: totalDebit > totalCredit ? totalDebit - totalCredit : 0,
        creditBalance: totalCredit > totalDebit ? totalCredit - totalDebit : 0,
      };
    });

    const totalDebitBalance = tAccounts.reduce(
      (sum, account) => sum + account.debitBalance,
      0
    );
    const totalCreditBalance = tAccounts.reduce(
      (sum, account) => sum + account.creditBalance,
      0
    );

    return NextResponse.json({
      sessionDate: sessionData.date,
      sessionReference: sessionData.referenceNumber,
      totalDebitAmount,
      totalCreditAmount,
      totalDebitBalance,
      totalCreditBalance,
      tAccounts,
    });
  } catch (error) {
    console.error("Error fetching session balances:", error);
    return NextResponse.json(
      { error: "Failed to fetch session balances" },
      { status: 500 }
    );
  }
}
