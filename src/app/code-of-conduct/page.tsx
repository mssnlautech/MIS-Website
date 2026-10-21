import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Code of Conduct",
  description: "The code of conduct for the Muslim Innovators Summit.",
};

const SECTIONS = [
  {
    title: "The short version",
    body: "Be respectful, be honest about who you are and what you're building, and help keep this a room people want to come back to.",
  },
  {
    title: "Expected behavior",
    body: "Engage in good faith. Give credit where it's due. Respect prayer times, dietary needs, and the space set aside for worship. Ask before recording or photographing anyone one-on-one.",
  },
  {
    title: "Unacceptable behavior",
    body: "Harassment, discrimination, unwanted physical contact, aggressive sales pitching without consent, or disruptive behavior toward speakers and attendees will not be tolerated.",
  },
  {
    title: "Reporting",
    body: `If something happens that shouldn't have, tell any organizer on-site. Reports are handled directly by the organizing team and taken seriously.`,
  },
  {
    title: "Consequences",
    body: "Organizers may remove anyone from the event, without refund, for behavior that violates this code — at their discretion, on the day or afterward.",
  },
];

export default function CodeOfConductPage() {
  return (
    <div className="py-20 sm:py-28">
      <Container className="flex flex-col gap-16">
        <Reveal>
          <SectionHeading
            eyebrow="Policy"
            title="Code of Conduct"
            description="This applies to every attendee, speaker, volunteer, and organizer at MIS 1.0 — before, during, and after the event."
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
