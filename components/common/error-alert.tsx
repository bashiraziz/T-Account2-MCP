import { FaInfoCircle } from "react-icons/fa";

interface ErrorAlertProps {
  error: string;
  className?: string;
}
export const ErrorAlert = ({ error, className }: ErrorAlertProps) => {
  return (
    <p
      className={`flex items-center gap-3 bg-red-500 text-white px-4 py-2 rounded ${className}`}
    >
      <FaInfoCircle />
      {error}
    </p>
  );
};
