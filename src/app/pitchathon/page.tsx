import type { Metadata } from "next";
import {
  Award01Icon,
  Calendar03Icon,
  CheckmarkCircle02Icon,
  Mail01Icon,
  UserMultiple02Icon,
  WhatsappIcon,
} from "hugeicons-react";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import PitchathonForm from "@/components/PitchathonForm";
import Reveal from "@/components/Reveal";
import {
  PITCHATHON,
  PITCH_JUDGING,
  PITCH_PILLARS,
  PITCH_PRIZES,
  PITCH_RULES,
  PITCH_STAGES,
  PITCH_TERMS,
  PITCH_TIMELINE,
  isPitchathonRegistrationOpen,
} from "@/lib/pitchathon";

// Re-render hourly so the page flips to "closed" soon after the deadline.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Pitchathon",
  description: `The MIS 1.0 Pitchathon: teams of ${PITCHATHON.teamMin} to ${PITCHATHON.teamMax} pitch a real solution to a real problem in Nigeria. ${PITCHATHON.prizePool} prize pool. Registration closes ${PITCHATHON.registrationClosesLabel}.`,
};

const FACTS = [
  { icon: UserMultiple02Icon, value: `${PITCHATHON.teamMin}–${PITCHATHON.teamMax}`, label: "Members per team" },
  { icon: Award01Icon, value: PITCHATHON.prizePool, label: "Prize pool" },
  { icon: Calendar03Icon, value: "Nov 20", label: "Registration closes" },
  { icon: Calendar03Icon, value: "Dec 13", label: "Final pitch, Ogbomoso" },
];

const CARD = "rounded-2xl border border-brand-800 bg-brand-900/40 p-6 sm:p-7";

