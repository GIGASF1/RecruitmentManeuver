import { Stethoscope, Phone } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const physicianLinks = [
  { label: "For Physicians", href: "/physicians" },
  { label: "AI Screening", href: "/services/ai-screening" },
  { label: "Placement Services", href: "/services/placement" },
  { label: "Sign Up", href: "/signup" },
];

const employerLinks = [
  { label: "For Employers", href: "/employers" },
  { label: "Interview Agent", href: "/services/interview-agent" },
  { label: "Full-Package", href: "/services/full-package" },
  { label: "Pricing", href: "/pricing" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Log In", href: "/login" },
];

export function Footer() {
  return (
    <footer className="bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand */}
          <div>
            <div className="flex items-center gap-2">
              <Stethoscope className="h-6 w-6 text-blue-400" />
              <div>
                <span className="text-lg font-semibold text-white">
                  Recruitment Maneuver
                </span>
                <span className="ml-2 text-xs font-medium text-teal-400">
                  PCCM Recruiting
                </span>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              AI-powered recruiting built exclusively for Pulmonary &amp; Critical
              Care Medicine. Matching physicians to their ideal practice since day
              one.
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm text-slate-300">
              <Phone className="h-4 w-4 text-slate-400" />
              <span>(555) 123-4567</span>
            </div>
          </div>

          {/* Column 2: For Physicians */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
              For Physicians
            </h3>
            <ul className="mt-4 space-y-3">
              {physicianLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: For Employers */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
              For Employers
            </h3>
            <ul className="mt-4 space-y-3">
              {employerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-slate-800" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Recruitment Maneuver. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-xs text-slate-500 transition-colors hover:text-slate-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-xs text-slate-500 transition-colors hover:text-slate-300"
            >
              Terms of Service
            </Link>
            <span className="hidden text-xs text-slate-600 sm:inline">
              PCCM-First Recruiting Platform
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
