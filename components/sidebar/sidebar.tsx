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
import { SecondaryBtn } from "../common";

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
    <div
      className={`transition-all duration-500 ease-in-out ${
        isCollapsed ? "w-[74px] px-4" : "w-[260px] px-6"
      }`}
    >
      <div
        className={`fixed top-0 left-0 z-30 h-screen flex flex-col bg-[#f6f6fb] py-6 transition-all duration-500 ease-in-out ${
          isCollapsed ? "w-[74px] px-4" : "w-[260px] px-6"
        }`}
      >
        <div className="flex items-center overflow-hidden">
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
                className={`h-10 text-base flex flex-nowrap whitespace-nowrap items-center gap-3 py-2 rounded-md ${
                  pathname === link.href
                    ? "bg-primary text-white px-2.5"
                    : "px-3 hover:bg-primaryLight"
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
              className="w-fit h-10 !px-3 !border-0 text-secondary"
              icon={<FaSignOutAlt className="w-5 h-5 mr-1" />}
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
