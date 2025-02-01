"use client";
import { FC, useState } from "react";

interface PrimaryTextareaProps {
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  name?: string;
  value?: string | number;
  className?: string;
  inputClassName?: string;
}

export const PrimaryTextarea: FC<PrimaryTextareaProps> = ({
  placeholder,
  onChange,
  name,
  value,
  className,
  inputClassName,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`flex items-center bg-[#f3f2f7] rounded-lg px-4 py-3 ${className} ${
        isFocused ? "outline outline-1 outline-secondary" : ""
      }`}
    >
      <textarea
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        value={value}
        className={`w-full h-[100px] outline-none bg-transparent text-sm resize-none placeholder:text-sm ${inputClassName}`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};
