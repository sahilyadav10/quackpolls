import { ReactNode } from "react";

type PillProps = {
  children: ReactNode;
  variant?: "default" | "primary" | "secondary" | "active" | "inactive";
  className?: string;
};

const baseStyles = "rounded-full px-3 py-1 w-fit";

const typeStyles = {
  default: "text-neutral-900 dark:text-neutral-50 border border-primary/30",
  primary: "bg-primary/20 text-primary",
  secondary: "bg-neutral-100 text-neutral-800",
  active: "bg-green-100 text-green-600",
  inactive: "bg-neutral-100 text-neutral-400",
};

export default function Pill({
  children,
  variant = "default",
  className = "",
}: PillProps) {
  return (
    <div className={`${baseStyles} ${typeStyles[variant]} ${className}`}>
      {children}
    </div>
  );
}
