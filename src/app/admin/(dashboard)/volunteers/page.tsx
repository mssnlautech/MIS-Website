import { withDb } from "@/lib/db";
import { formatDateTime } from "@/lib/admin-format";
import ExportButton from "@/components/ExportButton";

export const dynamic = "force-dynamic";

type VolunteerApplication = {
  id: string;
  created_at: Date;
  name: string;
  email: string;
  phone: string;
  availability: string | null;
  department: string;
  roles: string[];
};

export default async function AdminVolunteersPage() {
  let applications: VolunteerApplication[] = [];
  let loadError: string | null = null;

  try {
    applications = await withDb(async (db) => {
      const { rows } = await db.query<VolunteerApplication>(
        `select * from volunteer_applications order by created_at desc`
      );
      return rows;
    });
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Unknown error";
  }

  if (loadError) {
    return <p className="text-sm text-red-400">Failed to load volunteers: {loadError}</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-xl font-semibold text-cream">
          Volunteer applications ({applications.length})
        </h1>
        {applications.length > 0 && <ExportButton table="volunteers" />}
      </div>
      {applications.length === 0 ? (
        <p className="text-sm text-cream-dim">No applications yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-brand-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-900/60 text-cream-dim">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Department</th>
                <th className="px-4 py-3 font-medium">Roles</th>
                <th className="px-4 py-3 font-medium">Availability</th>
                <th className="px-4 py-3 font-medium">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="border-t border-brand-800 bg-brand-900/40 align-top">
                  <td className="px-4 py-3 text-cream">{app.name}</td>
                  <td className="px-4 py-3 text-cream-dim">{app.email}</td>
                  <td className="px-4 py-3 text-cream-dim">{app.phone}</td>
                  <td className="px-4 py-3 text-cream-dim">{app.department}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1.5">
                      {app.roles.map((role) => (
                        <span
                          key={role}
                          className="rounded-full border border-brand-700 bg-brand-950/60 px-2.5 py-1 text-xs text-cream-dim"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-cream-dim">{app.availability || "—"}</td>
                  <td className="px-4 py-3 font-mono text-xs text-cream-dim">
                    {formatDateTime(app.created_at)}
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
