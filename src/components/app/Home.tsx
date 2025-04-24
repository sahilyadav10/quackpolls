"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Section from "@/components/generic/layout/Section";
import Button from "@/components/generic/Button";
import { routes } from "@/lib/routes";

export default function Home() {
  const router = useRouter();
  return (
    <Section
      id="home"
      className="flex-row items-center gap-10 pt-2 flex-wrap md:flex-nowrap"
      withSpacing
    >
      <Image
        src={"/home_ducks.png"}
        width={500}
        height={500}
        sizes="(max-width: 768px) 100vw, 500px"
        className="rounded-2xl w-full md:w-auto"
        alt="ducks"
        priority
      />
      <div className="flex gap-10 flex-col w-full md:w-auto">
        <div className="flex gap-2 flex-col">
          <h2 className="font-bold text-4xl">
            QuackPolls — Where Opinions Hatch
          </h2>
          <p>
            Dive in and let your quack echo across the pond! Cast your vote or
            set sail with your own poll!
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => {
              router.push(routes.signIn.pathname);
            }}
          >
            Waddle In
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              router.push(routes.signUp.pathname);
            }}
          >
            Start a Poll
          </Button>
        </div>
      </div>
    </Section>
  );
}
