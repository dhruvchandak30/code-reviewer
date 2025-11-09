import { ReactNode } from "react";

export const metadata = {
  title: "Login | CodeReviewX",
  description: "Sign in to access your dashboard",
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
