import FeatureCard from "./FeatureCard";

type CardWrapper = FeatureCardWrapper;

type FeatureCardWrapper = {
  type: "feature";
  icon: React.ReactNode;
  heading: string;
  description: string;
  className?: string;
};

export type FeatureCardProps = Omit<FeatureCardWrapper, "type">;

export default function Card(props: CardWrapper) {
  switch (props.type) {
    case "feature":
      return (
        <FeatureCard
          icon={props.icon}
          heading={props.heading}
          description={props.description}
          className={props.className}
        />
      );
  }
}
