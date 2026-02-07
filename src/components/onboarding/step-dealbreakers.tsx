"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { OnboardingData } from "@/types";

interface StepDealbreakersProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
}

export function StepDealbreakers({ data, updateData }: StepDealbreakersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Must-haves &amp; Dealbreakers</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Must-Haves */}
        <div className="space-y-2">
          <Label htmlFor="must_haves">Must-haves</Label>
          <Textarea
            id="must_haves"
            rows={5}
            placeholder={[
              "Closed ICU",
              "Nocturnist coverage",
              "Research support",
              "Academic appointment",
            ].join("\n")}
            value={data.must_haves.join("\n")}
            onChange={(e) =>
              updateData({
                must_haves: e.target.value
                  .split("\n")
                  .filter((line) => line.trim() !== ""),
              })
            }
          />
          <p className="text-xs text-muted-foreground">
            Enter one must-have per line. These are features you require in any
            opportunity.
          </p>
        </div>

        {/* Dealbreakers */}
        <div className="space-y-2">
          <Label htmlFor="dealbreakers">Dealbreakers</Label>
          <Textarea
            id="dealbreakers"
            rows={5}
            placeholder={[
              "No nocturnist coverage",
              "Open ICU model",
              "Solo coverage weekends",
            ].join("\n")}
            value={data.dealbreakers.join("\n")}
            onChange={(e) =>
              updateData({
                dealbreakers: e.target.value
                  .split("\n")
                  .filter((line) => line.trim() !== ""),
              })
            }
          />
          <p className="text-xs text-muted-foreground">
            Enter one dealbreaker per line. Opportunities with these traits will
            be flagged or deprioritized.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
