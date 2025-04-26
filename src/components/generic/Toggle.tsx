import Button from "./Button";

type ToggleProps<T extends string> = {
  label: string;
  options: T[];
  value: T;
  onChange: (val: T) => void;
  error?: string;
};

export function Toggle<T extends string>({
  label,
  options,
  value,
  onChange,
  error,
}: ToggleProps<T>) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold">{label}</label>
      <div className="flex gap-2">
        {options.map((option) => (
          <Button
            variant="plain"
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`text-sm
              ${
                value === option
                  ? "bg-white border-primary ring-1 ring-primary border text-neutral-800"
                  : "bg-white border-neutral-200 border"
              }`}
          >
            {option}
          </Button>
        ))}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
