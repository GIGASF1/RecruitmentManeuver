import type {
  Opportunity,
  Preferences,
  ScoreBreakdown,
  ScoringCategory,
  OpportunityScore,
} from "@/types";
import { SCORING_CATEGORIES } from "@/types";

/**
 * Deterministic scoring engine for MVP.
 * Each category produces a raw score 0–10 based on rules.
 * Final score = weighted sum normalized to 0–100.
 */

// ── Category scorers ──

function scoreLocation(opp: Opportunity, prefs: Preferences): { score: number; rationale: string } {
  let score = 5; // base
  const reasons: string[] = [];

  // State match
  if (prefs.preferred_states.length > 0) {
    if (prefs.preferred_states.map(s => s.toLowerCase()).includes(opp.state.toLowerCase())) {
      score += 3;
      reasons.push(`State "${opp.state}" is in your preferred list`);
    } else {
      score -= 2;
      reasons.push(`State "${opp.state}" is not in your preferred states`);
    }
  }

  // City match
  if (prefs.preferred_cities.length > 0) {
    if (prefs.preferred_cities.map(c => c.toLowerCase()).includes(opp.city.toLowerCase())) {
      score += 2;
      reasons.push(`City "${opp.city}" is a preferred city`);
    }
  }

  // Practice type match
  if (opp.practice_type === prefs.practice_type) {
    score += 1;
    reasons.push(`Practice type matches your preference (${prefs.practice_type})`);
  } else if (opp.practice_type === "hybrid" || prefs.practice_type === "hybrid") {
    reasons.push("Practice type is a partial match (hybrid)");
  } else {
    score -= 1;
    reasons.push(`Practice type "${opp.practice_type}" doesn't match preference "${prefs.practice_type}"`);
  }

  return { score: clamp(score), rationale: reasons.join(". ") || "No specific location preferences set" };
}

function scoreScheduleCall(opp: Opportunity, prefs: Preferences): { score: number; rationale: string } {
  let score = 5;
  const reasons: string[] = [];

  // Nocturnist coverage match
  if (prefs.nocturnist_coverage && opp.nocturnist_coverage) {
    score += 2;
    reasons.push("Nocturnist coverage available as preferred");
  } else if (prefs.nocturnist_coverage && !opp.nocturnist_coverage) {
    score -= 2;
    reasons.push("No nocturnist coverage (you prefer it)");
  }

  // Tele-ICU match
  if (prefs.tele_icu && opp.tele_icu) {
    score += 1;
    reasons.push("Tele-ICU available");
  } else if (prefs.tele_icu && !opp.tele_icu) {
    score -= 1;
    reasons.push("No tele-ICU support");
  }

  // Call frequency comparison
  if (opp.call_frequency && prefs.call_frequency) {
    if (opp.call_frequency.toLowerCase() === prefs.call_frequency.toLowerCase()) {
      score += 2;
      reasons.push("Call frequency matches your preference");
    }
  }

  return { score: clamp(score), rationale: reasons.join(". ") || "Schedule details not fully specified" };
}

function scoreIcuModel(opp: Opportunity, prefs: Preferences): { score: number; rationale: string } {
  let score = 5;
  const reasons: string[] = [];

  if (opp.icu_model_description) {
    score += 1;
    reasons.push("ICU model description provided");
  }

  if (opp.icu_beds && opp.icu_beds > 0) {
    score += 1;
    reasons.push(`${opp.icu_beds} ICU beds`);
  }

  if (opp.open_vs_closed) {
    score += 1;
    reasons.push(`${opp.open_vs_closed} ICU model`);
    if (prefs.icu_schedule_model && opp.open_vs_closed.toLowerCase().includes(prefs.icu_schedule_model.toLowerCase())) {
      score += 2;
      reasons.push("ICU model matches your preference");
    }
  }

  return { score: clamp(score), rationale: reasons.join(". ") || "ICU model details not specified" };
}

