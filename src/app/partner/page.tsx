import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import PartnerForm from "@/components/PartnerForm";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Partner With Us",
  description:
    "Sponsor or partner with MIS 1.0, the founding edition of the Muslim Innovators Summit.",
};

export default function PartnerPage() {
  return (
    <div className="py-20 sm:py-28">
      <Container className="flex flex-col items-center gap-16">
        <Reveal>
          <SectionHeading
            eyebrow="Partners & Sponsors"
            title="Back the room that builds what's next."
            description="MIS 1.0 is small on purpose — your support goes directly into the room, the builders, and the experience. Whether it's funding, media, or community, let's talk."
          />
        </Reveal>
        <Reveal delay={100} className="flex w-full justify-center">
          <PartnerForm />
        </Reveal>
      </Container>
    </div>
  );
}
