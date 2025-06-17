import { HiLightningBolt } from "react-icons/hi";
import { HiShare } from "react-icons/hi";
import { HiChartPie } from "react-icons/hi";

import Section from "@/components/generic/layout/Section";
import Card from "../generic/cards/Card";

export default function Features() {
  return (
    <Section
      id="features"
      className="flex gap-2"
      withSpacing
      title="Quacktastic Features"
    >
      <div className="flex gap-4 flex-wrap md:flex-nowrap">
        <Card
          type="feature"
          icon={<HiLightningBolt color="#2563EB" size={30} />}
          heading="Lightning Fast Setup"
          description="Get your polls out quack-ly! Stop the waddling and start the paddling."
          className="flex-1/3"
        />
        <Card
          type="feature"
          icon={<HiChartPie color="#10B981" size={30} />}
          heading="Real-time Results"
          description="Watch those responses come splashing in"
          className="flex-1/3"
        />
        <Card
          type="feature"
          icon={<HiShare color="#F5B226" size={30} />}
          heading="Easy Sharing"
          description="Spread your polls across the pond with one click!"
          className="flex-1/3"
        />
      </div>
    </Section>
  );
}
