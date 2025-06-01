"use client";
import { FC } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AutoCompleteInput, PrimaryBtn, SecondaryBtn } from "../common";
import { Profile } from "./profile";
import { useAccountingStore, useSidebarStore, useUserStore } from "@/store";
import { createNewSession } from "@/utils";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

export const Navbar: FC = () => {
  const { user } = useUserStore();
  const router = useRouter();
  const pathname = usePathname();

  const {
    sessions,
    selectedSessionId,
    setSelectedSessionId,
    addSession,
    setLoadingSession,
  } = useAccountingStore();

  // handle sidebar collapse
  const { toggleCollapsed } = useSidebarStore();

  // map sessions to options
  const options = sessions.map((session) => ({
    id: session.id,
    name: `${session.referenceNumber} (${new Date(
      session.date
    ).toLocaleDateString()})`,
  }));

  // Create and add a new session
  const handleNewSession = () => {
    if (!user) return; // Ensure the user is logged in
    setLoadingSession(true);

    const newSession = createNewSession(user.id);
    addSession(newSession); // Add session to Zustand store
    setSelectedSessionId(newSession.id); // Select new session

    setTimeout(() => {
      setLoadingSession(false);
    }, 500);
  };

  return (
    <div className="px-6 py-5 border-b bg-background">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 md:gap-4">
          <span
            id="sidebar"
            onClick={toggleCollapsed}
            className="hidden max-lg:flex"
          >
            <HiOutlineMenuAlt2 className="size-6 md:size-8" />
          </span>
          <div className="flex flex-col">
            {user ? (
              <>
                <h1 className="text-2xl text-primary font-medium leading-tight mb-0.5">
                  Hi, {user.firstName} {user.lastName.charAt(0)}.
                </h1>
                <p className="max-md:hidden text-sm font-normal leading-tight">
                  Manage your T-Accounts with ease.
                </p>
              </>
            ) : (
              <>
                <h1 className="text-lg sm:text-2xl text-primary font-medium leading-tight mb-0.5">
                  Welcome!
                </h1>
                <p className="max-sm:hidden text-sm font-normal leading-tight">
                  <Link href="/login" className="text-primary underline">
                    Login
                  </Link>{" "}
                  to organize and track your financial records.
                </p>
              </>
            )}
          </div>
        </div>
        <div className="flex-1 flex items-center justify-end gap-3 xl:gap-5">
          {/* user profile dropdown, session searchbar, and login/signup buttons */}
          {user ? (
            <>
              {(pathname === "/" || pathname === "/trial-balance") && (
                <div
                  id="switch-session"
                  className="max-sm:hidden max-w-[244px] xl:max-w-[300px] w-full"
                >
                  <AutoCompleteInput
                    options={options}
                    selectedOption={selectedSessionId}
                    onSelect={(value) =>
                      setSelectedSessionId(value.id.toString())
                    }
                    placeholder="Search session"
                    className="w-full"
                  />
                </div>
              )}

              {pathname === "/" && (
                <div id="new-session">
                  <PrimaryBtn
                    onClick={handleNewSession}
                    text="New Session"
                    className="bg-primary max-lg:hidden"
                  />
                </div>
              )}
              <Profile user={user} addNewSession={handleNewSession} />
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
      {user && (pathname === "/" || pathname === "/trial-balance") && (
        <div id="switch-session2" className="sm:hidden mt-5 flex justify-end">
          <AutoCompleteInput
            options={options}
            selectedOption={selectedSessionId}
            onSelect={(value) => setSelectedSessionId(value.id.toString())}
            placeholder="Search session"
            className="max-w-full sm:max-w-[244px] xl:max-w-[300px] w-full"
          />
        </div>
      )}
    </div>
  );
};
