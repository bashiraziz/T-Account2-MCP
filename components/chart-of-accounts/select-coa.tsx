import { FC, useState, useRef, useEffect } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  ComboboxButton,
} from "@headlessui/react";
import { FiChevronDown, FiX, FiCheck } from "react-icons/fi";
import { useGetChartOfAccounts } from "@/hooks";
import { useDebounce } from "use-debounce";
import { LoadingSpinner } from "@/components";
import { ChartOfAccountsType } from "@/types";
import { defaultCOA } from "@/lib";
import { useSession } from "next-auth/react";
import { useCOAStore } from "@/store";

interface SelectAccountProps {
  label?: string;
  selectedAccount: ChartOfAccountsType | null;
  setSelectedAccount: (account: ChartOfAccountsType | null) => void;
  className?: string;
}

export const SelectAccount: FC<SelectAccountProps> = ({
  label,
  selectedAccount,
  setSelectedAccount,
  className,
}) => {
  const { data: session } = useSession();
  const userId = session?.user?.id || null;

  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 500); // Debounced search input
  const listRef = useRef<HTMLDivElement>(null);
  const prevScrollTop = useRef(0);
  const fetchMoreTimeout = useRef<NodeJS.Timeout | null>(null);

  // Zustand store for COA
  const { accounts, setAccounts } = useCOAStore();

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetChartOfAccounts(userId || "", debouncedQuery);

  // Set Zustand store based on user session
  useEffect(() => {
    if (userId && data) {
      setAccounts(data.pages.flat());
    } else if (!userId) {
      setAccounts(defaultCOA);
    }
  }, [data, userId, setAccounts]);

  const filteredAccounts = accounts.filter((account) =>
    account.accountName.toLowerCase().includes(query.toLowerCase())
  );
  // Debounce fetchNextPage to prevent rapid API calls on fast scrolling
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    prevScrollTop.current = scrollTop;

    if (scrollTop + clientHeight >= scrollHeight - 10 && hasNextPage) {
      if (fetchNextPage && !fetchMoreTimeout.current) {
        fetchMoreTimeout.current = setTimeout(() => {
          fetchNextPage().then(() => {
            if (listRef.current) {
              listRef.current.scrollTop = prevScrollTop.current;
            }
          });
          fetchMoreTimeout.current = null;
        }, 500);
      }
    }
  };

  return (
    <div className={className}>
      <Combobox
        value={selectedAccount}
        onChange={setSelectedAccount}
        onClose={() => setQuery("")}
      >
        {label && <label className="block text-base mb-1">{label}</label>}
        <div className="relative w-full">
          <ComboboxButton className="relative w-full text-start bg-transparent rounded-lg">
            <ComboboxInput
              className="w-full h-fit bg-transparent text-sm placeholder:text-sm px-4 py-2.5 rounded-lg outline-1 outline-gray-300 focus:outline-secondary outline-none outline-offset-0"
              placeholder="Select account"
              onChange={(event) => setQuery(event.target.value)}
              displayValue={(account: ChartOfAccountsType | null) =>
                account ? `${account.accountCode} ${account.accountName}` : ""
              }
              onKeyDown={(event) => {
                if (event.key === " ") {
                  event.stopPropagation();
                }
              }}
            />
            {selectedAccount ? (
              <FiX
                className="flex w-8 h-8 absolute inset-y-0 right-0 z-10 px-2 text-gray-600 my-auto cursor-pointer"
                onClick={() => setSelectedAccount(null)}
              />
            ) : (
              <FiChevronDown className="flex w-8 h-8 absolute inset-y-0 right-0 z-10 px-2 text-gray-600 my-auto" />
            )}
          </ComboboxButton>

          <ComboboxOptions
            ref={listRef}
            onScroll={handleScroll}
            className="thin-scrollbar absolute z-20 mt-1 max-h-60 w-full overflow-auto bg-white border rounded shadow-lg py-2"
          >
            {isLoading ? (
              <div className="flex justify-cente r py-2 px-4 cursor-default select-none">
                <LoadingSpinner />
              </div>
            ) : error ? (
              <p className="py-2 px-4 text-red-500 cursor-default select-none">
                Failed to load accounts
              </p>
            ) : filteredAccounts.length === 0 ? (
              query && (
                <div className="flex justify-between items-center cursor-default select-none py-2 px-4 text-textDark">
                  <p>
                    "<span className="text-secondary">{query}</span>" was not
                    found
                  </p>
                  {/* <span className="text-sm text-secondary cursor-pointer underline">
                    Add COA
                  </span> */}
                </div>
              )
            ) : (
              <>
                {filteredAccounts.map((account: ChartOfAccountsType, index) => (
                  <ComboboxOption
                    key={account.id ? account.id : index}
                    value={account}
                    className={`group flex justify-between items-center gap-2 py-2 px-4 cursor-pointer select-none data-[selected]:text-secondary hover:text-secondary`}
                  >
                    {`${account.accountCode} ${account.accountName}`}
                    <span className="invisible text-lg text-secondary group-data-[selected]:visible">
                      <FiCheck />
                    </span>
                  </ComboboxOption>
                ))}
                {userId && (
                  <div className="cursor-default select-none">
                    {isFetchingNextPage ? (
                      <span className="flex justify-center items-center gap-2 text-base text-secondary px-4 py-3">
                        <LoadingSpinner />
                      </span>
                    ) : hasNextPage ? (
                      <span className="flex justify-center items-center gap-2 text-base text-secondary px-4 py-3">
                        <LoadingSpinner />
                      </span>
                    ) : (
                      <div className="flex items-center justify-between text-textDark px-4 py-2 bg-gray-200">
                        <span>No more results</span>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
            {!isLoading && accounts.length === 0 && (
              <div className="py-3 px-4">No accounts found!</div>
            )}
          </ComboboxOptions>
        </div>
      </Combobox>
    </div>
  );
};
