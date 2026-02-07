import type { Metadata } from "next";
import Link from "next/link";
import {
  Brain,
  MessageSquare,
  FileText,
  BarChart3,
  Mic,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Lightbulb,
  AlertTriangle,
  Trophy,
  Users,
  Stethoscope,
  Building2,
  ClipboardList,
  Layers,
  Sparkles,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Interview Intelligence | Recruitment Maneuver",
  description:
    "AI-captured interview insights with structured feedback, competency scoring, and candidate comparison analytics. Transform every interview into actionable data.",
};

const processSteps = [
  {
    number: 1,
    icon: ClipboardList,
    title: "Structured Interview Guides",
    description:
      "AI generates PCCM-specific interview questions tailored to the role, subspecialty, and practice environment. Interviewers follow a consistent framework.",
  },
  {
    number: 2,
    icon: Mic,
    title: "Real-Time Capture",
    description:
      "Our AI listens and transcribes during the interview, capturing key responses, clinical reasoning patterns, and communication signals in real time.",
  },
  {
    number: 3,
    icon: FileText,
    title: "Insight Reports",
    description:
      "Within hours, receive structured reports with competency scores, highlighted strengths, flagged concerns, and suggested follow-up questions.",
  },
  {
    number: 4,
    icon: Layers,
    title: "Comparison Analytics",
    description:
      "Compare candidates side by side across competency dimensions, interview performance, and overall fit to make confident hiring decisions.",
  },
];

const features = [
  {
    icon: ClipboardList,
    title: "Structured Interview Guides",
    description:
      "PCCM-specific question banks covering clinical competency, ICU management philosophy, procedural expertise, and team dynamics. Tailored to each role.",
  },
  {
    icon: Mic,
    title: "Real-Time Capture",
    description:
      "AI transcription and analysis during live interviews. Key talking points, clinical examples, and decision-making patterns are captured automatically.",
  },
  {
    icon: BarChart3,
    title: "Competency Scoring",
    description:
      "Multi-dimensional scoring across clinical knowledge, communication, leadership, research aptitude, and cultural alignment. Transparent and standardized.",
  },
  {
    icon: AlertTriangle,
    title: "Red Flag Detection",
    description:
      "AI highlights potential concerns including inconsistencies in training history, evasive responses, or misalignment with stated practice preferences.",
  },
  {
    icon: Trophy,
    title: "Strength Identification",
    description:
      "Automatically surfaces standout qualities like procedural expertise depth, teaching experience, research contributions, and leadership potential.",
  },
  {
    icon: Layers,
    title: "Comparison Analytics",
    description:
      "Side-by-side candidate comparison across every scored dimension. Visualize tradeoffs and identify the strongest fit for your specific environment.",
  },
];

const physicianBenefits = [
  {
    icon: Lightbulb,
    title: "Better Preparation",
    description:
      "Know what to expect. Our structured interview format means no curveball questions designed to trip you up. Focus on showcasing your clinical expertise.",
  },
  {
    icon: Eye,
    title: "Fair & Transparent Process",
    description:
      "Every candidate is evaluated on the same criteria. Your interview performance is scored on competencies, not politics or subjective impressions.",
  },
  {
    icon: MessageSquare,
    title: "Receive Constructive Feedback",
    description:
      "Get insights into your interview performance, including areas of strength and opportunities for growth, so each interview makes you sharper.",
  },
  {
    icon: Sparkles,
    title: "Your Strengths Highlighted",
    description:
      "The AI ensures your unique qualifications, procedural expertise, and career accomplishments are systematically captured and presented to employers.",
  },
];

const employerBenefits = [
  {
    icon: BarChart3,
    title: "Objective Data, Not Gut Feelings",
    description:
      "Replace subjective interview impressions with structured competency scores. Every interviewer evaluates using the same framework.",
  },
  {
    icon: FileText,
    title: "Complete Interview Documentation",
    description:
      "Full transcripts, key response highlights, and competency breakdowns for every candidate. No more relying on hastily scribbled notes.",
  },
  {
    icon: Layers,
    title: "Apples-to-Apples Comparison",
    description:
      "Compare candidates across identical dimensions. Visualize who excels in clinical acumen versus leadership versus cultural fit.",
  },
  {
    icon: Brain,
    title: "AI-Powered Insights",
    description:
      "Receive AI-generated hiring recommendations based on interview data, credential verification, and alignment with your position requirements.",
  },
];

export default function InterviewAgentPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
        <div className="pointer-events-none absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-60 -right-40 h-[500px] w-[500px] rounded-full bg-teal-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-6 border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-300 hover:bg-blue-500/10">
              Interview Intelligence
            </Badge>

            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Interview Intelligence That{" "}
              <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                Captures What Matters
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              AI-captured interview insights give both physicians and employers
              structured feedback, competency scoring, and candidate comparison
              analytics. No more black-box recruiting.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="h-13 bg-blue-600 px-8 text-base font-semibold hover:bg-blue-700"
                asChild
              >
                <Link href="/signup">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-13 border-white/25 bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10 hover:text-white"
                asChild
              >
                <Link href="/employers">
                  Request a Demo
                  <ChevronRight className="ml-1 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <Badge className="mb-4 border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 hover:bg-blue-50">
              How It Works
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              From Interview to Insight in Four Steps
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Our AI transforms every interview into structured, actionable data
              that helps both sides make better decisions.
            </p>
          </div>

          <div className="relative mx-auto max-w-5xl">
            <div className="absolute left-0 right-0 top-[3.5rem] hidden h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-teal-400 lg:block" />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step) => (
                <div key={step.number} className="relative">
                  <Card className="h-full border-slate-200 transition-all hover:border-blue-300 hover:shadow-lg">
                    <CardHeader>
                      <div className="mb-2 flex items-center gap-3">
                        <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-md">
                          {step.number}
                        </span>
                      </div>
                      <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-teal-50">
                        <step.icon className="h-5 w-5 text-blue-700" />
                      </div>
                      <CardTitle className="text-lg font-bold text-slate-900">
                        {step.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm leading-relaxed text-slate-600">
                        {step.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Feature Grid ── */}
      <section className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Comprehensive Interview Analytics
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Every tool you need to conduct, capture, and analyze PCCM
              interviews with unprecedented depth.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="border-slate-200 transition-all hover:border-blue-300 hover:shadow-md"
              >
                <CardHeader>
                  <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-teal-500">
                    <feature.icon className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className="text-lg font-bold text-slate-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed text-slate-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits for Physicians ── */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Benefits for Both Sides
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Interview Intelligence creates a better experience for physicians
              and more reliable data for employers.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Physicians column */}
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                  <Stethoscope className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  For Physicians
                </h3>
              </div>
              <div className="space-y-5">
                {physicianBenefits.map((benefit) => (
                  <div
                    key={benefit.title}
                    className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                      <benefit.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        {benefit.title}
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Employers column */}
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100">
                  <Building2 className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  For Employers
                </h3>
              </div>
              <div className="space-y-5">
                {employerBenefits.map((benefit) => (
                  <div
                    key={benefit.title}
                    className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50">
                      <benefit.icon className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        {benefit.title}
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-teal-600 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Transform Every Interview Into Insight
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
            Join the PCCM recruiting platform that turns subjective interviews
            into structured, objective hiring decisions.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="h-13 bg-white px-8 text-base font-semibold text-blue-700 hover:bg-slate-100"
              asChild
            >
              <Link href="/signup">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-13 border-white/30 bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10 hover:text-white"
              asChild
            >
              <Link href="/employers">
                Schedule a Demo
                <ChevronRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
