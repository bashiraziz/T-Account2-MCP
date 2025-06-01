"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ErrorAlert,
  LoadingSpinner,
  PrimaryBtn,
  PrimaryInput,
  VerificationCodeInput,
} from "../common";
import { useRouter } from "next/navigation";
import { LuLoaderCircle, LuMailOpen } from "react-icons/lu";
import { handleOnChange, validateSignupForm } from "@/utils";
import {
  useSendVerificationCode,
  useSignup,
  useVerifyCode,
  useCheckUsername,
} from "@/hooks";
import { signIn } from "next-auth/react";

export const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phoneNumber: "",
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

  const [usernameAvailable, setUsernameAvailable] = useState("");

  const [showVerifyEmail, setShowVerifyEmail] = useState(false);

  const [isApiError, setIsApiError] = useState("");
  const router = useRouter();

  const { mutate: checkUsername, isPending: isCheckingUsername } =
    useCheckUsername();

  // Debounce username check
  useEffect(() => {
    if (!formData.username.trim()) {
      setUsernameAvailable("");
      setErrors((prev) => ({ ...prev, username: "" }));
      return;
    }

    const delayDebounce = setTimeout(() => {
      checkUsername(formData.username, {
        onSuccess: (data) => {
          if (data.available) {
            setUsernameAvailable("Username is available");
            setErrors((prev) => ({ ...prev, username: "" }));
          } else {
            setUsernameAvailable("");
            setErrors((prev) => ({
              ...prev,
              username: "Username is already taken",
            }));
          }
        },
      });
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [formData.username, checkUsername]);

  const { mutate: sendVerificationCode, isPending: isSendingCode } =
    useSendVerificationCode();
  const { mutate: verifyCode, isPending: isVerifyingCode } = useVerifyCode();
  const { mutate: signup, isPending: isSigningUp } = useSignup();

  const onChange = handleOnChange(setFormData, setErrors);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validateSignupForm(formData);
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) return;
    if (!usernameAvailable) {
      setErrors((prev) => ({
        ...prev,
        username: "Username is already taken",
      }));
      return;
    }

    sendVerificationCode(formData.email, {
      onSuccess: () => {
        setShowVerifyEmail(true);
      },
      onError: (error) => {
        console.error("Error sending verification code:", error);
      },
    });
  };

  const handleVerifyEmail = (code: string) => {
    verifyCode(
      { email: formData.email, code },
      {
        onSuccess: () => {
          // Step 3: Proceed with Signup
          const { confirmPassword, ...signupData } = formData;
          signup(signupData, {
            onSuccess: async () => {
              console.log("✅ Signup successful! Auto-logging in...");

              const result = await signIn("credentials", {
                redirect: false,
                identifier: formData.email,
                password: formData.password,
              });

              if (result?.error) {
                console.error("❌ Auto-login failed:", result.error);
              } else {
                console.log("🎉 Auto-login successful! Redirecting...");
                router.push("/");
              }
            },
            onError: (error) => {
              console.error("Signup Error:", error);
            },
          });
        },
        onError: (error: any) => {
          const message = error?.response?.data?.error || "Verification failed";
          setIsApiError(message);
        },
      }
    );
  };

  return (
    <div className="max-w-[460px] w-full py-7 md:py-10 px-5 md:px-8 bg-white rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <div className="flex flex-col gap-2 text-2xl md:text-3xl font-medium text-center mb-4">
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
          {(isVerifyingCode || isSigningUp) && (
            <LuLoaderCircle className="absolute bottom-2 left-0 right-0 z-10 mx-auto w-16 h-16 text-gray-500 animate-spin" />
          )}
          {isApiError && <ErrorAlert error={isApiError} className="mb-2 w-fit mx-auto" />}
          <label className="flex justify-center text-base text-black mb-2">
            Enter your verification code
          </label>
          <VerificationCodeInput
            loading={isVerifyingCode || isSigningUp}
            onComplete={handleVerifyEmail}
          />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-6">
          <div className="flex items-start gap-4 max-sm:flex-col">
            <div className="w-full">
              <label className="inline-block text-base text-black mb-1">
                First name <span className="text-red-500">*</span>
              </label>
              <PrimaryInput
                name="firstName"
                value={formData.firstName}
                onChange={onChange}
                placeholder="Enter your first name"
                className={`!py-3 ${
                  errors.firstName ? "outline outline-1 outline-red-500" : ""
                }`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>
            <div className="w-full">
              <label className="inline-block text-base text-black mb-1">
                Last name <span className="text-red-500">*</span>
              </label>
              <PrimaryInput
                name="lastName"
                value={formData.lastName}
                onChange={onChange}
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
            <div className="relative">
              <PrimaryInput
                name="username"
                value={formData.username}
                onChange={onChange}
                placeholder="Enter a username"
                className={`!py-3 ${
                  errors.username ? "outline outline-1 outline-red-500" : ""
                } ${
                  usernameAvailable ? "outline outline-1 outline-primary" : ""
                }`}
              />
              {isCheckingUsername && (
                <LoadingSpinner
                  borderColor="border-gray-600"
                  className="!w-5 !h-5 absolute right-4 top-0 bottom-0 my-auto"
                />
              )}
            </div>
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
            {usernameAvailable && (
              <p className="text-primary text-sm mt-1">{usernameAvailable}</p>
            )}
          </div>
          <div>
            <label className="inline-block text-base text-black mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <PrimaryInput
              name="email"
              value={formData.email}
              onChange={onChange}
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
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={onChange}
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
              type="password"
              value={formData.password}
              onChange={onChange}
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
              type="password"
              value={formData.confirmPassword}
              onChange={onChange}
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
            text={!isSendingCode ? "Sign up" : ""}
            icon={
              isSendingCode ? (
                <LoadingSpinner
                  borderColor="border-white"
                  className="mx-auto"
                />
              ) : undefined
            }
            type="submit"
            className="bg-secondary py-3 mt-2"
          />
        </form>
      )}
      <div className="pt-5">
        <p
          className={`text-gray-400 text-xs font-normal mb-5 max-sm:text-center ${
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
