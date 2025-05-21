import { useState } from "react";
import {
  LoadingSpinner,
  OutlinedInput,
  PrimaryBtn,
  showSuccessToast,
  showErrorToast,
} from "../common";
import { useChangePassword } from "@/hooks";

export const ChangePassword = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { mutate: changePassword, isPending } = useChangePassword();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!passwordData.currentPassword)
      newErrors.currentPassword = "Current password is required";
    if (!passwordData.newPassword)
      newErrors.newPassword = "New password is required";
    if (!passwordData.confirmPassword)
      newErrors.confirmPassword = "Confirm password is required";
    else if (passwordData.confirmPassword !== passwordData.newPassword)
      newErrors.confirmPassword = "Password does not match";

    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" }));
  };

  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = {
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
    };

    changePassword(data, {
      onSuccess: () => {
        showSuccessToast("Password updated successfully");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      },
      onError: (error: any) => {
        const message =
          error?.response?.data?.error || "Failed to update password";
        showErrorToast(message);
      },
    });
  };

  return (
    <div>
      <h4 className="text-primary text-lg font-medium mb-4">Change password</h4>
      <div className="max-[480px]:max-w-full max-w-[380px] w-full flex flex-wrap gap-3">
        <OutlinedInput
          containerClassName="w-full"
          className={`!py-3 ${
            errors.currentPassword ? "outline outline-1 outline-red-500" : ""
          }`}
          type="password"
          label="Current password*"
          placeholder="Enter your current password"
          error={errors.currentPassword}
          name="currentPassword"
          value={passwordData.currentPassword}
          onChange={handleChange}
        />
        <OutlinedInput
          containerClassName="w-full"
          className={`!py-3 ${
            errors.newPassword ? "outline outline-1 outline-red-500" : ""
          }`}
          type="password"
          label="New password*"
          placeholder="Enter your new password"
          error={errors.newPassword}
          name="newPassword"
          value={passwordData.newPassword}
          onChange={handleChange}
        />
        <OutlinedInput
          containerClassName="w-full"
          className={`!py-3 ${
            errors.confirmPassword ? "outline outline-1 outline-red-500" : ""
          }`}
          type="password"
          label="Confirm Password*"
          placeholder="Confirm your new password"
          error={errors.confirmPassword}
          name="confirmPassword"
          value={passwordData.confirmPassword}
          onChange={handleChange}
        />

        <PrimaryBtn
          text={!isPending ? "Save" : ""}
          icon={
            isPending ? (
              <LoadingSpinner borderColor="border-white" className="mx-auto" />
            ) : undefined
          }
          className="w-[74px] bg-primary ml-auto mt-2"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};
