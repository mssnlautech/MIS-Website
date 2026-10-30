"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight02Icon, Cancel01Icon, Menu02Icon } from "hugeicons-react";
import Button from "./Button";
import { EVENT } from "@/lib/data";

const NAV_LINKS = [
  { href: "/#why", label: "Why" },
  { href: "/#format", label: "Format" },
  // { href: "/#tickets", label: "Tickets" },
  { href: "/#faq", label: "FAQ" },
  { href: "/volunteer", label: "Volunteer" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 p-4">
      <div
        className={`relative z-50 mx-auto flex items-center justify-between border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled
            ? "mt-2 h-16 max-w-4xl rounded-full border-white/10 bg-brand-950/60 px-3 backdrop-blur-2xl backdrop-saturate-150 md:px-4"
            : "mt-0 h-20 max-w-6xl rounded-2xl border-transparent bg-brand-950/80 px-5 backdrop-blur-md md:px-8"
        }`}
      >
        <Link
          href="/"
          className="flex shrink-0 items-center"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/MIS_LOGO_wordmark.png"
            alt="Muslim Innovators Summit"
            width={832}
            height={350}
            priority
            className={`w-auto transition-all duration-500 ${
              scrolled ? "h-11" : "h-16"
            }`}
          />
        </Link>

        {/* Desktop nav — centered */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full bg-brand-900/60 p-1 text-cream-dim lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-300 hover:bg-brand-800 hover:text-gold-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href={EVENT.ticketsUrl} className="px-5 py-2.5">
            Get Tickets
            <ArrowRight02Icon
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full bg-brand-900/60 text-cream transition-colors duration-300 hover:bg-brand-800 hover:text-gold-300 lg:hidden"
        >
          <span className="sr-only">Toggle menu</span>
          <Cancel01Icon
            size={22}
            className={`absolute transition-all duration-300 ${
              open ? "scale-100 rotate-0 opacity-100" : "scale-50 rotate-45 opacity-0"
            }`}
          />
          <Menu02Icon
            size={22}
            className={`absolute transition-all duration-300 ${
              open ? "scale-50 -rotate-45 opacity-0" : "scale-100 rotate-0 opacity-100"
            }`}
          />
        </button>
      </div>

      {/* Mobile full-screen menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col bg-brand-950 transition-opacity duration-300 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="geo-pattern pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative flex flex-1 flex-col justify-center gap-1 px-8">
          {NAV_LINKS.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${index * 60}ms` : "0ms" }}
              className={`font-heading py-3 text-4xl font-semibold text-cream transition-all duration-300 hover:text-gold-300 ${
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="relative flex flex-col gap-3 px-8 pb-12">
          <Button
            href={EVENT.ticketsUrl}
            onClick={() => setOpen(false)}
            className="h-[52px] w-full"
          >
            Get Tickets
            <ArrowRight02Icon size={16} />
          </Button>
        </div>
      </div>
    </header>
  );
}
