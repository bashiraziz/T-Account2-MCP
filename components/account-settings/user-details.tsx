import { useEffect, useState } from "react";
import {
  LoadingSpinner,
  OutlinedInput,
  PrimaryBtn,
  showSuccessToast,
  showErrorToast,
} from "../common";
import { useUserStore } from "@/store";
import { UploadImage } from "./upload-image";
import { useUpdateUser } from "@/hooks";

export const UserDetails = () => {
  const { user, setUser } = useUserStore();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    username: user?.username || "",
    phoneNumber: user?.phoneNumber || "",
    profileImage: user?.profileImage || "",
  });
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { mutate: updateUser, isPending: updatingUser } = useUpdateUser();

  // Update formData when user is available
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        username: user.username || "",
        phoneNumber: user.phoneNumber || "",
        profileImage: user?.profileImage || "",
      });
    }
  }, [user]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName?.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName?.trim())
      newErrors.lastName = "Last name is required";
    if (!formData.username?.trim()) newErrors.userName = "Username is required";
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" }));
  };

  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    updateUser(formData, {
      onSuccess: (updatedUser) => {
        setUser(updatedUser);
        showSuccessToast("Profile updated successfully");
      },
      onError: (error: any) => {
        showErrorToast(
          error.response?.data?.error || "Failed to update profile"
        );
      },
    });
  };

  return (
    <div className="max-w-[848px] w-full">
      <h4 className="text-primary text-lg font-medium mb-4">Account details</h4>
      <div className="flex items-start sm:items-center gap-10 max-sm:flex-col">
        <div className="flex flex-col items-start">
          <UploadImage
            imageUrl={formData?.profileImage}
            setImageUrl={(url) =>
              setFormData((prev) => ({ ...prev, profileImage: url }))
            }
            isLoading={setIsLoadingImage}
          />
        </div>
        <div className="w-full flex flex-wrap gap-3">
          <OutlinedInput
            containerClassName="max-[480px]:w-full w-[calc(50%-6px)]"
            className={`!py-3 ${
              errors.firstName ? "outline outline-1 outline-red-500" : ""
            }`}
            label="First Name*"
            placeholder="Enter your first name"
            error={errors.firstName}
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <OutlinedInput
            containerClassName="max-[480px]:w-full w-[calc(50%-6px)]"
            className={`!py-3 ${
              errors.lastName ? "outline outline-1 outline-red-500" : ""
            }`}
            label="Last Name*"
            placeholder="Enter your last name"
            error={errors.lastName}
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <OutlinedInput
            containerClassName="max-[480px]:w-full w-[calc(50%-6px)]"
            className={`!py-3 ${
              errors.userName ? "outline outline-1 outline-red-500" : ""
            }`}
            label="Username*"
            placeholder="Enter a username"
            error={errors.username}
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <OutlinedInput
            containerClassName="max-[480px]:w-full w-[calc(50%-6px)]"
            className={`!py-3 ${
              errors.phoneNumber ? "outline outline-1 outline-red-500" : ""
            }`}
            label="Phone number"
            placeholder="Enter your phone number"
            error={errors.phoneNumber}
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
      </div>
      <PrimaryBtn
        text={!updatingUser ? "Save" : ""}
        icon={
          updatingUser ? (
            <LoadingSpinner borderColor="border-white" className="mx-auto" />
          ) : undefined
        }
        disabled={updatingUser || isLoadingImage}
        className="w-[74px] flex justify-center bg-primary ml-auto mt-5 disabled:opacity-70 disabled:cursor-not-allowed"
        onClick={handleSubmit}
      />
    </div>
  );
};
