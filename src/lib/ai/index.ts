/**
 * AI Service Placeholders
 *
 * These functions will be connected to an LLM (e.g., Claude API) in a future release.
 * For MVP, they return mock data to demonstrate the UX.
 *
 * TODO: Replace mock implementations with actual API calls.
 * TODO: Add rate limiting, caching, and error handling.
 */

import type { Opportunity, Preferences } from "@/types";

export async function generateInterviewQuestions(
  opportunity: Opportunity,
  preferences: Preferences
): Promise<string[]> {
  // TODO: Call Claude API with opportunity + preferences context
  void preferences;
  return [
    `What does a typical week look like for a pulm/crit attending at ${opportunity.organization_name}?`,
    "How is the call schedule structured, and are there plans to add nocturnist coverage?",
    "Can you describe the APP/resident support model in the ICU?",
    "What does the onboarding process look like for new faculty?",
    "How are RVU targets set, and what percentage of physicians meet them?",
    "What leadership or quality improvement opportunities exist for new hires?",
    "How would you describe the department culture and work-life balance?",
  ];
}

export async function summarizeCallNotes(
  rawText: string
): Promise<string> {
  // TODO: Call Claude API to summarize free-text notes
  if (!rawText || rawText.length < 20) {
    return "Not enough content to summarize.";
  }
  return `Summary: This note discusses key aspects of the opportunity including schedule, compensation, and team dynamics. (${rawText.length} characters analyzed)`;
}

export async function draftNegotiationEmail(
  offerData: {
    organization: string;
    baseSalary?: number;
    signingBonus?: number;
    items: string[];
  }
): Promise<string> {
  // TODO: Call Claude API to generate a professional negotiation email
  const items = offerData.items.length > 0
    ? offerData.items.map(i => `  - ${i}`).join("\n")
    : "  - Base compensation adjustment\n  - Signing bonus discussion";

  return `Dear Hiring Committee,

Thank you for the opportunity to join ${offerData.organization}. I am very enthusiastic about the position and the team.

After careful consideration, I would like to discuss the following aspects of the offer:

${items}

I believe these adjustments would reflect the value I would bring to the program and align with current market benchmarks for pulmonary and critical care physicians.

I look forward to discussing this further and finding a mutually beneficial arrangement.

Best regards,
[Your Name]`;
}
