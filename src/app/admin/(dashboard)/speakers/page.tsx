import { withDb } from "@/lib/db";
import { formatDateTime } from "@/lib/admin-format";
import ExportButton from "@/components/ExportButton";

export const dynamic = "force-dynamic";

type CallFormSubmission = {
  id: string;
  created_at: Date;
  form_type: string;
  fields: Record<string, string>;
};

export default async function AdminSpeakersPage() {
  let submissions: CallFormSubmission[] = [];
  let loadError: string | null = null;

  try {
    submissions = await withDb(async (db) => {
      const { rows } = await db.query<CallFormSubmission>(
        `select * from call_form_submissions where form_type = 'speaker' order by created_at desc`
      );
      return rows;
    });
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Unknown error";
  }

  if (loadError) {
    return <p className="text-sm text-red-400">Failed to load speaker submissions: {loadError}</p>;
  }

  const columns: string[] = [];
  for (const sub of submissions) {
    for (const label of Object.keys(sub.fields)) {
      if (!columns.includes(label)) columns.push(label);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-xl font-semibold text-cream">
          Speaker submissions ({submissions.length})
        </h1>
        {submissions.length > 0 && <ExportButton table="speakers" />}
      </div>
      {submissions.length === 0 ? (
        <p className="text-sm text-cream-dim">No submissions yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-brand-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-900/60 text-cream-dim">
              <tr>
                {columns.map((label) => (
                  <th key={label} className="px-4 py-3 font-medium">
                    {label}
                  </th>
                ))}
                <th className="px-4 py-3 font-medium">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub) => (
                <tr key={sub.id} className="border-t border-brand-800 bg-brand-900/40 align-top">
                  {columns.map((label) => (
                    <td key={label} className="max-w-xs px-4 py-3 text-cream-dim">
                      {sub.fields[label] || "—"}
                    </td>
                  ))}
                  <td className="px-4 py-3 font-mono text-xs text-cream-dim">
                    {formatDateTime(sub.created_at)}
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
