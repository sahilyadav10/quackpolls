"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Logo from "@/components/icons/Logo";
import Button from "@/components/generic/Button";
import HamburgerIcon from "@/components/icons/HamburgerIcon";
import Banner from "../app/Banner";
import useNavigation from "@/hooks/useNavigation";
import { routes } from "@/lib/routes";

const navItems = [
  { label: "Home", href: "/#home" },
  { label: "Features", href: "/#features" },
  { label: "How It Works", href: "/#howitworks", isNewPage: false },
];

export default function Navbar() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { handleNavClick } = useNavigation(navItems);

  return (
    <div className="fixed top-0 left-0 right-0 bg-neutral-50 z-50 w-full">
      <Banner />
      <div className="flex items-center justify-between py-3 px-4 border-b border-neutral-400 max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-4 md:gap-20 w-full">
          <div>
            <Link href="/" className="flex items-center flex-row gap-2">
              <Logo height={20} width={20} />
              <h1 className="text-lg font-bold">QuackPolls</h1>
            </Link>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  if (item.isNewPage) {
                    router.push(item.href);
                  } else {
                    handleNavClick(e, item.href);
                  }
                }}
                className="font-medium text-neutral-900 hover:text-neutral-700"
                role="button"
                tabIndex={0}
              >
                {item.label}
              </a>
            ))}
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  router.push(routes.signUp.pathname);
                }}
              >
                Waddle In
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  router.push(routes.signIn.pathname);
                }}
              >
                Start a Poll
              </Button>
            </div>
          </div>
        </div>
        <div className="md:hidden">
          <HamburgerIcon
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-neutral-900 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden z-40`}
      >
        <div className="p-4 pt-16">
          <div className="flex flex-col gap-4 items-start">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  if (item.isNewPage) {
                    router.push(item.href);
                  } else {
                    handleNavClick(e, item.href);
                  }
                  setIsMobileMenuOpen(false);
                }}
                role="button"
                tabIndex={0}
              >
                {item.label}{" "}
              </a>
            ))}
            <Button
              onClick={() => {
                router.push(routes.signUp.pathname);
              }}
            >
              Waddle In
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                router.push(routes.signIn.pathname);
              }}
            >
              Start a Poll
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-theme-dark/5 md:hidden z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
