import type { NextConfig } from "next";
import { EVENT } from "./src/lib/data";

const nextConfig: NextConfig = {
  // Tickets are sold on Bitooqoh for now; /register (Paystack tiers) is parked.
  async redirects() {
    return [
      {
        source: "/register",
        destination: EVENT.ticketsUrl,
        permanent: false,
      },
      // The Buildathon became the Pitchathon.
      { source: "/hackathon", destination: "/pitchathon", permanent: true },
      { source: "/admin/hackathon", destination: "/admin/pitchathon", permanent: true },
    ];
  },
};

export default nextConfig;
