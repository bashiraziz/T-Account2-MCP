import { WarningPopup } from "@/components";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useState } from "react";
import { LuEllipsisVertical, LuTrash2 } from "react-icons/lu";

interface TAccountActionsProps {
  deleteTAccount: () => void;
  isLoading: boolean;
}
export const TAccountActions = ({
  isLoading,
  deleteTAccount,
}: TAccountActionsProps) => {
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);

  const handleShowWarning = () => {
    setIsWarningModalOpen(true);
  };

  const handleDeleteTAccount = () => {
    deleteTAccount();
  };

  return (
    <div className="flex items-center">
      <Menu>
        <MenuButton className="text-gray-600 hover:text-secondary">
          <LuEllipsisVertical className="size-6" />
        </MenuButton>
        <MenuItems
          anchor="bottom end"
          className="w-[120px] bg-white px-3 py-4 rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
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
        heading="Delete TAccount"
        description="This will permanently delete the T-Account and it's entries and is irreversible."
        warningAlert="Unexpected bad things will happen."
      />
    </div>
  );
};
