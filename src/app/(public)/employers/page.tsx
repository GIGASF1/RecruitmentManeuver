"use client";

import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Brain,
  MessageSquare,
  Users,
  Award,
  Clock,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Shield,
  CheckCircle2,
  BarChart3,
  Building2,
  Phone,
  Star,
  Check,
  Zap,
  Target,
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


const painPoints = [
  {
    icon: Clock,
    value: "180 Days",
    label: "Average time to fill a PCCM position",
    description:
      "Nearly six months of vacancy while your existing team absorbs the extra workload, risking burnout and patient care gaps.",
  },
  {
    icon: DollarSign,
    value: "$250K+",
    label: "Cost of a single PCCM vacancy",
    description:
      "Lost revenue from unfilled shifts, locum tenens coverage, overtime pay, and downstream referral losses add up quickly.",
  },
  {
    icon: AlertTriangle,
    value: "40%",
    label: "Placements that fail within 2 years",
    description:
      "Poor fit leads to early departures, forcing you to restart the search cycle and absorb another round of recruiting costs.",
  },
];

const solutions = [
  {
    icon: Brain,
    title: "AI Screening",
    description:
      "Our AI pre-screens every candidate for subspecialty fit, credential verification, and preference alignment before any human interaction. No more sifting through unqualified applicants.",
    href: "/services/ai-screening",
  },
  {
    icon: MessageSquare,
    title: "Interview Intelligence",
    description:
      "AI-captured interview insights give your hiring committee structured, comparable data on every candidate. Eliminate gut-instinct hiring and reduce interview-to-offer drop-off.",
    href: "/services/interview-agent",
  },
  {
    icon: Users,
    title: "Human-First Matching",
    description:
      "A dedicated PCCM specialist reviews every AI match before it reaches your desk. Technology handles scale and speed. Humans handle nuance and culture fit.",
    href: "/services/placement",
  },
  {
    icon: Award,
    title: "Full-Package Placement",
    description:
      "From contract negotiation and credential verification to relocation coordination and onboarding support, we manage the complete placement lifecycle.",
    href: "/services/placement",
  },
];

