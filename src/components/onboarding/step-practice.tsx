"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ICU_MODELS, CALL_FREQUENCIES, PROCEDURES } from "@/lib/constants";
import type { OnboardingData } from "@/types";

interface StepPracticeProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
}

export function StepPractice({ data, updateData }: StepPracticeProps) {
  const toggleProcedure = (procedure: string) => {
    const current = data.procedures_comfort;
    if (current.includes(procedure)) {
      updateData({
        procedures_comfort: current.filter((p) => p !== procedure),
      });
    } else {
      updateData({
        procedures_comfort: [...current, procedure],
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Practice Model</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* ICU Schedule Model */}
        <div className="space-y-2">
          <Label htmlFor="icu_schedule_model">ICU Schedule Model Preference</Label>
          <Select
            value={data.icu_schedule_model}
            onValueChange={(value) =>
              updateData({ icu_schedule_model: value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select ICU model" />
            </SelectTrigger>
            <SelectContent>
              {ICU_MODELS.map((model) => (
                <SelectItem key={model} value={model}>
                  {model}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Call Frequency */}
        <div className="space-y-2">
          <Label htmlFor="call_frequency">Call Frequency Preference</Label>
          <Select
            value={data.call_frequency}
            onValueChange={(value) => updateData({ call_frequency: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select call frequency" />
            </SelectTrigger>
            <SelectContent>
              {CALL_FREQUENCIES.map((freq) => (
                <SelectItem key={freq} value={freq}>
                  {freq}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Nocturnist Coverage */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="nocturnist_coverage">
              Nocturnist Coverage Preferred
            </Label>
            <p className="text-xs text-muted-foreground">
              Dedicated nighttime physician coverage
            </p>
          </div>
          <Switch
            id="nocturnist_coverage"
            checked={data.nocturnist_coverage}
            onCheckedChange={(checked) =>
              updateData({ nocturnist_coverage: checked })
            }
          />
        </div>

        {/* Tele-ICU */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="tele_icu">Tele-ICU Preferred</Label>
            <p className="text-xs text-muted-foreground">
              Remote ICU monitoring and support
            </p>
          </div>
          <Switch
            id="tele_icu"
            checked={data.tele_icu}
            onCheckedChange={(checked) => updateData({ tele_icu: checked })}
          />
        </div>

        {/* Procedures Comfort */}
        <div className="space-y-3">
          <Label>Procedures You Are Comfortable Performing</Label>
          <p className="text-xs text-muted-foreground">
            Select all procedures you want available at your practice.
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {PROCEDURES.map((procedure) => (
              <div key={procedure} className="flex items-center space-x-2">
                <Checkbox
                  id={`proc-${procedure}`}
                  checked={data.procedures_comfort.includes(procedure)}
                  onCheckedChange={() => toggleProcedure(procedure)}
                />
                <Label
                  htmlFor={`proc-${procedure}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {procedure}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
