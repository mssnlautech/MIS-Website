"use client";

import { FormEvent, useState } from "react";
import { CheckmarkCircle02Icon, SentIcon } from "hugeicons-react";
import Reveal from "./Reveal";
import { submitHackathonRegistration } from "@/app/hackathon/actions";

const EXPERIENCE_OPTIONS = [
  "Beginner — first hackathon",
  "Intermediate — have built side projects",
  "Advanced — shipped products or won hackathons",
];

export default function HackathonForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [teamName, setTeamName] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [projectIdea, setProjectIdea] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const result = await submitHackathonRegistration({
        name,
        email,
        phone,
        teamName,
        projectIdea,
        skills,
        experience,
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
    name.trim() && email.trim() && phone.trim() && skills.trim() && experience;

  if (submitted) {
    return (
      <div className="flex w-full max-w-2xl flex-col items-center gap-5 rounded-3xl border border-gold-400/40 bg-brand-900/50 p-10 text-center animate-tick">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-400 text-brand-950">
          <CheckmarkCircle02Icon size={32} />
        </span>
        <h3 className="font-heading text-2xl font-semibold text-cream">
          You&apos;re in, {name.split(" ")[0]}.
        </h3>
        <p className="max-w-md text-sm leading-6 text-cream-dim">
          We&apos;ve registered you for the buildathon. Keep an eye on {email}{" "}
          for updates on schedule, venue, and team matching.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setError(null);
            setName("");
            setEmail("");
            setPhone("");
            setTeamName("");
            setSkills("");
            setExperience("");
            setProjectIdea("");
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
      <Reveal>
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
              Team name
            </span>
            <input
              type="text"
              placeholder="Leave blank if registering solo"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full rounded-full border border-brand-700 bg-brand-950/60 px-4 py-3 text-sm text-cream placeholder:text-cream-dim/60 outline-none transition-colors duration-200 focus:border-gold-400"
            />
          </label>
        </div>
      </Reveal>

      <Reveal delay={60}>
        <div className="flex flex-col gap-5 rounded-3xl border border-brand-800 bg-brand-900/40 p-6 transition-colors duration-300 hover:border-brand-700 sm:p-8">
          <h3 className="font-heading text-lg font-semibold text-cream">
            Skills &amp; experience
          </h3>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-cream">
              Skills &amp; tech stack<span className="text-gold-400"> *</span>
            </span>
            <textarea
              required
              rows={3}
              placeholder="e.g. React, Python, UI design, data analysis"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full rounded-2xl border border-brand-700 bg-brand-950/60 px-4 py-3 text-sm text-cream placeholder:text-cream-dim/60 outline-none transition-colors duration-200 focus:border-gold-400"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-cream">
              Experience level<span className="text-gold-400"> *</span>
            </span>
            <select
              required
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full rounded-full border border-brand-700 bg-brand-950/60 px-4 py-3 text-sm text-cream outline-none transition-colors duration-200 focus:border-gold-400"
            >
              <option value="" disabled>
                Select your experience level
              </option>
              {EXPERIENCE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-cream">
              Project idea
            </span>
            <textarea
              rows={3}
              placeholder="Already have something in mind? Brief us. You can also form ideas on the day."
              value={projectIdea}
              onChange={(e) => setProjectIdea(e.target.value)}
              className="w-full rounded-2xl border border-brand-700 bg-brand-950/60 px-4 py-3 text-sm text-cream placeholder:text-cream-dim/60 outline-none transition-colors duration-200 focus:border-gold-400"
            />
          </label>
        </div>
      </Reveal>

      <div className="flex flex-col items-center gap-4 rounded-3xl border border-brand-800 bg-brand-900/30 p-6 text-center">
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
          {submitting ? "Submitting…" : "Register for Buildathon"}
          <SentIcon
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5"
          />
        </button>
      </div>
    </form>
  );
}
