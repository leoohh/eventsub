import "react-toastify/dist/ReactToastify.css";

import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";

import toastConfig from "@config/toast.config";

import { AuthProvider } from "@context/AuthContext";

import { getServerSession } from "@services/auth.service";

export const metadata: Metadata = {
  title: process.env.META_TITLE,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body>
        <AuthProvider initialSession={session}>
          <ToastContainer {...toastConfig} />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
