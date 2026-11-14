"use server";

import { withDb } from "@/lib/db";
import { cleanText, firstTooLong, isEmail, isUniqueViolation } from "@/lib/form-input";
import {
  PITCHATHON,
  PROPOSAL_FIELDS,
  PROPOSAL_MAX_LENGTH,
  isPitchathonRegistrationOpen,
  type ProposalKey,
} from "@/lib/pitchathon";

export type PitchathonMember = {
  name: string;
  email: string;
  phone: string;
};

export type PitchathonRegistrationInput = {
  teamName: string;
  /** The first member is the team lead. */
  members: PitchathonMember[];
  proposal: Record<ProposalKey, string>;
};

export type PitchathonRegistrationResult = { ok: true } | { ok: false; error: string };

export async function submitPitchathonRegistration(
  input: PitchathonRegistrationInput
): Promise<PitchathonRegistrationResult> {
  if (!isPitchathonRegistrationOpen()) {
    return { ok: false, error: "Pitchathon registration has closed." };
  }

  const teamName = cleanText(input?.teamName);
  const rawProposal = (input?.proposal ?? {}) as Record<string, unknown>;
  const proposal = PROPOSAL_FIELDS.map((f) => ({ ...f, value: cleanText(rawProposal[f.key]) }));
  const rawMembers: unknown[] = Array.isArray(input?.members) ? input.members : [];
  const members: PitchathonMember[] = rawMembers.map((m) => {
    const member = (m ?? {}) as Record<string, unknown>;
    return {
      name: cleanText(member.name),
      email: cleanText(member.email).toLowerCase(),
      phone: cleanText(member.phone),
    };
  });

  if (members.length < PITCHATHON.teamMin || members.length > PITCHATHON.teamMax) {
    return {
      ok: false,
      error: `Teams must have ${PITCHATHON.teamMin} to ${PITCHATHON.teamMax} members.`,
    };
  }

  if (
    !teamName ||
    proposal.some((f) => !f.value) ||
    members.some((m) => !m.name || !m.email || !m.phone)
  ) {
    return { ok: false, error: "Please fill in all required fields." };
  }

  const badEmail = members.find((m) => !isEmail(m.email));
  if (badEmail) {
    return { ok: false, error: `"${badEmail.email}" is not a valid email address.` };
  }

  const emails = members.map((m) => m.email);
  if (new Set(emails).size !== emails.length) {
    return { ok: false, error: "Each team member needs their own email address." };
  }

  const tooLong = firstTooLong([
    { label: "Team name", value: teamName, max: 120 },
    ...proposal.map((f) => ({ label: f.label, value: f.value, max: PROPOSAL_MAX_LENGTH })),
    ...members.flatMap((m, i) => [
      { label: `Member ${i + 1} name`, value: m.name, max: 120 },
      { label: `Member ${i + 1} email`, value: m.email, max: 254 },
      { label: `Member ${i + 1} phone`, value: m.phone, max: 30 },
    ]),
  ]);
  if (tooLong) {
    return { ok: false, error: `${tooLong} is too long.` };
  }

  const lead = members[0];
  // Column names come from PROPOSAL_FIELDS (a constant), never from user input.
  const columns = ["name", "email", "phone", "team_name", "members", ...proposal.map((f) => f.column)];
  const values = [lead.name, lead.email, lead.phone, teamName, JSON.stringify(members), ...proposal.map((f) => f.value)];
  const placeholders = columns.map((c, i) => (c === "members" ? `$${i + 1}::jsonb` : `$${i + 1}`));

  try {
    const taken = await withDb(async (db) => {
      // Someone already on another team, as its lead or as a member.
      const { rows } = await db.query<{ email: string }>(
        `select e.email
           from unnest($1::text[]) as e(email)
          where exists (
            select 1 from hackathon_registrations r
             where lower(r.email) = e.email
                or exists (
                  select 1 from jsonb_array_elements(coalesce(r.members, '[]'::jsonb)) m
                   where lower(m->>'email') = e.email
                )
          )
          limit 1`,
        [emails]
      );
      if (rows.length > 0) return rows[0].email;

      await db.query(
        `insert into hackathon_registrations (${columns.join(", ")})
         values (${placeholders.join(", ")})`,
        values
      );
      return null;
    });

    if (taken) {
      return { ok: false, error: `${taken} is already registered on a Pitchathon team.` };
    }
  } catch (error) {
    console.error("Pitchathon registration submission error:", error);
    if (isUniqueViolation(error)) {
      return { ok: false, error: `${lead.email} is already registered on a Pitchathon team.` };
    }
    return { ok: false, error: "Something went wrong — please try again." };
  }

  return { ok: true };
}
