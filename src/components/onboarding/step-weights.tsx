"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  SCORING_CATEGORIES,
  CATEGORY_LABELS,
  type OnboardingData,
  type ScoringCategory,
} from "@/types";

interface StepWeightsProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
}

const CATEGORY_DESCRIPTIONS: Record<ScoringCategory, string> = {
  location:
    "How important is geographic location, proximity to family, or city preference?",
  schedule_call:
    "How much does call schedule, frequency, and work-life balance matter?",
  icu_model:
    "How important is the ICU model (open, closed, hybrid) to your practice style?",
  team_support:
    "How much do you value team composition including residents, fellows, and APPs?",
  compensation:
    "How heavily do salary, bonuses, and financial benefits factor into your decision?",
  culture:
    "How important is the workplace culture, collegiality, and institutional mission?",
  growth_leadership:
    "How much do leadership tracks, administrative roles, and career growth matter?",
  procedures:
    "How important is procedural volume and availability of advanced procedures?",
  research_academics:
    "How much do research funding, academic appointment, and teaching opportunities matter?",
};

export function StepWeights({ data, updateData }: StepWeightsProps) {
  const handleWeightChange = (category: ScoringCategory, value: number) => {
    updateData({
      weights: {
        ...data.weights,
        [category]: value,
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Priority Weights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <p className="text-sm text-muted-foreground">
          Rate how important each category is to you on a scale of 0 (not
          important) to 10 (most important). These weights are used to score and
          rank opportunities.
        </p>

        {SCORING_CATEGORIES.map((category) => (
          <div key={category} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">
                  {CATEGORY_LABELS[category]}
                </Label>
                <p className="text-xs text-muted-foreground">
                  {CATEGORY_DESCRIPTIONS[category]}
                </p>
              </div>
              <span className="ml-4 min-w-[2rem] text-right text-sm font-semibold tabular-nums">
                {data.weights[category]}
              </span>
            </div>
            <Slider
              min={0}
              max={10}
              step={1}
              value={[data.weights[category]]}
              onValueChange={([value]) =>
                handleWeightChange(category, value)
              }
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Not important</span>
              <span>Most important</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
