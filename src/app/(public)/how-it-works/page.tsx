import type { Metadata } from "next";
import Link from "next/link";
import {
  UserCircle,
  FolderPlus,
  BarChart3,
  Scale,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "How It Works | Recruitment Maneuver",
  description:
    "Learn how Recruitment Maneuver helps PCCM physicians track, score, compare, and decide on career opportunities in four simple steps.",
};

const steps = [
  {
    number: 1,
    icon: UserCircle,
    title: "Create Your Profile & Set Preferences",
    description:
      "Tell us about your training background, board certifications, and what matters most to you in a position. Set weighted priorities across categories like compensation, geography, call schedule, academic affiliation, and procedural volume so the platform knows what to optimize for.",
  },
  {
    number: 2,
    icon: FolderPlus,
    title: "Add Opportunities",
    description:
      "Enter opportunities as you discover them. Capture key details -- institution, location, compensation, call structure, ICU model, procedural access, and more. Keep everything organized with status tracking, notes, and contact information in one central hub.",
  },
  {
    number: 3,
    icon: BarChart3,
    title: "Get Fit Scores",
    description:
      "Each opportunity is automatically scored against your stated preferences and weighted priorities. See at a glance which positions align best with what you are looking for, with transparent breakdowns by category so you understand exactly why a score is what it is.",
  },
  {
    number: 4,
    icon: Scale,
    title: "Compare & Decide",
    description:
      "Place your top opportunities side-by-side in a structured comparison view. Evaluate trade-offs across every dimension, review your fit scores, and make a confident, well-informed decision about your next career move.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            How It Works
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            From first profile setup to final decision, Recruitment Maneuver
            guides you through a structured process in four clear steps.
          </p>
        </div>

        {/* Steps */}
        <div className="mx-auto mt-16 max-w-3xl space-y-8">
          {steps.map((step) => (
            <Card key={step.number} className="relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/20" />
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                    {step.number}
                  </div>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <step.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pl-6 sm:pl-[calc(1.5rem+4rem)]">
                <CardDescription className="text-base leading-7">
                  {step.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground">
            Ready to bring structure to your search?
          </p>
          <div className="mt-6">
            <Button size="lg" asChild>
              <Link href="/signup">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
