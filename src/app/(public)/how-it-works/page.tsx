"use client";

import Link from "next/link";
import {
  UserCircle,
  Brain,
  MessageSquare,
  Users,
  Handshake,
  Building2,
  Search,
  Mic,
  ClipboardList,
  Package,
  Target,
  GitCompare,
  CheckSquare,
  StickyNote,
  GraduationCap,
  Mail,
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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";


const physicianSteps = [
  {
    number: 1,
    icon: UserCircle,
    title: "Create Your Profile",
    description:
      "Tell us about your subspecialty focus, geographic preferences, compensation expectations, and dealbreakers. Set priority weights so our engine knows what matters most -- whether that's procedural volume, call schedule, academic affiliation, or location.",
    color: "blue",
  },
  {
    number: 2,
    icon: Brain,
    title: "AI Matching",
    description:
      "Our matching engine scores every available opportunity against your criteria using 40+ PCCM-specific data points. You see a transparent fit score for each position with category-level breakdowns explaining exactly why it scored the way it did.",
    color: "teal",
  },
  {
    number: 3,
    icon: MessageSquare,
    title: "AI Pre-Screen",
    description:
      "A conversational AI interview validates fit from your perspective -- confirming your priorities, exploring flexibility on key criteria, and capturing nuances that a form can't. This ensures only well-matched opportunities reach your dashboard.",
    color: "blue",
  },
  {
    number: 4,
    icon: Users,
    title: "Interview with Human Specialist",
    description:
      "A dedicated PCCM recruiting specialist reviews your profile and AI screening results, then conducts an in-depth career conversation. They understand ICU models, fellowship dynamics, and the subtleties of practice environments to guide your search.",
    color: "teal",
  },
  {
    number: 5,
    icon: Handshake,
    title: "Placement & Support",
    description:
      "Once you identify your top choice, we provide contract review assistance, negotiation guidance, relocation resources, and credentialing support. After you start, a 90-day check-in ensures the position is everything you expected.",
    color: "blue",
  },
];

const employerSteps = [
  {
    number: 1,
    icon: Building2,
    title: "Define Your Need",
    description:
      "Describe the position in detail: subspecialty requirements, ICU model, call structure, procedural expectations, team dynamics, and institutional culture. The more specific you are, the better our matching performs.",
    color: "blue",
  },
  {
    number: 2,
    icon: Search,
    title: "AI Sourcing & Screening",
    description:
      "Our AI searches across multiple channels -- databases, job boards, referral networks, and our candidate pool -- then screens candidates against your requirements with structured fit scoring and credential verification.",
    color: "teal",
  },
  {
    number: 3,
    icon: Mic,
    title: "Interview Intelligence",
    description:
      "AI-captured interviews generate structured feedback reports with standardized scoring. Compare candidates objectively across the criteria that matter to your institution, with full transcripts and highlight reels available.",
    color: "blue",
  },
  {
    number: 4,
    icon: ClipboardList,
    title: "Human-First Presentation",
    description:
      "A PCCM recruiting specialist curates a shortlist with rich context -- not just credentials, but career motivations, cultural preferences, and the nuances that determine long-term retention. Every candidate is presented with a narrative, not just a CV.",
    color: "teal",
  },
  {
    number: 5,
    icon: Package,
    title: "Offer & Onboarding",
    description:
      "We support you through offer negotiation, contract structuring, credentialing coordination, and onboarding logistics. Our 90-day guarantee means if the placement doesn't work out, we restart the search at no additional cost.",
    color: "blue",
  },
];

const features = [
  {
    icon: Target,
    title: "Fit Scoring Engine",
    description:
      "40+ PCCM-specific criteria with weighted scoring. Transparent breakdowns show exactly why each match scored the way it did.",
  },
  {
    icon: GitCompare,
    title: "Opportunity Comparison",
    description:
      "Side-by-side comparison of multiple positions across compensation, call, procedures, geography, culture, and more.",
  },
  {
    icon: CheckSquare,
    title: "Task Management",
    description:
      "Track applications, interviews, follow-ups, and deadlines in one place. Never miss a step in your search process.",
  },
  {
    icon: StickyNote,
    title: "Note-Taking",
    description:
      "Capture impressions from site visits, phone calls, and interviews. AI-powered note summarization highlights key takeaways.",
  },
  {
    icon: GraduationCap,
    title: "Interview Prep",
    description:
      "AI-generated practice questions tailored to each position. Covers clinical scenarios, program-specific topics, and contract terms.",
  },
  {
    icon: Mail,
    title: "AI Email Drafting",
    description:
      "Generate professional follow-up emails, thank-you notes, and negotiation correspondence tailored to each interaction.",
  },
];

const faqs = [
  {
    question: "How long does the typical placement process take?",
    answer:
      "For physicians, the timeline depends on your urgency and flexibility. Most physicians begin seeing matched opportunities within 48 hours of completing their profile. The full process from profile to signed contract typically takes 4-8 weeks. For employers, the timeline from search initiation to presented shortlist is typically 2-3 weeks.",
  },
  {
    question: "What makes AI screening different from a recruiter calling me?",
    answer:
      "Our AI pre-screen is designed to be convenient and comprehensive. It happens on your schedule, captures your preferences in a conversational format, and scores opportunities objectively against your stated criteria. Unlike a traditional recruiter call, there's no sales pressure -- the AI is gathering information, not pitching positions.",
  },
  {
    question: "Do I have to talk to a human recruiter?",
    answer:
      "If you're a physician using the self-service tools (fit scoring, comparison, notes, tasks), no. The human specialist is part of our full-service placement process and is included in the Active physician plan and all employer packages. Many physicians find the specialist conversation invaluable for navigating contract terms and culture fit.",
  },
  {
    question: "How is my data protected?",
    answer:
      "Your profile and preferences are never shared with employers without your explicit consent. We do not sell your data to third parties. All data is encrypted at rest and in transit, and we comply with healthcare data handling best practices.",
  },
  {
    question: "What does the 90-day guarantee cover?",
    answer:
      "If a placed physician leaves or is terminated within 90 days of their start date, we restart the search for the employer at no additional placement fee. This guarantee applies to our Full-Package employer plan and reflects our confidence in match quality.",
  },
];

function StepCard({
  step,
}: {
  step: {
    number: number;
    icon: React.ElementType;
    title: string;
    description: string;
    color: string;
  };
}) {
  const Icon = step.icon;
  const isBlue = step.color === "blue";

  return (
    <div className="relative flex gap-4 sm:gap-6">
      {/* Step number and line */}
      <div className="flex flex-col items-center">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-white ${
            isBlue ? "bg-blue-600" : "bg-teal-600"
          }`}
        >
          {step.number}
        </div>
        {step.number < 5 && (
          <div className="mt-2 h-full w-0.5 bg-slate-200" />
        )}
      </div>

      {/* Content */}
      <div className="pb-10">
        <div className="flex items-center gap-3 mb-2">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-lg ${
              isBlue ? "bg-blue-50" : "bg-teal-50"
            }`}
          >
            <Icon
              className={`h-5 w-5 ${
                isBlue ? "text-blue-700" : "text-teal-600"
              }`}
            />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
        </div>
        <p className="text-slate-600 leading-7">{step.description}</p>
      </div>
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <div className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Hero */}
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4 text-blue-700 bg-blue-50 border-blue-200">
            AI + Human Recruiting
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            How Recruitment Maneuver Works
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            A structured, transparent process that combines AI precision with
            human expertise -- built specifically for the complexity of PCCM
            physician recruiting.
          </p>
        </div>

        {/* Tabbed Process Steps */}
        <div className="mx-auto mt-16 max-w-3xl">
          <Tabs defaultValue="physicians" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="physicians">For Physicians</TabsTrigger>
              <TabsTrigger value="employers">For Employers</TabsTrigger>
            </TabsList>

            <TabsContent value="physicians" className="mt-10">
              <div className="space-y-0">
                {physicianSteps.map((step) => (
                  <StepCard key={step.number} step={step} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="employers" className="mt-10">
              <div className="space-y-0">
                {employerSteps.map((step) => (
                  <StepCard key={step.number} step={step} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Platform Features */}
        <div className="mx-auto mt-20 max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Platform Features
            </h2>
            <p className="mt-4 text-slate-600 leading-7 max-w-2xl mx-auto">
              Tools designed specifically for the PCCM job search -- from initial
              exploration through contract signing.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <feature.icon className="h-5 w-5 text-blue-700" />
                  </div>
                  <CardTitle className="text-base text-slate-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed text-slate-500">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mx-auto mt-20 max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Frequently Asked Questions
            </h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-slate-900">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-7">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA */}
        <div className="mx-auto mt-20 max-w-2xl rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 p-10 text-center text-white shadow-lg">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready to Get Started?
          </h2>
          <p className="mt-3 text-blue-100">
            Join the platform built exclusively for PCCM physicians and the
            institutions that hire them.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/signup">
                I&apos;m a Physician
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 hover:text-white"
              asChild
            >
              <Link href="/signup">
                I&apos;m an Employer
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
