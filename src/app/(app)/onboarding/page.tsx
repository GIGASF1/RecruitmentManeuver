"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StepBasics } from "@/components/onboarding/step-basics";
import { StepGeography } from "@/components/onboarding/step-geography";
import { StepPractice } from "@/components/onboarding/step-practice";
import { StepTeam } from "@/components/onboarding/step-team";
import { StepCompensation } from "@/components/onboarding/step-compensation";
import { StepDealbreakers } from "@/components/onboarding/step-dealbreakers";
import { StepWeights } from "@/components/onboarding/step-weights";
import type { OnboardingData, ScoringCategory } from "@/types";
import { SCORING_CATEGORIES } from "@/types";

const TOTAL_STEPS = 7;

const STEP_TITLES = [
  "Basics",
  "Geography",
  "Practice Model",
  "Team Support",
  "Compensation",
  "Must-haves & Dealbreakers",
  "Priority Weights",
];

const defaultWeights: Record<ScoringCategory, number> = Object.fromEntries(
  SCORING_CATEGORIES.map((c) => [c, 5])
) as Record<ScoringCategory, number>;

const initialData: OnboardingData = {
  // Step 1
  full_name: "",
  training_level: "attending",
  years_out: 0,
  desired_start_date: "",
  // Step 2
  preferred_states: [],
  preferred_cities: [],
  radius_miles: 50,
  willing_to_relocate: false,
  practice_type: "academic",
  // Step 3
  icu_schedule_model: "",
  call_frequency: "",
  nocturnist_coverage: false,
  tele_icu: false,
  procedures_comfort: [],
  // Step 4
  has_residents: false,
  has_fellows: false,
  has_apps: false,
  rt_coverage: "",
  rounding_support: "",
  // Step 5
  comp_model: "",
  min_base_salary: null,
  signing_bonus_important: false,
  loan_repayment_important: false,
  min_pto_days: null,
  cme_budget_important: false,
  malpractice_important: false,
  // Step 6
  must_haves: [],
  dealbreakers: [],
  // Step 7
  weights: defaultWeights,
};

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>(initialData);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateData = (updates: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS - 1) {
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((s) => s - 1);
    }
  };

  const handleFinish = async () => {
    setSaving(true);
    setError(null);

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      // Upsert profile
      const { error: profileError } = await supabase.from("profiles").upsert(
        {
          user_id: user.id,
          full_name: data.full_name,
          training_level: data.training_level,
          years_out: data.years_out,
          desired_start_date: data.desired_start_date || null,
          specialty: "pccm",
          onboarding_completed: true,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      );

      if (profileError) {
        throw new Error(`Profile save failed: ${profileError.message}`);
      }

      // Upsert preferences
      const { error: prefsError } = await supabase
        .from("preferences")
        .upsert(
          {
            user_id: user.id,
            preferred_states: data.preferred_states,
            preferred_cities: data.preferred_cities,
            radius_miles: data.radius_miles,
            willing_to_relocate: data.willing_to_relocate,
            practice_type: data.practice_type,
            icu_schedule_model: data.icu_schedule_model,
            call_frequency: data.call_frequency,
            nocturnist_coverage: data.nocturnist_coverage,
            tele_icu: data.tele_icu,
            procedures_comfort: data.procedures_comfort,
            has_residents: data.has_residents,
            has_fellows: data.has_fellows,
            has_apps: data.has_apps,
            rt_coverage: data.rt_coverage,
            rounding_support: data.rounding_support,
            comp_model: data.comp_model,
            min_base_salary: data.min_base_salary,
            signing_bonus_important: data.signing_bonus_important,
            loan_repayment_important: data.loan_repayment_important,
            min_pto_days: data.min_pto_days,
            cme_budget_important: data.cme_budget_important,
            malpractice_important: data.malpractice_important,
            must_haves: data.must_haves,
            dealbreakers: data.dealbreakers,
            weights: data.weights,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id" }
        );

      if (prefsError) {
        throw new Error(`Preferences save failed: ${prefsError.message}`);
      }

      router.push("/dashboard");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    } finally {
      setSaving(false);
    }
  };

  const progressPercent = ((step + 1) / TOTAL_STEPS) * 100;

  const renderStep = () => {
    switch (step) {
      case 0:
        return <StepBasics data={data} updateData={updateData} />;
      case 1:
        return <StepGeography data={data} updateData={updateData} />;
      case 2:
        return <StepPractice data={data} updateData={updateData} />;
      case 3:
        return <StepTeam data={data} updateData={updateData} />;
      case 4:
        return <StepCompensation data={data} updateData={updateData} />;
      case 5:
        return <StepDealbreakers data={data} updateData={updateData} />;
      case 6:
        return <StepWeights data={data} updateData={updateData} />;
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Set Up Your Preferences
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Step {step + 1} of {TOTAL_STEPS}: {STEP_TITLES[step]}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <Progress value={progressPercent} />
      </div>

      {/* Current Step */}
      {renderStep()}

      {/* Error Message */}
      {error && (
        <div className="mt-4 rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={step === 0}
        >
          Back
        </Button>

        {step < TOTAL_STEPS - 1 ? (
          <Button onClick={handleNext}>Next</Button>
        ) : (
          <Button onClick={handleFinish} disabled={saving}>
            {saving ? "Saving..." : "Complete Setup"}
          </Button>
        )}
      </div>
    </div>
  );
}
