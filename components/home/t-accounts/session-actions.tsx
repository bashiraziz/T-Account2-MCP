import { WarningPopup } from "@/components";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useState } from "react";
import { LuEllipsisVertical, LuTrash2 } from "react-icons/lu";

interface SessionActionsProps {
  deleteTAccount: () => void;
  isLoading: boolean;
  isWarningModalOpen: boolean;
  setIsWarningModalOpen: (value: boolean) => void;
}
export const SessionActions = ({
  isLoading,
  deleteTAccount,
  isWarningModalOpen,
  setIsWarningModalOpen,
}: SessionActionsProps) => {
  const handleShowWarning = () => {
    setIsWarningModalOpen(true);
  };

  const handleDeleteTAccount = () => {
    deleteTAccount();
  };

  return (
    <div className="flex items-center max-sm:ml-auto">
      <Menu>
        <MenuButton className="text-gray-600 hover:text-secondary">
          <LuEllipsisVertical className="size-6" />
        </MenuButton>
        <MenuItems
          anchor="bottom end"
          className="w-[120px] z-50 bg-white px-3 py-4 rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
        >
          <MenuItem>
            <button
              onClick={handleShowWarning}
              className="w-full flex items-center gap-1 data-[focus]:text-secondary"
            >
              <LuTrash2 />
              <span className="text-base leading-tight">Delete</span>
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
      <WarningPopup
        isOpen={isWarningModalOpen}
        onClose={() => setIsWarningModalOpen(false)}
        handleConfirm={handleDeleteTAccount}
        isLoading={isLoading}
        heading="Delete Session"
        description="This will permanently delete the Session and it's entries and is irreversible."
        warningAlert="Unexpected bad things will happen."
      />
    </div>
  );
};
