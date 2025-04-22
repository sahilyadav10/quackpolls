type SectionProps = {
  id: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  withSpacing?: boolean;
};

export default function Section({
  id,
  title,
  subtitle,
  children,
  className = "",
  titleClassName = "",
  withSpacing = false,
}: SectionProps) {
  return (
    <div
      className={`flex flex-col gap-2 ${
        withSpacing ? "p-4 mt-10 mb-20" : ""
      } ${className}`}
      id={id}
    >
      {" "}
      {title && (
        <div className={`${titleClassName}`}>
          <h2 className="text-neutral-900 dark:text-neutral-50 font-bold text-lg mb-2">
            {title}
          </h2>

          {subtitle && (
            <h3 className="text-neutral-900 dark:text-neutral-50 mb-2 text-sm">
              {subtitle}
            </h3>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
