import { Stethoscope } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 px-4 py-12">
      <Link
        href="/"
        className="mb-8 flex items-center gap-2 text-xl font-semibold tracking-tight"
      >
        <Stethoscope className="size-7 text-primary" />
        <span>Recruitment Maneuver</span>
      </Link>
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
