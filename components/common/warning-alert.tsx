import { LuInfo } from "react-icons/lu";

interface WarningAlertProps {
  text: string;
  className?: string;
}
export const WarningAlert = ({ text, className }: WarningAlertProps) => {
  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg border border-[#f4e49f] bg-[#fff8c5] ${className}`}
    >
      <LuInfo className="size-5" />
      <p className="flex-1 text-xs font-normal">{text}</p>
    </div>
  );
};
