"use client";

import { FormEvent, useState } from "react";
import { SentIcon } from "hugeicons-react";
import Button from "./Button";
import { submitCallFormEntry } from "@/app/speak/actions";

export type CallFormField = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea";
  placeholder?: string;
  required?: boolean;
};

export default function CallForm({
  formType,
  recipientEmail,
  subjectPrefix,
  fields,
  submitLabel,
}: {
  formType: string;
  recipientEmail: string;
  subjectPrefix: string;
  fields: CallFormField[];
  submitLabel: string;
}) {
  const [values, setValues] = useState<Record<string, string>>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name = values["name"] || "Someone";
    const subject = `${subjectPrefix} — ${name}`;
    const labeledFields = Object.fromEntries(
      fields.map((field) => [field.label, values[field.name] || ""])
    );

    try {
      await submitCallFormEntry(formType, labeledFields);
    } catch {
    }

    const body = fields
      .map((field) => `${field.label}: ${values[field.name] || "—"}`)
      .join("\n\n");
    window.location.href = `mailto:${recipientEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-xl flex-col gap-5 rounded-3xl border border-brand-800 bg-brand-900/40 p-8 transition-colors duration-300 hover:border-brand-700"
    >
      {fields.map((field) => (
        <label key={field.name} className="flex flex-col gap-2">
          <span className="text-sm font-medium text-cream">
            {field.label}
            {field.required && <span className="text-gold-400"> *</span>}
          </span>
          {field.type === "textarea" ? (
            <textarea
              required={field.required}
              placeholder={field.placeholder}
              rows={4}
              value={values[field.name] || ""}
              onChange={(e) =>
                setValues((v) => ({ ...v, [field.name]: e.target.value }))
              }
              className="w-full resize-none rounded-2xl border border-brand-700 bg-brand-950/60 px-4 py-3 text-sm text-cream placeholder:text-cream-dim/60 outline-none transition-colors duration-200 focus:border-gold-400"
            />
          ) : (
            <input
              type={field.type}
              required={field.required}
              placeholder={field.placeholder}
              value={values[field.name] || ""}
              onChange={(e) =>
                setValues((v) => ({ ...v, [field.name]: e.target.value }))
              }
              className="w-full rounded-full border border-brand-700 bg-brand-950/60 px-4 py-3 text-sm text-cream placeholder:text-cream-dim/60 outline-none transition-colors duration-200 focus:border-gold-400"
            />
          )}
        </label>
      ))}
      <Button type="submit" className="mt-2 w-full">
        {submitLabel}
        <SentIcon
          size={16}
          className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5"
        />
      </Button>
      <p className="text-center text-xs text-cream-dim">
        This opens your email client with everything pre-filled — nothing is
        sent until you hit send.
      </p>
    </form>
  );
}
