export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const handleOnChange =
  (setFormData: any, setErrors: any) =>
  (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
    setErrors((prevErrors: any) => ({
      ...prevErrors,
      [e.target.name]: "",
    }));
  };

export const validateSignupForm = (formData: any) => {
  let errors: any = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  if (!formData.firstName.trim()) errors.firstName = "First name is required.";
  if (!formData.lastName.trim()) errors.lastName = "Last name is required.";
  if (!formData.username.trim()) errors.username = "Username is required.";
  if (!formData.email.trim()) errors.email = "Email is required.";
  else if (!validateEmail(formData.email))
    errors.email = "Invalid email format.";
  if (!formData.password.trim()) errors.password = "Password is required.";
  if (!formData.confirmPassword.trim())
    errors.confirmPassword = "Confirm password is required.";
  else if (formData.confirmPassword !== formData.password)
    errors.confirmPassword = "Password does not match";

  return errors;
};
