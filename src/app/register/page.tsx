import type { Metadata } from "next";
import { ArrowRight02Icon } from "hugeicons-react";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import TicketTiers from "@/components/TicketTiers";
import Reveal from "@/components/Reveal";
import { EVENT } from "@/lib/data";

export const metadata: Metadata = {
  title: "Tickets",
  description: `Get your ticket to MIS 1.0, ${EVENT.dateLabel} in ${EVENT.city}.`,
};

export default function RegisterPage() {
  return (
    <div className="py-20 sm:py-28">
      <Container className="flex flex-col gap-16">
        <Reveal>
          <SectionHeading
            eyebrow="Tickets"
            title="Reserve your seat."
            description={`${EVENT.dateLabel} · ${EVENT.city}. Seats for MIS 1.0 are limited — once they're sold, the next chance is MIS 2.0.`}
          />
        </Reveal>

        <Reveal delay={80}>
          <TicketTiers />
        </Reveal>

        <Reveal delay={160}>
          <div className="flex flex-col items-center gap-3 rounded-3xl border border-brand-800 bg-brand-900/40 px-8 py-10 text-center transition-colors duration-300 hover:border-gold-400/40">
            <h2 className="font-heading text-xl font-semibold text-cream">
              Group or student discounts?
            </h2>
            <p className="max-w-lg text-sm leading-6 text-cream-dim">
              Bringing a team of 5 or more, or need financial assistance as a
              student? Email us and we&apos;ll work something out.
            </p>
            <Button href={`mailto:${EVENT.ticketsEmail}`} variant="ghost">
              {EVENT.ticketsEmail}
              <ArrowRight02Icon
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Button>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
