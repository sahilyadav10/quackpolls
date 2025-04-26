export default function LoadingSpinner({
  colour = "white",
  className = "",
}: {
  colour?: string;
  className?: string;
}) {
  return (
    <div
      className={`h-6 w-6 border-2  border-t-transparent rounded-full animate-spin border-${colour} ${className}`}
    ></div>
  );
}
