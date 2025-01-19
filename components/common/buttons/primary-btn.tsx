import React from "react";

interface PrimaryBtnProps {
  text: string;
  className?: string;
  onClick?: () => void;
  isLoading?: boolean;
}

export const PrimaryBtn: React.FC<PrimaryBtnProps> = ({
  text,
  className = "",
  onClick,
  isLoading = false,
}) => {
  return (
    <button
      className={`bg-secondary text-white rounded px-4 py-1.5 ${className}`}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? "Loading..." : text}
    </button>
  );
};
