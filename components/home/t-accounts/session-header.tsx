"use client";

import {
  PrimaryBtn,
  PrimaryInput,
  SecondaryBtn,
  showErrorToast,
  showSuccessToast,
} from "@/components";
import { FC, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { type Session } from "@/types";
import { useAccountingStore, useUserStore } from "@/store";
import { SessionActions } from "./session-actions";
import { useDeleteSession } from "@/hooks";

type SessionHeaderProps = {
  selectedSession: Session;
  addTAccount: () => void;
  onSave: () => void;
  disableSave?: boolean;
};

export const SessionHeader: FC<SessionHeaderProps> = ({
  selectedSession,
  addTAccount,
  onSave,
  disableSave,
}) => {
  const { user } = useUserStore();
  const { sessions, updateSession, deleteSession, setSelectedSessionId } =
    useAccountingStore();
  const { mutate: handleDeleteSession, isPending: isDeleting } =
    useDeleteSession();

  // show warning popup before deleting the session
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);

  const handleChange = (
    field: "date" | "referenceNumber" | "description",
    value: string
  ) => {
    updateSession(selectedSession.id, { [field]: value });
  };

  // handle delete session
  const onDeleteSession = () => {
    if (!selectedSession.id) return;

    // Remove from Zustand store if it's not saved to database yet
    if (selectedSession.isNew) {
      deleteSession(selectedSession.id);
      setSelectedSessionId(sessions[0].id);
      setIsWarningModalOpen(false);
      showSuccessToast("Session deleted successfully");
      return;
    }

    handleDeleteSession(selectedSession.id, {
      onSuccess: () => {
        // Remove from Zustand store
        deleteSession(selectedSession.id);
        setSelectedSessionId(sessions[1].id);
        setIsWarningModalOpen(false);
        showSuccessToast("Session deleted successfully");
      },
      onError: (error) => {
        console.error("Failed to delete session:", error);
        showErrorToast("Failed to delete session");
      },
    });
  };

  return (
    <div className="sm:sticky top-0 z-20 flex items-end justify-between gap-4 bg-background border-b py-4 max-[1140px]:flex-col">
      <div className="max-xl:flex-1 xl:max-w-[636px] w-full flex flex-wrap items-center gap-4">
        {/* Date Field */}

        <div className="w-full sm:w-[22%]">
          <label className="inline-block text-sm text-black mb-1">
            Date <span className="text-red-500">*</span>
          </label>
          <PrimaryInput
            type="date"
            value={
              selectedSession.date ? selectedSession.date.split("T")[0] : ""
            }
            onChange={(e) => handleChange("date", e.target.value)}
          />
        </div>

        {/* Reference Number Field */}
        <div className="w-full sm:w-[30%]">
          <label className="inline-block text-sm text-black mb-1">
            Reference number <span className="text-red-500">*</span>
          </label>
          <PrimaryInput
            type="text"
            value={selectedSession.referenceNumber}
            onChange={(e) => handleChange("referenceNumber", e.target.value)}
            placeholder="e.g, REF-2025-001"
          />
        </div>

        {/* Description Field */}
        <div className="w-full flex-1">
          <label className="inline-block text-sm text-black mb-1">
            Description
          </label>
          <PrimaryInput
            type="text"
            value={selectedSession.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="e.g, Transaction details for January"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 max-sm:w-full">
        {user && (
          <SecondaryBtn
            onClick={onSave}
            text="Save changes"
            disabled={disableSave}
            className="!px-3 border-primary text-primary mr-2 disabled:cursor-not-allowed disabled:opacity-75"
          />
        )}
        <PrimaryBtn
          onClick={addTAccount}
          text="T Account"
          icon={<FiPlus className="w-5 h-5 -mr-1" />}
          className="!px-3 bg-secondary"
        />
        <SessionActions
          isLoading={isDeleting}
          deleteTAccount={onDeleteSession}
          isWarningModalOpen={isWarningModalOpen}
          setIsWarningModalOpen={setIsWarningModalOpen}
        />
      </div>
    </div>
  );
};
