export default function LoadingSpinner({
  colour = "white",
}: {
  colour?: string;
}) {
  return (
    <div
      className={`h-6 w-6 border-2  border-t-transparent rounded-full animate-spin border-${colour}`}
    ></div>
  );
}
