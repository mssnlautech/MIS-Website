import { withDb } from "@/lib/db";
import { EVENT } from "@/lib/data";

export const dynamic = "force-dynamic";

/** Returns null when the query fails (e.g. a missing table) so it isn't mistaken for a real zero. */
async function safeCount(
  db: import("pg").Client,
  query: string
): Promise<number | null> {
  try {
    const res = await db.query<{ count: string }>(query);
    return Number(res.rows[0]?.count ?? 0);
  } catch (error) {
    console.error(`Admin count query failed: ${query}`, error);
    return null;
  }
}

async function getCounts() {
  return withDb(async (db) => {
    const [volunteers, speakers, tickets, hackathon, partners] = await Promise.all([
      safeCount(db, `select count(*) from volunteer_applications`),
      safeCount(
        db,
        `select count(*) from call_form_submissions where form_type = 'speaker'`
      ),
      safeCount(
        db,
        `select count(*) from ticket_orders where status = 'success'`
      ),
      safeCount(db, `select count(*) from hackathon_registrations`),
      safeCount(db, `select count(*) from partner_inquiries`),
    ]);

    return {
      volunteers,
      speakers,
      ticketsSold: tickets,
      hackathonRegistrations: hackathon,
      partnerInquiries: partners,
    };
  });
}

export default async function AdminOverviewPage() {
  let counts: Awaited<ReturnType<typeof getCounts>> = {
    volunteers: null,
    speakers: null,
    ticketsSold: null,
    hackathonRegistrations: null,
    partnerInquiries: null,
  };
  let loadError: string | null = null;

  try {
    counts = await getCounts();
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Unknown database connection error";
  }

  const seatsRemaining =
    counts.ticketsSold == null ? null : Math.max(EVENT.seats - counts.ticketsSold, 0);

  const stats = [
    { label: "Volunteer applications", value: counts.volunteers },
    { label: "Speaker submissions", value: counts.speakers },
    { label: "Buildathon registrations", value: counts.hackathonRegistrations },
    { label: "Partner inquiries", value: counts.partnerInquiries },
    { label: "Tickets sold", value: counts.ticketsSold },
    { label: "Seats remaining", value: seatsRemaining },
  ];
  const failedStats = loadError ? [] : stats.filter((stat) => stat.value == null);

  return (
    <div className="flex flex-col gap-6">
      {loadError && (
        <div className="rounded-2xl border border-red-500/30 bg-red-950/20 p-4 text-sm text-red-300">
          <p className="font-semibold">Database Connection Notice</p>
          <p className="mt-1 text-xs text-red-200/80">
            {loadError}. Please verify your network connection and that your Supabase instance is active.
          </p>
        </div>
      )}

      {failedStats.length > 0 && (
        <div className="rounded-2xl border border-red-500/30 bg-red-950/20 p-4 text-sm text-red-300">
          <p className="font-semibold">Some counts couldn&apos;t be loaded</p>
          <p className="mt-1 text-xs text-red-200/80">
            {failedStats.map((stat) => stat.label).join(", ")}. Check that db/schema.sql has been
            applied in Supabase and see the server logs for details.
          </p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col gap-2 rounded-3xl border border-brand-800 bg-brand-900/40 p-6"
          >
            <span className="text-sm text-cream-dim">{stat.label}</span>
            <span className="font-mono text-3xl font-semibold text-cream">
              {stat.value ?? "—"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
