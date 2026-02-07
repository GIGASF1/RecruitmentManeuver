import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
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

export const metadata: Metadata = {
  title: "Pricing | Recruitment Maneuver",
  description:
    "Start tracking PCCM opportunities for free. Upgrade to the Active plan for unlimited opportunities, AI-powered insights, and advanced comparison tools.",
};

const plans = [
  {
    name: "Passive",
    price: "Free",
    priceDetail: "No credit card required",
    description:
      "For physicians who want a structured way to track and evaluate a small number of opportunities.",
    features: [
      "Track up to 5 opportunities",
      "Manual fit scoring",
      "Basic opportunity details",
      "Side-by-side comparison (2 at a time)",
      "Personal preference weighting",
      "Status and timeline tracking",
    ],
    cta: "Get Started",
    ctaHref: "/signup",
    ctaDisabled: false,
    highlighted: false,
  },
  {
    name: "Active",
    price: "$29",
    priceDetail: "per month",
    description:
      "For physicians actively in the job market who need the full toolkit to manage a complex search.",
    features: [
      "Unlimited opportunities",
      "AI-powered fit scoring",
      "AI-generated opportunity insights",
      "Advanced multi-opportunity comparison",
      "Negotiation prep tools",
      "Compensation benchmarking",
      "Priority support",
      "Export and share reports",
    ],
    cta: "Coming Soon",
    ctaHref: "#",
    ctaDisabled: true,
    highlighted: true,
  },
];

export default function PricingPage() {
  return (
    <div className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Start free and upgrade when your search demands it. No hidden fees,
            no recruiter upsells, no data selling.
          </p>
        </div>

        {/* Plans */}
        <div className="mx-auto mt-16 grid max-w-4xl gap-8 lg:grid-cols-2">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col ${
                plan.highlighted
                  ? "border-primary shadow-lg"
                  : ""
              }`}
            >
              {plan.highlighted && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Most Popular
                </Badge>
              )}

              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-2">
                  <span className="text-4xl font-bold tracking-tight">
                    {plan.price}
                  </span>
                  {plan.priceDetail && (
                    <span className="ml-2 text-sm text-muted-foreground">
                      {plan.priceDetail}
                    </span>
                  )}
                </div>
                <CardDescription className="mt-3 leading-relaxed">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full"
                  size="lg"
                  variant={plan.highlighted ? "default" : "outline"}
                  disabled={plan.ctaDisabled}
                  asChild={!plan.ctaDisabled}
                >
                  {plan.ctaDisabled ? (
                    <span>{plan.cta}</span>
                  ) : (
                    <Link href={plan.ctaHref}>
                      {plan.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* FAQ teaser */}
        <div className="mx-auto mt-20 max-w-2xl text-center">
          <p className="text-sm text-muted-foreground">
            Have questions? Reach out to us at{" "}
            <a
              href="mailto:support@recruitmentmaneuver.com"
              className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
            >
              support@recruitmentmaneuver.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
