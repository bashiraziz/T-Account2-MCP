"use client";
import { FC, ReactNode, useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";

interface OutlinedInputProps {
  type?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  value?: string | number;
  containerClassName?: string;
  className?: string;
  prefixIcon?: ReactNode;
  inputClassName?: string;
  label?: string;
  error?: string;
}

export const OutlinedInput: FC<OutlinedInputProps> = ({
  type = "text",
  placeholder,
  onChange,
  name,
  value,
  containerClassName,
  className,
  prefixIcon,
  inputClassName,
  label,
  error,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={containerClassName}>
      {label && <label className="block text-base mb-1">{label}</label>}
      <div
        className={`w-full flex items-center bg-white rounded-lg px-4 py-2.5 ${className} ${
          isFocused
            ? "outline outline-1 outline-secondary"
            : "outline outline-1 outline-gray-300"
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
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
