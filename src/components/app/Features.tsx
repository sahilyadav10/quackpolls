import { HiLightningBolt } from "react-icons/hi";
import { HiShare } from "react-icons/hi";
import { HiChartPie } from "react-icons/hi";

import Section from "@/components/generic/layout/Section";
import Card from "../generic/cards/Card";

export default function Features() {
  return (
    <Section
      id="features"
      className="flex gap-2 flex-wrap lg:flex-nowrap"
      withSpacing
      title="Quacktastic Features"
    >
      <div className="flex gap-4">
        <Card
          type="feature"
          icon={<HiLightningBolt color="#2563EB" size={30} />}
          heading="Lightning Fast Setup"
          description="Create and share polls in seconds. No more waddling around!"
          className="flex-1/3"
        />
        <Card
          type="feature"
          icon={<HiChartPie color="#10B981" size={30} />}
          heading="Real-time Results"
          description="Watch the responses roll in like ducks to water!"
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
