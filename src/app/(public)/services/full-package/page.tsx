import type { Metadata } from "next";
import Link from "next/link";
import {
  Brain,
  MessageSquare,
  Users,
  FileText,
  Megaphone,
  Handshake,
  ShieldCheck,
  Clock,
  TrendingUp,
  DollarSign,
  Target,
  Award,
  ArrowRight,
  ChevronRight,
  Check,
  Zap,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Full-Package PCCM Recruiting | Recruitment Maneuver",
  description:
    "End-to-end PCCM recruiting solution with AI screening, interview intelligence, and dedicated placement support. Compare our service tiers and find the right fit.",
};

const tiers = [
  {
    name: "AI Screening Only",
    price: "Contact Us",
    priceDetail: "per position",
    description:
      "Leverage our AI agent to pre-screen candidates for specialty fit, credentials, and preference alignment.",
    features: [
      "AI pre-screen interviews",
      "NLP credential verification",
      "Scored candidate shortlists",
      "Real-time screening dashboard",
      "Specialty-specific assessments",
      "Automated candidate scheduling",
    ],
    cta: "Get Started",
    ctaHref: "/employers",
    highlighted: false,
    accentColor: "blue",
  },
  {
    name: "AI + Interview Intelligence",
    price: "Contact Us",
    priceDetail: "per position",
    description:
      "Full AI screening plus structured interview analytics, competency scoring, and candidate comparison tools.",
    features: [
      "Everything in AI Screening",
      "Structured interview guides",
      "Real-time AI transcription",
      "Competency scoring reports",
      "Red flag detection",
      "Side-by-side candidate comparison",
      "Interview feedback summaries",
    ],
    cta: "Get Started",
    ctaHref: "/employers",
    highlighted: true,
    accentColor: "blue",
  },
  {
    name: "Full-Package",
    price: "Contact Us",
    priceDetail: "per placement",
    description:
      "End-to-end recruiting with a dedicated PCCM specialist managing every step from sourcing to onboarding.",
    features: [
      "Everything in AI + Interview",
      "Dedicated PCCM specialist",
      "Job description optimization",
      "Multi-channel sourcing",
      "Human-first candidate presentation",
      "Offer negotiation support",
      "Onboarding coordination",
      "90-day placement guarantee",
    ],
    cta: "Schedule a Demo",
    ctaHref: "/employers",
    highlighted: false,
    accentColor: "teal",
  },
];

const fullPackageInclusions = [
  {
    icon: FileText,
    title: "Job Description Optimization",
    description:
      "Our specialists craft PCCM-specific job descriptions that attract qualified candidates. Optimized for specialty job boards, SEO, and physician search behavior.",
  },
  {
    icon: Megaphone,
    title: "Multi-Channel Sourcing",
    description:
      "Active outreach across specialty networks, fellowship programs, academic institutions, and our proprietary database of PCCM physicians.",
  },
  {
    icon: Brain,
    title: "AI Screening + Interview Intelligence",
    description:
      "Every candidate goes through our full AI pipeline: pre-screen interview, credential verification, competency scoring, and structured interview analytics.",
  },
  {
    icon: Users,
    title: "Human-First Candidate Presentation",
    description:
      "A PCCM specialist reviews every shortlisted candidate and presents them with context, clinical fit analysis, and practice environment alignment notes.",
  },
  {
    icon: Handshake,
    title: "Offer Negotiation Support",
    description:
      "Market benchmarking data, compensation structure guidance, and negotiation facilitation to help you close candidates without overpaying or losing talent.",
  },
  {
    icon: ShieldCheck,
    title: "90-Day Placement Guarantee",
    description:
      "If a placed physician leaves within 90 days, we restart the search at no additional cost. We stand behind every placement we make.",
  },
];

const roiStats = [
  {
    icon: Clock,
    value: "60%",
    label: "Faster Time-to-Hire",
    description:
      "Average reduction in time from position opening to signed offer compared to traditional physician recruiting.",
  },
  {
    icon: DollarSign,
    value: "$45K",
    label: "Avg. Savings vs Traditional",
    description:
      "Average cost savings per placement compared to traditional contingency or retained physician search firms.",
  },
  {
    icon: Target,
    value: "97%",
    label: "Placement Success Rate",
    description:
      "Percentage of searches that result in a successful placement within the contracted engagement period.",
  },
  {
    icon: Award,
    value: "90-Day",
    label: "Retention Guarantee",
    description:
      "Every full-package placement is backed by a 90-day guarantee. If the physician departs, we restart at no cost.",
  },
];

