"use server";

import { withDb } from "@/lib/db";
import { cleanText, firstTooLong, isEmail, isUniqueViolation } from "@/lib/form-input";

export type HackathonRegistrationInput = {
  name: string;
  email: string;
  phone: string;
  teamName: string;
  projectIdea: string;
  skills: string;
  experience: string;
};

export type HackathonRegistrationResult = { ok: true } | { ok: false; error: string };

export async function submitHackathonRegistration(
  input: HackathonRegistrationInput
): Promise<HackathonRegistrationResult> {
  const name = cleanText(input?.name);
  const email = cleanText(input?.email).toLowerCase();
  const phone = cleanText(input?.phone);
  const teamName = cleanText(input?.teamName);
  const projectIdea = cleanText(input?.projectIdea);
  const skills = cleanText(input?.skills);
  const experience = cleanText(input?.experience);

  if (!name || !email || !phone || !skills || !experience) {
    return { ok: false, error: "Please fill in all required fields." };
  }

  if (!isEmail(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  const tooLong = firstTooLong([
    { label: "Name", value: name, max: 120 },
    { label: "Email", value: email, max: 254 },
    { label: "Phone", value: phone, max: 30 },
    { label: "Team name", value: teamName, max: 120 },
    { label: "Project idea", value: projectIdea, max: 2000 },
    { label: "Skills", value: skills, max: 500 },
    { label: "Experience", value: experience, max: 100 },
  ]);
  if (tooLong) {
    return { ok: false, error: `${tooLong} is too long.` };
  }

  try {
    await withDb((db) =>
      db.query(
        `insert into hackathon_registrations (name, email, phone, team_name, project_idea, skills, experience)
         values ($1, $2, $3, $4, $5, $6, $7)`,
        [name, email, phone, teamName || null, projectIdea || null, skills, experience]
      )
    );
  } catch (error) {
    if (isUniqueViolation(error)) {
      return { ok: false, error: "This email is already registered for the Buildathon." };
    }
    return { ok: false, error: "Something went wrong — please try again." };
  }

  return { ok: true };
}
