"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Menu,
  X,
  Stethoscope,
  ChevronDown,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const physicianLinks = [
  { href: "/physicians", label: "Overview" },
  { href: "/services/ai-screening", label: "AI Screening" },
  { href: "/services/placement", label: "Placement Services" },
  { href: "/how-it-works", label: "How It Works" },
];

const employerLinks = [
  { href: "/employers", label: "Overview" },
  { href: "/services/ai-screening", label: "AI Candidate Screening" },
  { href: "/services/interview-agent", label: "Interview Intelligence" },
  { href: "/services/full-package", label: "Full-Package Recruiting" },
  { href: "/pricing", label: "Pricing" },
];

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
];

export function PublicNavbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      {/* Top bar */}
      <div className="bg-slate-900 text-white">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 sm:px-6 text-xs">
          <span className="hidden sm:block">The PCCM-First Recruiting Platform</span>
          <div className="flex items-center gap-4 ml-auto">
            <a href="tel:+18005551234" className="flex items-center gap-1 hover:text-blue-300 transition-colors">
              <Phone className="h-3 w-3" />
              (800) 555-1234
            </a>
            <Link href="/login" className="hover:text-blue-300 transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Stethoscope className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold leading-tight tracking-tight text-slate-900">
              Recruitment Maneuver
            </span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-blue-600">
              PCCM Recruiting
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          <DropdownNav
            label="For Physicians"
            links={physicianLinks}
            isActive={pathname.startsWith("/physicians") || pathname.startsWith("/services")}
            open={openDropdown === "physicians"}
            onOpen={() => setOpenDropdown("physicians")}
            onClose={() => setOpenDropdown(null)}
          />
          <DropdownNav
            label="For Employers"
            links={employerLinks}
            isActive={pathname.startsWith("/employers")}
            open={openDropdown === "employers"}
            onOpen={() => setOpenDropdown("employers")}
            onClose={() => setOpenDropdown(null)}
          />
          <DropdownNav
            label="Company"
            links={companyLinks}
            isActive={pathname === "/about" || pathname === "/how-it-works"}
            open={openDropdown === "company"}
            onOpen={() => setOpenDropdown("company")}
            onClose={() => setOpenDropdown(null)}
          />

          <div className="flex items-center gap-2 ml-4 pl-4 border-l">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
            <Button size="sm" variant="outline" className="border-teal-600 text-teal-700 hover:bg-teal-50" asChild>
              <Link href="/employers">Employers</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 rounded-md hover:bg-slate-100"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t bg-white px-4 pb-6">
          <MobileSection title="For Physicians" links={physicianLinks} onClose={() => setMobileOpen(false)} />
          <MobileSection title="For Employers" links={employerLinks} onClose={() => setMobileOpen(false)} />
          <MobileSection title="Company" links={companyLinks} onClose={() => setMobileOpen(false)} />
          <div className="pt-4 border-t flex flex-col gap-2">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

function DropdownNav({
  label,
  links,
  isActive,
  open,
  onOpen,
  onClose,
}: {
  label: string;
  links: { href: string; label: string }[];
  isActive: boolean;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button
        className={cn(
          "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          isActive ? "text-blue-600" : "text-slate-700 hover:text-blue-600"
        )}
      >
        {label}
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute left-0 top-full pt-1 z-50">
          <div className="w-56 rounded-lg border bg-white p-2 shadow-lg">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileSection({
  title,
  links,
  onClose,
}: {
  title: string;
  links: { href: string; label: string }[];
  onClose: () => void;
}) {
  return (
    <div className="py-3 border-b last:border-b-0">
      <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
        {title}
      </p>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-blue-50"
          onClick={onClose}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