const tiers = [
  {
    name: "Self-Service AI Screening",
    price: "$1,500",
    priceDetail: "per search",
    description:
      "For programs that want AI-powered candidate screening without full-service recruiting support.",
    features: [
      "AI candidate screening and ranking",
      "Specialty-verified applicant pipeline",
      "Credential pre-verification",
      "Candidate fit scoring dashboard",
      "Up to 25 screened candidates per search",
      "Email support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "AI + Interview Intelligence",
    price: "$3,500",
    priceDetail: "per search",
    description:
      "AI screening plus structured interview intelligence for data-driven hiring decisions.",
    features: [
      "Everything in Self-Service AI",
      "AI-powered interview preparation",
      "Structured interview feedback reports",
      "Candidate comparison analytics",
      "Up to 50 screened candidates per search",
      "Dedicated account manager",
      "Priority support",
    ],
    cta: "Get Started",
    highlighted: true,
  },
  {
    name: "Full-Package Recruiting",
    price: "Custom",
    priceDetail: "contingent or retained",
    description:
      "End-to-end PCCM recruiting with a dedicated specialist managing every step from search to signed contract.",
    features: [
      "Everything in AI + Interview",
      "Dedicated PCCM recruiting specialist",
      "Proactive candidate sourcing",
      "Contract negotiation support",
      "Relocation coordination",
      "90-day placement guarantee",
      "Onboarding support",
      "Unlimited screened candidates",
    ],
    cta: "Request a Demo",
    highlighted: false,
  },
];

const roiMetrics = [
  {
    icon: Zap,
    value: "60%",
    label: "Faster Hiring",
    description: "Average reduction in time-to-fill compared to traditional recruiting methods",
  },
  {
    icon: DollarSign,
    value: "$45K",
    label: "Average Savings",
    description: "Per placement in reduced vacancy costs, locum fees, and recruiting overhead",
  },
  {
    icon: Target,
    value: "97%",
    label: "Success Rate",
    description: "Of our placements remain in role beyond the two-year mark",
  },
  {
    icon: Shield,
    value: "90-Day",
    label: "Guarantee",
    description: "Full replacement guarantee on all full-package placements at no additional cost",
  },
];

const testimonials = [
  {
    quote:
      "We had been searching for an interventional pulmonologist for over eight months. Recruitment Maneuver filled the role in six weeks with a candidate who exceeded our expectations.",
    name: "Dr. Sarah Chen",
    title: "Chief Medical Officer",
    org: "Northeast Regional Medical Center",
  },
  {
    quote:
      "The AI screening saved our hiring committee dozens of hours. We only interviewed candidates who were genuinely qualified and interested. Three out of three offers were accepted.",
    name: "James Rodriguez",
    title: "VP of Medical Affairs",
    org: "Texas Pulmonary Associates",
  },
  {
    quote:
      "What impressed us most was the quality of the match. Our new critical care director did not just have the right credentials. They fit our culture perfectly. That is rare in physician recruiting.",
    name: "Dr. Amanda Foster",
    title: "Department Chair, Pulmonary Medicine",
    org: "Pacific Coast Health System",
  },
];

const faqs = [
  {
    question: "How does AI screening work for employers?",
    answer:
      "Our AI evaluates every candidate against your specific position requirements across 30+ PCCM-specific criteria including subspecialty training, procedural competencies, clinical preferences, and cultural fit indicators. Candidates are ranked and scored before being presented to your team, dramatically reducing time spent reviewing unqualified applications. You receive a detailed fit report for each candidate with transparent scoring breakdowns.",
  },
  {
    question: "What is your placement guarantee?",
    answer:
      "Full-package placements include a 90-day replacement guarantee at no additional cost. If a placed physician leaves within 90 days for any reason, we immediately restart the search and provide a replacement candidate. Our 97% two-year retention rate means you are unlikely to need it, but the guarantee provides complete peace of mind.",
  },
  {
    question: "How do you verify credentials?",
    answer:
      "Our NLP-powered verification system cross-references board certifications, fellowship training records, and procedural competency logs against national databases including ABIM, ACGME, and state licensing boards. Every candidate presented to your team has been credential-verified before you invest any interview time. We also verify malpractice history and work authorization status.",
  },
  {
    question: "What PCCM subspecialties do you recruit for?",
    answer:
      "We recruit across the full spectrum of Pulmonary & Critical Care Medicine including general PCCM, interventional pulmonology, sleep medicine, critical care only, pulmonary hypertension, interstitial lung disease, lung transplant, thoracic oncology, neurocritical care, and surgical critical care. Our database includes physicians in academic, community, hybrid, and VA settings at all career stages from new graduates to senior leaders.",
  },
  {
    question: "Is there a minimum commitment or contract requirement?",
    answer:
      "No long-term contracts required. Our self-service AI screening and AI + Interview Intelligence tiers are priced per search with no minimum commitment. Full-package recruiting engagements can be structured as contingent (pay only on successful placement) or retained (partial upfront fee with the remainder on placement). We will recommend the structure that best fits your hiring volume and timeline.",
  },
];

export default function EmployersPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900">
        <div className="pointer-events-none absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-teal-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-60 -right-40 h-[500px] w-[500px] rounded-full bg-blue-500/8 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-6 border-teal-400/30 bg-teal-500/10 px-4 py-1.5 text-sm font-medium text-teal-300 hover:bg-teal-500/10">
              For Employers &amp; Programs
            </Badge>

            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Build Your PCCM Team with{" "}
              <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                AI-Powered Recruiting
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              Stop losing months and hundreds of thousands to unfilled
              PCCM positions. Our AI screens, our specialists match, and
              your team grows with physicians who actually fit.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="h-13 bg-teal-600 px-8 text-base font-semibold hover:bg-teal-700"
                asChild
              >
                <Link href="/contact">
                  Request a Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-13 border-white/25 bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10 hover:text-white"
                asChild
              >
                <Link href="#pricing">
                  View Pricing
                  <ChevronRight className="ml-1 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Problem ── */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <Badge className="mb-4 border-red-200 bg-red-50 px-3 py-1 text-sm font-medium text-red-700 hover:bg-red-50">
              The Problem
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              PCCM Recruiting Is Broken
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              The numbers tell the story. Traditional recruiting methods
              are too slow, too expensive, and too unreliable for the PCCM
              talent market.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
            {painPoints.map((point) => (
              <Card
                key={point.label}
                className="border-slate-200 text-center"
              >
                <CardHeader>
                  <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
                    <point.icon className="h-7 w-7 text-red-500" />
                  </div>
                  <p className="text-4xl font-extrabold tracking-tight text-slate-900">
                    {point.value}
                  </p>
                  <CardTitle className="text-base font-semibold text-slate-700">
                    {point.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed text-slate-600">
                    {point.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Solution ── */}
      <section className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <Badge className="mb-4 border-teal-200 bg-teal-50 px-3 py-1 text-sm font-medium text-teal-700 hover:bg-teal-50">
              Our Solution
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Four Pillars of Smarter PCCM Recruiting
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              AI handles the scale. Specialists handle the nuance. You get
              physicians who fit and stay.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {solutions.map((solution, index) => (
              <Card
                key={solution.title}
                className="group border-slate-200 transition-all hover:border-teal-300 hover:shadow-lg"
              >
                <CardHeader>
                  <div className="mb-2 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-600 text-sm font-bold text-white">
                      {index + 1}
                    </span>
                  </div>
                  <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal-100 to-blue-50">
                    <solution.icon className="h-5 w-5 text-teal-700" />
                  </div>
                  <CardTitle className="text-lg font-bold text-slate-900">
                    {solution.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-sm leading-relaxed text-slate-600">
                    {solution.description}
                  </CardDescription>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-teal-600 hover:text-teal-700"
                    asChild
                  >
                    <Link href={solution.href}>
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

      {/* ── Service Tiers ── */}
      <section id="pricing" className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <Badge className="mb-4 border-teal-200 bg-teal-50 px-3 py-1 text-sm font-medium text-teal-700 hover:bg-teal-50">
              Pricing
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Service Tiers
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Choose the level of support that matches your recruiting
              needs. Scale up or down at any time.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
            {tiers.map((tier) => (
              <Card
                key={tier.name}
                className={`relative flex flex-col ${
                  tier.highlighted
                    ? "border-teal-500 shadow-lg"
                    : "border-slate-200"
                }`}
              >
                {tier.highlighted && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-600 hover:bg-teal-600">
                    Most Popular
                  </Badge>
                )}

                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-900">
                    {tier.name}
                  </CardTitle>
                  <div className="mt-2">
                    <span className="text-4xl font-bold tracking-tight text-slate-900">
                      {tier.price}
                    </span>
                    <span className="ml-2 text-sm text-slate-500">
                      {tier.priceDetail}
                    </span>
                  </div>
                  <CardDescription className="mt-3 leading-relaxed text-slate-600">
                    {tier.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                        <span className="text-sm text-slate-600">
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
                        ? "bg-teal-600 hover:bg-teal-700"
                        : ""
                    }`}
                    size="lg"
                    variant={tier.highlighted ? "default" : "outline"}
                    asChild
                  >
                    <Link href="/contact">
                      {tier.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              Need a custom plan for high-volume recruiting?{" "}
              <Link
                href="/pricing"
                className="font-medium text-teal-600 underline underline-offset-4 hover:text-teal-700"
              >
                View full pricing details
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── Results / ROI ── */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <Badge className="mb-4 border-teal-400/30 bg-teal-500/10 px-3 py-1 text-sm font-medium text-teal-300 hover:bg-teal-500/10">
              Results
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              The ROI of Smarter Recruiting
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              Our clients see measurable improvements across every
              recruiting KPI.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {roiMetrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm"
              >
                <metric.icon className="mx-auto mb-3 h-8 w-8 text-teal-400" />
                <p className="text-4xl font-extrabold tracking-tight text-white">
                  {metric.value}
                </p>
                <p className="mt-1 text-base font-semibold text-teal-300">
                  {metric.label}
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Client Testimonials ── */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <Badge className="mb-4 border-teal-200 bg-teal-50 px-3 py-1 text-sm font-medium text-teal-700 hover:bg-teal-50">
              Testimonials
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              What Our Clients Say
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Hear from hospital administrators and department chairs who
              transformed their PCCM recruiting.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.name}
                className="border-slate-200"
              >
                <CardHeader>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-teal-500 text-teal-500"
                      />
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm leading-relaxed text-slate-700">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <Separator />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-slate-500">
                      {testimonial.title}
                    </p>
                    <p className="text-sm text-slate-500">
                      {testimonial.org}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            Representative testimonials. Names and organizations are
            illustrative.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Common questions from employers evaluating Recruitment
              Maneuver for their PCCM hiring needs.
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
      <section className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Transform Your PCCM Recruiting
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-teal-100">
            Join the health systems that have cut time-to-fill by 60% and
            built PCCM teams that stay. Schedule a demo to see how.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="h-13 bg-white px-8 text-base font-semibold text-teal-700 hover:bg-slate-100"
              asChild
            >
              <Link href="/contact">
                Request a Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-13 border-white/30 bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10 hover:text-white"
              asChild
            >
              <Link href="mailto:employers@recruitmentmaneuver.com">
                Contact Sales
                <Phone className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
