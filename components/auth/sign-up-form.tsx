"use client";
import { useState } from "react";
import Link from "next/link";
import { PrimaryBtn, PrimaryInput, VerificationCodeInput } from "../common";
import { useRouter } from "next/navigation";
import { LuLoaderCircle, LuMailOpen } from "react-icons/lu";

export const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showVerifyEmail, setShowVerifyEmail] = useState(false);
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let newErrors = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim())
      newErrors.lastName = "Last name is required.";
    if (!formData.username.trim()) newErrors.username = "Username is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!validateEmail(formData.email))
      newErrors.email = "Invalid email format.";
    if (!formData.password.trim()) newErrors.password = "Password is required.";
    if (!formData.confirmPassword.trim())
      newErrors.confirmPassword = "Confirm password is required.";
    else if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Password does not match";

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) return;

    setShowVerifyEmail(true);
  };

  const handleVerifyEmail = (code: string) => {
    setVerificationLoader(true);
    console.log(code);
    // setTimeout is temporary (will remove it later)
    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

  return (
    <div className="w-[460px] py-10 px-8 bg-white rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <div className="flex flex-col gap-2 text-3xl font-medium text-center mb-4">
        {showVerifyEmail ? (
          <>
            <LuMailOpen className="w-12 h-12 mx-auto mb-2" />
            <h2>Verify your account</h2>
            <p className="text-sm text-normal">
              We sent a code to{" "}
              <span className="text-secondary">{formData.email}</span>.
            </p>
          </>
        ) : (
          <h2>Create your account.</h2>
        )}
      </div>
      {showVerifyEmail ? (
        <div className="flex flex-col gap-4 py-4 relative">
          {verificationLoader && (
            <LuLoaderCircle className="absolute bottom-2 left-0 right-0 z-10 mx-auto w-16 h-16 text-gray-500 animate-spin" />
          )}
          <label className="flex justify-center text-base text-black mb-2">
            Enter your verification code
          </label>
          <VerificationCodeInput
            loading={verificationLoader}
            onComplete={handleVerifyEmail}
          />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-6">
          <div className="flex items-start gap-4">
            <div>
              <label className="inline-block text-base text-black mb-1">
                First name <span className="text-red-500">*</span>
              </label>
              <PrimaryInput
                name="firstName"
                value={formData.firstName}
                onChange={handleOnChange}
                placeholder="Enter your first name"
                className={`!py-3 ${
                  errors.firstName ? "outline outline-1 outline-red-500" : ""
                }`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label className="inline-block text-base text-black mb-1">
                Last name <span className="text-red-500">*</span>
              </label>
              <PrimaryInput
                name="lastName"
                value={formData.lastName}
                onChange={handleOnChange}
                placeholder="Enter your last name"
                className={`!py-3 ${
                  errors.lastName ? "outline outline-1 outline-red-500" : ""
                }`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>
          <div>
            <label className="inline-block text-base text-black mb-1">
              Username <span className="text-red-500">*</span>
            </label>
            <PrimaryInput
              name="username"
              value={formData.username}
              onChange={handleOnChange}
              placeholder="Enter a username"
              className={`!py-3 ${
                errors.username ? "outline outline-1 outline-red-500" : ""
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>
          <div>
            <label className="inline-block text-base text-black mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <PrimaryInput
              name="email"
              value={formData.email}
              onChange={handleOnChange}
              placeholder="Enter your email"
              className={`!py-3 ${
                errors.email ? "outline outline-1 outline-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="inline-block text-base text-black mb-1">
              Phone number
            </label>
            <PrimaryInput
              name="phone"
              value={formData.phone}
              onChange={handleOnChange}
              placeholder="Enter your phone number"
              className={`!py-3`}
            />
          </div>
          <div>
            <label className="inline-block text-base text-black mb-1">
              New password <span className="text-red-500">*</span>
            </label>
            <PrimaryInput
              name="password"
              value={formData.password}
              onChange={handleOnChange}
              placeholder="Enter your new password"
              className={`!py-3 ${
                errors.password ? "outline outline-1 outline-red-500" : ""
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
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
            text="Sign up"
            type="submit"
            className="bg-secondary py-3 mt-2"
          />
        </form>
      )}
      <div className="pt-5">
        <p
          className={`text-gray-400 text-xs font-normal mb-5 ${
            showVerifyEmail ? "text-center" : ""
          }`}
        >
          By signing up, you agree to the{" "}
          <Link href="/" className="text-secondary underline">
            Terms
          </Link>{" "}
          and acknowledge our{" "}
          <Link href="/" className="text-secondary underline">
            Privacy Statement
          </Link>
          .
        </p>
        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-secondary underline">
            Sign in
          </Link>{" "}
          now
        </p>
      </div>
    </div>
  );
};
