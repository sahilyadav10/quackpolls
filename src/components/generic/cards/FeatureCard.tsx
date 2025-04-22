import { FeatureCardProps } from "./Card";

export default function FeatureCard({
  icon,
  heading,
  description,
  className = "",
}: FeatureCardProps) {
  return (
    <div
      className={`flex flex-col gap-2.5 border border-neutral-400 rounded-2xl p-4 ${className}`}
    >
      {icon}
      <div className="flex flex-col gap-2">
        <h3 className="font-medium">{heading}</h3>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
}
