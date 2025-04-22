"use client";
import Button from "../generic/Button";
import Section from "../generic/layout/Section";

export default function ActionSection() {
  return (
    <Section
      id="home"
      className="items-center gap-6 py-20 bg-neutral-100 relative -left-[0%]"
    >
      <h2 className="text-4xl font-bold">Ready to Make Your Polls Quack?</h2>
      <Button>Hatch your polls for free</Button>
    </Section>
  );
}
