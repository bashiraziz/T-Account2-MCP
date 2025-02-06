"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PrimaryBtn, PrimaryInput, VerificationCodeInput } from "@/components";
import { FiArrowLeft } from "react-icons/fi";
import {
  LuCircleCheckBig,
  LuLoaderCircle,
  LuLock,
  LuMailOpen,
  LuRectangleEllipsis,
} from "react-icons/lu";

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
  const [verificationLoader, setVerificationLoader] = useState(false);
  const router = useRouter();

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
    let newErrors = {
      email: "",
      verificationCode: "",
      newPassword: "",
      confirmPassword: "",
    };

    if (!formData.email.trim())
      newErrors.email = "Your email is required to verify it's you.";
    else if (!validateEmail(formData.email))
      newErrors.email = "Invalid email format.";

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) return;

    setVerificationStep(2);
  };

  const handleVerifyCode = (code: string) => {
    // let newErrors = {
    //   email: "",
    //   verificationCode: "",
    //   newPassword: "",
    //   confirmPassword: "",
    // };

    // if (!formData.verificationCode.trim())
    //   newErrors.verificationCode = "Verification code is required.";

    // setErrors(newErrors);

    // if (Object.values(newErrors).some((error) => error !== "")) return;
    setVerificationLoader(true);
    console.log(code);
    // setTimeout is temporary (will remove it later)
    setTimeout(() => {
      setVerificationStep(3);
    }, 1000);
  };

  const handleChangePassword = () => {
    let newErrors = {
      email: "",
      verificationCode: "",
      newPassword: "",
      confirmPassword: "",
    };

    if (!formData.newPassword.trim())
      newErrors.newPassword = "Password is required";
    if (!formData.confirmPassword.trim())
      newErrors.confirmPassword = "Confirm password is required.";
    else if (formData.confirmPassword !== formData.newPassword)
      newErrors.confirmPassword = "Password does not match";

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) return;

    setVerificationStep(4);
  };

  return (
    <div className="w-[460px] py-10 px-8 bg-white rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <div
        className={`flex flex-col gap-2 text-3xl font-medium text-center ${
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
              text="Send verification code"
              type="button"
              className="bg-secondary py-3 mt-2"
            />
          </>
        )}
        {verificationStep === 2 && (
          <>
            <div className="relative">
              {verificationLoader && (
                <LuLoaderCircle className="absolute -bottom-1.5 left-0 right-0 z-10 mx-auto w-16 h-16 text-gray-500 animate-spin" />
              )}
              <label className="flex justify-center text-base text-black mb-2">
                Enter your verification code
              </label>
              <VerificationCodeInput
                loading={verificationLoader}
                onComplete={handleVerifyCode}
              />
              {/* <PrimaryInput
                name="verificationCode"
                value={formData.verificationCode}
                onChange={handleOnChange}
                placeholder="Enter verification code"
                className={`!py-3 ${
                  errors.verificationCode
                    ? "outline outline-1 outline-red-500"
                    : ""
                }`}
              /> */}
              {errors.verificationCode && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.verificationCode}
                </p>
              )}
            </div>

            {/* <PrimaryBtn
              onClick={handleVerifyCode}
              text="Submit"
              type="button"
              className="bg-secondary py-3 mt-2"
            /> */}
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
              text="Submit"
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
