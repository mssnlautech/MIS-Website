import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import VolunteerForm from "@/components/VolunteerForm";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Call for Volunteers",
  description:
    "Help run MIS 1.0, the founding edition of the Muslim Innovators Summit.",
};

export default function VolunteerPage() {
  return (
    <div className="py-20 sm:py-28">
      <Container className="flex flex-col items-center gap-16">
        <Reveal>
          <SectionHeading
            eyebrow="Call for Volunteers"
            title="A room this size still needs hands to run it."
            description="Registration, room logistics, speaker support, Pitchathon facilitation — MIS 1.0 runs on volunteers. Tell us how you'd like to help."
          />
        </Reveal>
        <VolunteerForm />
      </Container>
    </div>
  );
}
