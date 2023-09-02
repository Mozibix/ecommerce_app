import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ecommerce App",
  description: "Ecommerce app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
