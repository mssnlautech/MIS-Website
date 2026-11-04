"use client";

import { FormEvent, useState } from "react";
import { CheckmarkCircle02Icon, SentIcon } from "hugeicons-react";
import { submitPartnerInquiry } from "@/app/partner/actions";

const PARTNERSHIP_TYPES = [
  "Sponsor — financial or in-kind support",
  "Media Partner — coverage and promotion",
  "Community Partner — cross-community collaboration",
  "Venue / Logistics Partner",
  "Other",
];

export default function PartnerForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [partnershipType, setPartnershipType] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const result = await submitPartnerInquiry({
        name,
        email,
        phone,
        organization,
        partnershipType,
        message,
      });
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
    name.trim() &&
    email.trim() &&
    phone.trim() &&
    organization.trim() &&
    partnershipType &&
    message.trim();

  if (submitted) {
    return (
      <div className="flex w-full max-w-2xl flex-col items-center gap-5 rounded-3xl border border-gold-400/40 bg-brand-900/50 p-10 text-center animate-tick">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-400 text-brand-950">
          <CheckmarkCircle02Icon size={32} />
        </span>
        <h3 className="font-heading text-2xl font-semibold text-cream">
          Thanks, {name.split(" ")[0]}.
        </h3>
        <p className="max-w-md text-sm leading-6 text-cream-dim">
          We&apos;ve received your partnership inquiry. Our team will review it
          and get back to you at {email} shortly.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setError(null);
            setName("");
            setEmail("");
            setPhone("");
            setOrganization("");
            setPartnershipType("");
            setMessage("");
          }}
          className="mt-2 text-xs font-medium text-gold-300 underline-offset-4 transition-colors hover:text-gold-200 hover:underline"
        >
          Submit another response
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-3xl flex-col gap-10"
    >
      <div className="flex flex-col gap-5 rounded-3xl border border-brand-800 bg-brand-900/40 p-6 transition-colors duration-300 hover:border-brand-700 sm:p-8">
        <h3 className="font-heading text-lg font-semibold text-cream">
          Your details
        </h3>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-cream">
              Full name<span className="text-gold-400"> *</span>
            </span>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-full border border-brand-700 bg-brand-950/60 px-4 py-3 text-sm text-cream placeholder:text-cream-dim/60 outline-none transition-colors duration-200 focus:border-gold-400"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-cream">
              Email<span className="text-gold-400"> *</span>
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-full border border-brand-700 bg-brand-950/60 px-4 py-3 text-sm text-cream placeholder:text-cream-dim/60 outline-none transition-colors duration-200 focus:border-gold-400"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-cream">
              Phone number<span className="text-gold-400"> *</span>
            </span>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-full border border-brand-700 bg-brand-950/60 px-4 py-3 text-sm text-cream placeholder:text-cream-dim/60 outline-none transition-colors duration-200 focus:border-gold-400"
            />
          </label>
        </div>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-cream">
            Organization / Company<span className="text-gold-400"> *</span>
          </span>
          <input
            type="text"
            required
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            className="w-full rounded-full border border-brand-700 bg-brand-950/60 px-4 py-3 text-sm text-cream placeholder:text-cream-dim/60 outline-none transition-colors duration-200 focus:border-gold-400"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-cream">
            Partnership type<span className="text-gold-400"> *</span>
          </span>
          <select
            required
            value={partnershipType}
            onChange={(e) => setPartnershipType(e.target.value)}
            className="w-full rounded-full border border-brand-700 bg-brand-950/60 px-4 py-3 text-sm text-cream outline-none transition-colors duration-200 focus:border-gold-400 appearance-none"
          >
            <option value="" disabled>
              Select a partnership type
            </option>
            {PARTNERSHIP_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-cream">
            How would you like to partner with us?
            <span className="text-gold-400"> *</span>
          </span>
          <textarea
            required
            rows={4}
            placeholder="Tell us about your organization and what kind of partnership you have in mind."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-3xl border border-brand-700 bg-brand-950/60 px-4 py-3 text-sm text-cream placeholder:text-cream-dim/60 outline-none transition-colors duration-200 focus:border-gold-400"
          />
        </label>
      </div>

      <div className="flex flex-col items-center gap-4 rounded-3xl border border-brand-800 bg-brand-900/30 p-6 text-center">
        <p className="text-sm text-cream-dim">
          Submitting sends your inquiry to the MIS organizing team for review.
        </p>
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
          {submitting ? "Submitting…" : "Submit Inquiry"}
          <SentIcon
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5"
          />
        </button>
      </div>
    </form>
  );
}
