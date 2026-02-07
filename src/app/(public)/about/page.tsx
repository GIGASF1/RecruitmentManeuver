import type { Metadata } from "next";
import { Stethoscope, Heart, Shield, Users } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About | Recruitment Maneuver",
  description:
    "Built by physicians, for physicians. Learn about the mission behind Recruitment Maneuver and why we focus exclusively on Pulmonary & Critical Care Medicine.",
};

const values = [
  {
    icon: Stethoscope,
    title: "Specialty-First",
    description:
      "We believe PCCM physicians deserve tools that reflect the complexity and nuance of their specialty, not diluted generic solutions.",
  },
  {
    icon: Heart,
    title: "Physician Autonomy",
    description:
      "Your career decisions should be yours. We give you the data, structure, and clarity to choose confidently on your own terms.",
  },
  {
    icon: Shield,
    title: "Privacy by Default",
    description:
      "Your job search is private. We do not share your data with recruiters, employers, or third parties. Your information stays yours.",
  },
  {
    icon: Users,
    title: "Built by Physicians",
    description:
      "Recruitment Maneuver was created by physicians who have been through the recruiting process and understand its pain points firsthand.",
  },
];

export default function AboutPage() {
  return (
    <div className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            About Recruitment Maneuver
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            The physician recruiting landscape is broken. Most platforms are
            built for recruiters, not candidates. We set out to change that
            for the specialty we know best.
          </p>
        </div>

        {/* Mission */}
        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight">
            Our Mission
          </h2>
          <div className="mt-4 space-y-4 text-muted-foreground leading-7">
            <p>
              Recruitment Maneuver exists to give Pulmonary &amp; Critical Care
              Medicine physicians a structured, transparent, and
              physician-centered way to manage their job search.
            </p>
            <p>
              Whether you are a fellow preparing for your first attending role
              or an experienced physician evaluating a career move, the process
              of comparing opportunities is overwhelming. Offers arrive in
              different formats, conversations happen at different speeds, and
              the criteria that matter -- ICU staffing models, procedural
              autonomy, call structures, research support -- are rarely
              presented in a way that enables clear comparison.
            </p>
            <p>
              We built Recruitment Maneuver to bring order to that process. Our
              platform lets you define what matters, score each opportunity
              against your personal priorities, and compare offers with the
              analytical rigor that PCCM physicians bring to clinical
              decision-making.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mx-auto mt-20 max-w-4xl">
          <h2 className="text-center text-2xl font-semibold tracking-tight">
            What We Stand For
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {values.map((value) => (
              <Card key={value.title}>
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <value.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
