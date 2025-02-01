"use client";
import { FC, useState } from "react";
import { TAccount } from "./t-account";
import { SessionHeader } from "./session-header";

export const TAccounts: FC = () => {
  const [sessionHeader, setSessionHeader] = useState({
    date: new Date().toISOString().slice(0, 10),
    referenceNumber: "",
    description: "",
  });

  const handleHeaderUpdate = (header: {
    date: string;
    referenceNumber: string;
    description?: string;
  }) => {
    setSessionHeader({
      ...header,
      description: header.description ?? "",
    });
  };

  const [tAccounts, setTAccounts] = useState([<TAccount key={0} />]);

  // here we're adding upto 20 t-accounts
  const addTAccount = () => {
    if (tAccounts.length < 20) {
      setTAccounts([...tAccounts, <TAccount key={tAccounts.length} />]);
    }
  };

  return (
    <div>
      {/* session header contains the session ref, description, and date */}
      <SessionHeader onUpdate={handleHeaderUpdate} addTAccount={addTAccount} />
      {/* t-accounts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-y-16 gap-x-8 pt-8 pb-20">
        {tAccounts}
      </div>
    </div>
  );
};
