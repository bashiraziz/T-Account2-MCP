"use client";

import { PrimaryBtn, PrimaryInput, SecondaryBtn } from "@/components";
import { FC, useState } from "react";
import { FiPlus } from "react-icons/fi";

type SessionHeaderProps = {
  onUpdate: (header: {
    date: string;
    referenceNumber: string;
    description?: string;
  }) => void;
  addTAccount: () => void;
};

export const SessionHeader: FC<SessionHeaderProps> = ({
  onUpdate,
  addTAccount,
}) => {
  const [date, setDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const [referenceNumber, setReferenceNumber] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleUpdate = () => {
    onUpdate({ date, referenceNumber, description });
  };

  return (
    <div className="sticky top-0 z-20 flex items-end justify-between gap-4 bg-background border-b py-4">
      <div className="max-xl:flex-1 xl:max-w-[660px] w-full flex items-center gap-4">
        {/* Date Field */}

        <div className="w-[22%]">
          <label className="inline-block text-sm text-black mb-1">
            Date <span className="text-red-500">*</span>
          </label>
          <PrimaryInput
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Reference Number Field */}
        <div className="w-[30%]">
          <label className="inline-block text-sm text-black mb-1">
            Reference number <span className="text-red-500">*</span>
          </label>
          <PrimaryInput
            type="text"
            value={referenceNumber}
            onChange={(e) => setReferenceNumber(e.target.value)}
            placeholder="e.g, REF-2025-001"
          />
        </div>

        {/* Description Field */}
        <div className="flex-1">
          <label className="inline-block text-sm text-black mb-1">
            Description
          </label>
          <PrimaryInput
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g, Transaction details for January"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <SecondaryBtn
          onClick={handleUpdate}
          text="Save changes"
          className="!px-3 border-primary text-primary"
        />
        <PrimaryBtn
          onClick={addTAccount}
          text="T Account"
          icon={<FiPlus className="w-5 h-5 -mr-1" />}
          className="!px-3 bg-secondary"
        />
      </div>
    </div>
  );
};
