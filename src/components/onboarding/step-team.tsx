"use client";

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { OnboardingData } from "@/types";

interface StepTeamProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
}

export function StepTeam({ data, updateData }: StepTeamProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Support</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Prefer Residents */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="has_residents">Prefer Residents</Label>
            <p className="text-xs text-muted-foreground">
              Residency program with rotating residents in the ICU
            </p>
          </div>
          <Switch
            id="has_residents"
            checked={data.has_residents}
            onCheckedChange={(checked) =>
              updateData({ has_residents: checked })
            }
          />
        </div>

        {/* Prefer Fellows */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="has_fellows">Prefer Fellows</Label>
            <p className="text-xs text-muted-foreground">
              PCCM fellowship program on site
            </p>
          </div>
          <Switch
            id="has_fellows"
            checked={data.has_fellows}
            onCheckedChange={(checked) =>
              updateData({ has_fellows: checked })
            }
          />
        </div>

        {/* Prefer APPs */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="has_apps">Prefer APPs</Label>
            <p className="text-xs text-muted-foreground">
              Advanced Practice Providers (NPs / PAs) supporting the team
            </p>
          </div>
          <Switch
            id="has_apps"
            checked={data.has_apps}
            onCheckedChange={(checked) => updateData({ has_apps: checked })}
          />
        </div>

        {/* RT Coverage */}
        <div className="space-y-2">
          <Label htmlFor="rt_coverage">Respiratory Therapy Coverage</Label>
          <Select
            value={data.rt_coverage}
            onValueChange={(value) => updateData({ rt_coverage: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select RT coverage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24/7">24/7</SelectItem>
              <SelectItem value="Day shift only">Day shift only</SelectItem>
              <SelectItem value="Variable">Variable</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Rounding Support */}
        <div className="space-y-2">
          <Label htmlFor="rounding_support">Rounding Support Preference</Label>
          <Input
            id="rounding_support"
            placeholder="e.g. Multidisciplinary rounds, pharmacist on rounds, dedicated social work"
            value={data.rounding_support}
            onChange={(e) =>
              updateData({ rounding_support: e.target.value })
            }
          />
          <p className="text-xs text-muted-foreground">
            Describe the rounding team composition you prefer.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
