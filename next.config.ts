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
    ];
  },
};

export default nextConfig;
