"use client";

import { FC } from "react";
import { AutoCompleteDropdown } from "./autocomplete-dropdown";
import { TransactionSection, type Row } from "./transaction-section";
import { ChartOfAccountsType, Entry } from "@/types";
import { useAccountingStore } from "@/store";
import { TAccountActions } from "./t-account-actions";
import {
  showErrorToast,
  showSuccessToast,
  ToastNotification,
} from "@/components";
import { useDeleteTAccount } from "@/hooks";

interface TAccountProps {
  tAccountId: string;
}

export const TAccount: FC<TAccountProps> = ({ tAccountId }) => {
  // selected t-account
  const tAccount = useAccountingStore((state) =>
    state.sessions
      .flatMap((session) => session.tAccounts)
      .find((tAcc) => tAcc.id === tAccountId)
  );
  // selected t-account's session
  const session = useAccountingStore((state) =>
    state.sessions.find((s) => s.id === tAccount?.sessionId)
  );

  // session store hooks
  const { updateTAccount, deleteTAccount, addEntry, updateEntry, deleteEntry } =
    useAccountingStore();

  // delete t-account api hook
  const { mutate: handleDeleteTAccount, isPending: isDeleting } =
    useDeleteTAccount();

  // handle select chart account
  const handleSelectAccount = (account: ChartOfAccountsType | null) => {
    if (!session || !account) return; // Ensure session exists and account is valid

    // Check if the selected account is already used in another T-Account within the same session
    const isAccountUsed = session.tAccounts.some(
      (tAcc) =>
        tAcc.chartOfAccount?.accountName === account.accountName &&
        tAcc.id !== tAccountId
    );

    if (isAccountUsed) {
      showErrorToast("This account is already used in another T-Account.");
      return;
    }

    updateTAccount(tAccount!.sessionId, tAccountId, {
      chartOfAccount: account ?? undefined,
    });
  };

  // filter debits and credits
  const debits = tAccount?.entries.filter((e) => e.entryType === "DEBIT") || [];
  const credits =
    tAccount?.entries.filter((e) => e.entryType === "CREDIT") || [];

  // Add a pair of entries
  const addRow = () => {
    if (!tAccount) return;

    const newDebitId = crypto.randomUUID();
    const newCreditId = crypto.randomUUID();

    addEntry(tAccount.sessionId, tAccount.id, {
      id: newDebitId,
      tAccountId: tAccount.id,
      referenceNumber: "",
      description: "",
      amount: 0,
      entryType: "DEBIT",
    });

    addEntry(tAccount.sessionId, tAccount.id, {
      id: newCreditId,
      tAccountId: tAccount.id,
      referenceNumber: "",
      description: "",
      amount: 0,
      entryType: "CREDIT",
    });
  };

  // Update entry (ensures corresponding debit/credit updates)
  const updateRow = (
    type: "DEBIT" | "CREDIT",
    id: string,
    field: keyof Omit<Entry, "id" | "entryType" | "tAccountId">,
    value: string | number
  ) => {
    if (!tAccount) return;

    const updatedEntry = {
      [field]: field === "amount" ? Number(value) || 0 : value,
    };

    updateEntry(tAccount.sessionId, tAccount.id, id, updatedEntry);
  };

  // Remove a pair of entries
  const removeRow = (id: string) => {
    if (!tAccount) return;

    deleteEntry(tAccount.sessionId, tAccount.id, id);
  };

  // delete a t-account
  const onDeleteTAccount = () => {
    if (!tAccount?.sessionId || !tAccountId) return;

    if (tAccount?.isNew) {
      deleteTAccount(tAccount?.sessionId, tAccountId);
      showSuccessToast("TAccount deleted");
      return;
    }

    handleDeleteTAccount(tAccountId, {
      onSuccess: () => {
        deleteTAccount(tAccount?.sessionId, tAccountId);
        showSuccessToast("TAccount deleted");
      },
      onError: () => {
        showErrorToast("Failed to delete TAccount, try again.");
      },
    });
  };
  // calculate the total
  const calculateTotal = (rows: Entry[]) =>
    rows.reduce((sum, row) => sum + (row.amount || 0), 0);

  // total debit and credits
  const debitTotal = calculateTotal(debits);
  const creditTotal = calculateTotal(credits);

  const balance = debitTotal - creditTotal;

  // balance to make both debit and credit equal
  const debitBalance = balance < 0 ? Math.abs(balance) : 0;
  const creditBalance = balance > 0 ? balance : 0;

  // total to show the debit and credit equal
  const TotalDebit = debitTotal + debitBalance;
  const TotalCredit = creditTotal + creditBalance;

  // handle error of there is no t-account
  if (!tAccount)
    return (
      <div>
        <h2>No account found!</h2>
      </div>
    );

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex gap-1 mb-2">
        {/* dropdown to show the COA */}
        <AutoCompleteDropdown
          tAccount={tAccount}
          selectedAccount={tAccount.chartOfAccount}
          setSelectedAccount={handleSelectAccount}
        />
        {/* Actions dropdown for delete and other actions */}
        <TAccountActions
          isLoading={isDeleting}
          deleteTAccount={onDeleteTAccount}
        />
      </div>

      <div id="record-transactions" className="flex flex-1 border-t">
        {/* Debit transactions */}
        <TransactionSection
          type="DEBIT"
          rows={debits}
          addRow={addRow}
          // removeRow={removeRow}
          updateRow={updateRow}
          total={TotalDebit}
          balance={debitBalance}
        />

        {/* Credit transactions */}
        <TransactionSection
          type="CREDIT"
          rows={credits}
          addRow={addRow}
          // removeRow={removeRow}
          updateRow={updateRow}
          total={TotalCredit}
          balance={creditBalance}
        />
      </div>
    </div>
  );
};
