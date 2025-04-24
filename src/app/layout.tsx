import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";

import "./globals.css";
import { websiteMetadata } from "@/utils/metadata";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const metadata: Metadata = websiteMetadata;

const openSans = Open_Sans({
  weight: ["400", "700", "500", "600"],
  subsets: ["latin"],
  variable: "--font-openSans",
});

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${openSans.variable}`}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </html>
  );
}
