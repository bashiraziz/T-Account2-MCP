import { FC } from "react";
import Image from "next/image";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  FaFileInvoiceDollar,
  FaPlus,
  FaQuestionCircle,
  FaSignOutAlt,
  FaUserAlt,
} from "react-icons/fa";
import { UserType } from "@/types";
import { useLogout, useSaveSession } from "@/hooks";
import { useRouter, usePathname } from "next/navigation";
import { useAccountingStore, useTourStore } from "@/store";
import { handleSaveSession } from "@/utils";
import { TextLoader } from "../common";

interface ProfileProps {
  user: UserType;
  addNewSession: () => void;
}
export const Profile: FC<ProfileProps> = ({ user, addNewSession }) => {
  const router = useRouter();
  const pathname = usePathname();
  const logout = useLogout();

  const { mutate: saveSession, isPending } = useSaveSession();
  const { selectedSessionId, sessions, updateSession } = useAccountingStore();
  const selectedSession = sessions.find((s) => s.id === selectedSessionId);

  const { startTour } = useTourStore();

  const handleLogout = () => {
    if (
      selectedSession &&
      (selectedSession?.tAccounts.length === undefined ||
        selectedSession?.tAccounts.length > 1)
    ) {
      handleSaveSession(selectedSession, saveSession, updateSession, {
        onSuccess: () => {
          logout();
        },
      });
    } else {
      logout();
    }
  };

  return (
    <>
      {isPending && <TextLoader text="Saving and logging out..." />}
      <Menu as="div" className="relative inline-block text-left" id="profile">
        <div>
          <MenuButton
            id="navigation-menu"
            className="rounded-full border-2 border-secondary cursor-pointer inline-flex w-12 h-12 justify-center bg-white"
          >
            <Image
              src={user?.profileImage ? user?.profileImage : "/images/user.png"}
              width={48}
              height={48}
              alt="user-avatar"
              className="rounded-full border-2 border-white object-cover object-top"
            />
          </MenuButton>
        </div>

        <MenuItems
          transition
          className="absolute right-0 z-50 mt-2 w-52 origin-top-right rounded-md bg-white shadow-lg divide-y divide-gray-100 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
        >
          <div className="px-4 py-4">
            <h5 className="text-lg font-medium">
              {user?.firstName} {user?.lastName}
            </h5>
            <p className="text-gray-400 text-sm truncate">{user?.email}</p>
          </div>
          <div className="py-1">
            {pathname === "/" && (
              <MenuItem>
                <button
                  onClick={addNewSession}
                  className="flex items-center gap-2 w-full px-4 py-3 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden hover:text-secondary lg:hidden"
                >
                  <FaPlus className="w-5 h-5" /> New Session
                </button>
              </MenuItem>
            )}
            <MenuItem>
              <button
                onClick={() => router.push("/account-settings")}
                className="flex items-center gap-2 w-full px-4 py-3 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden hover:text-secondary"
              >
                <FaUserAlt className="w-5 h-5" />
                Account settings
              </button>
            </MenuItem>
            <MenuItem>
              <button
                onClick={() => router.push("/chart-of-accounts")}
                className="flex items-center gap-2 w-full px-4 py-3 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden hover:text-secondary"
              >
                <FaFileInvoiceDollar className="w-5 h-5" />
                Chart of Accounts
              </button>
            </MenuItem>
          </div>
          <div className="py-1">
            <MenuItem>
              <button
                onClick={startTour}
                className="flex items-center gap-2 w-full px-4 py-3 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden hover:text-secondary"
              >
                <FaQuestionCircle className="w-5 h-5" />
                Guided Tour
              </button>
            </MenuItem>
            <MenuItem>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-3 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden hover:text-secondary"
              >
                <FaSignOutAlt className="w-5 h-5" />
                Logout
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
    </>
  );
};
