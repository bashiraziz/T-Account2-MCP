"use client";
import { FC, useState } from "react";
import { PrimaryBtn, PrimaryInput, PrimaryTextarea } from "../common";

export const FeedbackForm: FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let newErrors = { firstName: "", lastName: "", email: "", message: "" };

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim())
      newErrors.lastName = "Last name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!validateEmail(formData.email))
      newErrors.email = "Invalid email format.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) return;

    // We will use API later here
    console.log("Form submitted", formData);
  };

  return (
    <div className="py-10">
      <div className="max-w-[500px] mx-auto px-8 py-8 rounded-xl border">
        <div className="mb-8 border-b pb-6">
          <h1 className="text-4xl font-medium text-center mb-2">Feedback</h1>
          <p className="text-sm mt-1 font-normal text-center">
            Please use this form to submit any comments, recommendations, or
            feedback.
          </p>
        </div>
        <form onSubmit={handleOnSubmit} className="flex flex-wrap gap-4">
          <div className="w-[48%]">
            <label className="inline-block text-base text-black mb-1">
              First name <span className="text-red-500">*</span>
            </label>
            <PrimaryInput
              name="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleOnChange}
              className={
                errors.firstName ? "outline outline-1 outline-red-500" : ""
              }
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>
          <div className="w-[48%]">
            <label className="inline-block text-base text-black mb-1">
              Last name <span className="text-red-500">*</span>
            </label>
            <PrimaryInput
              name="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleOnChange}
              className={
                errors.lastName ? "outline outline-1 outline-red-500" : ""
              }
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
          <div className="w-full">
            <label className="inline-block text-base text-black mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <PrimaryInput
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleOnChange}
              className={
                errors.email ? "outline outline-1 outline-red-500" : ""
              }
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div className="w-full">
            <label className="inline-block text-base text-black mb-1">
              Subject
            </label>
            <PrimaryInput
              name="subject"
              placeholder="Enter Subject"
              value={formData.subject}
              onChange={handleOnChange}
            />
          </div>
          <div className="w-full">
            <label className="inline-block text-base text-black mb-1">
              Message <span className="text-red-500">*</span>
            </label>
            <PrimaryTextarea
              name="message"
              placeholder="Enter your message"
              value={formData.message}
              onChange={handleOnChange}
              className={
                errors.message ? "outline outline-1 outline-red-500" : ""
              }
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>
          <PrimaryBtn
            text="Send Message"
            type="submit"
            className="w-full bg-secondary font-normal mt-4 py-2.5"
          />
        </form>
      </div>
    </div>
  );
};
