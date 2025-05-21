"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ErrorAlert,
  LoadingSpinner,
  PrimaryBtn,
  PrimaryInput,
  VerificationCodeInput,
} from "@/components";
import { FiArrowLeft } from "react-icons/fi";
import {
  LuCircleCheckBig,
  LuLoaderCircle,
  LuLock,
  LuMailOpen,
  LuRectangleEllipsis,
} from "react-icons/lu";
import {
  useResetPassword,
  useSendForgotPasswordCode,
  useVerifyForgotPasswordCode,
} from "@/hooks";

export const ForgotPasswordForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    verificationCode: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    verificationCode: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [verificationStep, setVerificationStep] = useState(1);
  const router = useRouter();

  const {
    mutate: sendCodeMutation,
    isPending: sendingCode,
    error: sendCodeError,
  } = useSendForgotPasswordCode();
  const {
    mutate: verifyCodeMutation,
    isPending: verifyingCode,
    error: verifyCodeError,
  } = useVerifyForgotPasswordCode();
  const {
    mutate: resetPasswordMutation,
    isPending: resettingPassword,
    error: resetPasswordError,
  } = useResetPassword();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSendVerificationCode = () => {
    let newErrors = { ...errors, email: "" };
    if (!formData.email.trim())
      newErrors.email = "Your email is required to verify it's you.";
    else if (!validateEmail(formData.email))
      newErrors.email = "Invalid email format.";

    setErrors(newErrors);
    if (Object.values(newErrors).some((error) => error !== "")) return;

    sendCodeMutation(formData.email, {
      onSuccess: () => setVerificationStep(2),
      onError: (error) => setErrors({ ...errors, email: error.message }),
    });
  };

  const handleVerifyCode = (code: string) => {
    setFormData({ ...formData, verificationCode: code });
    verifyCodeMutation(
      { email: formData.email, code },
      {
        onSuccess: () => setVerificationStep(3),
        onError: (error) =>
          setErrors({ ...errors, verificationCode: error.message }),
      }
    );
  };

  const handleChangePassword = () => {
    let newErrors = { ...errors, newPassword: "", confirmPassword: "" };
    if (!formData.newPassword.trim())
      newErrors.newPassword = "Password is required.";
    if (!formData.confirmPassword.trim())
      newErrors.confirmPassword = "Confirm password is required.";
    if (formData.newPassword !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    setErrors(newErrors);
    if (Object.values(newErrors).some((error) => error !== "")) return;

    resetPasswordMutation(
      {
        email: formData.email,
        code: formData.verificationCode,
        newPassword: formData.newPassword,
      },
      {
        onSuccess: () => setVerificationStep(4),
        onError: (error) =>
          setErrors({ ...errors, newPassword: error.message }),
      }
    );
  };

  const isError = sendCodeError || verifyCodeError || verifyCodeError;

  return (
    <div className="max-w-[460px] w-full py-7 md:py-10 px-5 md:px-8 bg-white rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <div
        className={`flex flex-col gap-2 text-2xl md:text-3xl font-medium text-center ${
          verificationStep === 4 ? "text-primary" : "mb-4"
        }`}
      >
        {verificationStep === 1 ? (
          <>
            <LuLock className="w-12 h-12 mx-auto mb-2" />
            <h2>Forgot password?</h2>
            <p className="text-sm text-normal">
              No worries, we'll recover your account.
            </p>
          </>
        ) : verificationStep === 2 ? (
          <>
            <LuMailOpen className="w-12 h-12 mx-auto mb-2" />
            <h2>Verify your account</h2>
            <p className="text-sm text-normal">
              We sent a code to{" "}
              <span className="text-secondary">{formData.email}</span>.
            </p>
          </>
        ) : verificationStep === 3 ? (
          <>
            <LuRectangleEllipsis className="w-12 h-12 mx-auto" />
            <h2>Set a new password</h2>
            <p className="text-sm text-gray-600 text-normal">
              Must be at least 8 characters
            </p>
          </>
        ) : verificationStep === 4 ? (
          <>
            <LuCircleCheckBig className="w-12 h-12 mx-auto" />
          </>
        ) : (
          ""
        )}
      </div>
      {isError && <ErrorAlert error={isError?.message} className="mt-6" />}
      <form className="flex flex-col gap-4 pt-6">
        {verificationStep === 1 && (
          <>
            <div>
              <label className="inline-block text-base text-black mb-1">
                Enter your email <span className="text-red-500">*</span>
              </label>
              <PrimaryInput
                name="email"
                value={formData.email}
                onChange={handleOnChange}
                placeholder="Enter your email to get verification code"
                className={`!py-3 ${
                  errors.email ? "outline outline-1 outline-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <PrimaryBtn
              onClick={handleSendVerificationCode}
              text={!sendingCode ? "Send verification code" : ""}
              icon={
                sendingCode ? (
                  <LoadingSpinner
                    borderColor="border-white"
                    className="mx-auto"
                  />
                ) : undefined
              }
              type="button"
              className="bg-secondary py-3 mt-2"
            />
          </>
        )}
        {verificationStep === 2 && (
          <>
            <div className="relative">
              {verifyingCode && (
                <LuLoaderCircle className="absolute -bottom-1.5 left-0 right-0 z-10 mx-auto w-16 h-16 text-gray-500 animate-spin" />
              )}
              <label className="flex justify-center text-base text-black mb-2">
                Enter your verification code
              </label>
              <VerificationCodeInput
                loading={verifyingCode}
                onComplete={handleVerifyCode}
              />
              {/* {errors.verificationCode && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.verificationCode}
                </p>
              )} */}
            </div>
          </>
        )}
        {verificationStep === 3 && (
          <>
            <div>
              <label className="inline-block text-base text-black mb-1">
                New password <span className="text-red-500">*</span>
              </label>
              <PrimaryInput
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={handleOnChange}
                placeholder="Enter your new password"
                className={`!py-3 ${
                  errors.newPassword ? "outline outline-1 outline-red-500" : ""
                }`}
              />
              {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.newPassword}
                </p>
              )}
            </div>
            <div>
              <label className="inline-block text-base text-black mb-1">
                Confirm password <span className="text-red-500">*</span>
              </label>
              <PrimaryInput
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm your new password"
                className={`!py-3 ${
                  errors.confirmPassword
                    ? "outline outline-1 outline-red-500"
                    : ""
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <PrimaryBtn
              onClick={handleChangePassword}
              text={!resettingPassword ? "Submit" : ""}
              icon={
                resettingPassword ? (
                  <LoadingSpinner
                    borderColor="border-white"
                    className="mx-auto"
                  />
                ) : undefined
              }
              type="button"
              className="bg-secondary py-3 mt-2"
            />
          </>
        )}
        {verificationStep === 4 && (
          <>
            <p className="text-xl text-center text-gray-600 mb-4">
              Your password has been updated, return to login
            </p>
          </>
        )}
      </form>
      <div className="pt-6">
        <Link
          href="/login"
          className="w-fit flex justify-center items-center mx-auto gap-1.5 text-base text-gray-600 hover:text-secondary transition-all duration-300 ease-in-out"
        >
          <FiArrowLeft className="text-lg" /> Back to Login
        </Link>
        {verificationStep === 1 && (
          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <Link href="/sign-up" className="text-secondary underline">
              Sign up
            </Link>{" "}
            now
          </p>
        )}
      </div>
    </div>
  );
};
