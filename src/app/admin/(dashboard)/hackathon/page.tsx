import { withDb } from "@/lib/db";
import { formatDateTime } from "@/lib/admin-format";
import ExportButton from "@/components/ExportButton";

export const dynamic = "force-dynamic";

type HackathonRegistration = {
  id: string;
  created_at: Date;
  name: string;
  email: string;
  phone: string;
  team_name: string | null;
  project_idea: string | null;
  skills: string;
  experience: string;
};

export default async function AdminHackathonPage() {
  let registrations: HackathonRegistration[] = [];
  let loadError: string | null = null;

  try {
    registrations = await withDb(async (db) => {
      const { rows } = await db.query<HackathonRegistration>(
        `select * from hackathon_registrations order by created_at desc`
      );
      return rows;
    });
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Unknown error";
  }

  if (loadError) {
    return <p className="text-sm text-red-400">Failed to load registrations: {loadError}</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-xl font-semibold text-cream">
          Buildathon registrations ({registrations.length})
        </h1>
        {registrations.length > 0 && <ExportButton table="hackathon" />}
      </div>
      {registrations.length === 0 ? (
        <p className="text-sm text-cream-dim">No registrations yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-brand-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-900/60 text-cream-dim">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Team</th>
                <th className="px-4 py-3 font-medium">Skills</th>
                <th className="px-4 py-3 font-medium">Experience</th>
                <th className="px-4 py-3 font-medium">Project Idea</th>
                <th className="px-4 py-3 font-medium">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((reg) => (
                <tr key={reg.id} className="border-t border-brand-800 bg-brand-900/40 align-top">
                  <td className="px-4 py-3 text-cream">{reg.name}</td>
                  <td className="px-4 py-3 text-cream-dim">{reg.email}</td>
                  <td className="px-4 py-3 text-cream-dim">{reg.phone}</td>
                  <td className="px-4 py-3 text-cream-dim">{reg.team_name || "—"}</td>
                  <td className="px-4 py-3 text-cream-dim">{reg.skills}</td>
                  <td className="px-4 py-3 text-cream-dim">{reg.experience}</td>
                  <td className="px-4 py-3 text-cream-dim">{reg.project_idea || "—"}</td>
                  <td className="px-4 py-3 font-mono text-xs text-cream-dim">
                    {formatDateTime(reg.created_at)}
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
