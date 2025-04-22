"use client";
import Image from "next/image";

import Section from "@/components/generic/layout/Section";
import Button from "@/components/generic/Button";

export default function Home() {
  return (
    <Section
      id="home"
      className="flex-row items-center gap-10 pt-2 flex-wrap lg:flex-nowrap"
      withSpacing
    >
      <Image
        src={"/home_ducks.png"}
        width={500}
        height={300}
        className="rounded-2xl w-full lg:w-auto"
        alt="ducks"
      />
      <div className="flex gap-10 flex-col w-full lg:w-auto">
        <div className="flex gap-2 flex-col">
          <h2 className="font-bold text-4xl">
            QuackPolls &apos;Where opinions hatch&apos;
          </h2>
          <p>
            Dive into a world where your voice quacks the loudest. Join the
            flock, cast your vote, or start your own poll.
          </p>
        </div>
        <div className="flex gap-2">
          <Button>Waddle In</Button>
          <Button variant="secondary">Start a Poll</Button>
        </div>
      </div>
    </Section>
  );
}
