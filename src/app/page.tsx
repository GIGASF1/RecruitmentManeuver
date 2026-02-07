import Link from "next/link";
import {
  ClipboardList,
  Target,
  Columns3,
  Sparkles,
  Stethoscope,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PublicNavbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const features = [
  {
    icon: ClipboardList,
    title: "Opportunity Tracking",
    description:
      "Organize every opportunity in one place. Track status, contacts, timelines, and notes so nothing slips through the cracks.",
  },
  {
    icon: Target,
    title: "Fit Scoring",
    description:
      "Rate each opportunity against the criteria that matter most to you -- compensation, geography, call schedule, academic vs. community, and more.",
  },
  {
    icon: Columns3,
    title: "Compare Side-by-Side",
    description:
      "See how opportunities stack up head-to-head with structured comparison views designed for physician decision-making.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Insights",
    description:
      "Get intelligent analysis of your opportunities, surface hidden trade-offs, and receive personalized recommendations.",
    comingSoon: true,
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicNavbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b bg-gradient-to-b from-background to-muted/30">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="secondary" className="mb-6 px-3 py-1 text-sm">
                Built exclusively for Pulmonary &amp; Critical Care
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                The PCCM-First Recruiting OS
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
                Take control of your job search. Track every opportunity, score
                each one against what matters to you, compare offers
                side-by-side, and make confident career decisions.
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" asChild>
                  <Link href="/signup">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/how-it-works">
                    Learn More
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Everything you need to navigate your search
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Purpose-built tools that help PCCM physicians evaluate
                opportunities with clarity and confidence.
              </p>
            </div>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Card
                  key={feature.title}
                  className="relative transition-shadow hover:shadow-md"
                >
                  {feature.comingSoon && (
                    <Badge
                      variant="outline"
                      className="absolute right-4 top-4 text-xs"
                    >
                      Coming Soon
                    </Badge>
                  )}
                  <CardHeader>
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Built for PCCM */}
        <section className="border-y bg-muted/30 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Stethoscope className="h-7 w-7 text-primary" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Built for PCCM
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Generic job boards and recruiting platforms treat all physician
                specialties the same. Recruitment Maneuver is different. We
                understand that PCCM physicians evaluate ICU coverage models,
                procedural volumes, bronchoscopy access, sleep lab structures,
                and academic versus community trade-offs that other platforms
                ignore entirely.
              </p>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                Every scoring category, comparison metric, and insight is
                tailored to the factors that Pulmonary &amp; Critical Care
                physicians actually weigh when choosing their next position.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Teaser */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Start free. Upgrade when you are ready.
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Track up to 5 opportunities at no cost. When you need unlimited
                tracking, AI-powered insights, and advanced comparison tools,
                upgrade to our Active plan.
              </p>
              <div className="mt-8">
                <Button variant="outline" size="lg" asChild>
                  <Link href="/pricing">
                    View Pricing
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
