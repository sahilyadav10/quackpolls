import { ButtonHTMLAttributes, MouseEvent } from "react";
import LoadingSpinner from "./Loader";

type ButtonVariant = "primary" | "secondary" | "plain";
type ButtonSize = "sm" | "md";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  href?: string;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary text-neutral-800 hover:brightness-95 font-semibold",
  secondary:
    "bg-neutral-100 text-neutral-800 border border-neutral-200 hover:brightness-95 font-semibold",
  plain: "font-semibold",
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
  isLoading,
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
        ${
          props.disabled
            ? "opacity-50 hover:cursor-default! hover:shadow-none!"
            : ""
        }
      `}
      onClick={handleClick}
      disabled={props.disabled || isLoading}
      {...props}
    >
      {isLoading ? <LoadingSpinner /> : <>{children}</>}
    </button>
  );
}
