import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthWrapper } from "@/components";
import QueryProvider from "@/providers/QueryProvider";
import { AuthProvider } from "@/providers/SessionProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "T-Account",
  description: "Organize and track your financial records",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <AuthProvider>
          <QueryProvider>
            <AuthWrapper>{children}</AuthWrapper>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