function scoreTeamSupport(opp: Opportunity, prefs: Preferences): { score: number; rationale: string } {
  let score = 5;
  const reasons: string[] = [];

  // Residents
  if (prefs.has_residents && opp.has_residents) {
    score += 1.5;
    reasons.push("Residents available as preferred");
  } else if (prefs.has_residents && !opp.has_residents) {
    score -= 1.5;
    reasons.push("No residents (you prefer them)");
  }

  // Fellows
  if (prefs.has_fellows && opp.has_fellows) {
    score += 1;
    reasons.push("Fellows available");
  } else if (prefs.has_fellows && !opp.has_fellows) {
    score -= 1;
    reasons.push("No fellows");
  }

  // APPs
  if (prefs.has_apps && opp.has_apps) {
    score += 1.5;
    reasons.push(`APPs available${opp.app_count ? ` (${opp.app_count})` : ""}`);
  } else if (prefs.has_apps && !opp.has_apps) {
    score -= 1.5;
    reasons.push("No APPs (you prefer them)");
  }

  return { score: clamp(score), rationale: reasons.join(". ") || "Team support details not specified" };
}

function scoreCompensation(opp: Opportunity, prefs: Preferences): { score: number; rationale: string } {
  let score = 5;
  const reasons: string[] = [];

  // Base salary
  if (opp.base_salary && prefs.min_base_salary) {
    if (opp.base_salary >= prefs.min_base_salary) {
      const pct = ((opp.base_salary - prefs.min_base_salary) / prefs.min_base_salary) * 100;
      score += Math.min(3, pct / 10);
      reasons.push(`Base salary $${(opp.base_salary / 1000).toFixed(0)}k meets your minimum ($${(prefs.min_base_salary / 1000).toFixed(0)}k)`);
    } else {
      score -= 2;
      reasons.push(`Base salary $${(opp.base_salary / 1000).toFixed(0)}k below your minimum ($${(prefs.min_base_salary / 1000).toFixed(0)}k)`);
    }
  }

  // Signing bonus
  if (prefs.signing_bonus_important && opp.signing_bonus && opp.signing_bonus > 0) {
    score += 1;
    reasons.push(`Signing bonus: $${(opp.signing_bonus / 1000).toFixed(0)}k`);
  } else if (prefs.signing_bonus_important && !opp.signing_bonus) {
    score -= 0.5;
    reasons.push("No signing bonus");
  }

  // Loan repayment
  if (prefs.loan_repayment_important && opp.loan_repayment && opp.loan_repayment > 0) {
    score += 1;
    reasons.push(`Loan repayment: $${(opp.loan_repayment / 1000).toFixed(0)}k`);
  } else if (prefs.loan_repayment_important && !opp.loan_repayment) {
    score -= 0.5;
    reasons.push("No loan repayment");
  }

  // PTO
  if (opp.pto_days && prefs.min_pto_days) {
    if (opp.pto_days >= prefs.min_pto_days) {
      score += 0.5;
      reasons.push(`PTO ${opp.pto_days} days meets minimum`);
    } else {
      score -= 1;
      reasons.push(`PTO ${opp.pto_days} days below your minimum ${prefs.min_pto_days}`);
    }
  }

  // Malpractice
  if (prefs.malpractice_important && opp.malpractice_covered) {
    score += 0.5;
    reasons.push("Malpractice covered");
  }

  return { score: clamp(score), rationale: reasons.join(". ") || "Compensation details not fully specified" };
}

function scoreCulture(opp: Opportunity, _prefs: Preferences): { score: number; rationale: string } {
  let score = 5;
  const reasons: string[] = [];

  if (opp.culture_notes && opp.culture_notes.length > 20) {
    score += 2;
    reasons.push("Detailed culture notes provided");
  } else if (opp.culture_notes) {
    score += 1;
    reasons.push("Some culture information available");
  } else {
    reasons.push("No culture notes — add notes after your visit");
  }

  return { score: clamp(score), rationale: reasons.join(". ") };
}

function scoreGrowthLeadership(opp: Opportunity, _prefs: Preferences): { score: number; rationale: string } {
  let score = 5;
  const reasons: string[] = [];

  if (opp.leadership_opportunities && opp.leadership_opportunities.length > 10) {
    score += 2;
    reasons.push("Leadership opportunities described");
  }

  if (opp.teaching_opportunities) {
    score += 1;
    reasons.push("Teaching opportunities available");
  }

  return { score: clamp(score), rationale: reasons.join(". ") || "Growth/leadership details not specified" };
}

