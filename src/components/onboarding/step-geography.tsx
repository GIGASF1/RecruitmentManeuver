"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { US_STATES } from "@/lib/constants";
import type { OnboardingData } from "@/types";

interface StepGeographyProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
}

const TOP_STATES = [
  "California",
  "Texas",
  "New York",
  "Florida",
  "Illinois",
  "Pennsylvania",
  "Ohio",
  "Massachusetts",
  "North Carolina",
  "Georgia",
  "Michigan",
  "Washington",
  "Colorado",
  "Arizona",
  "Maryland",
];

export function StepGeography({ data, updateData }: StepGeographyProps) {
  const [showAllStates, setShowAllStates] = useState(false);

  const displayedStates = showAllStates ? US_STATES : TOP_STATES;

  const toggleState = (state: string) => {
    const current = data.preferred_states;
    if (current.includes(state)) {
      updateData({
        preferred_states: current.filter((s) => s !== state),
      });
    } else {
      updateData({
        preferred_states: [...current, state],
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Geographic Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Preferred States */}
        <div className="space-y-3">
          <Label>Preferred States</Label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {displayedStates.map((state) => (
              <div key={state} className="flex items-center space-x-2">
                <Checkbox
                  id={`state-${state}`}
                  checked={data.preferred_states.includes(state)}
                  onCheckedChange={() => toggleState(state)}
                />
                <Label
                  htmlFor={`state-${state}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {state}
                </Label>
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowAllStates(!showAllStates)}
          >
            {showAllStates
              ? "Show fewer states"
              : `Show all ${US_STATES.length} states`}
          </Button>
        </div>

        {/* Preferred Cities */}
        <div className="space-y-2">
          <Label htmlFor="preferred_cities">Preferred Cities</Label>
          <Input
            id="preferred_cities"
            placeholder="e.g. Boston, San Francisco, Chicago"
            value={data.preferred_cities.join(", ")}
            onChange={(e) =>
              updateData({
                preferred_cities: e.target.value
                  .split(",")
                  .map((c) => c.trim())
                  .filter(Boolean),
              })
            }
          />
          <p className="text-xs text-muted-foreground">
            Separate multiple cities with commas.
          </p>
        </div>

        {/* Search Radius */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Search Radius</Label>
            <span className="text-sm font-medium text-muted-foreground">
              {data.radius_miles} miles
            </span>
          </div>
          <Slider
            min={10}
            max={500}
            step={10}
            value={[data.radius_miles]}
            onValueChange={([value]) =>
              updateData({ radius_miles: value })
            }
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>10 mi</span>
            <span>500 mi</span>
          </div>
        </div>

        {/* Willing to Relocate */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="willing_to_relocate">Willing to Relocate</Label>
            <p className="text-xs text-muted-foreground">
              Open to moving for the right opportunity
            </p>
          </div>
          <Switch
            id="willing_to_relocate"
            checked={data.willing_to_relocate}
            onCheckedChange={(checked) =>
              updateData({ willing_to_relocate: checked })
            }
          />
        </div>

        {/* Practice Type */}
        <div className="space-y-2">
          <Label htmlFor="practice_type">Practice Type Preference</Label>
          <Select
            value={data.practice_type}
            onValueChange={(value) =>
              updateData({
                practice_type: value as OnboardingData["practice_type"],
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select practice type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="academic">Academic</SelectItem>
              <SelectItem value="community">Community</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
