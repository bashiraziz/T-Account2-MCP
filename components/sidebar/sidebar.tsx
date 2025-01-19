"use client";
import { FC, JSX, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaBook,
  FaBalanceScale,
  FaCommentDots,
  FaChevronRight,
  FaChevronLeft,
  FaSignOutAlt,
} from "react-icons/fa";
import { PrimaryBtn, SecondaryBtn } from "../common";

interface LinkItem {
  href: string;
  icon: JSX.Element;
  label: string;
}

const links: LinkItem[] = [
  {
    href: "/",
    icon: <FaBook className="w-5 h-5" />,
    label: "T-Accounts",
  },
  {
    href: "/trial-balance",
    icon: <FaBalanceScale className="w-5 h-5" />,
    label: "Trial Balance",
  },
  {
    href: "/feedback",
    icon: <FaCommentDots className="w-5 h-5" />,
    label: "Feedback",
  },
];

export const Sidebar: FC = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const handleSidebarCollapse = (): void => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="relative">
      <div
        className={`h-screen flex flex-col bg-[#f6f6fb] py-6 transition-all duration-500 ease-in-out overflow-hidden ${
          isCollapsed ? "w-[74px] px-4" : "w-[260px] px-6"
        }`}
      >
        <div className="flex items-center">
          <Image
            src="/images/t-account-logo.png"
            width={40}
            height={40}
            alt="logo"
          />
          <h1
            className={`ml-3 text-2xl transition-opacity ease-in-out ${
              isCollapsed
                ? "hidden opacity-0"
                : "block opacity-100 !duration-700"
            }`}
          >
            Account
          </h1>
        </div>
        <div className="flex-1 flex flex-col justify-between pt-12">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`h-10 text-base flex flex-nowrap whitespace-nowrap items-center gap-3 py-2 rounded ${
                  pathname === link.href
                    ? "bg-primary text-white px-2.5"
                    : "px-3 hover:bg-[#00ac4738]"
                }`}
              >
                <span className="w-5 h-5">{link.icon}</span>

                <span
                  className={`flex flex-1 transition-opacity ease-in-out ${
                    isCollapsed ? "opacity-0" : "opacity-100 !duration-700"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
          <div className="border-t pt-4">
            <SecondaryBtn
              className="w-fit h-10 !px-3 !border-0"
              icon={<FaSignOutAlt className="w-5 h-5" />}
              text={isCollapsed ? "" : "Logout"}
            />
          </div>
        </div>
        <button
          onClick={handleSidebarCollapse}
          className="flex items-center justify-center rounded-full w-6 h-6 bg-white absolute bottom-8 -right-3 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
        >
          {isCollapsed ? (
            <FaChevronRight className="w-3 h-3" />
          ) : (
            <FaChevronLeft className="w-3 h-3" />
          )}
        </button>
      </div>
    </div>
  );
};