function scoreProcedures(opp: Opportunity, prefs: Preferences): { score: number; rationale: string } {
  let score = 5;
  const reasons: string[] = [];

  if (prefs.procedures_comfort.length > 0 && opp.procedures_available.length > 0) {
    const matches = prefs.procedures_comfort.filter(p =>
      opp.procedures_available.map(a => a.toLowerCase()).includes(p.toLowerCase())
    );
    const matchPct = matches.length / prefs.procedures_comfort.length;
    score += matchPct * 5;
    reasons.push(`${matches.length}/${prefs.procedures_comfort.length} preferred procedures available`);
  } else if (opp.procedures_available.length > 0) {
    score += 1;
    reasons.push(`${opp.procedures_available.length} procedures available`);
  }

  return { score: clamp(score), rationale: reasons.join(". ") || "Procedure availability not specified" };
}

function scoreResearchAcademics(opp: Opportunity, prefs: Preferences): { score: number; rationale: string } {
  let score = 5;
  const reasons: string[] = [];

  if (opp.research_support) {
    score += 2;
    reasons.push("Research support available");
  }

  if (opp.teaching_opportunities) {
    score += 1;
    reasons.push("Teaching opportunities");
  }

  // Academic vs community alignment
  if (prefs.practice_type === "academic" && opp.practice_type === "academic") {
    score += 2;
    reasons.push("Academic setting matches preference");
  } else if (prefs.practice_type === "academic" && opp.practice_type === "community") {
    score -= 1;
    reasons.push("Community setting (you prefer academic)");
  }

  return { score: clamp(score), rationale: reasons.join(". ") || "Research/academic details not specified" };
}

// ── Helpers ──

function clamp(value: number, min = 0, max = 10): number {
  return Math.max(min, Math.min(max, value));
}

const SCORERS: Record<ScoringCategory, (opp: Opportunity, prefs: Preferences) => { score: number; rationale: string }> = {
  location: scoreLocation,
  schedule_call: scoreScheduleCall,
  icu_model: scoreIcuModel,
  team_support: scoreTeamSupport,
  compensation: scoreCompensation,
  culture: scoreCulture,
  growth_leadership: scoreGrowthLeadership,
  procedures: scoreProcedures,
  research_academics: scoreResearchAcademics,
};

// ── Main scoring function ──

export function computeScore(
  opportunity: Opportunity,
  preferences: Preferences
): Omit<OpportunityScore, "id" | "created_at"> {
  const weights = preferences.weights;
  const breakdown: ScoreBreakdown[] = [];
  let totalWeightedScore = 0;
  let totalWeight = 0;

  for (const category of SCORING_CATEGORIES) {
    const weight = weights[category] ?? 5;
    const { score, rationale } = SCORERS[category](opportunity, preferences);
    const weightedScore = score * weight;

    breakdown.push({
      category,
      raw_score: Math.round(score * 10) / 10,
      weight,
      weighted_score: Math.round(weightedScore * 10) / 10,
      rationale,
    });

    totalWeightedScore += weightedScore;
    totalWeight += weight;
  }

  // Normalize to 0–100
  const scoreTotal = totalWeight > 0
    ? Math.round((totalWeightedScore / (totalWeight * 10)) * 100 * 10) / 10
    : 0;

  // Check dealbreakers
  let dealbreakersHit: string[] = [];
  if (preferences.dealbreakers) {
    for (const db of preferences.dealbreakers) {
      const dbLower = db.toLowerCase();
      if (dbLower.includes("no nocturnist") && !opportunity.nocturnist_coverage) {
        dealbreakersHit.push(db);
      }
      if (dbLower.includes("no research") && !opportunity.research_support) {
        dealbreakersHit.push(db);
      }
      if (dbLower.includes("no residents") && !opportunity.has_residents) {
        dealbreakersHit.push(db);
      }
    }
  }

  const overallRationale = dealbreakersHit.length > 0
    ? `Dealbreakers triggered: ${dealbreakersHit.join(", ")}. Score may not reflect overall fit.`
    : `Overall fit score based on ${SCORING_CATEGORIES.length} weighted categories.`;

  return {
    opportunity_id: opportunity.id,
    score_total: scoreTotal,
    breakdown,
    rationale: overallRationale,
  };
}
