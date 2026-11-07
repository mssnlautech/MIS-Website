"use client";

import { FormEvent, ReactNode, useState } from "react";
import {
  Add01Icon,
  ArrowRight02Icon,
  CheckmarkCircle02Icon,
  Delete02Icon,
  SentIcon,
} from "hugeicons-react";
import Reveal from "./Reveal";
import { submitPitchathonRegistration, type PitchathonMember } from "@/app/pitchathon/actions";
import { EVENT } from "@/lib/data";
import { PITCHATHON, PROPOSAL_FIELDS, type ProposalKey } from "@/lib/pitchathon";

const INPUT_CLASS =
  "w-full rounded-full border border-brand-700 bg-brand-950/60 px-4 py-3 text-sm text-cream placeholder:text-cream-dim/60 outline-none transition-colors duration-200 focus:border-gold-400";
const TEXTAREA_CLASS =
  "w-full rounded-2xl border border-brand-700 bg-brand-950/60 px-4 py-3 text-sm text-cream placeholder:text-cream-dim/60 outline-none transition-colors duration-200 focus:border-gold-400";
const CARD_CLASS =
  "flex flex-col gap-5 rounded-3xl border border-brand-800 bg-brand-900/40 p-6 transition-colors duration-300 hover:border-brand-700 sm:p-8";

const emptyMember = (): PitchathonMember => ({ name: "", email: "", phone: "" });
const initialMembers = () =>
  Array.from({ length: PITCHATHON.teamMin }, emptyMember);
const emptyProposal = () =>
  Object.fromEntries(PROPOSAL_FIELDS.map((f) => [f.key, ""])) as Record<ProposalKey, string>;

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-cream">
        {label}
        {required && <span className="text-gold-400"> *</span>}
      </span>
      {hint && <span className="-mt-1 text-xs leading-5 text-cream-dim">{hint}</span>}
      {children}
    </label>
  );
}

