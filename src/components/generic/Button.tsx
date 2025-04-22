import { ButtonHTMLAttributes, MouseEvent } from "react";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "sm" | "md";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  href?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-neutral-800 hover:brightness-95 hover:shadow-md font-semibold",
  secondary:
    "bg-secondary border border-neutral-200 text-neutral-800 hover:shadow-md hover:brightness-95 font-semibold",
};

const sizeStyles: Record<ButtonSize, string> = {
  md: "px-4 py-2",
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
      className={`rounded-4xl flex gap-2 items-center transition-all hover:cursor-pointer
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