export default function PitchathonPage() {
  const open = isPitchathonRegistrationOpen();
  const totalPoints = PITCH_JUDGING.reduce((sum, j) => sum + j.points, 0);

  return (
    <div className="py-20 sm:py-28">
      <Container className="flex flex-col gap-20 sm:gap-24">
        {/* Intro */}
        <div className="flex flex-col items-center gap-10">
          <Reveal>
            <SectionHeading
              eyebrow="Pitchathon"
              title="Solve a real problem in Nigeria. Pitch it to the judges."
              description="The competition at the heart of MIS 1.0. Find a pressing problem, propose a solution that can actually work, and take it from screening to a virtual pitch to the main stage. Any field is eligible."
            />
          </Reveal>
          <div className="grid w-full max-w-4xl grid-cols-2 gap-4 lg:grid-cols-4">
            {FACTS.map((fact, i) => (
              <Reveal key={fact.label} delay={i * 60}>
                <div className="flex h-full flex-col items-center gap-2 rounded-2xl border border-brand-800 bg-brand-900/40 p-5 text-center">
                  <fact.icon size={20} className="text-gold-300" />
                  <span className="font-heading text-xl font-semibold text-cream sm:text-2xl">
                    {fact.value}
                  </span>
                  <span className="text-xs text-cream-dim">{fact.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <a
              href="#register"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold-400 px-6 py-3 text-sm font-semibold tracking-wide text-brand-950 shadow-[0_0_0_1px_rgba(212,162,76,0.4)] transition-all duration-200 hover:scale-[1.03] hover:bg-gold-300"
            >
              {open ? "Register your team" : "Registration closed"}
            </a>
          </Reveal>
        </div>

        {/* What every solution must show */}
        <section className="flex flex-col gap-10">
          <Reveal>
            <SectionHeading
              eyebrow="The brief"
              title="Viable, not just clever."
              description="Entries are judged on whether the solution can work. Every proposal must say what makes it different from existing options in Nigeria, and show:"
            />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PITCH_PILLARS.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 60}>
                <div className={`${CARD} flex h-full flex-col gap-2`}>
                  <h3 className="font-heading text-base font-semibold text-cream">
                    {pillar.title}
                  </h3>
                  <p className="text-sm leading-6 text-cream-dim">{pillar.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Stages */}
        <section className="flex flex-col gap-10">
          <Reveal>
            <SectionHeading eyebrow="How it works" title="Three stages to the final." />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {PITCH_STAGES.map((stage, i) => (
              <Reveal key={stage.title} delay={i * 60}>
                <div className={`${CARD} flex h-full flex-col gap-2`}>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
                    {stage.label}
                  </span>
                  <h3 className="font-heading text-lg font-semibold text-cream">{stage.title}</h3>
                  <p className="text-sm leading-6 text-cream-dim">{stage.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Timeline + judging */}
        <section className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className={`${CARD} flex h-full flex-col gap-5`}>
              <h3 className="font-heading text-lg font-semibold text-cream">Timeline</h3>
              <ol className="flex flex-col">
                {PITCH_TIMELINE.map((row) => (
                  <li
                    key={row.event}
                    className="flex flex-col gap-1 border-t border-brand-800 py-3 first:border-t-0 first:pt-0 sm:flex-row sm:justify-between sm:gap-6"
                  >
                    <span className="text-sm font-medium text-cream">{row.event}</span>
                    <span className="text-sm text-cream-dim sm:text-right">{row.date}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
          <Reveal delay={60}>
            <div className={`${CARD} flex h-full flex-col gap-5`}>
              <h3 className="font-heading text-lg font-semibold text-cream">Judging</h3>
              <ul className="flex flex-col">
                {PITCH_JUDGING.map((row) => (
                  <li
                    key={row.criterion}
                    className="flex items-center justify-between gap-6 border-t border-brand-800 py-3 first:border-t-0 first:pt-0"
                  >
                    <span className="text-sm text-cream">{row.criterion}</span>
                    <span className="font-mono text-sm text-gold-300">{row.points}</span>
                  </li>
                ))}
                <li className="flex items-center justify-between gap-6 border-t border-brand-600 pt-3">
                  <span className="text-sm font-semibold text-cream">Total</span>
                  <span className="font-mono text-sm font-semibold text-gold-300">
                    {totalPoints}
                  </span>
                </li>
              </ul>
            </div>
          </Reveal>
        </section>

        {/* Prizes + rules */}
        <section className="grid gap-6 lg:grid-cols-[2fr_3fr]">
          <Reveal>
            <div className="flex h-full flex-col gap-5 rounded-2xl border border-gold-400/40 bg-brand-900/50 p-6 sm:p-7">
              <h3 className="font-heading text-lg font-semibold text-cream">Prizes</h3>
              <ul className="flex flex-col gap-3">
                {PITCH_PRIZES.map((prize) => (
                  <li key={prize} className="flex items-start gap-3 text-sm leading-6 text-cream">
                    <Award01Icon size={18} className="mt-0.5 shrink-0 text-gold-300" />
                    {prize}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={60}>
            <div className={`${CARD} flex h-full flex-col gap-5`}>
              <h3 className="font-heading text-lg font-semibold text-cream">Rules</h3>
              <ul className="flex flex-col gap-3">
                {PITCH_RULES.map((rule) => (
                  <li key={rule} className="flex items-start gap-3 text-sm leading-6 text-cream-dim">
                    <CheckmarkCircle02Icon size={18} className="mt-0.5 shrink-0 text-gold-300" />
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>

        {/* Register */}
        <section id="register" className="flex scroll-mt-28 flex-col items-center gap-10">
          <Reveal>
            <SectionHeading
              eyebrow="Register"
              title={open ? "Register your team." : "Registration has closed."}
              description={
                open
                  ? `Open until ${PITCHATHON.registrationClosesLabel}. After you register, every team member buys their own MIS 1.0 ticket to complete registration.`
                  : `Registration closed on ${PITCHATHON.registrationClosesLabel}. Registered teams will hear from us after screening.`
              }
            />
          </Reveal>
          {open && <PitchathonForm />}
        </section>

        {/* Contact + terms */}
        <section className="grid gap-6 lg:grid-cols-[2fr_3fr]">
          <Reveal>
            <div className={`${CARD} flex h-full flex-col gap-4`}>
              <h3 className="font-heading text-lg font-semibold text-cream">Questions?</h3>
              <a
                href={PITCHATHON.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-cream transition-colors hover:text-gold-300"
              >
                <WhatsappIcon size={18} className="shrink-0 text-gold-300" />
                {PITCHATHON.contact.name} on WhatsApp: {PITCHATHON.contact.whatsapp}
              </a>
              <a
                href={`mailto:${PITCHATHON.contact.email}`}
                className="flex items-center gap-3 break-all text-sm text-cream transition-colors hover:text-gold-300"
              >
                <Mail01Icon size={18} className="shrink-0 text-gold-300" />
                {PITCHATHON.contact.email}
              </a>
            </div>
          </Reveal>
          <Reveal delay={60}>
            <div className={`${CARD} flex h-full flex-col gap-4`}>
              <h3 className="font-heading text-lg font-semibold text-cream">Final terms</h3>
              <ul className="flex list-disc flex-col gap-2 pl-5 text-xs leading-5 text-cream-dim marker:text-brand-600">
                {PITCH_TERMS.map((term) => (
                  <li key={term}>{term}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>
      </Container>
    </div>
  );
}
