import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      username: string;
      profileImage?: string;
      hasSeenTour: boolean;
    };
  }

  interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    profileImage?: string;
    hasSeenTour: boolean;
  }

  interface JWT {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    profileImage?: string;
    hasSeenTour: boolean;
  }
}
