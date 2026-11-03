"use client";

import { ArrowDown01Icon } from "hugeicons-react";

type ExportButtonProps = {
  /** Which admin table to export: "volunteers" | "speakers" | "tickets" */
  table: string;
  /** Optional button label override. */
  label?: string;
};

export default function ExportButton({ table, label = "Export CSV" }: ExportButtonProps) {
  return (
    <a
      href={`/api/admin/export/${table}`}
      download
      className="inline-flex items-center gap-2 rounded-full border border-brand-700 bg-brand-900/60 px-4 py-2 text-sm font-medium text-cream-dim transition-colors duration-200 hover:border-gold-400/40 hover:text-gold-300"
    >
      <ArrowDown01Icon size={16} />
      {label}
    </a>
  );
}
