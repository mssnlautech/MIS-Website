import { withDb } from "@/lib/db";
import { formatDateTime } from "@/lib/admin-format";
import ExportButton from "@/components/ExportButton";

export const dynamic = "force-dynamic";

type PartnerInquiry = {
  id: string;
  created_at: Date;
  name: string;
  email: string;
  phone: string;
  organization: string;
  partnership_type: string;
  message: string;
};

export default async function AdminPartnersPage() {
  let inquiries: PartnerInquiry[] = [];
  let loadError: string | null = null;

  try {
    inquiries = await withDb(async (db) => {
      const { rows } = await db.query<PartnerInquiry>(
        `select * from partner_inquiries order by created_at desc`
      );
      return rows;
    });
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Unknown error";
  }

  if (loadError) {
    return <p className="text-sm text-red-400">Failed to load partner inquiries: {loadError}</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-xl font-semibold text-cream">
          Partner inquiries ({inquiries.length})
        </h1>
        {inquiries.length > 0 && <ExportButton table="partners" />}
      </div>
      {inquiries.length === 0 ? (
        <p className="text-sm text-cream-dim">No partner inquiries yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-brand-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-900/60 text-cream-dim">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Organization</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Message</th>
                <th className="px-4 py-3 font-medium">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inquiry) => (
                <tr key={inquiry.id} className="border-t border-brand-800 bg-brand-900/40 align-top">
                  <td className="px-4 py-3 text-cream">{inquiry.name}</td>
                  <td className="px-4 py-3 text-cream-dim">{inquiry.email}</td>
                  <td className="px-4 py-3 text-cream-dim">{inquiry.phone}</td>
                  <td className="px-4 py-3 text-cream-dim">{inquiry.organization}</td>
                  <td className="px-4 py-3 text-cream-dim">{inquiry.partnership_type}</td>
                  <td className="px-4 py-3 text-cream-dim min-w-64 max-w-md whitespace-pre-wrap break-words">{inquiry.message}</td>
                  <td className="px-4 py-3 font-mono text-xs text-cream-dim">
                    {formatDateTime(inquiry.created_at)}
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
