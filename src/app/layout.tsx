import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";

import "./globals.css";
import Navbar from "@/components/generic/Navbar";
import Footer from "@/components/app/Footer";

export const metadata: Metadata = {
  title: {
    absolute: `QuackPolls | Sahil`,
    default: `QuackPolls | Sahil`,
    template: `%s | QuackPolls `,
  },
};

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
      <body className="min-h-screen flex flex-col">
        <div className="flex-1 w-full md:mx-auto my-5 md:max-w-4xl xl:max-w-5xl pt-16">
          <Navbar />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
