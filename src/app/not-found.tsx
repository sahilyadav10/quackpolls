"use client";
import Button from "@/components/generic/Button";
import Section from "@/components/generic/layout/Section";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <Section
      className="items-center justify-center flex-row! flex-wrap! md:flex-nowrap! gap-4"
      withSpacing
      id="404"
    >
      <Image
        src="/404_duck.png"
        alt="Lost Duck"
        width={400}
        height={400}
        priority
        className="rounded-2xl w-full md:w-auto mix-blend-luminosity"
      />
      <div className="flex gap-4 flex-col items-center">
        <h2 className="font-bold text-center text-4xl">
          This page has quacked under pressure.
        </h2>

        <Link href="/">
          <Button> Go home</Button>
        </Link>
      </div>
    </Section>
  );
}
