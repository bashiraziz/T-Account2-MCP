import { nanoid } from "nanoid";
import { Session } from "@/types";

/**
 * Create a new session for a user.
 * @param userId - The real user ID.
 * @returns New session object.
 */
export const createNewSession = (userId: string): Session => {
  const sessionId = nanoid();
  const tAccountId = nanoid();

  return {
    id: sessionId,
    userId: userId ? userId : "guest",
    date: new Date().toISOString(),
    referenceNumber: "New Session",
    description: "",
    isNew: true,
    tAccounts: [
      {
        id: tAccountId,
        sessionId,
        chartOfAccount: null,
        isNew: true,
        entries: [
          {
            id: nanoid(),
            tAccountId,
            referenceNumber: "",
            description: "",
            amount: 0,
            entryType: "DEBIT",
          },
          {
            id: nanoid(),
            tAccountId,
            referenceNumber: "",
            description: "",
            amount: 0,
            entryType: "CREDIT",
          },
        ],
      },
    ],
  };
};
