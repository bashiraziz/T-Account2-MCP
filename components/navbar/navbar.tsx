"use client";
import { FC, useState } from "react";
import { PrimaryBtn, PrimaryInput } from "../common";
import { Profile } from "./profile";
import { FiSearch } from "react-icons/fi";

export const Navbar: FC = () => {
  // temporary state for user
  const [user, setUser] = useState(true);

  return (
    <div className="px-6 py-5 flex items-center justify-between border-b bg-background">
      <div className="flex flex-col">
        <h1 className="text-2xl text-primary font-medium leading-tight">
          Hi, Maira!
        </h1>
        <p className="text-xs font-normal leading-tight">
          Simplify Your Ledger Management.
        </p>
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
          <PrimaryBtn text="Login" className="bg-secondary" />
        )}
      </div>
    </div>
  );
};
