import { FC } from "react";
import { PrimaryBtn, PrimaryInput } from "../common";
import { FiSearch } from "react-icons/fi";
import Image from "next/image";

export const Navbar: FC = () => {
  return (
    <div className="py-6 flex items-center justify-between border-b">
      <div className="flex flex-col">
        <h1 className="text-xl">Hi, Maira!</h1>
        <p className="text-xs">Manage your debits and credits efficiently.</p>
      </div>
      <div className="flex items-center justify-end gap-5">
        <PrimaryInput
          type="text"
          placeholder="Search"
          className="max-w-[260px] w-full"
          prefixIcon={<FiSearch />}
        />
        {/* <PrimaryBtn text="Login" /> */}
        <div className="rounded-full border-2 border-secondary cursor-pointer">
          <Image
            src="/images/avatar.png"
            width={48}
            height={48}
            alt="avatar"
            className="rounded-full border-2 border-white"
          />
        </div>
      </div>
    </div>
  );
};
