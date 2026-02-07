import { Stethoscope } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Recruitment Maneuver
            </span>
          </div>
          <nav className="flex gap-6">
            <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
              About
            </Link>
            <Link href="/how-it-works" className="text-sm text-muted-foreground hover:text-primary">
              How It Works
            </Link>
            <Link href="/pricing" className="text-sm text-muted-foreground hover:text-primary">
              Pricing
            </Link>
          </nav>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Recruitment Maneuver. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
