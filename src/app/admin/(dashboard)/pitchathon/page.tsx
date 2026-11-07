import { withDb } from "@/lib/db";
import { formatDateTime } from "@/lib/admin-format";
import ExportButton from "@/components/ExportButton";
import { PROPOSAL_FIELDS, type ProposalColumn } from "@/lib/pitchathon";

export const dynamic = "force-dynamic";

type Member = { name: string; email: string; phone: string };

// Table keeps its original name; rows from the old Buildathon form have
// skills/experience and no members/problem.
type PitchathonRegistration = {
  id: string;
  created_at: Date;
  name: string;
  email: string;
  phone: string;
  team_name: string | null;
  members: Member[] | null;
  skills: string | null;
  experience: string | null;
} & Record<ProposalColumn, string | null>;

export default async function AdminPitchathonPage() {
  let registrations: PitchathonRegistration[] = [];
  let loadError: string | null = null;

  try {
    registrations = await withDb(async (db) => {
      const { rows } = await db.query<PitchathonRegistration>(
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

  const participants = registrations.reduce((sum, r) => sum + (r.members?.length || 1), 0);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-xl font-semibold text-cream">
          Pitchathon teams ({registrations.length}) · {participants} participants
        </h1>
        {registrations.length > 0 && <ExportButton table="pitchathon" />}
      </div>
      {registrations.length === 0 ? (
        <p className="text-sm text-cream-dim">No registrations yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-brand-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-900/60 text-cream-dim">
              <tr>
                <th className="px-4 py-3 font-medium">Team</th>
                <th className="px-4 py-3 font-medium">Members</th>
                <th className="px-4 py-3 font-medium">Proposal</th>
                <th className="px-4 py-3 font-medium">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((reg) => {
                const members = reg.members ?? [
                  { name: reg.name, email: reg.email, phone: reg.phone },
                ];
                return (
                  <tr key={reg.id} className="border-t border-brand-800 bg-brand-900/40 align-top">
                    <td className="px-4 py-3 font-medium text-cream">
                      {reg.team_name || "—"}
                      {!reg.members && (
                        <span className="mt-1 block text-xs font-normal text-gold-300">
                          Old Buildathon form
                        </span>
                      )}
                    </td>
                    <td className="min-w-64 px-4 py-3">
                      <ul className="flex flex-col gap-2">
                        {members.map((m, i) => (
                          <li key={m.email} className="flex flex-col">
                            <span className="text-cream">
                              {m.name}
                              {i === 0 && <span className="text-xs text-gold-300"> · lead</span>}
                            </span>
                            <span className="text-xs text-cream-dim">
                              {m.email} · {m.phone}
                            </span>
                          </li>
                        ))}
                      </ul>
                      {!reg.members && (reg.skills || reg.experience) && (
                        <p className="mt-2 text-xs text-cream-dim">
                          {[reg.skills, reg.experience].filter(Boolean).join(" · ")}
                        </p>
                      )}
                    </td>
                    <td className="min-w-96 px-4 py-3">
                      <dl className="flex flex-col gap-3">
                        {PROPOSAL_FIELDS.filter((f) => reg[f.column]).map((f) => (
                          <div key={f.key} className="flex flex-col gap-0.5">
                            <dt className="text-xs font-semibold text-gold-300">{f.label}</dt>
                            <dd className="whitespace-pre-line text-cream-dim">{reg[f.column]}</dd>
                          </div>
                        ))}
                      </dl>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-cream-dim">
                      {formatDateTime(reg.created_at)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