export default function FullPackagePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
        <div className="pointer-events-none absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-60 -right-40 h-[500px] w-[500px] rounded-full bg-teal-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-6 border-teal-400/30 bg-teal-500/10 px-4 py-1.5 text-sm font-medium text-teal-300 hover:bg-teal-500/10">
              For Employers &amp; Programs
            </Badge>

            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Full-Package{" "}
              <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                PCCM Recruiting
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              An end-to-end recruiting solution that combines AI-powered
              screening, interview intelligence, and a dedicated PCCM specialist
              to fill your positions faster and smarter.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="h-13 bg-teal-600 px-8 text-base font-semibold hover:bg-teal-700"
                asChild
              >
                <Link href="/employers">
                  Schedule a Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-13 border-white/25 bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10 hover:text-white"
                asChild
              >
                <Link href="/services/ai-screening">
                  Explore AI Screening
                  <ChevronRight className="ml-1 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Service Tiers ── */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <Badge className="mb-4 border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 hover:bg-blue-50">
              Service Tiers
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Choose the Right Level of Support
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              From self-service AI screening to fully managed placement, we
              have a solution for every hiring need and budget.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
            {tiers.map((tier) => (
              <Card
                key={tier.name}
                className={`relative flex flex-col ${
                  tier.highlighted
                    ? "border-blue-400 shadow-lg shadow-blue-100"
                    : "border-slate-200"
                }`}
              >
                {tier.highlighted && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white">
                    Most Popular
                  </Badge>
                )}

                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-slate-900">
                    {tier.name}
                  </CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold tracking-tight text-slate-900">
                      {tier.price}
                    </span>
                    {tier.priceDetail && (
                      <span className="ml-2 text-sm text-slate-500">
                        {tier.priceDetail}
                      </span>
                    )}
                  </div>
                  <CardDescription className="mt-3 leading-relaxed text-slate-600">
                    {tier.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check
                          className={`mt-0.5 h-4 w-4 shrink-0 ${
                            tier.accentColor === "teal"
                              ? "text-teal-600"
                              : "text-blue-600"
                          }`}
                        />
                        <span className="text-sm text-slate-700">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button
                    className={`w-full font-semibold ${
                      tier.highlighted
                        ? "bg-blue-600 hover:bg-blue-700"
                        : tier.accentColor === "teal"
                        ? "bg-teal-600 hover:bg-teal-700"
                        : ""
                    }`}
                    variant={
                      tier.highlighted || tier.accentColor === "teal"
                        ? "default"
                        : "outline"
                    }
                    size="lg"
                    asChild
                  >
                    <Link href={tier.ctaHref}>
                      {tier.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── What Full-Package Includes ── */}
      <section className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              What Full-Package Includes
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              A comprehensive, end-to-end recruiting engagement managed by a
              dedicated PCCM specialist and powered by our AI platform.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {fullPackageInclusions.map((item) => (
              <Card
                key={item.title}
                className="border-slate-200 transition-all hover:border-teal-300 hover:shadow-md"
              >
                <CardHeader>
                  <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-teal-500">
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className="text-lg font-bold text-slate-900">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROI Section ── */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <Badge className="mb-4 border-teal-200 bg-teal-50 px-3 py-1 text-sm font-medium text-teal-700 hover:bg-teal-50">
              Results
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              The ROI of Smarter Recruiting
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Our clients see measurable improvements across every recruiting
              metric. Here is what you can expect.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {roiStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all hover:border-teal-300 hover:shadow-md"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-teal-500">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <p className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm font-semibold text-blue-700">
                  {stat.label}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-slate-400">
            Metrics shown are representative and based on platform-wide
            averages. Individual results may vary.
          </p>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-teal-600 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Build Your PCCM Team Faster
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
            Schedule a demo to see how Recruitment Maneuver can transform your
            PCCM recruiting pipeline with AI-powered precision and human
            expertise.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="h-13 bg-white px-8 text-base font-semibold text-blue-700 hover:bg-slate-100"
              asChild
            >
              <Link href="/employers">
                Schedule a Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-13 border-white/30 bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10 hover:text-white"
              asChild
            >
              <Link href="/services/placement">
                Physician Placement
                <ChevronRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
