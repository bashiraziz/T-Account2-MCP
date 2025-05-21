"use client";
import { FC, useState } from "react";

interface VerificationCodeInputProps {
  onComplete: (code: string) => void;
  loading: boolean;
}

export const VerificationCodeInput: FC<VerificationCodeInputProps> = ({
  onComplete,
  loading,
}) => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`)?.focus();
    }

    const fullCode = newCode.join("");
    if (fullCode.length === 6) {
      onComplete(fullCode);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      document.getElementById(`code-${index - 1}`)?.focus();
    }
  };

  return (
    <div className={`flex justify-center gap-2 max-[360px]:gap-1 ${loading ? "opacity-55" : ""}`}>
      {code.map((digit, index) => (
        <input
          key={index}
          id={`code-${index}`}
          type="text"
          value={digit}
          maxLength={1}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="w-10 sm:w-12 h-10 sm:h-12 text-center text-lg bg-[#f3f2f7] rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
          placeholder="0"
          disabled={loading}
        />
      ))}
    </div>
  );
};
