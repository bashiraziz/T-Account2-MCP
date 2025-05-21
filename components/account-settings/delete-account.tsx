import { useState } from "react";
import {
  DeleteAccountPopup,
  PrimaryBtn,
  showErrorToast,
  showSuccessToast,
} from "../common";
import { useDeleteAccount, useLogout } from "@/hooks";
import { useRouter } from "next/navigation";

export const DeleteAccount = () => {
  const router = useRouter();
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const { mutate: deleteAccount, isPending } = useDeleteAccount();
  const logout = useLogout();

  const handleShowWarning = () => {
    setIsWarningModalOpen(true);
  };

  const handleDeleteAccount = () => {
    if (!password) {
      setValidationError("Password is required");
      return;
    }
    setValidationError("");

    deleteAccount(
      { password },
      {
        onSuccess: () => {
          showSuccessToast("Account deleted successfully.");
          logout();
          setIsWarningModalOpen(false);
          router.push("/login");
        },
        onError: (error: any) => {
          const message =
            error?.response?.data?.error || "Something went wrong";
          showErrorToast(message);
        },
      }
    );
  };

  return (
    <div>
      <div className="max-w-[680px] w-full flex items-center flex-wrap gap-3">
        <h4 className="text-primary text-lg font-medium">Delete Account</h4>
        <PrimaryBtn
          onClick={handleShowWarning}
          text="Delete"
          className="bg-red-500 ml-auto"
        />
      </div>

      <DeleteAccountPopup
        isOpen={isWarningModalOpen}
        onClose={() => setIsWarningModalOpen(false)}
        handleConfirm={handleDeleteAccount}
        isLoading={isPending}
        password={password}
        setPassword={setPassword}
        validationError={validationError}
        setValidationError={setValidationError}
      />
    </div>
  );
};
