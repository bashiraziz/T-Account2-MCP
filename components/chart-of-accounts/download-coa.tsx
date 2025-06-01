"use client";
import { useState } from "react";
import { LoadingSpinner, PrimaryBtn, showSuccessToast } from "../common";
import { FiDownload } from "react-icons/fi";

export const DownloadCoa = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    const link = document.createElement("a");
    link.href = "/standard-chat-of-accounts.csv";
    link.download = "standard-chat-of-accounts.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsDownloading(false);
    showSuccessToast("Downloaded successfully!");
  };

  return (
    <div className="flex flex-col justify-center gap-5">
      <h4 className="text-primary text-lg font-medium">
        Download Standard Chart of Accounts
      </h4>
      <PrimaryBtn
        text="Download"
        icon={
          isDownloading ? (
            <LoadingSpinner borderColor="border-white" className="mx-auto" />
          ) : (
            <FiDownload className="size-5 text-white" />
          )
        }
        className="w-fit bg-primary mt-2"
        onClick={handleDownload}
        disabled={isDownloading}
      />
    </div>
  );
};
