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
import { COMP_MODELS } from "@/lib/constants";
import type { OnboardingData } from "@/types";

interface StepCompensationProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
}

export function StepCompensation({ data, updateData }: StepCompensationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Compensation Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Compensation Model */}
        <div className="space-y-2">
          <Label htmlFor="comp_model">Compensation Model</Label>
          <Select
            value={data.comp_model}
            onValueChange={(value) => updateData({ comp_model: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select compensation model" />
            </SelectTrigger>
            <SelectContent>
              {COMP_MODELS.map((model) => (
                <SelectItem key={model.value} value={model.value}>
                  {model.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Minimum Base Salary */}
        <div className="space-y-2">
          <Label htmlFor="min_base_salary">Minimum Base Salary</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              $
            </span>
            <Input
              id="min_base_salary"
              type="number"
              min={0}
              step={5000}
              className="pl-7"
              placeholder="e.g. 350000"
              value={data.min_base_salary ?? ""}
              onChange={(e) =>
                updateData({
                  min_base_salary:
                    e.target.value === "" ? null : parseInt(e.target.value, 10),
                })
              }
            />
          </div>
        </div>

        {/* Signing Bonus */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="signing_bonus_important">
              Signing Bonus Important
            </Label>
            <p className="text-xs text-muted-foreground">
              Is a signing bonus a key factor in your decision?
            </p>
          </div>
          <Switch
            id="signing_bonus_important"
            checked={data.signing_bonus_important}
            onCheckedChange={(checked) =>
              updateData({ signing_bonus_important: checked })
            }
          />
        </div>

        {/* Loan Repayment */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="loan_repayment_important">
              Loan Repayment Important
            </Label>
            <p className="text-xs text-muted-foreground">
              Student loan repayment or forgiveness programs
            </p>
          </div>
          <Switch
            id="loan_repayment_important"
            checked={data.loan_repayment_important}
            onCheckedChange={(checked) =>
              updateData({ loan_repayment_important: checked })
            }
          />
        </div>

        {/* Minimum PTO Days */}
        <div className="space-y-2">
          <Label htmlFor="min_pto_days">Minimum PTO Days</Label>
          <Input
            id="min_pto_days"
            type="number"
            min={0}
            max={365}
            placeholder="e.g. 25"
            value={data.min_pto_days ?? ""}
            onChange={(e) =>
              updateData({
                min_pto_days:
                  e.target.value === "" ? null : parseInt(e.target.value, 10),
              })
            }
          />
        </div>

        {/* CME Budget */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="cme_budget_important">
              CME Budget Important
            </Label>
            <p className="text-xs text-muted-foreground">
              Continuing Medical Education funding
            </p>
          </div>
          <Switch
            id="cme_budget_important"
            checked={data.cme_budget_important}
            onCheckedChange={(checked) =>
              updateData({ cme_budget_important: checked })
            }
          />
        </div>

        {/* Malpractice Coverage */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="malpractice_important">
              Malpractice Coverage Important
            </Label>
            <p className="text-xs text-muted-foreground">
              Employer-provided malpractice insurance with tail coverage
            </p>
          </div>
          <Switch
            id="malpractice_important"
            checked={data.malpractice_important}
            onCheckedChange={(checked) =>
              updateData({ malpractice_important: checked })
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}
