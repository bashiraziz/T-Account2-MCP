import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

const loginUser = async (identifier: string, password: string) => {
  const result = await signIn("credentials", {
    redirect: false,
    identifier,
    password,
  });

  if (result?.error) {
    throw new Error(result.error);
  }

  return result;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: ({
      identifier,
      password,
    }: {
      identifier: string;
      password: string;
    }) => loginUser(identifier, password),
  });
};
