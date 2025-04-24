"use client";
import { useRouter } from "next/navigation";
import Button from "../generic/Button";
import Section from "../generic/layout/Section";
import { routes } from "@/lib/routes";

export default function ActionSection() {
  const router = useRouter();
  return (
    <Section
      id="home"
      className="items-center gap-6 py-20 bg-primary/5 text-center"
      withSpacing
    >
      <h2 className="text-4xl font-bold">Ready to Make Your Polls Quack?</h2>
      <Button
        onClick={() => {
          router.push(routes.signUp.pathname);
        }}
      >
        Hatch your polls for free
      </Button>
    </Section>
  );
}
