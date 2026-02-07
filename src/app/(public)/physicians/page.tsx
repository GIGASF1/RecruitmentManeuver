"use client";

import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  UserCircle,
  Brain,
  MessageSquare,
  CheckCircle2,
  Shield,
  Stethoscope,
  BarChart3,
  Target,
  Clock,
  MapPin,
  DollarSign,
  Building2,
  Phone,
  CalendarDays,
  Award,
  Users,
  X,
  Check,
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
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";


const steps = [
  {
    number: 1,
    icon: UserCircle,
    title: "Create Your Profile",
    description:
      "Tell us about your training, board certifications, subspecialty interests, and what matters most to you in your next role. Your profile stays confidential until you choose to share it.",
  },
  {
    number: 2,
    icon: Brain,
    title: "AI Matching",
    description:
      "Our PCCM-specific AI analyzes your profile against hundreds of verified opportunities, scoring each on compensation, call schedule, procedural volume, geography, culture, and more.",
  },
  {
    number: 3,
    icon: MessageSquare,
    title: "Interview Prep",
    description:
      "Get AI-generated interview insights, practice with specialty-specific scenarios, and receive structured feedback to help you present your best self to every program.",
  },
  {
    number: 4,
    icon: CheckCircle2,
    title: "Accept Your Ideal Role",
    description:
      "Compare your top opportunities side by side, negotiate with data-driven confidence, and make a career decision you feel great about. We support you through signing day.",
  },
];

const traditionalVsRM = [
  {
    category: "Search Privacy",
    traditional: "Your resume is shared broadly with unknown parties",
    rm: "Confidential profile visible only to employers you approve",
  },
  {
    category: "Specialty Focus",
    traditional: "Generic platforms covering all medical specialties",
    rm: "Built exclusively for Pulmonary & Critical Care Medicine",
  },
  {
    category: "Matching Method",
    traditional: "Keyword matching and manual recruiter outreach",
    rm: "AI fit scoring across 30+ PCCM-specific criteria",
  },
  {
    category: "Support",
    traditional: "Generalist recruiter juggling 50+ specialties",
    rm: "Dedicated PCCM recruiting specialist who knows your field",
  },
  {
    category: "Transparency",
    traditional: "Black-box process with little feedback",
    rm: "Structured scoring, clear timelines, and interview insights",
  },
];

const servicesOverview = [
  {
    icon: Brain,
    title: "AI Screening",
    description:
      "Our AI evaluates opportunities against your unique preferences and credentials, surfacing only the roles that genuinely fit your goals.",
    href: "/services/ai-screening",
  },
  {
    icon: Users,
    title: "Full-Service Placement",
    description:
      "From initial matching through contract negotiation and relocation, our PCCM specialists manage every step of your placement.",
    href: "/services/placement",
  },
  {
    icon: MessageSquare,
    title: "Interview Intelligence",
    description:
      "AI-powered interview preparation and real-time feedback help you showcase your strengths to every program you meet with.",
    href: "/services/interview-agent",
  },
];

const opportunities = [
  {
    title: "Academic PCCM",
    location: "Northeast",
    setting: "Academic Medical Center",
    salary: "$350K - $425K",
    callSchedule: "1:6 weekend call",
    highlights: [
      "Protected research time (20%)",
      "Fellowship teaching",
      "Level I trauma center",
    ],
    badge: "New",
    badgeColor: "border-blue-200 bg-blue-50 text-blue-700",
  },
  {
    title: "Community Pulmonology",
    location: "Texas",
    setting: "Community Hospital",
    salary: "$400K - $475K",
    callSchedule: "1:4 weekend call",
    highlights: [
      "High procedural volume",
      "Partnership track",
      "No ICU requirement",
    ],
    badge: "Hot",
    badgeColor: "border-orange-200 bg-orange-50 text-orange-700",
  },
  {
    title: "Hybrid ICU Director",
    location: "California",
    setting: "Hybrid Academic/Community",
    salary: "$425K - $500K",
    callSchedule: "1:5 weekend, 1:8 night",
    highlights: [
      "ICU medical director role",
      "Closed ICU model",
      "Signing bonus $50K",
    ],
    badge: "Featured",
    badgeColor: "border-teal-200 bg-teal-50 text-teal-700",
  },
];

