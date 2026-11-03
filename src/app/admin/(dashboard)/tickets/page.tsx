import { withDb } from "@/lib/db";
import { formatDateTime, formatNaira } from "@/lib/admin-format";
import ExportButton from "@/components/ExportButton";

export const dynamic = "force-dynamic";

type TicketOrder = {
  id: string;
  created_at: Date;
  reference: string;
  status: string;
  email: string | null;
  amount_kobo: number | null;
  tier: string | null;
  paid_at: Date | null;
};

export default async function AdminTicketsPage() {
  let orders: TicketOrder[] = [];
  let loadError: string | null = null;

  try {
    orders = await withDb(async (db) => {
      const { rows } = await db.query<TicketOrder>(
        `select id, created_at, reference, status, email, amount_kobo, tier, paid_at
         from ticket_orders order by created_at desc`
      );
      return rows;
    });
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Unknown error";
  }

  if (loadError) {
    return <p className="text-sm text-red-400">Failed to load ticket orders: {loadError}</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-xl font-semibold text-cream">
          Ticket orders ({orders.length})
        </h1>
        {orders.length > 0 && <ExportButton table="tickets" />}
      </div>
      {orders.length === 0 ? (
        <p className="text-sm text-cream-dim">
          No ticket orders yet — this fills in once the Paystack webhook is receiving real payments.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-brand-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-900/60 text-cream-dim">
              <tr>
                <th className="px-4 py-3 font-medium">Reference</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Tier</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Paid at</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t border-brand-800 bg-brand-900/40">
                  <td className="px-4 py-3 font-mono text-xs text-cream-dim">{order.reference}</td>
                  <td className="px-4 py-3 text-cream">{order.email || "—"}</td>
                  <td className="px-4 py-3 text-cream-dim">{order.tier || "—"}</td>
                  <td className="px-4 py-3 font-mono text-cream">{formatNaira(order.amount_kobo)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        order.status === "success"
                          ? "bg-gold-400/10 text-gold-300"
                          : "bg-brand-800 text-cream-dim"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-cream-dim">
                    {order.paid_at ? formatDateTime(order.paid_at) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
