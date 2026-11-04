"use server";

import { withDb } from "@/lib/db";
import { cleanText, firstTooLong, isEmail } from "@/lib/form-input";

export type PartnerInquiryInput = {
  name: string;
  email: string;
  phone: string;
  organization: string;
  partnershipType: string;
  message: string;
};

export type PartnerInquiryResult = { ok: true } | { ok: false; error: string };

export async function submitPartnerInquiry(
  input: PartnerInquiryInput
): Promise<PartnerInquiryResult> {
  const name = cleanText(input?.name);
  const email = cleanText(input?.email);
  const phone = cleanText(input?.phone);
  const organization = cleanText(input?.organization);
  const partnershipType = cleanText(input?.partnershipType);
  const message = cleanText(input?.message);

  if (!name || !email || !phone || !organization || !partnershipType || !message) {
    return { ok: false, error: "Please fill in all required fields." };
  }

  if (!isEmail(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  const tooLong = firstTooLong([
    { label: "Name", value: name, max: 120 },
    { label: "Email", value: email, max: 254 },
    { label: "Phone", value: phone, max: 30 },
    { label: "Organization", value: organization, max: 200 },
    { label: "Partnership type", value: partnershipType, max: 100 },
    { label: "Message", value: message, max: 5000 },
  ]);
  if (tooLong) {
    return { ok: false, error: `${tooLong} is too long.` };
  }

  try {
    await withDb((db) =>
      db.query(
        `insert into partner_inquiries (name, email, phone, organization, partnership_type, message)
         values ($1, $2, $3, $4, $5, $6)`,
        [name, email, phone, organization, partnershipType, message]
      )
    );
  } catch {
    return { ok: false, error: "Something went wrong — please try again." };
  }

  return { ok: true };
}
