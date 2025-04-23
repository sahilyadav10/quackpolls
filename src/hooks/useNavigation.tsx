"use client";
import { findMostVisibleSection, handleHashChange } from "@/utils/scroll";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { MouseEvent, useState, useEffect } from "react";

type Section = {
  label: string;
  href: string;
};

export default function useNavigation(navItems: Section[]) {
  const router = useRouter();
  const pathname = usePathname();

  const [activeSection, setActiveSection] = useState("/");
  const visibleSections = new Map<string, number>();
  const allSections = new Set(navItems.map((item) => item.href));

  // Handle scroll on refresh
  useEffect(() => {
    const _handleHashChange = () => {
      const timeoutId = setTimeout(() => {
        handleHashChange(window, undefined, -100);
      }, 100);
      return () => clearTimeout(timeoutId);
    };

    _handleHashChange();
    window.addEventListener("hashchange", _handleHashChange);

    return () => {
      window.removeEventListener("hashchange", _handleHashChange);
    };
  }, [pathname]);

  const updateAllSectionsVisibility = () => {
    allSections.forEach((href) => {
      const id = href.split("#")[1];
      const element = document.getElementById(id);
      if (element) {
        const rect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const visibleHeight =
          Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
        const ratio = Math.max(0, visibleHeight / rect.height);

        if (ratio > 0) {
          visibleSections.set(href, ratio);
        } else {
          visibleSections.delete(href);
        }
      }
    });
  };

  /**
   * Determine which section should be active based on visibility
   * Priority:
   * 1. Fully visible sections (>95% visible)
   * 2. Section with highest visibility (>20% visible)
   * 3. Home section as fallback
   */
  const updateActiveSection = () => {
    if (visibleSections.size === 0) {
      setActiveSection("/#home");
      return;
    }

    // Find sections that are almost fully visible (>95%)
    const fullyVisibleSections = Array.from(visibleSections.entries()).filter(
      ([, ratio]) => ratio > 0.95
    );

    if (fullyVisibleSections.length > 0) {
      // if one of the fully visible sections is socials, highlight it because projects and socials can be visible at the same time
      if (fullyVisibleSections.some((items) => items[0] === "/#socials")) {
        setActiveSection("/#socials");
        return;
      }
      setActiveSection(fullyVisibleSections[0][0]);
      return;
    }

    // If no fully visible sections, find the most visible one
    const visibleSectionsArray = Array.from(visibleSections.entries());
    const [mostVisibleSection, highestVisibilityRatio] =
      findMostVisibleSection(visibleSectionsArray);

    if (highestVisibilityRatio > 0.2) {
      setActiveSection(mostVisibleSection);
    }
  };

  const handleScroll = () => {
    updateAllSectionsVisibility();
    updateActiveSection();
  };

  useEffect(() => {
    // Setup throttled scroll handler to prevent performance issues
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
    const throttledHandleScroll = () => {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          handleScroll();
          scrollTimeout = null;
        }, 100);
      }
    };

    window.addEventListener("scroll", throttledHandleScroll);
    handleScroll(); // Initial visibility check

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.split("#")[1];
    const isHomeRoute = handleHashChange(window, id, -100);
    if (!isHomeRoute) {
      router.push(`/#${id}`);
    }
  };

  return { activeSection, handleNavClick };
}
