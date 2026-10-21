import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How the Muslim Innovators Summit handles your information.",
};

const SECTIONS = [
  {
    title: "What we collect",
    body: "When you buy a ticket, apply to speak or volunteer, or join the newsletter list, we collect what you send us directly — name, email, and anything else you choose to include. We don't run tracking pixels or third-party analytics on this site today.",
  },
  {
    title: "How we use it",
    body: "To run the event: issuing your ticket, contacting you about schedule changes, following up on speaker or volunteer applications, and sending updates if you've asked for them.",
  },
  {
    title: "Who sees it",
    body: "The organizing team only. We don't sell or share attendee information with sponsors or third parties without asking you first.",
  },
  {
    title: "How long we keep it",
    body: "For as long as it's useful for running this event and planning the next one. Reach out to the organizing team if you'd like your information removed.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="py-20 sm:py-28">
      <Container className="flex flex-col gap-16">
        <Reveal>
          <SectionHeading
            eyebrow="Policy"
            title="Privacy Policy"
            description="Last updated for MIS 1.0. Plain language, on purpose."
          />
        </Reveal>
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-10">
          {SECTIONS.map((section, index) => (
            <Reveal key={section.title} delay={index * 60}>
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold text-cream font-heading">
                  {section.title}
                </h2>
                <p className="text-sm leading-7 text-cream-dim">{section.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </div>
  );
}