const faqs = [
  {
    question: "Is my job search confidential?",
    answer:
      "Absolutely. Your profile and search activity are never shared with employers unless you explicitly approve it. We do not sell your data, share it with third-party recruiters, or reveal your identity to any organization without your written consent. You control who sees your information at every stage.",
  },
  {
    question: "How does AI matching work?",
    answer:
      "Our AI analyzes your profile across 30+ PCCM-specific criteria including subspecialty training, procedural interests, geographic preferences, compensation expectations, call schedule tolerance, academic vs. community preference, and more. Each opportunity receives a transparent fit score with a category-by-category breakdown so you understand exactly why a role was recommended.",
  },
  {
    question: "What does it cost for physicians?",
    answer:
      "Creating a profile and receiving AI-matched opportunities is completely free for physicians. We are compensated by employers when a successful placement is made. You will never be charged for using the platform, receiving matches, or accessing interview preparation tools.",
  },
  {
    question: "How long does placement typically take?",
    answer:
      "Our average time from profile creation to signed offer is 45 days, compared to the industry average of 120-180 days. Active candidates who engage with our AI matching and interview preparation tools typically move even faster. Of course, timelines vary based on your preferences, availability, and the complexity of your search.",
  },
  {
    question: "What PCCM subspecialties do you cover?",
    answer:
      "We cover the full spectrum of Pulmonary & Critical Care Medicine including general PCCM, interventional pulmonology, sleep medicine, critical care only, pulmonary hypertension, interstitial lung disease, lung transplant, thoracic oncology, neurocritical care, and surgical critical care. If your subspecialty is within the PCCM umbrella, we have opportunities for you.",
  },
];

