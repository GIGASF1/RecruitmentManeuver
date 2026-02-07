import type { Metadata } from "next";
import Link from "next/link";
import {
  Stethoscope,
  Heart,
  Shield,
  Users,
  Eye,
  Handshake,
  ArrowRight,
  Cpu,
  UserCheck,
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
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "About | Recruitment Maneuver",
  description:
    "Built by physicians, for physicians. Learn about the mission behind Recruitment Maneuver and why we focus exclusively on Pulmonary & Critical Care Medicine.",
};

const values = [
  {
    icon: Stethoscope,
    title: "Specialty Expertise",
    description:
      "We focus exclusively on PCCM, understanding ICU models, ventilator management, bronchoscopy volumes, and the nuances that generic recruiters miss.",
  },
  {
    icon: Heart,
    title: "Physician-First",
    description:
      "Every feature is designed around the physician experience. Your career goals, your preferences, your timeline -- never the recruiter's quota.",
  },
  {
    icon: Eye,
    title: "AI Transparency",
    description:
      "Our AI scoring and matching is fully explainable. You see exactly why a position scored the way it did, with no black-box algorithms.",
  },
  {
    icon: Shield,
    title: "Placement Integrity",
    description:
      "We measure success by 12-month retention, not placement volume. Our guarantee reflects confidence in the quality of every match we make.",
  },
];

const leaders = [
  {
    name: "Dr. Sarah Mitchell",
    role: "CEO & Founder",
    background: "Former PCCM Physician",
    description:
      "After 12 years in academic pulmonary medicine, Dr. Mitchell experienced firsthand the frustrations of physician recruiting -- opaque processes, misaligned incentives, and recruiters who didn't understand ICU staffing models. She founded Recruitment Maneuver to fix it.",
  },
  {
    name: "James Chen",
    role: "Chief Technology Officer",
    background: "AI & Healthcare Tech",
    description:
      "With a decade building AI systems for healthcare organizations, James leads the engineering team that powers our matching engine, interview intelligence, and candidate scoring algorithms.",
  },
  {
    name: "Maria Gonzalez",
    role: "VP of Recruiting",
    background: "15 Years in Physician Recruiting",
    description:
      "Maria has placed over 400 physicians across critical care, pulmonary, and sleep medicine. She leads our specialist recruiting team and ensures every candidate interaction reflects our physician-first values.",
  },
];

export default function AboutPage() {
  return (
    <div className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Hero */}
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4 text-blue-700 bg-blue-50 border-blue-200">
            PCCM-Focused Recruiting
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Redefining PCCM Recruiting
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Recruitment Maneuver combines the precision of artificial intelligence
            with the insight of dedicated PCCM specialists to transform how
            pulmonary and critical care physicians find their next role -- and how
            employers find their next team member.
          </p>
        </div>

        <Separator className="mx-auto mt-16 max-w-2xl" />

        {/* Mission & Vision */}
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <Handshake className="h-5 w-5 text-blue-700" />
                </div>
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                  Our Mission
                </h2>
              </div>
              <p className="text-slate-600 leading-7">
                Make PCCM recruiting faster, smarter, and fairer. We believe
                physician recruiting should be driven by genuine fit -- not
                geography shortcuts, keyword matching, or recruiter convenience.
                Every physician deserves a process that respects their time and
                surfaces opportunities aligned with their actual priorities.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100">
                  <Eye className="h-5 w-5 text-teal-600" />
                </div>
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                  Our Vision
                </h2>
              </div>
              <p className="text-slate-600 leading-7">
                A world where every pulmonary and critical care physician is
                matched to their ideal practice setting -- where their clinical
                skills, career ambitions, lifestyle priorities, and values align
                with the institution, team, and community they serve.
              </p>
            </div>
          </div>
        </div>

        {/* Why PCCM-Only */}
        <div className="mx-auto mt-20 max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Why PCCM-Only?
            </h2>
            <p className="mt-4 text-slate-600 leading-7 max-w-2xl mx-auto">
              Generic recruiting platforms treat all physician specialties the same.
              But PCCM is uniquely complex, and matching requires deep specialty knowledge.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "ICU Staffing Models",
                detail: "Open vs. closed vs. hybrid ICUs, intensivist-to-bed ratios, night coverage structures, and APP supervision models all impact daily practice.",
              },
              {
                title: "Call Schedules & Coverage",
                detail: "24/7 in-house coverage, home call with tele-ICU, weekend rounding expectations, and code team responsibilities vary enormously between programs.",
              },
              {
                title: "Procedural Volumes",
                detail: "Bronchoscopy suites, EBUS access, thoracentesis volumes, chest tube placements, and tracheostomy privileges differ by institution and role.",
              },
              {
                title: "Fellowship & Academic Pathways",
                detail: "Teaching responsibilities, fellowship program involvement, protected research time, and tenure tracks require specialty-specific understanding.",
              },
            ].map((item) => (
              <Card key={item.title} className="border-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-900">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed text-slate-500">
                    {item.detail}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Our Approach: AI + Human */}
        <div className="mx-auto mt-20 max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Our Approach: AI + Human
            </h2>
            <p className="mt-4 text-slate-600 leading-7 max-w-2xl mx-auto">
              Neither AI alone nor human recruiters alone can solve physician recruiting.
              We combine the best of both.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="border-blue-200 bg-blue-50/30">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                    <Cpu className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-blue-900">AI at Scale</CardTitle>
                    <CardDescription className="text-blue-700">Speed, consistency, objectivity</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                    Multi-channel candidate sourcing across databases, job boards, and referral networks
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                    Automated screening and fit scoring against 40+ specialty-specific criteria
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                    Intelligent scheduling that respects physician availability and time zones
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                    Conversational pre-screening that captures preferences naturally
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-teal-200 bg-teal-50/30">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100">
                    <UserCheck className="h-6 w-6 text-teal-700" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-teal-900">Human Specialists</CardTitle>
                    <CardDescription className="text-teal-700">Nuance, empathy, judgment</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-600 shrink-0" />
                    Dedicated PCCM recruiters who understand specialty-specific career dynamics
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-600 shrink-0" />
                    Culture fit assessment through in-depth career conversations
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-600 shrink-0" />
                    Contract negotiation guidance informed by market benchmarks
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-600 shrink-0" />
                    Ongoing relationship through onboarding and 90-day check-ins
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Leadership Team */}
        <div className="mx-auto mt-20 max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Leadership Team
            </h2>
            <p className="mt-4 text-slate-600">
              Physicians, technologists, and recruiting veterans building the future of PCCM hiring.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {leaders.map((leader) => (
              <Card key={leader.name} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
                    <Users className="h-8 w-8 text-slate-400" />
                  </div>
                  <CardTitle className="text-lg text-slate-900">{leader.name}</CardTitle>
                  <CardDescription>
                    <span className="font-medium text-blue-700">{leader.role}</span>
                    <br />
                    <span className="text-slate-500">{leader.background}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {leader.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mx-auto mt-20 max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              What We Stand For
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <Card key={value.title} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                    <value.icon className="h-6 w-6 text-blue-700" />
                  </div>
                  <CardTitle className="text-base text-slate-900">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed text-slate-500">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mx-auto mt-20 max-w-2xl rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 p-10 text-center text-white shadow-lg">
          <h2 className="text-2xl font-bold sm:text-3xl">Join the Platform</h2>
          <p className="mt-3 text-blue-100">
            Whether you are a PCCM physician exploring your next opportunity or an
            employer seeking top talent, Recruitment Maneuver is built for you.
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
