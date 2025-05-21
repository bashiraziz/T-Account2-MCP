import { FC } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { LuX } from "react-icons/lu";

export type PopupModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
};

export const PopupModal: FC<PopupModalProps> = ({
  isOpen,
  onClose,
  children,
  className = "",
}) => {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50 focus:outline-none"
      onClose={onClose}
    >
      <div className="fixed inset-0 z-50 w-screen overflow-y-auto bg-[#10172559]">
        <div className="flex min-h-full items-center justify-center p-5">
          <DialogPanel
            className={`relative w-full bg-white p-5 shadow-lg rounded-xl ${className}`}
          >
            <span
              onClick={onClose}
              className="absolute top-5 right-5 cursor-pointer"
            >
              <LuX />
            </span>
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
