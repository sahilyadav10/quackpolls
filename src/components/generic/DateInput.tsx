import DatePicker from "react-datepicker";

export function DateInput({
  label,
  value,
  onChange,
  error,
}: {
  label?: string;
  value: Date | null;
  onChange: (val: Date | null) => void;
  error?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold">{label}</label>

      <DatePicker
        selected={value ? new Date(value) : null}
        onChange={onChange}
        showTimeSelect
        dateFormat="Pp"
        minDate={new Date()}
        // placeholderText="Select date and time"
        popperPlacement="bottom-start"
        className="w-full rounded-2xl border border-neutral-200 outline-none bg-white px-4 py-2 text-sm focus:ring-2 focus:ring-primary transition"
      />

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
