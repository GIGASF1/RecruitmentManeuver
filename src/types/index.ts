// ── Core domain types for Recruitment Maneuver ──

export type TrainingLevel = "attending" | "fellow";
export type PracticeType = "academic" | "community" | "hybrid";
export type PipelineStage =
  | "researching"
  | "applied"
  | "interviewing"
  | "offer_received"
  | "negotiating"
  | "accepted"
  | "declined";

export type TaskStatus = "todo" | "in_progress" | "done";

// ── Scoring categories ──
export const SCORING_CATEGORIES = [
  "location",
  "schedule_call",
  "icu_model",
  "team_support",
  "compensation",
  "culture",
  "growth_leadership",
  "procedures",
  "research_academics",
] as const;

export type ScoringCategory = (typeof SCORING_CATEGORIES)[number];

export const CATEGORY_LABELS: Record<ScoringCategory, string> = {
  location: "Location",
  schedule_call: "Schedule & Call",
  icu_model: "ICU Model",
  team_support: "Team Support",
  compensation: "Compensation",
  culture: "Culture",
  growth_leadership: "Growth & Leadership",
  procedures: "Procedures",
  research_academics: "Research & Academics",
};

// ── User profile ──
export interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  training_level: TrainingLevel;
  years_out: number;
  desired_start_date: string | null;
  specialty: string; // "pccm" for MVP
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

// ── User preferences ──
export interface Preferences {
  id: string;
  user_id: string;
  // Geography
  preferred_states: string[];
  preferred_cities: string[];
  radius_miles: number;
  willing_to_relocate: boolean;
  practice_type: PracticeType;
  // Practice model
  icu_schedule_model: string;
  call_frequency: string;
  nocturnist_coverage: boolean;
  tele_icu: boolean;
  procedures_comfort: string[];
  // Team support
  has_residents: boolean;
  has_fellows: boolean;
  has_apps: boolean;
  rt_coverage: string;
  rounding_support: string;
  // Compensation
  comp_model: string; // "base" | "rvu" | "mixed"
  min_base_salary: number | null;
  signing_bonus_important: boolean;
  loan_repayment_important: boolean;
  min_pto_days: number | null;
  cme_budget_important: boolean;
  malpractice_important: boolean;
  // Must-haves and dealbreakers
  must_haves: string[];
  dealbreakers: string[];
  // Weight sliders (0–10)
  weights: Record<ScoringCategory, number>;
  created_at: string;
  updated_at: string;
}

// ── Opportunity ──
export interface Opportunity {
  id: string;
  user_id: string;
  organization_name: string;
  city: string;
  state: string;
  practice_type: PracticeType;
  // ICU model
  icu_model_description: string;
  icu_beds: number | null;
  open_vs_closed: string;
  // Schedule & call
  schedule_description: string;
  call_frequency: string;
  nocturnist_coverage: boolean;
  tele_icu: boolean;
  // Compensation
  base_salary: number | null;
  rvu_rate: number | null;
  signing_bonus: number | null;
  loan_repayment: number | null;
  pto_days: number | null;
  cme_budget: number | null;
  malpractice_covered: boolean;
  comp_notes: string;
  // Team
  has_residents: boolean;
  has_fellows: boolean;
  has_apps: boolean;
  app_count: number | null;
  rt_coverage: string;
  // Culture & growth
  culture_notes: string;
  leadership_opportunities: string;
  research_support: boolean;
  teaching_opportunities: boolean;
  procedures_available: string[];
  // Meta
  benefits_notes: string;
  free_notes: string;
  stage: PipelineStage;
  created_at: string;
  updated_at: string;
}

// ── Scoring ──
export interface ScoreBreakdown {
  category: ScoringCategory;
  raw_score: number; // 0–10
  weight: number; // 0–10
  weighted_score: number;
  rationale: string;
}

export interface OpportunityScore {
  id: string;
  opportunity_id: string;
  score_total: number; // 0–100
  breakdown: ScoreBreakdown[];
  rationale: string;
  created_at: string;
}

// ── Tasks ──
export interface Task {
  id: string;
  user_id: string;
  opportunity_id: string | null;
  title: string;
  due_date: string | null;
  status: TaskStatus;
  created_at: string;
}

// ── Notes ──
export interface Note {
  id: string;
  user_id: string;
  opportunity_id: string;
  content: string;
  created_at: string;
}

// ── Pipeline summary ──
export interface PipelineSummary {
  stage: PipelineStage;
  count: number;
}

// ── Onboarding form shape ──
export interface OnboardingData {
  // Step 1: basics
  full_name: string;
  training_level: TrainingLevel;
  years_out: number;
  desired_start_date: string;
  // Step 2: geography
  preferred_states: string[];
  preferred_cities: string[];
  radius_miles: number;
  willing_to_relocate: boolean;
  practice_type: PracticeType;
  // Step 3: practice model
  icu_schedule_model: string;
  call_frequency: string;
  nocturnist_coverage: boolean;
  tele_icu: boolean;
  procedures_comfort: string[];
  // Step 4: team support
  has_residents: boolean;
  has_fellows: boolean;
  has_apps: boolean;
  rt_coverage: string;
  rounding_support: string;
  // Step 5: compensation
  comp_model: string;
  min_base_salary: number | null;
  signing_bonus_important: boolean;
  loan_repayment_important: boolean;
  min_pto_days: number | null;
  cme_budget_important: boolean;
  malpractice_important: boolean;
  // Step 6: dealbreakers
  must_haves: string[];
  dealbreakers: string[];
  // Step 7: weights
  weights: Record<ScoringCategory, number>;
}
