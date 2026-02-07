import Link from "next/link";
import {
  Search,
  ArrowRight,
  ChevronRight,
  Stethoscope,
  Brain,
  Users,
  Shield,
  Zap,
  Building2,
  UserCheck,
  BarChart3,
  MessageSquare,
  Target,
  Award,
  Clock,
  CheckCircle2,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { PublicNavbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const stats = [
  { value: "2,400+", label: "PCCM Positions", icon: Stethoscope },
  { value: "850+", label: "Health Systems", icon: Building2 },
  { value: "97%", label: "Placement Rate", icon: Target },
  { value: "14-Day", label: "Avg. Time to Match", icon: Clock },
];

const physicianFeatures = [
  {
    icon: Brain,
    text: "AI-matched opportunities tailored to your subspecialty, preferences, and career goals",
  },
  {
    icon: BarChart3,
    text: "Specialty-specific fit scoring across compensation, call schedule, procedural volume, and culture",
  },
  {
    icon: Shield,
    text: "Confidential profile visible only to verified employers you approve",
  },
  {
    icon: UserCheck,
    text: "Full-service placement support from a dedicated PCCM recruiting specialist",
  },
];

const employerFeatures = [
  {
    icon: Zap,
    text: "AI-screened candidate pipeline delivering only qualified, interested PCCM physicians",
  },
  {
    icon: CheckCircle2,
    text: "Specialty-verified applicants with credential and training confirmation",
  },
  {
    icon: Clock,
    text: "Reduce time-to-hire by 60% with intelligent matching and automated workflows",
  },
  {
    icon: Phone,
    text: "Dedicated PCCM recruiting team managing outreach, scheduling, and follow-up",
  },
];

const services = [
  {
    icon: Brain,
    title: "AI Screening Agent",
    description:
      "Our AI pre-screens every candidate for specialty fit, credentials, and preference alignment before any human interaction.",
  },
  {
    icon: MessageSquare,
    title: "Interview Intelligence",
    description:
      "AI-captured interview insights give both parties structured feedback. No more black-box recruiting.",
  },
  {
    icon: Users,
    title: "Human-First Matching",
    description:
      "A dedicated PCCM specialist reviews every match. Technology accelerates \u2014 humans decide.",
  },
  {
    icon: Award,
    title: "Full-Package Placement",
    description:
      "From contract negotiation to relocation support, we handle the entire placement lifecycle.",
  },
];

const trustedOrgs = [
  "Mayo Clinic",
  "Cleveland Clinic",
  "Johns Hopkins",
  "Mass General",
  "UCSF Health",
  "Duke Health",
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicNavbar />

      <main className="flex-1">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
          {/* subtle decorative circles */}
          <div className="pointer-events-none absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-60 -right-40 h-[500px] w-[500px] rounded-full bg-teal-500/10 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
            <div className="mx-auto max-w-4xl text-center">
              <Badge className="mb-6 border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-300 hover:bg-blue-500/10">
                Built Exclusively for Pulmonary &amp; Critical Care Medicine
              </Badge>

              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                The Future of PCCM{" "}
                <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                  Physician Recruitment
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                AI-powered screening. Human-first placement. Built exclusively
                for Pulmonary &amp; Critical Care Medicine.
              </p>

              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button
                  size="lg"
                  className="h-13 bg-blue-600 px-8 text-base font-semibold hover:bg-blue-700"
                  asChild
                >
                  <Link href="/signup">
                    Find PCCM Opportunities
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
                    Hire PCCM Physicians
                    <ChevronRight className="ml-1 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              {/* Stat Cards */}
              <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-5 backdrop-blur-sm"
                  >
                    <stat.icon className="mx-auto mb-2 h-6 w-6 text-teal-400" />
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

        {/* ── Quick Search Widget ── */}
        <section className="relative z-10 mx-auto -mt-8 max-w-5xl px-4 sm:px-6">
          <div className="rounded-xl bg-white p-6 shadow-lg sm:p-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
              <Select>
                <SelectTrigger className="h-11 w-full">
                  <SelectValue placeholder="Subspecialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General PCCM</SelectItem>
                  <SelectItem value="interventional">
                    Interventional Pulmonology
                  </SelectItem>
                  <SelectItem value="sleep">Sleep Medicine</SelectItem>
                  <SelectItem value="critical-care">
                    Critical Care Only
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="h-11 w-full">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any State</SelectItem>
                  <SelectItem value="CA">California</SelectItem>
                  <SelectItem value="TX">Texas</SelectItem>
                  <SelectItem value="NY">New York</SelectItem>
                  <SelectItem value="FL">Florida</SelectItem>
                  <SelectItem value="IL">Illinois</SelectItem>
                  <SelectItem value="MA">Massachusetts</SelectItem>
                  <SelectItem value="PA">Pennsylvania</SelectItem>
                  <SelectItem value="OH">Ohio</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="h-11 w-full">
                  <SelectValue placeholder="Setting" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="community">Community</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                  <SelectItem value="va">VA</SelectItem>
                  <SelectItem value="locum">Locum Tenens</SelectItem>
                </SelectContent>
              </Select>

              <Button className="h-11 bg-blue-600 font-semibold hover:bg-blue-700">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
        </section>

        {/* ── Dual-Audience Value Props ── */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                One Platform. Two Powerful Experiences.
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Whether you are a physician seeking your next role or an employer
                building a world-class PCCM team, Recruitment Maneuver delivers.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Physicians Card */}
              <Card className="relative overflow-hidden border-blue-200 shadow-md">
                <div className="absolute left-0 top-0 h-full w-1.5 bg-blue-600" />
                <CardHeader className="pb-4">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                    <Stethoscope className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-900">
                    For PCCM Physicians
                  </CardTitle>
                  <CardDescription className="text-base text-slate-600">
                    Your career is too important for generic job boards. Get
                    matched with opportunities that actually fit.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {physicianFeatures.map((feature) => (
                    <div key={feature.text} className="flex gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                        <feature.icon className="h-4 w-4 text-blue-600" />
                      </div>
                      <p className="text-sm leading-relaxed text-slate-700">
                        {feature.text}
                      </p>
                    </div>
                  ))}
                  <div className="pt-4">
                    <Button
                      className="bg-blue-600 font-semibold hover:bg-blue-700"
                      asChild
                    >
                      <Link href="/signup">
                        Create Your Profile
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Employers Card */}
              <Card className="relative overflow-hidden border-teal-200 shadow-md">
                <div className="absolute left-0 top-0 h-full w-1.5 bg-teal-500" />
                <CardHeader className="pb-4">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100">
                    <Building2 className="h-6 w-6 text-teal-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-900">
                    For Employers &amp; Programs
                  </CardTitle>
                  <CardDescription className="text-base text-slate-600">
                    Stop sifting through unqualified applicants. Get an
                    AI-curated pipeline of specialty-verified PCCM talent.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {employerFeatures.map((feature) => (
                    <div key={feature.text} className="flex gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-50">
                        <feature.icon className="h-4 w-4 text-teal-600" />
                      </div>
                      <p className="text-sm leading-relaxed text-slate-700">
                        {feature.text}
                      </p>
                    </div>
                  ))}
                  <div className="pt-4">
                    <Button
                      className="bg-teal-600 font-semibold hover:bg-teal-700"
                      asChild
                    >
                      <Link href="/employers">
                        Request a Demo
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* ── Platform Services ── */}
        <section className="bg-slate-50 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <Badge className="mb-4 border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 hover:bg-blue-50">
                Our Process
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                How Recruitment Maneuver Works
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Four pillars that make PCCM recruiting faster, smarter, and more
                transparent for everyone involved.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service, index) => (
                <Card
                  key={service.title}
                  className="group relative border-slate-200 transition-all hover:border-blue-300 hover:shadow-lg"
                >
                  <CardHeader>
                    <div className="mb-1 flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                        {index + 1}
                      </span>
                    </div>
                    <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-teal-50">
                      <service.icon className="h-5 w-5 text-blue-700" />
                    </div>
                    <CardTitle className="text-lg font-bold text-slate-900">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed text-slate-600">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ── Social Proof / Trust Strip ── */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <p className="mb-10 text-center text-lg font-semibold tracking-wide text-slate-400">
              Trusted by Leading Health Systems
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
              {trustedOrgs.map((org) => (
                <span
                  key={org}
                  className="rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium tracking-wide text-slate-300"
                >
                  {org}
                </span>
              ))}
            </div>
            <p className="mt-6 text-center text-xs text-slate-500">
              Representative / illustrative. Partnerships shown for
              demonstration purposes.
            </p>
          </div>
        </section>

        {/* ── AI Differentiator Section ── */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <Badge className="mb-4 border-teal-200 bg-teal-50 px-3 py-1 text-sm font-medium text-teal-700 hover:bg-teal-50">
                  AI + Human Expertise
                </Badge>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Recruiting, Reinvented{" "}
                  <span className="text-blue-600">with AI</span>
                </h2>

                <p className="mt-6 text-base leading-7 text-slate-600">
                  Traditional physician recruiting relies on cold outreach,
                  keyword-matched resumes, and gut instinct. Recruitment
                  Maneuver replaces that broken pipeline with an intelligent
                  system purpose-built for PCCM. Our AI agent conducts initial
                  screening interviews, evaluating candidates on subspecialty
                  depth, clinical preferences, and career trajectory before a
                  single recruiter picks up the phone.
                </p>

                <p className="mt-4 text-base leading-7 text-slate-600">
                  Behind the scenes, NLP-powered credential verification
                  cross-references board certifications, fellowship training,
                  and procedural competencies across national databases.
                  Specialty-specific behavioral analysis identifies candidates
                  who will thrive in your specific practice environment, whether
                  that is a high-acuity academic ICU or a community
                  pulmonology outpatient program.
                </p>

                <p className="mt-4 text-base leading-7 text-slate-600">
                  But here is what makes us different: every placement goes
                  through a human PCCM physician reviewer. AI handles the scale,
                  speed, and data. Humans handle the nuance, the culture fit,
                  and the career-shaping conversations. That is recruiting
                  reinvented.
                </p>

                <div className="mt-8">
                  <Button
                    className="bg-blue-600 font-semibold hover:bg-blue-700"
                    asChild
                  >
                    <Link href="/services/ai-screening">
                      Learn About Our AI
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Visual feature list on the right */}
              <div className="space-y-5">
                {[
                  {
                    icon: Brain,
                    title: "AI Screening Interviews",
                    desc: "Conversational AI evaluates specialty knowledge, clinical preferences, and career goals at scale.",
                  },
                  {
                    icon: Shield,
                    title: "NLP Credential Verification",
                    desc: "Automated cross-referencing of board certifications, fellowship records, and procedural logs.",
                  },
                  {
                    icon: BarChart3,
                    title: "Behavioral Analysis",
                    desc: "Specialty-specific models predict culture fit, retention likelihood, and practice alignment.",
                  },
                  {
                    icon: UserCheck,
                    title: "Physician Reviewer Sign-Off",
                    desc: "Every match is reviewed by a practicing PCCM physician before reaching your desk.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-teal-500">
                      <item.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
                    </div>
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
              Ready to Transform Your PCCM Recruiting?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
              Join the platform redefining how Pulmonary &amp; Critical Care
              physicians and employers connect.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="h-13 bg-white px-8 text-base font-semibold text-blue-700 hover:bg-slate-100"
                asChild
              >
                <Link href="/signup">
                  Get Started as a Physician
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
                  Schedule an Employer Demo
                  <Phone className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
