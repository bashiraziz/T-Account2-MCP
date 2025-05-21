"use client";

import { FC } from "react";
import { useTrialBalances } from "@/hooks";
import { useAccountingStore } from "@/store";
import {
  PageLoader,
  showErrorToast,
  ToastNotification,
  WarningAlert,
} from "../common";

const thCellClasses =
  "text-start text-base font-medium bg-[#f3f2f7] border-b border-gray-200 py-4 px-4";
const tdCellClasses =
  "text-start text-base font-normal border-b border-gray-200 py-5 px-4";
const tFootClasses =
  "text-start text-base font-medium bg-[#f3f2f7] border-t border-gray-200 py-4 px-4";

export const TrialBalanceTable: FC = () => {
  const { selectedSessionId } = useAccountingStore();

  // selected session
  const session = useAccountingStore((state) =>
    state.sessions.find((s) => s.id === selectedSessionId)
  );

  // If session is new, and not stored in the db yet, calculate balances locally
  const localTrialBalance = session?.isNew
    ? {
        tAccounts: session.tAccounts.map((tAccount) => {
          const totalDebit = tAccount.entries
            .filter((entry) => entry.entryType === "DEBIT")
            .reduce((sum, entry) => sum + entry.amount, 0);

          const totalCredit = tAccount.entries
            .filter((entry) => entry.entryType === "CREDIT")
            .reduce((sum, entry) => sum + entry.amount, 0);

          return {
            accountNumber: tAccount.chartOfAccount?.accountCode || "",
            accountName: tAccount.chartOfAccount?.accountName || "",
            debitBalance:
              totalDebit > totalCredit ? totalDebit - totalCredit : 0,
            creditBalance:
              totalCredit > totalDebit ? totalCredit - totalDebit : 0,
          };
        }),
      }
    : null;

  const totalDebits = localTrialBalance?.tAccounts?.reduce(
    (sum, account) => sum + account.debitBalance,
    0
  );
  const totalCredits = localTrialBalance?.tAccounts?.reduce(
    (sum, account) => sum + account.creditBalance,
    0
  );

  // If session is already stored in the db, get the balance from the API
  const {
    data: trialBalance,
    isLoading,
    error,
  } = useTrialBalances(session?.isNew ? "" : selectedSessionId ?? "");

  const trialBalanceData = session?.isNew ? localTrialBalance : trialBalance;

  // check if total debit is equal to total credit
  const isBalanced = session?.isNew
    ? totalDebits === totalCredits
    : trialBalance?.totalDebitBalance === trialBalance?.totalCreditBalance;

  if (isLoading) {
    return <PageLoader />;
  }
  if (error) {
    showErrorToast(error?.message || "Failed to fetch trial balance");
  }

  return (
    <div className="pb-4">
      <ToastNotification />
      <div className="flex justify-between items-start sm:items-end gap-4 sm:gap-6 py-6 border-b max-sm:flex-col">
        <div>
          <h1 className="text-2xl font-medium mb-1">Trial balance</h1>
          <p className="text-sm font-normal max-sm:flex flex-col gap-2">
            Trial Balance for Session Overview{" "}
            <span className="w-fit text-white text-sm font-normal bg-secondary py-0.5 px-1.5 rounded">
              {trialBalance?.sessionReference || session?.referenceNumber}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-1 sm:ml-auto">
          <h6 className="text-base font-medium">Date:</h6>
          <span className="text-base font-normal">
            {new Date(
              (trialBalance?.sessionDate ?? "") || (session?.date ?? "")
            ).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className="py-8">
        <div className="w-full overflow-auto">
          <table className="w-full min-w-[580px] table-auto text-start border-collapse">
            <thead>
              <tr>
                <th className={`rounded-tl-md sm:w-[180px] ${thCellClasses}`}>
                  Account No
                </th>
                <th className={thCellClasses}>Account Name</th>
                <th className={thCellClasses}>Debits</th>
                <th className={`rounded-tr-md ${thCellClasses}`}>Credits</th>
              </tr>
            </thead>
            <tbody>
              {trialBalanceData?.tAccounts?.map((account, index) => (
                <tr key={index}>
                  <td className={`sm:w-[180px] ${tdCellClasses}`}>
                    {account?.accountNumber}
                  </td>
                  <td className={tdCellClasses}>{account?.accountName}</td>
                  <td className={tdCellClasses}>
                    {account?.debitBalance
                      ? Number(account.debitBalance).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      : "0.00"}
                  </td>
                  <td className={tdCellClasses}>
                    {account?.creditBalance
                      ? Number(account.creditBalance).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      : "0.00"}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td className={`rounded-bl-md w-[180px] ${tFootClasses}`}>
                  Total
                </td>
                <td className={tFootClasses}></td>
                <td className={tFootClasses}>
                  {trialBalance?.totalDebitBalance || totalDebits
                    ? Number(
                        trialBalance?.totalDebitBalance || totalDebits
                      ).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : "0.00"}
                </td>
                <td className={`rounded-br-md ${tFootClasses}`}>
                  {trialBalance?.totalCreditBalance || totalCredits
                    ? Number(
                        trialBalance?.totalCreditBalance || totalCredits
                      ).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : "0.00"}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        {!isBalanced && (
          <div className="mt-6">
            <WarningAlert text="Your total bebit is not equal to your total credit, please check your t-accounts" />
          </div>
        )}
      </div>
    </div>
  );
};
