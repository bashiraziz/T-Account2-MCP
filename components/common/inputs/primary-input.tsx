"use client";
import { FC, ReactNode, useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";

interface PrimaryInputProps {
  type?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  value?: string | number;
  className?: string;
  prefixIcon?: ReactNode;
  inputClassName?: string;
}

export const PrimaryInput: FC<PrimaryInputProps> = ({
  type = "text",
  placeholder,
  onChange,
  name,
  value,
  className,
  prefixIcon,
  inputClassName,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className={`flex items-center bg-[#f3f2f7] rounded-lg px-4 py-2.5 ${className} ${
        isFocused ? "outline outline-1 outline-secondary" : ""
      }`}
    >
      {prefixIcon && <span className="mr-3">{prefixIcon}</span>}
      <input
        type={type === "password" && showPassword ? "text" : type}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        value={value}
        className={`w-full outline-none bg-transparent text-sm placeholder:text-sm ${inputClassName}`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="text-lg text-gray-900 cursor-pointer"
        >
          {showPassword ? <LuEye /> : <LuEyeOff />}
        </button>
      )}
    </div>
  );
};
