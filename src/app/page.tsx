import Link from "next/link";
import {
  ArrowDown01Icon,
  ArrowRight02Icon,
  Building05Icon,
  ChartLineData02Icon,
  CodeCircleIcon,
  // Clock01Icon,
  Idea01Icon,
  LaptopProgrammingIcon,
  Location01Icon,
  Mic01Icon,
  Mosque01Icon,
  MoneyExchange03Icon,
  Rocket01Icon,
  SparklesIcon,
  StudentIcon,
  UserGroup03Icon,
  UserMultiple02Icon,
} from "hugeicons-react";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
// import Countdown from "@/components/Countdown";
import Faq from "@/components/Faq";
import AmbientMark from "@/components/AmbientMark";
import CountUp from "@/components/CountUp";
// import NewsletterForm from "@/components/NewsletterForm";
// import TicketTiers from "@/components/TicketTiers";
import Reveal from "@/components/Reveal";
import {
  EVENT,
  CAPACITY_FACTS,
  WHY_BLOCKS,
  FORMAT_ITEMS,
  PERSONAS,
} from "@/lib/data";

const CAPACITY_ICONS = [UserMultiple02Icon, Building05Icon, Location01Icon, SparklesIcon];
const WHY_ICONS = [ChartLineData02Icon, Mosque01Icon];
const FORMAT_ICONS = [Mic01Icon, UserGroup03Icon, CodeCircleIcon, Idea01Icon];
const PERSONA_ICONS = [Rocket01Icon, LaptopProgrammingIcon, StudentIcon, MoneyExchange03Icon];

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: `${EVENT.name} — ${EVENT.cohort}`,
  startDate: EVENT.dateISO,
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: EVENT.venue,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ogbomoso",
      addressCountry: "NG",
    },
  },
  organizer: {
    "@type": "Organization",
    name: EVENT.name,
    email: EVENT.contactEmail,
  },
};

