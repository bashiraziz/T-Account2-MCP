"use client";
import { FC, ReactNode, useState } from "react";

interface PrimaryInputProps {
  type?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  value?: string | number;
  className?: string;
  prefixIcon?: ReactNode;
}

export const PrimaryInput: FC<PrimaryInputProps> = ({
  type = "text",
  placeholder,
  onChange,
  name,
  value,
  className,
  prefixIcon,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`flex items-center bg-[#f3f2f7] rounded-lg px-4 py-2.5 ${className} ${
        isFocused ? "outline outline-1 outline-secondary" : ""
      }`}
    >
      {prefixIcon && <span className="mr-3">{prefixIcon}</span>}
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        value={value}
        className="w-full outline-none bg-transparent text-sm placeholder:text-sm"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};
