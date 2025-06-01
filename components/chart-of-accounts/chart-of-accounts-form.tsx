"use client";

import { AddCoa } from "./add-coa";
import { EditCoa } from "./edit-coa";
import { DeleteCoa } from "./delete-coa";
import { UpdateCoa } from "./update-coa";
import { DeleteAll } from "./delete-all";
import { ToastNotification } from "../common";
import { DownloadCoa } from "./download-coa";

export const ChartOfAccountsForm = () => {
  return (
    <div className="pt-6 pb-12">
      <h2 className="text-[24px] mb-6">Manage your Chart of Accounts</h2>
      <ToastNotification />
      <div className="flex flex-col gap-6">
        <DownloadCoa />
        <hr className="border-gray-300" />
        <AddCoa />
        <hr className="border-gray-300" />
        <EditCoa />
        <hr className="border-gray-300" />
        <DeleteCoa />
        <hr className="border-gray-300" />
        <UpdateCoa />
        <hr className="border-gray-300" />
        <DeleteAll />
      </div>
    </div>
  );
};
