import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";

import { websiteMetadata } from "@/utils/metadata";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import { ReactQueryProvider } from "@/components/providers/ReactQueryProvider";

export const metadata: Metadata = websiteMetadata;

const openSans = Open_Sans({
  weight: ["400", "700", "500", "600"],
  subsets: ["latin"],
  variable: "--font-openSans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${openSans.variable}`}>
      <ReduxProvider>
        <ReactQueryProvider>
          <body>
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              pauseOnHover
            />{" "}
            {children}
          </body>
        </ReactQueryProvider>
      </ReduxProvider>
    </html>
  );
}
