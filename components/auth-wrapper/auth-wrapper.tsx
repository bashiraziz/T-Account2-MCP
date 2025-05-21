"use client";

import { usePathname } from "next/navigation";
import { Navbar, Sidebar } from "@/components";

export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isAuthPage =
    pathname === "/login" ||
    pathname === "/sign-up" ||
    pathname === "/forgot-password";

  return isAuthPage ? (
    <div className="min-h-screen flex justify-center items-center px-5 py-10 bg-[url('/images/auth-bg.png')] bg-no-repeat bg-top bg-cover">
      {children}
    </div>
  ) : (
    <div className="sm:flex">
      <Sidebar />
      <div className="flex-1 bg-background">
        <Navbar />
        <div className="px-6">{children}</div>
      </div>
    </div>
  );
};
