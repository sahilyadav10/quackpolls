"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// import Logo from "@/components/icons/Logo";
// import HamburgerMenu from "@/components/generic/HamburgerMenu";

const navItems = [{ label: "Home", href: "/#home" }];

export default function Navbar() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 bg-neutral-50 dark:bg-theme-dark z-50 w-full pb-2">
      <div className="gradient-animation text-sm font-medium text-neutral-50 text-center py-1">
        🚨 Need a dev? I&apos;m like ChatGPT, but with better debugging skills.
        🚨
      </div>
      <div className="flex items-center justify-between py-3 px-4 border-b border-primary/30 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 md:gap-20">
          <div className="flex items-center">
            <Link href="/">{/* <Logo height={60} width={200} /> */}</Link>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => {
                  router.push(item.href);
                }}
                className={`font-medium transition-colors ${"text-neutral-900 dark:text-neutral-50 hover:text-neutral-700 dark:hover:text-neutral-300"}`}
                role="button"
                tabIndex={0}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* <DarkModeToggle />
          <HamburgerMenu
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          /> */}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-neutral-900 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden z-40`}
      >
        <div className="p-4 pt-16">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`font-medium transition-colors ${"text-neutral-900 dark:text-neutral-50 hover:text-neutral-700 dark:hover:text-neutral-300"}`}
                onClick={() => {
                  router.push(item.href);

                  setIsMobileMenuOpen(false);
                }}
                role="button"
                tabIndex={0}
              >
                {item.label}{" "}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-theme-dark/90 md:hidden z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
