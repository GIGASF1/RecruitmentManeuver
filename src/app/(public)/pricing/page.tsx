"use client";

import Link from "next/link";
import { Check, ArrowRight, Star, Zap, Crown } from "lucide-react";
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";


const physicianPlans = [
  {
    name: "Passive Search",
    price: "Free",
    priceDetail: "No credit card required",
    description:
      "For physicians who want to explore opportunities at their own pace with core tracking and scoring tools.",
    features: [
      "Track up to 5 opportunities",
      "Basic fit scoring",
      "Side-by-side comparison tools",
      "Notes and task management",
    ],
    cta: "Get Started Free",
    ctaHref: "/signup",
    highlighted: false,
    icon: Star,
  },
  {
    name: "Active Search",
    price: "$29",
    priceDetail: "per month",
    description:
      "For physicians actively in the job market who need the full AI-powered toolkit and dedicated specialist support.",
    features: [
      "Unlimited opportunities",
      "AI-powered fit scoring",
      "AI interview prep",
      "Negotiation email drafting",
      "Note summarization",
      "Dedicated specialist support",
      "Priority matching",
    ],
    cta: "Start Active Search",
    ctaHref: "/signup",
    highlighted: true,
    icon: Zap,
  },
];

const employerPlans = [
  {
    name: "AI Screening",
    price: "$499",
    priceDetail: "per search",
    description:
      "AI-powered candidate screening and scoring for employers who want to streamline their initial evaluation process.",
    features: [
      "AI candidate screening",
      "Scored shortlists",
      "Credential verification",
      "Dashboard access",
    ],
    cta: "Start Screening",
    ctaHref: "/signup",
    highlighted: false,
    icon: Star,
  },
  {
    name: "AI + Interview",
    price: "$999",
    priceDetail: "per search",
    description:
      "Full AI capabilities plus interview intelligence for employers who want structured, data-driven candidate evaluation.",
    features: [
      "Everything in AI Screening",
      "Interview Intelligence",
      "Structured feedback reports",
      "Candidate comparison analytics",
    ],
    cta: "Get AI + Interview",
    ctaHref: "/signup",
    highlighted: true,
    icon: Zap,
  },
  {
    name: "Full-Package",
    price: "Custom",
    priceDetail: "contact for pricing",
    description:
      "End-to-end recruiting with a dedicated PCCM specialist, full lifecycle support, and our 90-day placement guarantee.",
    features: [
      "Everything in AI + Interview",
      "Dedicated PCCM recruiter",
      "Full placement lifecycle",
      "Contract negotiation support",
      "90-day guarantee",
      "Volume discounts available",
    ],
    cta: "Contact Sales",
    ctaHref: "/signup",
    highlighted: false,
    icon: Crown,
  },
];

const faqs = [
  {
    question: "Is the Free plan really free?",
    answer:
      "Yes. The Passive Search plan is completely free with no credit card required. You can track up to 5 opportunities, use basic fit scoring, and compare positions side-by-side. There are no hidden fees or trial periods.",
  },
  {
    question: "Can I switch between plans?",
    answer:
      "Absolutely. Physicians can upgrade from Free to Active Search at any time, and your existing data carries over. You can also downgrade back to Free, though you will be limited to 5 active opportunities. For employers, you can choose different tiers for different searches.",
  },
  {
    question: "What does 'per search' mean for employer plans?",
    answer:
      "A search is a single position you are looking to fill. If you are hiring for multiple PCCM positions, each position is a separate search. The Full-Package plan offers volume discounts for organizations hiring multiple physicians.",
  },
  {
    question: "What is included in the 90-day guarantee?",
    answer:
      "If a physician placed through our Full-Package plan leaves or is terminated within 90 days of their start date, we restart the search at no additional placement fee. This applies to the full placement lifecycle, not just the AI screening components.",
  },
  {
    question: "Do physicians pay anything for employer-initiated contact?",
    answer:
      "No. Physicians never pay for employer-initiated recruiting. The physician plans are for self-directed job search tools. If an employer finds you through our platform, there is no cost to you regardless of your plan.",
  },
  {
    question: "Is there a long-term contract?",
    answer:
      "No. The Active Search plan for physicians is month-to-month and can be cancelled at any time. Employer plans are per-search with no ongoing commitment. The Full-Package plan includes a search agreement but no long-term platform subscription.",
  },
];

