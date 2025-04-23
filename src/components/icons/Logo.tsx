export default function Logo({
  height = 12,
  width = 12,
}: {
  height: number;
  width: number;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0H12L10 6L12 12H0L2 6L0 0V0Z"
        fill="#F5B226"
      />
    </svg>
  );
}