export default function Home() {
  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 geo-pattern opacity-40" />
        <div className="brand-glow absolute inset-0" />
        <AmbientMark className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] text-brand-800 opacity-60 sm:h-[520px] sm:w-[520px]" />

        <Container className="relative flex flex-col items-center gap-10 py-24 text-center sm:py-32">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-700 bg-brand-900/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
            Coming Soon
          </span>

          <h1 className="max-w-4xl font-heading text-4xl font-semibold leading-[1.1] tracking-tight text-cream sm:text-6xl">
            Limited seats. One room.{" "}
            <span className="text-gold-300">Ogbomoso.</span>
          </h1>

          <p className="max-w-2xl text-lg leading-8 text-cream-dim">
            MIS 1.0 is the founding edition of the Muslim Innovators
            Summit a day of talks, panels, and a buildathon for
            Muslim founders, engineers, and builders in tech. Small on
            purpose.
          </p>

          <Button href={EVENT.ticketsUrl}>
            Get Your Ticket
            <ArrowRight02Icon
              size={18}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Button>

          <Link
            href="#why"
            className="group flex items-center gap-1.5 text-sm font-medium text-cream-dim transition-colors hover:text-gold-300"
          >
            See what&apos;s inside
            <ArrowDown01Icon
              size={16}
              className="transition-transform duration-200 group-hover:translate-y-1"
            />
          </Link>

          {/* Not releasing yet
          <div className="mt-4 flex flex-col items-center gap-3">
            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cream-dim">
              <Clock01Icon size={14} className="text-gold-300" />
              Doors open in
            </span>
            <Countdown />
          </div>
          */}
        </Container>
      </section>

      {/* Capacity strip */}
      <section className="border-y border-brand-950/10 bg-cream">
        <Container className="grid grid-cols-2 gap-8 py-12 sm:grid-cols-4">
          {CAPACITY_FACTS.map((fact, index) => {
            const Icon = CAPACITY_ICONS[index];
            return (
              <Reveal key={fact.label} delay={index * 80}>
                <div
                  className="group flex flex-col items-center gap-2 text-center"
                  aria-label={`${fact.value} — ${fact.label}`}
                >
                  <Icon
                    size={22}
                    className="text-brand-600 transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="sr-only">{fact.value}</span>
                  <CountUp
                    value={fact.value}
                    className="font-mono text-3xl font-semibold text-brand-700 tabular-nums transition-transform duration-300 sm:text-4xl group-hover:scale-105"
                  />
                  <span className="text-sm text-brand-600/80">{fact.label}</span>
                </div>
              </Reveal>
            );
          })}
        </Container>
      </section>

      {/* The Why */}
      <section id="why" className="py-24 sm:py-32">
        <Container className="flex flex-col gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Why this exists"
              title="Why now, why a room, why us."
              description="We could have waited until we had a bigger story to tell. Here's why we didn't."
            />
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            {WHY_BLOCKS.map((block, index) => {
              const Icon = WHY_ICONS[index];
              return (
                <Reveal key={block.title} delay={index * 80}>
                  <div className="flex h-full flex-col gap-4 rounded-2xl border border-brand-800 bg-brand-900/40 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/50">
                    <div className="flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-800 text-gold-300">
                        <Icon size={20} />
                      </span>
                      <span className="font-mono text-sm text-gold-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-cream">
                      {block.title}
                    </h3>
                    <p className="text-sm leading-7 text-cream-dim">{block.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Format */}
      <section id="format" className="border-t border-white/5 bg-brand-900/30 py-24 sm:py-32">
        <Container className="flex flex-col gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Format"
              title="What actually happens in the room."
              description="One day, one room, four blocks built for depth, not a packed agenda."
            />
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FORMAT_ITEMS.map((item, index) => {
              const Icon = FORMAT_ICONS[index];
              return (
                <Reveal key={item.title} delay={index * 80}>
                  <div className="flex h-full flex-col gap-3 rounded-2xl border border-brand-800 bg-brand-950/60 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/50">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-800 text-gold-300">
                      <Icon size={20} />
                    </span>
                    <h3 className="font-heading text-base font-semibold text-cream">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-6 text-cream-dim">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Who it's for */}
      <section id="who" className="border-t border-brand-950/10 bg-cream py-24 sm:py-32">
        <Container className="flex flex-col gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Who it's for"
              title="Built for four kinds of builder."
              light
            />
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PERSONAS.map((persona, index) => {
              const Icon = PERSONA_ICONS[index];
              return (
                <Reveal key={persona.title} delay={index * 80}>
                  <div className="flex h-full flex-col gap-3 rounded-2xl border border-brand-950/10 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-md">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-950/5 text-brand-600">
                      <Icon size={20} />
                    </span>
                    <h3 className="font-heading text-base font-semibold text-brand-950">
                      {persona.title}
                    </h3>
                    <p className="text-sm leading-6 text-brand-700">
                      {persona.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Volunteer */}
      <section
        id="volunteer"
        className="border-t border-brand-950/10 bg-cream py-24 sm:py-32"
      >
        <Container className="flex flex-col gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Get Involved"
              title="MIS 1.0 runs on volunteers."
              description="No volunteer team is locked in yet because we're building it from scratch, with you."
              light
            />
          </Reveal>
          <Reveal>
            <div className="flex flex-col items-start gap-4 rounded-2xl border border-brand-950/10 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:gap-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-950/5 text-brand-600">
                  <UserGroup03Icon size={20} />
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="font-heading text-lg font-semibold text-brand-950">
                    Volunteer with us
                  </h3>
                  <p className="text-sm leading-6 text-brand-700">
                    Registration, room logistics, speaker support, buildathon
                    facilitation &mdash; pick where you fit.
                  </p>
                </div>
              </div>
              <Button href="/volunteer" variant="secondary" className="shrink-0">
                Apply to Volunteer
                <ArrowRight02Icon
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Get involved (speak + volunteer) */}
      {/* Not releasing yet
      <section className="border-t border-brand-950/10 bg-cream py-24 sm:py-32">
        <Container className="flex flex-col gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Get Involved"
              title="MIS 1.0's lineup and crew aren't set yet."
              description="No speakers are confirmed and no volunteer team is locked in because we're building both from scratch, with you."
              light
            />
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            <Reveal>
              <div className="flex h-full flex-col items-start gap-4 rounded-2xl border border-brand-950/10 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-md">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-950/5 text-brand-600">
                  <Mic01Icon size={20} />
                </span>
                <h3 className="font-heading text-lg font-semibold text-brand-950">
                  Speak at MIS 1.0
                </h3>
                <p className="text-sm leading-6 text-brand-700">
                  Have a product shipped, a lesson learned the hard way, or a
                  hard problem you&apos;re still working on? We want to hear it.
                </p>
                <Button href="/speak" variant="secondary" className="mt-auto">
                  Apply to Speak
                  <ArrowRight02Icon
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Button>
              </div>
            </Reveal>
            <Reveal>
              <div className="flex h-full flex-col items-start gap-4 rounded-2xl border border-brand-950/10 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-md">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-950/5 text-brand-600">
                  <UserGroup03Icon size={20} />
                </span>
                <h3 className="font-heading text-lg font-semibold text-brand-950">
                  Volunteer with us
                </h3>
                <p className="text-sm leading-6 text-brand-700">
                  Registration, room logistics, speaker support, buildathon
                  facilitation &mdash; MIS 1.0 runs on volunteers.
                </p>
                <Button href="/volunteer" variant="secondary" className="mt-auto">
                  Apply to Volunteer
                  <ArrowRight02Icon
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
      */}

      {/* Tickets */}
      {/* Not releasing yet
      <section id="tickets" className="py-24 sm:py-32">
        <Container className="flex flex-col gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Tickets"
              title="Limited seats. Once they're gone, that's it for MIS 1.0."
              description={`${EVENT.dateLabel} · ${EVENT.city} · Prices in NGN`}
            />
          </Reveal>
          <Reveal>
            <TicketTiers />
          </Reveal>
        </Container>
      </section>
      */}

      {/* Sponsor CTA */}
      {/* Not releasing yet
      <section className="border-t border-brand-950/10 bg-cream py-24 sm:py-32">
        <Container className="flex flex-col items-center gap-6 text-center">
          <Reveal>
            <SectionHeading
              eyebrow="Partner with us"
              title="Back the founding edition."
              description="We're putting together a one-pager on how partners can support MIS 1.0. Email us and we'll send it over as soon as it's ready."
              light
            />
          </Reveal>
          <Reveal delay={100}>
            <Button href={`mailto:${EVENT.sponsorEmail}`} variant="secondary">
              Email Partnerships
              <ArrowRight02Icon
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Button>
          </Reveal>
        </Container>
      </section>
      */}

      {/* Newsletter */}
      {/* Not releasing yet
      <section className="border-t border-brand-950/10 bg-cream py-24 sm:py-32">
        <Container className="flex flex-col items-center gap-8 text-center">
          <Reveal>
            <SectionHeading
              eyebrow="Stay in the loop"
              title="Not ready to commit? Get updates as MIS 1.0 comes together."
              light
            />
          </Reveal>
          <Reveal delay={100}>
            <NewsletterForm light />
          </Reveal>
        </Container>
      </section>
      */}

      {/* FAQ */}
      <section id="faq" className="border-t border-white/5 bg-brand-900/30 py-24 sm:py-32">
        <Container className="flex flex-col gap-16">
          <Reveal>
            <SectionHeading eyebrow="FAQ" title="Good to know before you book." />
          </Reveal>
          <Reveal>
            <Faq />
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
