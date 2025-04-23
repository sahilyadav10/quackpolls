import type { Metadata } from "next";

export const websiteMetadata: Metadata = {
  title: {
    absolute: `QuackPolls | Sahil Yadav`,
    default: `QuackPolls | Sahil Yadav`,
    template: `%s | QuackPolls `,
  },
  description:
    "Sahil Yadav is a software engineer who specializes in building (and occasionally designing) exceptional digital experiences.",
  metadataBase: new URL("https://sahilten.com/"),
  openGraph: {
    title: "Sahil Yadav | Software Engineer",
    description:
      "Sahil Yadav is a software engineer who specializes in building (and occasionally designing) exceptional digital experiences.",
    url: "https://sahilten.com/",
    type: "website",
    images: [
      {
        url: "/metadata-og-standard.png", // Standard OG image
        width: 1200,
        height: 630,
        alt: "Sahil Yadav is a software engineer who specializes in building (and occasionally designing) exceptional digital experiences.",
      },
      {
        url: "/metadata-og-fallback.png", // Alternative OG image
        width: 600,
        height: 315,
        alt: "Sahil Yadav is a software engineer who specializes in building (and occasionally designing) exceptional digital experiences.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sahil Yadav | Software Engineer",
    description:
      "Sahil Yadav is a software engineer who specializes in building (and occasionally designing) exceptional digital experiences.",
    creator: "Sahil Yadav",
    images: [
      "/metadata-twitter.png", // Standard Twitter image
    ],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
    other: [
      {
        rel: "mask-icon",
        url: "/mask-icon.svg",
        color: "#F5B226",
      },
    ],
  },
};
