import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  fullWidth?: boolean;
  error?: string;
  label?: string;
  helperText?: string;
};

export default function Input({
  error,
  label,
  helperText,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1 grow">
      {label && (
        <label className="text-sm font-medium text-neutral-700">{label}</label>
      )}
      <input
        className={`bg-white rounded-2xl transition-all outline-none px-4 py-2
           border border-neutral-200 focus:border-primary focus:ring-1 focus:ring-primary w-full
            ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : ""
            }
            ${className}
          `}
        {...props}
      />
      {(error || helperText) && (
        <p className={`text-sm ${error ? "text-red-500" : "text-neutral-500"}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
}
