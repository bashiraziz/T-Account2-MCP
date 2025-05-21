"use client";
import { ToastNotification } from "../common";
import { ChangePassword } from "./change-password";
import { DeleteAccount } from "./delete-account";
import { UserDetails } from "./user-details";

export const AccountSettingsComponent = () => {
  return (
    <div className="pt-6 pb-12">
      <ToastNotification />
      <h2 className="text-[24px] mb-6">Account Settings</h2>
      <div className="flex flex-col gap-6">
        <UserDetails />
        <hr className="border-gray-300" />
        <ChangePassword />
        <hr className="border-gray-300" />
        <DeleteAccount />
      </div>
    </div>
  );
};