export default function PhysiciansPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
        <div className="pointer-events-none absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-60 -right-40 h-[500px] w-[500px] rounded-full bg-teal-500/8 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-6 border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-300 hover:bg-blue-500/10">
              For PCCM Physicians
            </Badge>

            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Your PCCM Career,{" "}
              <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                Elevated
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              AI-matched opportunities tailored to your subspecialty,
              preferences, and career goals. No generic job boards. No
              cold calls. Just the roles that actually fit.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="h-13 bg-blue-600 px-8 text-base font-semibold hover:bg-blue-700"
                asChild
              >
                <Link href="/signup">
                  Create Your Free Profile
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-13 border-white/25 bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10 hover:text-white"
                asChild
              >
                <Link href="#opportunities">
                  Browse Opportunities
                  <ChevronRight className="ml-1 h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
              {[
                { icon: Target, value: "2,400+", label: "PCCM Positions" },
                { icon: Clock, value: "45 Days", label: "Avg. Placement" },
                { icon: Shield, value: "100%", label: "Confidential" },
                { icon: Stethoscope, value: "97%", label: "Placement Rate" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-5 backdrop-blur-sm"
                >
                  <stat.icon className="mx-auto mb-2 h-6 w-6 text-blue-400" />
                  <p className="text-2xl font-bold text-white sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
                </div>
              ))}
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
              Four Steps to Your Ideal PCCM Role
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              From profile creation to offer acceptance, our structured
              process takes the guesswork out of your career search.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <Card
                key={step.number}
                className="relative border-slate-200 transition-all hover:border-blue-300 hover:shadow-lg"
              >
                <CardHeader>
                  <div className="mb-2 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
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
            ))}
          </div>
        </div>
      </section>

      {/* ── What Makes Us Different ── */}
      <section className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <Badge className="mb-4 border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 hover:bg-blue-50">
              Why Switch
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              What Makes Us Different
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              See how Recruitment Maneuver compares to the traditional
              physician recruiting experience.
            </p>
          </div>

          <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            {/* Table Header */}
            <div className="grid grid-cols-3 border-b border-slate-200 bg-slate-50">
              <div className="px-6 py-4">
                <span className="text-sm font-semibold text-slate-500">
                  Category
                </span>
              </div>
              <div className="border-l border-slate-200 px-6 py-4">
                <div className="flex items-center gap-2">
                  <X className="h-4 w-4 text-red-400" />
                  <span className="text-sm font-semibold text-slate-500">
                    Traditional Recruiting
                  </span>
                </div>
              </div>
              <div className="border-l border-slate-200 bg-blue-50/50 px-6 py-4">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-700">
                    Recruitment Maneuver
                  </span>
                </div>
              </div>
            </div>

            {/* Table Rows */}
            {traditionalVsRM.map((row, index) => (
              <div
                key={row.category}
                className={`grid grid-cols-3 ${
                  index < traditionalVsRM.length - 1
                    ? "border-b border-slate-100"
                    : ""
                }`}
              >
                <div className="px-6 py-4">
                  <span className="text-sm font-medium text-slate-900">
                    {row.category}
                  </span>
                </div>
                <div className="border-l border-slate-100 px-6 py-4">
                  <p className="text-sm text-slate-500">{row.traditional}</p>
                </div>
                <div className="border-l border-slate-100 bg-blue-50/30 px-6 py-4">
                  <p className="text-sm font-medium text-slate-700">{row.rm}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services Overview ── */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <Badge className="mb-4 border-teal-200 bg-teal-50 px-3 py-1 text-sm font-medium text-teal-700 hover:bg-teal-50">
              Our Services
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Tools Built for Your PCCM Career
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Every service is designed specifically for the Pulmonary &amp;
              Critical Care job search.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
            {servicesOverview.map((service) => (
              <Card
                key={service.title}
                className="group border-slate-200 transition-all hover:border-blue-300 hover:shadow-lg"
              >
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-teal-50">
                    <service.icon className="h-6 w-6 text-blue-700" />
                  </div>
                  <CardTitle className="text-lg font-bold text-slate-900">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-sm leading-relaxed text-slate-600">
                    {service.description}
                  </CardDescription>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-blue-600 hover:text-blue-700"
                    asChild
                  >
                    <Link href={service.href}>
                      Learn more
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Opportunities ── */}
      <section
        id="opportunities"
        className="bg-slate-50 py-20 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <Badge className="mb-4 border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 hover:bg-blue-50">
              Open Positions
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Featured PCCM Opportunities
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              A sample of current openings. Create your profile to unlock
              personalized matches and fit scores.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
            {opportunities.map((opp) => (
              <Card
                key={opp.title}
                className="flex flex-col border-slate-200 transition-all hover:shadow-lg"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge
                      className={`${opp.badgeColor} hover:${opp.badgeColor}`}
                    >
                      {opp.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900">
                    {opp.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-slate-600">
                    {opp.setting}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      {opp.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <DollarSign className="h-4 w-4 text-slate-400" />
                      {opp.salary}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <CalendarDays className="h-4 w-4 text-slate-400" />
                      {opp.callSchedule}
                    </div>
                  </div>

                  <Separator />

                  <ul className="space-y-1.5">
                    {opp.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2 text-sm text-slate-600"
                      >
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-600" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800"
                    asChild
                  >
                    <Link href="/signup">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button
              className="bg-blue-600 font-semibold hover:bg-blue-700"
              asChild
            >
              <Link href="/signup">
                See All Opportunities
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Everything you need to know about using Recruitment Maneuver
              for your PCCM job search.
            </p>
          </div>

          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-base font-medium text-slate-900">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-slate-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Ready to Find Your Next PCCM Role?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
            Join thousands of Pulmonary &amp; Critical Care physicians
            who found their ideal position through Recruitment Maneuver.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="h-13 bg-white px-8 text-base font-semibold text-blue-700 hover:bg-slate-100"
              asChild
            >
              <Link href="/signup">
                Create Your Free Profile
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-13 border-white/30 bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10 hover:text-white"
              asChild
            >
              <Link href="mailto:support@recruitmentmaneuver.com">
                Talk to a Specialist
                <Phone className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
