import { FC, useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  ComboboxButton,
} from "@headlessui/react";
import { FiChevronDown, FiX } from "react-icons/fi";

export type Account = {
  id: number;
  number: string;
  name: string;
};

interface AutoCompleteDropdownProps {
  accounts: Account[];
  selectedAccount: Account | null;
  setSelectedAccount: (account: Account | null) => void;
}

export const AutoCompleteDropdown: FC<AutoCompleteDropdownProps> = ({
  accounts,
  selectedAccount,
  setSelectedAccount,
}) => {
  const [query, setQuery] = useState("");

  const filteredAccounts =
    query === ""
      ? accounts
      : accounts.filter((account) =>
          `${account.number} ${account.name}`
            .toLowerCase()
            .includes(query.toLowerCase())
        );

  return (
    <Combobox
      value={selectedAccount}
      onChange={setSelectedAccount}
      onClose={() => setQuery("")}
    >
      <ComboboxButton className="relative w-full text-start bg-[#f3f2f7] rounded-lg">
        <ComboboxInput
          className="w-full h-fit bg-transparent text-sm placeholder:text-sm px-4 py-2.5 rounded-lg focus:outline-1 focus:outline-secondary outline-none outline-offset-0"
          placeholder="Select account"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(account: Account | null) =>
            account ? `${account.number} ${account.name}` : ""
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

        <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white border rounded shadow-lg">
          {filteredAccounts.length === 0 ? (
            <div className="cursor-default select-none p-2 text-gray-900">
              <h4 className="mb-2">"{query}" was not found</h4>
              {/* <button className="border border-secondary rounded p-1 text-sm text-secondary mr-2">
                Add
              </button>
              <span className="bg-slate-200 p-1">{query}</span> */}
            </div>
          ) : (
            filteredAccounts.map((account) => (
              <ComboboxOption
                key={account.id}
                value={account}
                className={({ active }) =>
                  `cursor-pointer select-none p-2 ${
                    active ? "bg-blue-500 text-white" : "text-gray-900"
                  }`
                }
              >
                {`${account.number} ${account.name}`}
              </ComboboxOption>
            ))
          )}
        </ComboboxOptions>
      </ComboboxButton>
    </Combobox>
  );
};
