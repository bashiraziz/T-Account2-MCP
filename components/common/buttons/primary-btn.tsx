import React, { JSX } from "react";

interface PrimaryBtnProps {
  text: string;
  className?: string;
  onClick?: () => void;
  isLoading?: boolean;
  icon?: JSX.Element;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
}

export const PrimaryBtn: React.FC<PrimaryBtnProps> = ({
  text,
  className = "",
  onClick,
  isLoading = false,
  icon,
  type,
  disabled = false,
}) => {
  return (
    <button
      className={`text-white text-sm sm:text-base font-medium rounded px-4 py-2 ${className}`}
      onClick={onClick}
      disabled={isLoading ? isLoading : disabled}
      type={type}
    >
      {isLoading ? (
        "Loading..."
      ) : (
        <span
          className={`flex items-center gap-2 ${!icon ? "justify-center" : ""}`}
        >
          {icon} {text}
        </span>
      )}
    </button>
  );
};
