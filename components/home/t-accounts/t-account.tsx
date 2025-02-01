"use client";

import { FC, useState } from "react";
import { AutoCompleteDropdown, type Account } from "./autocomplete-dropdown";
import { TransactionSection, type Row } from "./transaction-section";

// Example COA (we'll remove it later)
const chartOfAccounts = [
  { id: 1, number: "1001", name: "Cash" },
  { id: 2, number: "2001", name: "Accounts Receivable" },
  { id: 3, number: "3001", name: "Inventory" },
  { id: 4, number: "4001", name: "Revenue" },
  { id: 5, number: "5001", name: "Expenses" },
];

export const TAccount: FC = () => {
  const [debits, setDebits] = useState<Row[]>([
    { id: 1, ref: "", desc: "", amount: "", type: "dr" },
  ]);
  const [credits, setCredits] = useState<Row[]>([
    { id: 1, ref: "", desc: "", amount: "", type: "cr" },
  ]);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  const addRow = () => {
    const newRowId = Date.now();
    setDebits([
      ...debits,
      { id: newRowId, ref: "", desc: "", amount: "", type: "dr" },
    ]);
    setCredits([
      ...credits,
      { id: newRowId, ref: "", desc: "", amount: "", type: "cr" },
    ]);
  };

  // const removeRow = (id: number) => {
  //   setDebits(debits.filter((row) => row.id !== id));
  //   setCredits(credits.filter((row) => row.id !== id));
  // };

  const updateRow = (
    type: "debit" | "credit",
    id: number,
    field: keyof Omit<Row, "id">,
    value: string
  ) => {
    if (type === "debit") {
      setDebits(
        debits.map((row) => (row.id === id ? { ...row, [field]: value } : row))
      );
    } else {
      setCredits(
        credits.map((row) => (row.id === id ? { ...row, [field]: value } : row))
      );
    }
  };

  const calculateTotal = (rows: Row[]) =>
    rows.reduce((sum, row) => sum + (parseFloat(row.amount) || 0), 0);

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

  return (
    <div className="w-full h-full flex flex-col">
      <div className="mb-2">
        <AutoCompleteDropdown
          accounts={chartOfAccounts}
          selectedAccount={selectedAccount}
          setSelectedAccount={setSelectedAccount}
        />
      </div>

      <div className="flex flex-1 border-t">
        <TransactionSection
          type="debit"
          rows={debits}
          addRow={addRow}
          // removeRow={removeRow}
          updateRow={updateRow}
          total={TotalDebit}
          balance={debitBalance}
        />
        <TransactionSection
          type="credit"
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
