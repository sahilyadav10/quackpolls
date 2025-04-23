export default function Banner() {
  return (
    <div className="gradient-animation text-sm font-semibold text-neutral-800 text-center py-1 px-2 text-center">
      Work in progress. Bugs included.{" "}
      <span
        className="underline cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => window.open("https://sahilten.com", "_blank")}
      >
        sahilten.com
      </span>{" "}
      has fewer
    </div>
  );
}
