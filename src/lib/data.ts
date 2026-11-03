export const EVENT = {
  name: "Muslim Innovators Summit",
  cohort: "MIS 1.0",
  dateLabel: "Saturday, March 21, 2026",
  dateISO: "2026-03-21T09:00:00+01:00",
  venue: "Venue shared directly with ticket holders",
  city: "Ogbomoso, Nigeria",
  seats: 250,
  ticketsUrl: "https://bitooqoh.com/explore/event.mssnlautech.org",
  timezone: "WAT (GMT+1)",
  contactEmail: "musliminnovatorssummit@gmail.com",
  ticketsEmail: "musliminnovatorssummit@gmail.com",
  speakersEmail: "musliminnovatorssummit@gmail.com",
  volunteerEmail: "musliminnovatorssummit@gmail.com",
  sponsorEmail: "musliminnovatorssummit@gmail.com",
};

export const CAPACITY_FACTS = [
  { value: "Limited", label: "Seats" },
  { value: "1", label: "Room — no parallel tracks" },
  { value: EVENT.city.split(",")[0], label: "Nigeria" },
  { value: EVENT.cohort, label: "The founding edition" },
];

export const WHY_BLOCKS = [
  {
    title: "Why now",
    body: "AI and product cycles are moving faster than at any point in the industry's history, and the rooms where that direction gets set rarely include Muslim builders. MIS 1.0 is our answer to that one day, one room in Ogbomoso, built around talks, panels, and a hands-on buildathon, where founders, engineers, and builders actually meet the people worth meeting instead of just following them online.",
  },
  {
    title: "Why faith rooted",
    body: "The schedule is built around prayer, not around it, and catering is halal by default, not by request this is a tech event built around how Muslim builders actually want to gather. We kept seats limited on purpose: small enough that every attendee gets real access to the room, not just a badge. MIS 2.0 grows from what MIS 1.0 proves.",
  },
];

export const FORMAT_ITEMS = [
  {
    title: "Talks",
    description:
      "Short, high signal talks from builders shipping real products no panels padded out to fill a slot.",
  },
  {
    title: "Panels",
    description:
      "Focused conversations on the hard parts of building in tech as a Muslim founder or operator, moderated for depth over breadth.",
  },
  {
    title: "Buildathon",
    description:
      "A hands-on build block for attendees who want to leave with more than notes form a team, ship something small, demo it before the day ends.",
  },
  {
    title: "Mentorship",
    description:
      "Structured 1:1 windows with experienced builders in the room booked in advance, not left to hallway luck.",
  },
];

export const PERSONAS = [
  {
    title: "Founders",
    description:
      "Early stage and pre-launch founders who want direct feedback from people who've shipped, not just encouragement.",
  },
  {
    title: "Engineers & builders",
    description:
      "Engineers and designers who want to meet the people building outside their current team or company.",
  },
  {
    title: "Students & early career",
    description:
      "Students and early career builders figuring out where they fit in tech, and looking for a real entry point.",
  },
  {
    title: "Investors & operators",
    description:
      "Investors and operators who want to meet Muslim founders early, before the room gets crowded.",
  },
];

export type TicketTier = {
  name: string;
  price: string;
  description: string;
  features: string[];
  note?: string;
  highlighted?: boolean;
  paymentLink: string;
};

export const TICKETS: TicketTier[] = [
  {
    name: "Early Bird",
    price: "₦2,000",
    description: "Limited to the first 50 seats sold.",
    note: "Ends whenever seat 50 sells — not on a fixed date.",
    features: [
      "Full-day access",
      "All talks, panels & buildathon",
      "Halal meals included",
      "Mentorship sign-up access",
    ],
    paymentLink: "https://paystack.com/pay/REPLACE_WITH_EARLY_BIRD_LINK",
  },
  {
    name: "MIS 1.0",
    price: "₦3,000",
    description: "Standard entry to the founding edition.",
    highlighted: true,
    features: [
      "Everything in Early Bird",
      "Priority seating",
      "MIS 1.0 attendee badge",
      "First invite to MIS 2.0",
    ],
    paymentLink: "https://paystack.com/pay/REPLACE_WITH_MIS_1_0_LINK",
  },
];

export const FAQS = [
  {
    q: "Where exactly is the venue?",
    a: "We share the exact address directly with ticket holders closer to the date this keeps the room at the capacity we've planned for.",
  },
  {
    q: "Will there be prayer facilities on-site?",
    a: "Yes. A dedicated prayer space is available for the day, and the schedule is built around prayer times rather than around it.",
  },
  {
    q: "Is the food halal?",
    a: "Yes, all catering is 100% halal by default.",
  },
  {
    q: "Do I need to be Muslim to attend?",
    a: "No. MIS 1.0 is open to anyone who wants to build alongside and support Muslim founders in tech. Our community and values are rooted in Islam, and everyone is welcome.",
  },
  {
    q: "What's the dress code?",
    a: "Smart casual. It's a working day, not a gala modest dress is appreciated and in keeping with the spirit of the event.",
  },
  {
    q: "Are tickets refundable?",
    a: "Refundable up to 14 days before the event. After that, tickets are transferable to someone else at no extra cost just email us the new attendee's details.",
  },
  {
    q: "Will sessions be recorded?",
    a: "We're still finalizing AV for a room this size. If we're able to record, ticket holders will be the first to know join the newsletter below to stay looped in.",
  },
  {
    q: "What should I bring?",
    a: "A valid ID for check in, and a laptop if you're joining the buildathon block. Business cards or a way to share contact info are useful for the room.",
  },
];
