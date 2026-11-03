import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionToken, ADMIN_COOKIE_NAME } from "@/lib/admin-auth";
import { withDb } from "@/lib/db";
import { formatNaira } from "@/lib/admin-format";

const ALLOWED_TABLES = ["volunteers", "speakers", "tickets"] as const;
type ExportTable = (typeof ALLOWED_TABLES)[number];

/** Escape a value for CSV (RFC 4180). */
function csvCell(value: unknown): string {
  if (value == null) return "";
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function csvRow(cells: unknown[]): string {
  return cells.map(csvCell).join(",");
}

function formatDate(d: Date | string | null): string {
  if (!d) return "";
  return new Date(d).toLocaleString("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

async function exportVolunteers(): Promise<string> {
  return withDb(async (db) => {
    const { rows } = await db.query<{
      name: string;
      email: string;
      phone: string;
      department: string;
      roles: string[];
      availability: string | null;
      created_at: Date;
    }>(
      `SELECT name, email, phone, department, roles, availability, created_at
       FROM volunteer_applications ORDER BY created_at DESC`
    );

    const header = csvRow([
      "Name",
      "Email",
      "Phone",
      "Department",
      "Roles",
      "Availability",
      "Submitted",
    ]);
    const lines = rows.map((r) =>
      csvRow([
        r.name,
        r.email,
        r.phone,
        r.department,
        (r.roles ?? []).join("; "),
        r.availability ?? "",
        formatDate(r.created_at),
      ])
    );

    return [header, ...lines].join("\n");
  });
}

async function exportSpeakers(): Promise<string> {
  return withDb(async (db) => {
    const { rows } = await db.query<{
      fields: Record<string, string>;
      created_at: Date;
    }>(
      `SELECT fields, created_at FROM call_form_submissions
       WHERE form_type = 'speaker' ORDER BY created_at DESC`
    );

    // Derive columns from all submissions so no field is missed.
    const columns: string[] = [];
    for (const row of rows) {
      for (const key of Object.keys(row.fields)) {
        if (!columns.includes(key)) columns.push(key);
      }
    }

    const header = csvRow([...columns, "Submitted"]);
    const lines = rows.map((r) =>
      csvRow([...columns.map((col) => r.fields[col] ?? ""), formatDate(r.created_at)])
    );

    return [header, ...lines].join("\n");
  });
}

async function exportTickets(): Promise<string> {
  return withDb(async (db) => {
    const { rows } = await db.query<{
      reference: string;
      email: string | null;
      tier: string | null;
      amount_kobo: number | null;
      status: string;
      paid_at: Date | null;
      created_at: Date;
    }>(
      `SELECT reference, email, tier, amount_kobo, status, paid_at, created_at
       FROM ticket_orders ORDER BY created_at DESC`
    );

    const header = csvRow([
      "Reference",
      "Email",
      "Tier",
      "Amount",
      "Status",
      "Paid At",
      "Created At",
    ]);
    const lines = rows.map((r) =>
      csvRow([
        r.reference,
        r.email ?? "",
        r.tier ?? "",
        formatNaira(r.amount_kobo),
        r.status,
        formatDate(r.paid_at),
        formatDate(r.created_at),
      ])
    );

    return [header, ...lines].join("\n");
  });
}

const exporters: Record<ExportTable, () => Promise<string>> = {
  volunteers: exportVolunteers,
  speakers: exportSpeakers,
  tickets: exportTickets,
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ table: string }> }
) {
  // Auth check — only logged-in admins may export.
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { table } = await params;

  if (!ALLOWED_TABLES.includes(table as ExportTable)) {
    return NextResponse.json({ error: "Invalid table" }, { status: 400 });
  }

  try {
    const csv = await exporters[table as ExportTable]();
    const filename = `mis-${table}-${new Date().toISOString().slice(0, 10)}.csv`;

    return new Response(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error(`CSV export failed for "${table}":`, error);
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}

