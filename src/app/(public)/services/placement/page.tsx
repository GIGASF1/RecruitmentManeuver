import type { Metadata } from "next";
import Link from "next/link";
import {
  UserCircle,
  Target,
  MessageSquare,
  FileSignature,
  HeartHandshake,
  ArrowRight,
  Stethoscope,
  ShieldCheck,
  Lock,
  MapPin,
  Award,
  Phone,
  CheckCircle2,
  Quote,
  ChevronRight,
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

export const metadata: Metadata = {
  title: "Full-Service PCCM Placement | Recruitment Maneuver",
  description:
    "Dedicated PCCM recruiting specialist paired with AI-powered tools. From profile creation to onboarding support, we manage every step of your career move.",
};

const processSteps = [
  {
    number: 1,
    icon: UserCircle,
    title: "Profile Creation",
    description:
      "Work with your dedicated specialist to build a comprehensive profile capturing your subspecialty expertise, career goals, geographic preferences, and non-negotiables.",
  },
  {
    number: 2,
    icon: Target,
    title: "Opportunity Matching",
    description:
      "Our AI scans thousands of positions while your specialist curates hand-picked opportunities that align with your priorities and career trajectory.",
  },
  {
    number: 3,
    icon: MessageSquare,
    title: "Interview Prep",
    description:
      "Receive tailored interview preparation including institution-specific insights, question frameworks, and negotiation positioning strategy.",
  },
  {
    number: 4,
    icon: FileSignature,
    title: "Offer Negotiation",
    description:
      "Your specialist guides you through compensation benchmarking, contract review, and negotiation to ensure you receive a competitive, fair offer.",
  },
  {
    number: 5,
    icon: HeartHandshake,
    title: "Onboarding Support",
    description:
      "Transition support including credentialing assistance, relocation resources, and 90-day check-ins to ensure a successful start in your new role.",
  },
];

const inclusions = [
  {
    icon: Stethoscope,
    title: "Dedicated PCCM Specialist",
    description:
      "A recruiting specialist who understands the nuances of Pulmonary & Critical Care Medicine. Not a generalist. Not a call center. A true PCCM career advisor.",
  },
  {
    icon: Lock,
    title: "Confidential Job Search",
    description:
      "Your profile is never shared without your explicit consent. Search for your next role without risking your current position or professional relationships.",
  },
  {
    icon: FileSignature,
    title: "Contract Review & Negotiation",
    description:
      "Expert guidance on compensation structures, RVU models, call schedules, partnership tracks, and non-compete clauses specific to PCCM practice.",
  },
  {
    icon: MapPin,
    title: "Relocation Assistance",
    description:
      "Resources and connections for housing, school districts, spousal career support, and community integration to ease your geographic transition.",
  },
  {
    icon: ShieldCheck,
    title: "Credential Verification",
    description:
      "We handle the tedious work of verifying board certifications, fellowship training records, DEA licenses, and state medical licenses.",
  },
  {
    icon: Award,
    title: "Ongoing Career Support",
    description:
      "Your relationship with your specialist does not end at placement. Receive ongoing career guidance, market insights, and support throughout your tenure.",
  },
];

const testimonials = [
  {
    quote:
      "The process was seamless. My specialist understood exactly what I was looking for in my first attending position and only presented opportunities that truly matched. I accepted an offer within six weeks.",
    name: "Dr. Sarah M.",
    title: "PCCM Fellow, now Attending at an Academic Medical Center",
  },
  {
    quote:
      "After 8 years at one institution, I was nervous about making a move. My Recruitment Maneuver specialist handled the entire search confidentially and negotiated a compensation package I never would have achieved on my own.",
    name: "Dr. James K.",
    title: "Senior PCCM Physician, Community Practice",
  },
  {
    quote:
      "What sets this apart is the PCCM focus. They know the difference between a closed ICU and an open one, they understand procedural volume concerns, and they know which programs actually support research. That specificity matters.",
    name: "Dr. Priya R.",
    title: "Interventional Pulmonologist, Academic Center",
  },
];

export default function PlacementPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
        <div className="pointer-events-none absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-60 -right-40 h-[500px] w-[500px] rounded-full bg-teal-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-6 border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-300 hover:bg-blue-500/10">
              For Physicians
            </Badge>

            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Full-Service{" "}
              <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                PCCM Placement
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              A dedicated PCCM recruiting specialist paired with AI-powered
              tools. From profile creation to onboarding support, we manage
              every step of your career move.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="h-13 bg-blue-600 px-8 text-base font-semibold hover:bg-blue-700"
                asChild
              >
                <Link href="/signup">
                  Start Your Search
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
                  Learn About AI Screening
                  <ChevronRight className="ml-1 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <Badge className="mb-4 border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 hover:bg-blue-50">
              Your Journey
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              From First Conversation to First Day
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              A structured, transparent process that puts you in control of
              every career decision.
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-6">
            {processSteps.map((step) => (
              <Card
                key={step.number}
                className="relative overflow-hidden border-slate-200"
              >
                <div className="absolute bottom-0 left-0 top-0 w-1.5 bg-gradient-to-b from-blue-600 to-teal-500" />
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                      {step.number}
                    </span>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                      <step.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-900">
                      {step.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pl-6 sm:pl-[calc(1.5rem+4rem)]">
                  <CardDescription className="text-base leading-7 text-slate-600">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── What's Included ── */}
      <section className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Everything You Need for a Successful Move
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Our full-service placement includes every tool, resource, and
              expert support required for a seamless career transition.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {inclusions.map((item) => (
              <Card
                key={item.title}
                className="border-slate-200 transition-all hover:border-blue-300 hover:shadow-md"
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

      {/* ── Testimonials ── */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Physicians Who Made the Move
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Hear from PCCM physicians who found their next role through
              Recruitment Maneuver.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.name}
                className="relative border-slate-200 shadow-sm"
              >
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <Quote className="h-5 w-5 text-blue-600" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-base italic leading-relaxed text-slate-700">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="border-t border-slate-100 pt-4">
                    <p className="font-semibold text-slate-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-slate-500">
                      {testimonial.title}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-slate-400">
            Testimonials shown for demonstration purposes. Names and details
            have been changed to protect privacy.
          </p>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-teal-600 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Ready to Find Your Next Role?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
            Connect with a dedicated PCCM specialist and start a confidential
            search for your next career opportunity.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="h-13 bg-white px-8 text-base font-semibold text-blue-700 hover:bg-slate-100"
              asChild
            >
              <Link href="/signup">
                Start Your Search
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-13 border-white/30 bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10 hover:text-white"
              asChild
            >
              <Link href="/services/full-package">
                View Employer Solutions
                <ChevronRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
