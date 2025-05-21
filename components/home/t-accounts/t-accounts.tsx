"use client";
import { FC, useEffect, useRef } from "react";
import { TAccount } from "./t-account";
import { SessionHeader } from "./session-header";
import { type Session, type TAccount as TAccountType } from "@/types";
import { useAccountingStore } from "@/store";
import { nanoid } from "nanoid";
import { useSaveSession, useSessionDetails } from "@/hooks";
import {
  NoSessionIcon,
  PageLoader,
  ToastNotification,
  showErrorToast,
  showSuccessToast,
} from "@/components";
import { handleSaveSession } from "@/utils";

interface TAccountProps {
  selectedSession: Session;
}

export const TAccounts: FC<TAccountProps> = ({ selectedSession }) => {
  const { addTAccount } = useAccountingStore();
  // save session (create or update)
  const { mutate: saveSession, isPending } = useSaveSession();

  const prevSessionRef = useRef<Session | null>(null);

  // Fetch session details using the hook
  const {
    data: SessionDetails,
    isLoading,
    isError,
  } = useSessionDetails(
    selectedSession?.userId,
    selectedSession.isNew ? "" : selectedSession.id
  );

  // get the updateSession to set the new session details in the store
  const { updateSession } = useAccountingStore();

  // update the session details in the store
  useEffect(() => {
    if (SessionDetails && selectedSession?.isNew !== true) {
      const data = {
        ...SessionDetails,
        tAccounts: SessionDetails.tAccounts.map((tAccount) => ({
          ...tAccount,
          chartOfAccount: {
            accountCode: tAccount.accountNumber,
            accountName: tAccount.accountName,
            classification: "",
            type: "",
            typeDetail: "",
          },
          entries: tAccount.entries.map((entry) => ({
            ...entry,
            tAccountId: tAccount.id,
          })),
        })),
      };
      console.log(data, "data");
      updateSession(SessionDetails.id, data);
    }
  }, [SessionDetails]);

  // move it to utils
  const addNewTAccount = () => {
    if (selectedSession.tAccounts.length < 20) {
      const newTAccount: TAccountType = {
        id: crypto.randomUUID(),
        sessionId: selectedSession.id,
        chartOfAccount: null,
        entries: [
          {
            id: nanoid(),
            tAccountId: "",
            referenceNumber: "",
            description: "",
            amount: 0,
            entryType: "DEBIT",
          },
          {
            id: nanoid(),
            tAccountId: "",
            referenceNumber: "",
            description: "",
            amount: 0,
            entryType: "CREDIT",
          },
        ],
        isNew: true,
      };
      addTAccount(selectedSession.id, newTAccount);
    }
  };

  const handleSave = () => {
    handleSaveSession(selectedSession, saveSession, updateSession, {
      onSuccess: () => {
        prevSessionRef.current = selectedSession;
      },
    });
  };

  // store the current state of the session in a ref to check if the user has made any changes before saving the session
  useEffect(() => {
    if (selectedSession.isNew) return;
    prevSessionRef.current = selectedSession;
  }, [selectedSession]);

  if (isLoading || !selectedSession.tAccounts) return <PageLoader />;
  if (isError) {
    showErrorToast("Error fetching session details");
  }

  return (
    <div>
      {/* loading state */}
      {isPending && <PageLoader />}
      <ToastNotification />
      {/* session header contains the session ref, description, date, add Taccount and save session buttons */}
      <SessionHeader
        selectedSession={selectedSession}
        addTAccount={addNewTAccount}
        onSave={handleSave}
        // disableSave={disableSave}
      />
      {/* t-accounts */}
      {!selectedSession.tAccounts.length && !isLoading ? (
        <div className="flex flex-col justify-center items-center h-[50vh]">
          <NoSessionIcon />
          <h1 className="text-2xl font-medium">No t-Accounts added</h1>
          <p className="text-base">
            <span
              onClick={addNewTAccount}
              className="text-secondary cursor-pointer hover:underline"
            >
              Add
            </span>{" "}
            a new T-Account.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-y-16 gap-x-8 pt-8 pb-20">
          {selectedSession.tAccounts.map((tAccount) => (
            <TAccount key={tAccount?.id} tAccountId={tAccount?.id} />
          ))}
        </div>
      )}
    </div>
  );
};
