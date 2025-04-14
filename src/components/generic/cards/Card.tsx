type CardType = "stat";

type CardWrapper = {
  type: CardType;
  createdOn?: string;
};

export default function Card({ type }: CardWrapper) {
  switch (type) {
    case "stat":
      return <></>;
  }
}
