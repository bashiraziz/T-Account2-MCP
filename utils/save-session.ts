import { SaveSessionData } from "@/hooks";
import { Session } from "@/types";
import { showErrorToast, showSuccessToast } from "@/components";

type SaveSessionFn = (
  data: SaveSessionData,
  options?: {
    onSuccess?: () => void;
    onError?: () => void;
  }
) => void;

export const handleSaveSession = (
  selectedSession: Session,
  saveSession: SaveSessionFn,
  updateSession: (sessionId: string, session: Session) => void,
  callbacks?: {
    onSuccess?: () => void;
    onError?: () => void;
  }
) => {
  if (!selectedSession.date) {
    showErrorToast("Date is required");
    return;
  }

  if (!selectedSession.referenceNumber) {
    showErrorToast("Reference number is required");
    return;
  }

  const formattedSession: SaveSessionData = {
    id: selectedSession.isNew ? "" : selectedSession.id,
    date: new Date(selectedSession.date).toISOString(),
    referenceNumber: selectedSession.referenceNumber,
    description: selectedSession.description,
    tAccounts: selectedSession.tAccounts.map((tAccount) => ({
      accountNumber: tAccount.chartOfAccount?.accountCode || "",
      accountName: tAccount.chartOfAccount?.accountName || "",
      entries: tAccount.entries.map((entry) => ({
        referenceNumber: entry.referenceNumber,
        description: entry.description,
        amount: entry.amount,
        entryType: entry.entryType,
      })),
    })),
  };

  saveSession(formattedSession, {
    onSuccess: () => {
      updateSession(selectedSession.id, selectedSession);
      showSuccessToast("Session saved successfully");
      callbacks?.onSuccess?.();
    },
    onError: () => {
      showErrorToast("Failed to save session, please try again.");
      callbacks?.onError?.();
    },
  });
};
