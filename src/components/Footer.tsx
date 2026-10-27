import Image from "next/image";
import Link from "next/link";
import {
  Agreement01Icon,
  ArrowRight02Icon,
  Compass01Icon,
} from "hugeicons-react";
import Container from "./Container";
import { EVENT } from "@/lib/data";

const EXPLORE_LINKS = [
  { href: "/#why", label: "Why MIS 1.0" },
  { href: "/#format", label: "What happens in the room" },
  { href: "/#who", label: "Who it's for" },
  // { href: "/#tickets", label: "Tickets" },
  { href: "/#faq", label: "FAQ" },
];

// const INVOLVED_LINKS = [
//   { href: "/speak", label: "Apply to speak" },
//   { href: "/volunteer", label: "Apply to volunteer" },
// ];

const LEGAL_LINKS = [
  { href: "/code-of-conduct", label: "Code of Conduct" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-brand-950">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-5">
        <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-2">
          <Link href="/" className="group flex w-fit items-center">
            <Image
              src="/MIS_LOGO_wordmark.png"
              alt="Muslim Innovators Summit"
              width={832}
              height={350}
              className="h-12 w-auto transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </Link>
          <p className="max-w-sm text-sm leading-6 text-cream-dim">
            {EVENT.cohort} &mdash; limited seats, one room,{" "}
            {EVENT.city}. The founding edition of a community for Muslim
            builders in tech.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
            <Compass01Icon size={14} />
            Explore
          </h3>
          {EXPLORE_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex w-fit items-center gap-1.5 text-sm text-cream-dim transition-colors hover:text-cream"
            >
              {link.label}
              <ArrowRight02Icon
                size={14}
                className="-translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
              />
            </Link>
          ))}
        </div>

        {/* Not releasing yet
        <div className="flex flex-col gap-3">
          <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
            <UserGroup03Icon size={14} />
            Get Involved
          </h3>
          {INVOLVED_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex w-fit items-center gap-1.5 text-sm text-cream-dim transition-colors hover:text-cream"
            >
              {link.label}
              <ArrowRight02Icon
                size={14}
                className="-translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
              />
            </Link>
          ))}
          <a
            href={`mailto:${EVENT.sponsorEmail}`}
            className="group flex w-fit items-center gap-1.5 text-sm text-cream-dim transition-colors hover:text-cream"
          >
            Partner with us
            <ArrowRight02Icon
              size={14}
              className="-translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
            />
          </a>
        </div>
        */}

        <div className="flex flex-col gap-3">
          <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
            <Agreement01Icon size={14} />
            Legal
          </h3>
          {LEGAL_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-cream-dim transition-colors hover:text-cream"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </Container>

      <div className="border-t border-white/5">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream-dim/70 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Muslim Innovators Summit.</p>
          <p>{EVENT.cohort} &middot; Coming soon</p>
        </Container>
      </div>
    </footer>
  );
}
