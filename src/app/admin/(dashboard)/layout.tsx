import Link from "next/link";
import { ReactNode } from "react";
import { logout } from "./actions";

const NAV_LINKS = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/volunteers", label: "Volunteers" },
  { href: "/admin/speakers", label: "Speakers" },
  { href: "/admin/hackathon", label: "Buildathon" },
  { href: "/admin/partners", label: "Partners" },
  { href: "/admin/tickets", label: "Tickets" },
];

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-800 pb-6">
          <nav className="flex flex-wrap items-center gap-1 rounded-full bg-brand-900/60 p-1 text-cream-dim">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 hover:bg-brand-800 hover:text-gold-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <form action={logout}>
            <button
              type="submit"
              className="text-sm font-medium text-cream-dim underline-offset-4 transition-colors hover:text-gold-300 hover:underline"
            >
              Log out
            </button>
          </form>
        </div>
        {children}
      </div>
    </div>
  );
}
