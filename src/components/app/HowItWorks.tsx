import { HiChartBar } from "react-icons/hi";
import { FaPaperPlane } from "react-icons/fa";

import Section from "../generic/layout/Section";
import { FaPencil } from "react-icons/fa6";

const steps = [
  {
    icon: <FaPencil color="#2563EB" size={30} />,
    title: "Create Your Poll",
    description: "Choose from multiple question types and design options",
  },
  {
    icon: <FaPaperPlane color="#F5B226" size={30} />,
    title: "Share with Your Audience",
    description:
      "Distribute your poll via email, social media, or embed it on your website.",
  },
  {
    icon: <HiChartBar color="#10B981" size={30} />,
    title: "Analyze the Results",
    description:
      "Use our real-time analytics to understand responses and make informed decisions.",
  },
];

const HowItWorks = () => {
  return (
    <Section
      id="howitworks"
      className="flex gap-2 relative"
      withSpacing
      title="How It Works"
    >
      <div className="flex gap-6 flex-col justify-center">
        <hr className="absolute -left-12 top-38 text-neutral-400 w-[160px] rotate-90" />
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="z-10 py-1 bg-neutral-50">{step.icon}</div>
            <div>
              <h3 className="font-medium">{step.title}</h3>
              <p className="text-sm text-neutral-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default HowItWorks;
