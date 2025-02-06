"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PrimaryBtn, PrimaryInput } from "../common";

export const LoginForm = () => {
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    emailOrUsername: "",
    password: "",
  });
  const router = useRouter();

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let newErrors = { emailOrUsername: "", password: "" };

    if (!formData.emailOrUsername.trim())
      newErrors.emailOrUsername = "Email or username is required.";
    if (!formData.password.trim()) newErrors.password = "Password is required.";

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) return;

    router.push("/");
  };

  return (
    <div className="w-[460px] py-10 px-8 bg-white rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <div className="">
        <h2 className="text-3xl font-medium text-center mb-4">
          Login to your account.
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-6">
        <div>
          <label className="inline-block text-base text-black mb-1">
            Email or username <span className="text-red-500">*</span>
          </label>
          <PrimaryInput
            name="emailOrUsername"
            value={formData.emailOrUsername}
            onChange={handleOnChange}
            placeholder="Enter your Email or username"
            className={`!py-3 ${
              errors.emailOrUsername ? "outline outline-1 outline-red-500" : ""
            }`}
          />
          {errors.emailOrUsername && (
            <p className="text-red-500 text-sm mt-1">
              {errors.emailOrUsername}
            </p>
          )}
        </div>
        <div>
          <label className="inline-block text-base text-black mb-1">
            Password <span className="text-red-500">*</span>
          </label>
          <PrimaryInput
            name="password"
            value={formData.password}
            onChange={handleOnChange}
            placeholder="Enter your password"
            className={`!py-3 ${
              errors.password ? "outline outline-1 outline-red-500" : ""
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
          <Link
            href="/forgot-password"
            className="w-fit text-sm text-secondary underline flex ml-auto mt-2"
          >
            Forgot password?
          </Link>
        </div>
        <PrimaryBtn
          text="Login"
          type="submit"
          className="bg-secondary py-3 mt-2"
        />
      </form>
      <div className="pt-5">
        <p className="text-gray-400 text-xs font-normal mb-5">
          By logging in, you agree to the{" "}
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
          Don't have an account?{" "}
          <Link href="/sign-up" className="text-secondary underline">
            Sign up
          </Link>{" "}
          now
        </p>
      </div>
    </div>
  );
};
