// Content for /pitchathon, taken from the official MIS Pitchathon guidelines.

export const PITCHATHON = {
  teamMin: 2,
  teamMax: 4,
  prizePool: "₦500,000",
  registrationOpensLabel: "November 6, 2026",
  registrationClosesLabel: "November 20, 2026",
  // Registration is accepted until the end of this day (WAT).
  registrationClosesISO: "2026-11-20T23:59:59+01:00",
  finalLabel: "December 13, 2026",
  contact: {
    name: "Awwal",
    whatsapp: "08076041327",
    whatsappUrl: "https://wa.me/2348076041327",
    email: "musliminnovatorssummit@gmail.com",
  },
};

export function isPitchathonRegistrationOpen(now = Date.now()): boolean {
  return now <= new Date(PITCHATHON.registrationClosesISO).getTime();
}

export const PITCH_PILLARS = [
  {
    title: "Traction",
    description: "Evidence of demand: users, testing, or early results.",
  },
  {
    title: "Scalability",
    description: "How the solution grows beyond its first users or location.",
  },
  {
    title: "Addressable market",
    description: "Who the customers or beneficiaries are, and how large that market is.",
  },
  {
    title: "Monetization",
    description: "How the solution generates revenue or sustains itself.",
  },
];

// The written proposal screened in the quarter-finals. `column` is the
// hackathon_registrations column each answer is stored in.
export const PROPOSAL_FIELDS = [
  {
    key: "problem",
    column: "problem",
    label: "The problem",
    hint: "What pressing or high-impact problem in Nigeria are you solving, and who has it?",
    rows: 4,
  },
  {
    key: "solution",
    column: "project_idea",
    label: "Your solution",
    hint: "What are you building, and how does it work?",
    rows: 4,
  },
  {
    key: "difference",
    column: "difference",
    label: "What makes it different",
    hint: "What existing options are there in Nigeria, and why is yours better?",
    rows: 3,
  },
  {
    key: "traction",
    column: "traction",
    label: "Traction",
    hint: "Any evidence of demand: users, conversations, tests, or early results. Say so if you're just starting.",
    rows: 3,
  },
  {
    key: "scalability",
    column: "scalability",
    label: "Scalability",
    hint: "How will it grow beyond its first users or location?",
    rows: 3,
  },
  {
    key: "market",
    column: "market",
    label: "Addressable market",
    hint: "Who are the customers or beneficiaries, and roughly how many are there?",
    rows: 3,
  },
  {
    key: "monetization",
    column: "monetization",
    label: "Monetization",
    hint: "How will it make money or sustain itself?",
    rows: 3,
  },
] as const;

export type ProposalKey = (typeof PROPOSAL_FIELDS)[number]["key"];
export type ProposalColumn = (typeof PROPOSAL_FIELDS)[number]["column"];
export const PROPOSAL_MAX_LENGTH = 2000;

export const PITCH_STAGES = [
  {
    label: "Stage 1",
    title: "Quarter-finals",
    description:
      "Submission screening. Your written proposal is checked against the eligibility and submission requirements. Entries that meet all of them advance to the semi-finals.",
  },
  {
    label: "Stage 2",
    title: "Semi-finals",
    description:
      "Develop your solution during the build period and attend a virtual training on finances, storytelling, legal considerations, and pitch decks. Then pitch to the judges online. Finalists are announced after.",
  },
  {
    label: "Stage 3",
    title: "Finals",
    description: `Finalists pitch live before the judges at the main event on ${PITCHATHON.finalLabel}.`,
  },
];

export const PITCH_TIMELINE = [
  { event: "Registration opens", date: PITCHATHON.registrationOpensLabel },
  { event: "Registration closes", date: PITCHATHON.registrationClosesLabel },
  { event: "Submission screening (quarter-finals)", date: "After registration closes" },
  { event: "Build period", date: "Alongside registration, up to the semi-final pitch" },
  { event: "Semi-finals: training & virtual pitch", date: "After screening" },
  { event: "Finalist announcement", date: "After the semi-final pitches" },
  { event: "Finals & main event", date: PITCHATHON.finalLabel },
];

export const PITCH_JUDGING = [
  { criterion: "Idea and problem relevance", points: 30 },
  { criterion: "Feasibility and proof of solution", points: 25 },
  { criterion: "Market, traction and scalability", points: 20 },
  { criterion: "Monetization and business model", points: 15 },
  { criterion: "Pitch delivery and clarity", points: 10 },
];

export const PITCH_PRIZES = [
  `${PITCHATHON.prizePool} prize pool`,
  "Certificates of participation and achievement for all finalists",
  "Access to an intensive bootcamp session",
];

export const PITCH_RULES = [
  "Open to all: students, coders, designers, and innovators.",
  `Teams of ${PITCHATHON.teamMin} to ${PITCHATHON.teamMax} members. Solo entries are not accepted.`,
  `Every team member must buy an event ticket to complete registration, and be physically present on ${PITCHATHON.finalLabel}. Absence means automatic disqualification.`,
  "The problem must be pressing or high-impact, and the solution designed to serve people in Nigeria. Any field is eligible.",
  "All ideas, writing, and designs must be your own. Submissions are checked for AI-generated content and plagiarism, and copied work leads to disqualification.",
  "Your proposal must clearly state what makes your solution different from existing options in Nigeria.",
  "Disclose any open-source tools or third-party materials you use.",
  "Treat organizers, judges, sponsors, and fellow participants with respect. Any attempt to manipulate judging, scoring, or registration leads to disqualification.",
  "The judges' and organizers' decisions are final.",
];

export const PITCH_TERMS = [
  "Organizers may modify these guidelines, the timeline, or the rules at any time. Updates are communicated to registered participants.",
  "Participation does not guarantee selection, a prize, or recognition.",
  "Organizers are not liable for loss, injury, or damage arising from participation, including travel to the event.",
  "Submitted ideas remain the property of the participants. By entering, you allow the organizers to showcase your entry for promotional purposes, with credit to your team.",
  "Breaking these rules, falsifying information, or conduct that harms the event may lead to disqualification.",
  "You are responsible for meeting all eligibility requirements before registering.",
];
