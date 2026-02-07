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
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { OnboardingData } from "@/types";

interface StepBasicsProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
}

export function StepBasics({ data, updateData }: StepBasicsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="full_name">Full Name</Label>
          <Input
            id="full_name"
            placeholder="e.g. Jane Doe, MD"
            value={data.full_name}
            onChange={(e) => updateData({ full_name: e.target.value })}
          />
        </div>

        {/* Specialty (read-only) */}
        <div className="space-y-2">
          <Label>Specialty</Label>
          <div>
            <Badge variant="secondary">
              Pulmonary &amp; Critical Care Medicine
            </Badge>
          </div>
        </div>

        {/* Training Level */}
        <div className="space-y-2">
          <Label htmlFor="training_level">Training Level</Label>
          <Select
            value={data.training_level}
            onValueChange={(value) =>
              updateData({
                training_level: value as OnboardingData["training_level"],
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select training level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="attending">Attending</SelectItem>
              <SelectItem value="fellow">Fellow</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Years Out of Training */}
        <div className="space-y-2">
          <Label htmlFor="years_out">Years Out of Training</Label>
          <Input
            id="years_out"
            type="number"
            min={0}
            max={50}
            placeholder="0"
            value={data.years_out === 0 ? "" : data.years_out}
            onChange={(e) =>
              updateData({
                years_out: e.target.value === "" ? 0 : parseInt(e.target.value, 10),
              })
            }
          />
        </div>

        {/* Desired Start Date */}
        <div className="space-y-2">
          <Label htmlFor="desired_start_date">Desired Start Date</Label>
          <Input
            id="desired_start_date"
            type="date"
            value={data.desired_start_date}
            onChange={(e) =>
              updateData({ desired_start_date: e.target.value })
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}
