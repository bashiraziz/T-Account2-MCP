import { FC, JSX } from "react";

interface SecondaryBtnProps {
  text: string;
  className?: string;
  onClick?: () => void;
  isLoading?: boolean;
  icon?: JSX.Element;
  disabled?: boolean;
}

export const SecondaryBtn: FC<SecondaryBtnProps> = ({
  text,
  className = "",
  onClick,
  isLoading = false,
  icon,
  disabled = false,
}) => {
  return (
    <button
      className={`flex items-center border text-sm sm:text-base font-medium rounded px-4 py-2 transition-all duration-300 ease-in-out ${className}`}
      onClick={onClick}
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        "Loading..."
      ) : (
        <span className="flex items-center gap-2">
          {icon} {text}
        </span>
      )}
    </button>
  );
};
