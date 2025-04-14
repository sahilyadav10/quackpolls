import { ButtonHTMLAttributes, MouseEvent } from "react";

type ButtonVariant = "primary" | "outline";
type ButtonSize = "sm" | "md";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  href?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary text-neutral-50 hover:brightness-95 hover:shadow-md",
  outline:
    "shadow-lg  border border-neutral-200 text-neutral-900 dark:text-neutral-50 hover:border-primary hover:shadow-md",
};

const sizeStyles: Record<ButtonSize, string> = {
  md: "px-4 py-3",
  sm: "px-4 py-2",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  href,
  className = "",
  ...props
}: ButtonProps) {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (href) {
      window.open(href, "_blank", "noopener,noreferrer");
    }
    props.onClick?.(e);
  };

  return (
    <button
      className={`rounded-lg flex gap-2 items-center font-medium transition-all hover:cursor-pointer
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      onClick={handleClick}
      disabled={props.disabled}
      {...props}
    >
      {children}
    </button>
  );
}