export default function PitchathonForm() {
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState<PitchathonMember[]>(initialMembers);
  const [proposal, setProposal] = useState<Record<ProposalKey, string>>(emptyProposal);
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateMember(index: number, field: keyof PitchathonMember, value: string) {
    setMembers((prev) => prev.map((m, i) => (i === index ? { ...m, [field]: value } : m)));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const result = await submitPitchathonRegistration({ teamName, members, proposal });
      if (result.ok) {
        setSubmitted(true);
      } else {
        setError(result.error);
      }
    } catch {
      setError("Something went wrong — please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const canSubmit =
    teamName.trim() &&
    PROPOSAL_FIELDS.every((f) => proposal[f.key].trim()) &&
    agreed &&
    members.every((m) => m.name.trim() && m.email.trim() && m.phone.trim());

  if (submitted) {
    return (
      <div className="flex w-full max-w-2xl flex-col items-center gap-5 rounded-3xl border border-gold-400/40 bg-brand-900/50 p-10 text-center animate-tick">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-400 text-brand-950">
          <CheckmarkCircle02Icon size={32} />
        </span>
        <h3 className="font-heading text-2xl font-semibold text-cream">
          {teamName} is registered.
        </h3>
        <p className="max-w-md text-sm leading-6 text-cream-dim">
          One more step: <strong className="text-cream">every team member</strong> needs
          their own MIS 1.0 ticket to complete registration. Screening results and
          semi-final details will go to {members[0].email}.
        </p>
        <a
          href={EVENT.ticketsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold-400 px-6 py-3 text-sm font-semibold tracking-wide text-brand-950 transition-all duration-200 hover:scale-[1.03] hover:bg-gold-300"
        >
          Get tickets for your team
          <ArrowRight02Icon
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </a>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setError(null);
            setTeamName("");
            setMembers(initialMembers());
            setProposal(emptyProposal());
            setAgreed(false);
          }}
          className="mt-2 text-xs font-medium text-gold-300 underline-offset-4 transition-colors hover:text-gold-200 hover:underline"
        >
          Register another team
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-3xl flex-col gap-10">
      <Reveal>
        <div className={CARD_CLASS}>
          <div className="flex flex-col gap-1">
            <h3 className="font-heading text-lg font-semibold text-cream">Your team</h3>
            <p className="text-sm leading-6 text-cream-dim">
              {PITCHATHON.teamMin} to {PITCHATHON.teamMax} members. The first member is the
              team lead and our main contact.
            </p>
          </div>
          <Field label="Team name" required>
            <input
              type="text"
              required
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className={INPUT_CLASS}
            />
          </Field>

          {members.map((member, index) => (
            <fieldset
              key={index}
              aria-label={index === 0 ? "Team lead" : `Member ${index + 1}`}
              className="flex flex-col gap-4 rounded-2xl border border-brand-800 bg-brand-950/30 p-5"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-semibold text-gold-300">
                  {index === 0 ? "Team lead" : `Member ${index + 1}`}
                </span>
                {index >= PITCHATHON.teamMin && (
                  <button
                    type="button"
                    onClick={() => setMembers((prev) => prev.filter((_, i) => i !== index))}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-cream-dim transition-colors hover:text-red-400"
                  >
                    <Delete02Icon size={14} />
                    Remove
                  </button>
                )}
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Full name" required>
                  <input
                    type="text"
                    required
                    autoComplete={index === 0 ? "name" : "off"}
                    value={member.name}
                    onChange={(e) => updateMember(index, "name", e.target.value)}
                    className={INPUT_CLASS}
                  />
                </Field>
                <Field label="Email" required>
                  <input
                    type="email"
                    required
                    autoComplete={index === 0 ? "email" : "off"}
                    value={member.email}
                    onChange={(e) => updateMember(index, "email", e.target.value)}
                    className={INPUT_CLASS}
                  />
                </Field>
                <Field label="Phone number" required>
                  <input
                    type="tel"
                    required
                    autoComplete={index === 0 ? "tel" : "off"}
                    value={member.phone}
                    onChange={(e) => updateMember(index, "phone", e.target.value)}
                    className={INPUT_CLASS}
                  />
                </Field>
              </div>
            </fieldset>
          ))}

          {members.length < PITCHATHON.teamMax && (
            <button
              type="button"
              onClick={() => setMembers((prev) => [...prev, emptyMember()])}
              className="inline-flex items-center justify-center gap-2 self-start rounded-full border border-dashed border-brand-600 px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:border-gold-400 hover:text-gold-300"
            >
              <Add01Icon size={16} />
              Add a member ({members.length}/{PITCHATHON.teamMax})
            </button>
          )}
        </div>
      </Reveal>

      <Reveal delay={60}>
        <div className={CARD_CLASS}>
          <div className="flex flex-col gap-1">
            <h3 className="font-heading text-lg font-semibold text-cream">Your proposal</h3>
            <p className="text-sm leading-6 text-cream-dim">
              This is screened in the quarter-finals. A few rough sentences per point is fine,
              but answer every one: entries that miss a requirement don&apos;t advance. Write
              it yourselves, because entries are checked for AI-generated content and
              plagiarism.
            </p>
          </div>
          {PROPOSAL_FIELDS.map((field) => (
            <Field key={field.key} label={field.label} required hint={field.hint}>
              <textarea
                required
                rows={field.rows}
                value={proposal[field.key]}
                onChange={(e) =>
                  setProposal((prev) => ({ ...prev, [field.key]: e.target.value }))
                }
                className={TEXTAREA_CLASS}
              />
            </Field>
          ))}
        </div>
      </Reveal>

      <div className="flex flex-col items-center gap-5 rounded-3xl border border-brand-800 bg-brand-900/30 p-6 text-center">
        <label className="flex max-w-xl items-start gap-3 text-left text-sm leading-6 text-cream-dim">
          <input
            type="checkbox"
            required
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 accent-gold-400"
          />
          <span>
            Every member of our team will buy an MIS 1.0 ticket and be present in Ogbomoso on{" "}
            {PITCHATHON.finalLabel}. Our idea and writing are our own, and we agree to the
            Pitchathon rules above.
          </span>
        </label>
        {error && (
          <p className="text-sm text-red-400" role="alert">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={!canSubmit || submitting}
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold-400 px-6 py-3 text-sm font-semibold tracking-wide text-brand-950 shadow-[0_0_0_1px_rgba(212,162,76,0.4)] transition-all duration-200 hover:scale-[1.03] hover:bg-gold-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
        >
          {submitting ? "Submitting…" : "Register your team"}
          <SentIcon
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5"
          />
        </button>
      </div>
    </form>
  );
}
