"use client";
import { FC, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PrimaryBtn, PrimaryInput, SecondaryBtn } from "../common";
import { Profile } from "./profile";
import { FiSearch } from "react-icons/fi";

export const Navbar: FC = () => {
  // temporary state for user
  const [user, setUser] = useState(false);

  const router = useRouter();

  return (
    <div className="px-6 py-5 flex items-center justify-between border-b bg-background">
      <div className="flex flex-col">
        {user ? (
          <>
            <h1 className="text-2xl text-primary font-medium leading-tight mb-0.5">
              Hi, Maira!
            </h1>
            <p className="text-sm font-normal leading-tight">
              Manage your T-Accounts with ease.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl text-primary font-medium leading-tight mb-0.5">
              Welcome!
            </h1>
            <p className="text-sm font-normal leading-tight">
              <Link href="/login" className="text-primary underline">
                Login
              </Link>{" "}
              to organize and track your financial records.
            </p>
          </>
        )}
      </div>
      <div className="flex-1 flex items-center justify-end gap-5">
        {/* user profile dropdown and login button */}
        {user ? (
          <>
            <PrimaryInput
              type="text"
              placeholder="Search session"
              className="max-w-[300px] w-full"
              prefixIcon={<FiSearch />}
            />
            <PrimaryBtn text="New Session" className="bg-primary" />
            <Profile />
          </>
        ) : (
          <>
            <SecondaryBtn
              onClick={() => router.push("/login")}
              text="Login"
              className="border-primary text-primary"
            />
            <PrimaryBtn
              onClick={() => router.push("/sign-up")}
              text="Sign up"
              className="bg-secondary"
            />
          </>
        )}
      </div>
    </div>
  );
};
