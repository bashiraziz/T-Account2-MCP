"use client";

import { FC, useEffect, useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/react";
import { FiCheck, FiChevronDown, FiSearch } from "react-icons/fi";

interface Option {
  id: string | number;
  name: string;
}

interface AutoCompleteProps {
  options: Option[];
  selectedOption: string | null;
  onSelect: (value: Option) => void;
  placeholder?: string;
  className?: string;
}

export const AutoCompleteInput: FC<AutoCompleteProps> = ({
  options,
  selectedOption,
  onSelect,
  placeholder = "Select an option",
  className,
}) => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Option | null>(null);

  useEffect(() => {
    if (selectedOption) {
      const selected = options.find((option) => option.id === selectedOption);
      setSelected(selected || null);
    }
  }, [selectedOption, options]);

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) =>
          option.name.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <Combobox
      value={selected}
      onChange={(value) => {
        setSelected(value);
        if (value) {
          onSelect(value);
        }
      }}
      onClose={() => setQuery("")}
    >
      <div className={`w-full relative ${className}`}>
        <ComboboxButton className="relative w-full text-start bg-[#f3f2f7] rounded-lg">
          <span className="absolute inset-y-0 left-3 flex items-center">
            <FiSearch />
          </span>
          <ComboboxInput
            className="flex-1 w-full h-fit bg-transparent text-sm placeholder:text-sm pl-9 pr-4 py-2.5 rounded-lg focus:outline-1 focus:outline-secondary outline-none outline-offset-0"
            displayValue={(option: Option | null) => option?.name || ""}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
          />
          <FiChevronDown className="flex w-8 h-8 absolute inset-y-0 right-0 z-10 px-2 text-gray-600 my-auto" />
        </ComboboxButton>
        <ComboboxOptions className="thin-scrollbar absolute z-50 mt-1 max-h-60 w-full overflow-auto bg-white border rounded shadow-lg py-2">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <ComboboxOption
                key={option.id}
                value={option}
                className={`group flex justify-between items-center gap-2 py-2 px-4 text-sm cursor-pointer select-none data-[selected]:text-secondary hover:text-secondary`}
              >
                {option.name}
                <span className="invisible text-lg text-secondary group-data-[selected]:visible">
                  <FiCheck />
                </span>
              </ComboboxOption>
            ))
          ) : (
            <div className="px-4 py-2 text-sm text-gray-500">
              No results found
            </div>
          )}
        </ComboboxOptions>
      </div>
    </Combobox>
  );
};
