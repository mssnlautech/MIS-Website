import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { clashDisplay, satoshi } from "@/fonts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const siteUrl = "https://misummit.org";
const title = "Muslim Innovators Summit — MIS 1.0";
const description =
  "Limited seats. One room. Ogbomoso. MIS 1.0 is the founding edition of the Muslim Innovators Summit — a day of talks, panels, and a buildathon for Muslim founders, engineers, and builders in tech.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s · ${title}`,
  },
  description,
  keywords: [
    "Muslim Innovators Summit",
    "Muslim tech conference",
    "Muslim founders",
    "Islamic tech event",
    "MIS Summit",
  ],
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: title,
    images: ["/MIS_LOGO.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/MIS_LOGO.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${clashDisplay.variable} ${satoshi.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-brand-950 font-sans text-cream">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
