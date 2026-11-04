import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import HackathonForm from "@/components/HackathonForm";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Buildathon Registration",
  description:
    "Register for the MIS 1.0 buildathon — form a team, ship something small, demo it before the day ends.",
};

export default function HackathonPage() {
  return (
    <div className="py-20 sm:py-28">
      <Container className="flex flex-col items-center gap-16">
        <Reveal>
          <SectionHeading
            eyebrow="Buildathon"
            title="Build something real before the day ends."
            description="Form a team or go solo. Pick a problem, ship something small, and demo it to the room. No slides — just working software."
          />
        </Reveal>
        <HackathonForm />
      </Container>
    </div>
  );
}