function PlanCard({
  plan,
}: {
  plan: {
    name: string;
    price: string;
    priceDetail: string;
    description: string;
    features: string[];
    cta: string;
    ctaHref: string;
    highlighted: boolean;
    icon: React.ElementType;
  };
}) {
  const Icon = plan.icon;

  return (
    <Card
      className={`relative flex flex-col ${
        plan.highlighted
          ? "border-blue-600 shadow-lg shadow-blue-100 ring-1 ring-blue-600"
          : "border-slate-200"
      }`}
    >
      {plan.highlighted && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600">
          Most Popular
        </Badge>
      )}

      <CardHeader>
        <div className="flex items-center gap-2 mb-1">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-lg ${
              plan.highlighted ? "bg-blue-100" : "bg-slate-100"
            }`}
          >
            <Icon
              className={`h-4 w-4 ${
                plan.highlighted ? "text-blue-700" : "text-slate-600"
              }`}
            />
          </div>
          <CardTitle className="text-xl text-slate-900">{plan.name}</CardTitle>
        </div>
        <div className="mt-2">
          <span className="text-4xl font-bold tracking-tight text-slate-900">
            {plan.price}
          </span>
          {plan.priceDetail && (
            <span className="ml-2 text-sm text-slate-500">
              {plan.priceDetail}
            </span>
          )}
        </div>
        <CardDescription className="mt-3 leading-relaxed text-slate-500">
          {plan.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <Separator className="mb-6" />
        <ul className="space-y-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
              <span className="text-sm text-slate-600">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <Button
          className={`w-full ${
            plan.highlighted
              ? "bg-blue-600 hover:bg-blue-700"
              : ""
          }`}
          size="lg"
          variant={plan.highlighted ? "default" : "outline"}
          asChild
        >
          <Link href={plan.ctaHref}>
            {plan.cta}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function PricingPage() {
  return (
    <div className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Hero */}
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4 text-blue-700 bg-blue-50 border-blue-200">
            Transparent Pricing
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            No hidden fees, no recruiter upsells, no data selling. Choose the plan
            that fits your needs -- whether you are a physician exploring
            opportunities or an employer seeking PCCM talent.
          </p>
        </div>

        {/* Tabbed Pricing */}
        <div className="mx-auto mt-16 max-w-5xl">
          <Tabs defaultValue="physicians" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="physicians">For Physicians</TabsTrigger>
              <TabsTrigger value="employers">For Employers</TabsTrigger>
            </TabsList>

            <TabsContent value="physicians" className="mt-10">
              <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-2">
                {physicianPlans.map((plan) => (
                  <PlanCard key={plan.name} plan={plan} />
                ))}
              </div>
              <p className="mt-8 text-center text-sm text-slate-500">
                Physicians never pay for employer-initiated contact. These plans
                are for self-directed search tools only.
              </p>
            </TabsContent>

            <TabsContent value="employers" className="mt-10">
              <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-3">
                {employerPlans.map((plan) => (
                  <PlanCard key={plan.name} plan={plan} />
                ))}
              </div>
              <p className="mt-8 text-center text-sm text-slate-500">
                All employer plans include dashboard access and secure candidate
                data handling. Volume discounts available for multi-position
                searches.
              </p>
            </TabsContent>
          </Tabs>
        </div>

        {/* FAQ */}
        <div className="mx-auto mt-20 max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Pricing FAQ
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
          <h2 className="text-2xl font-bold sm:text-3xl">Get Started Today</h2>
          <p className="mt-3 text-blue-100">
            Join the PCCM recruiting platform that puts physicians and employers
            first. Start free or choose the plan that fits your needs.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/signup">
                Start Free
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
                Contact Sales
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
