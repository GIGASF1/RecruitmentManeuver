import type { Metadata } from "next";
import Link from "next/link";
import {
  Brain,
  FileSearch,
  Target,
  CalendarCheck,
  BarChart3,
  ShieldCheck,
  MessageSquare,
  Clock,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Users,
  Stethoscope,
  ClipboardList,
  Zap,
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
  title: "AI-Powered Candidate Screening | Recruitment Maneuver",
  description:
    "Our AI agent pre-screens PCCM candidates with specialty-specific assessments, NLP credential verification, and behavioral analysis. Faster, fairer, and more accurate than traditional screening.",
};

const processSteps = [
  {
    number: 1,
    icon: FileSearch,
    title: "Profile Analysis",
    description:
      "AI ingests candidate CVs, training records, and board certifications to build a comprehensive specialty profile.",
  },
  {
    number: 2,
    icon: Target,
    title: "Specialty Matching",
    description:
      "NLP algorithms match subspecialty expertise, procedural competencies, and career preferences against opportunity requirements.",
  },
  {
    number: 3,
    icon: MessageSquare,
    title: "AI Pre-Screen Interview",
    description:
      "Candidates complete a conversational AI interview covering clinical knowledge, practice preferences, and career goals.",
  },
  {
    number: 4,
    icon: BarChart3,
    title: "Scored Shortlist",
    description:
      "Employers receive a ranked shortlist with fit scores, verified credentials, and interview transcripts for each candidate.",
  },
];

const features = [
  {
    icon: ShieldCheck,
    title: "NLP Credential Verification",
    description:
      "Automated cross-referencing of board certifications, fellowship records, DEA licenses, and state medical licenses against national databases.",
  },
  {
    icon: Stethoscope,
    title: "Specialty-Specific Assessment",
    description:
      "PCCM-tailored evaluation covering ICU staffing models, ventilator management experience, procedural volume, and subspecialty depth.",
  },
  {
    icon: Users,
    title: "Behavioral & Culture Analysis",
    description:
      "AI models assess communication style, teamwork orientation, and practice environment preferences to predict culture fit and retention.",
  },
  {
    icon: CalendarCheck,
    title: "Automated Scheduling",
    description:
      "Candidates self-schedule their AI screening at any time. No coordinator bottleneck, no phone tag, no timezone friction.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Scoring Dashboard",
    description:
      "Live dashboard showing candidate pipeline status, aggregate scores, and funnel analytics for every open position.",
  },
  {
    icon: Sparkles,
    title: "Bias-Reduced Screening",
    description:
      "Structured AI interviews ensure every candidate answers the same questions. Scoring is based on competency signals, not subjective impressions.",
  },
];

const physicianBenefits = [
  "Complete the interview on your own schedule, 24/7 availability",
  "Structured, fair process with no surprise questions",
  "Focused on your clinical expertise and career goals, not generic HR prompts",
  "Your responses are reviewed by a PCCM specialist, not just an algorithm",
  "Confidential profile shared only with positions you approve",
  "Receive feedback on your fit score and match rationale",
];

const employerBenefits = [
  "Scored candidate reports with fit percentages across key dimensions",
  "Verified credentials including board status, training, and licensure",
  "Full AI interview transcripts with highlighted key responses",
  "Behavioral and culture fit analysis tailored to your practice environment",
  "Candidate comparison tools to evaluate shortlisted physicians side by side",
  "Reduced time-to-shortlist from weeks to days",
];

export default function AIScreeningPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
        <div className="pointer-events-none absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-60 -right-40 h-[500px] w-[500px] rounded-full bg-teal-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-6 border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-300 hover:bg-blue-500/10">
              AI-Powered Recruiting
            </Badge>

            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              AI-Powered{" "}
              <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                Candidate Screening
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              Our AI agent pre-screens PCCM candidates with specialty-specific
              assessments, verified credentials, and structured interviews
              before any human interaction. Faster, fairer, and built
              exclusively for Pulmonary &amp; Critical Care Medicine.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="h-13 bg-blue-600 px-8 text-base font-semibold hover:bg-blue-700"
                asChild
              >
                <Link href="/signup">
                  See AI Screening in Action
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
                  Talk to Our Team
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
              Our Process
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              How AI Screening Works
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              From profile ingestion to scored shortlist, our AI handles the
              heavy lifting so you can focus on what matters.
            </p>
          </div>

          {/* Horizontal timeline */}
          <div className="relative mx-auto max-w-5xl">
            {/* Connector line */}
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
              Built for PCCM Precision
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Every feature is purpose-built for the unique demands of
              Pulmonary &amp; Critical Care Medicine recruiting.
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

      {/* ── For Physicians ── */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                <Stethoscope className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                For Physicians
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Our AI interview is designed to respect your time and showcase
                your strengths. Here is what to expect when you complete a
                Recruitment Maneuver AI screen.
              </p>
            </div>

            <div className="space-y-4">
              {physicianBenefits.map((benefit) => (
                <div key={benefit} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                  <p className="text-base leading-relaxed text-slate-700">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Separator className="mx-auto max-w-5xl" />

      {/* ── For Employers ── */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100">
                <ClipboardList className="h-6 w-6 text-teal-600" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                For Employers
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Stop reviewing hundreds of unqualified applications. Our AI
                delivers a curated, scored shortlist of specialty-verified PCCM
                candidates for every open position.
              </p>
            </div>

            <div className="space-y-4">
              {employerBenefits.map((benefit) => (
                <div key={benefit} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
                  <p className="text-base leading-relaxed text-slate-700">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-teal-600 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            See AI Screening in Action
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
            Experience how our AI agent evaluates PCCM candidates with
            precision and speed. Schedule a demo or create your profile today.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="h-13 bg-white px-8 text-base font-semibold text-blue-700 hover:bg-slate-100"
              asChild
            >
              <Link href="/signup">
                See AI Screening in Action
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
                Talk to Our Team
                <ChevronRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
