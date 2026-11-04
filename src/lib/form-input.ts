// Server actions are public endpoints, so their input can be anything at runtime
// regardless of the TypeScript type. These helpers coerce it safely.

/** Trim a value that should be a string; non-strings become "". */
export function cleanText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/** Returns the label of the first field longer than its limit, or null. */
export function firstTooLong(
  fields: { label: string; value: string; max: number }[]
): string | null {
  return fields.find((f) => f.value.length > f.max)?.label ?? null;
}

/** Postgres unique_violation. */
export function isUniqueViolation(error: unknown): boolean {
  return (error as { code?: string } | null)?.code === "23505";
}
