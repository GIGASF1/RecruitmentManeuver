"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { useAppStore } from "@/store/app-store";
import { PIPELINE_STAGES, PROCEDURES, ICU_MODELS, CALL_FREQUENCIES, US_STATES } from "@/lib/constants";
import { toast } from "sonner";
import type { Opportunity } from "@/types";
import Link from "next/link";

export default function NewOpportunityPage() {
  const router = useRouter();
  const { addOpportunity } = useAppStore();
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    organization_name: "",
    city: "",
    state: "",
    practice_type: "academic" as "academic" | "community" | "hybrid",
    icu_model_description: "",
    icu_beds: "",
    open_vs_closed: "",
    schedule_description: "",
    call_frequency: "",
    nocturnist_coverage: false,
    tele_icu: false,
    base_salary: "",
    rvu_rate: "",
    signing_bonus: "",
    loan_repayment: "",
    pto_days: "",
    cme_budget: "",
    malpractice_covered: false,
    comp_notes: "",
    has_residents: false,
    has_fellows: false,
    has_apps: false,
    app_count: "",
    rt_coverage: "",
    culture_notes: "",
    leadership_opportunities: "",
    research_support: false,
    teaching_opportunities: false,
    procedures_available: [] as string[],
    benefits_notes: "",
    free_notes: "",
    stage: "researching",
  });

  function update(field: string, value: unknown) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function toggleProcedure(proc: string) {
    setForm((prev) => ({
      ...prev,
      procedures_available: prev.procedures_available.includes(proc)
        ? prev.procedures_available.filter((p) => p !== proc)
        : [...prev.procedures_available, proc],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.organization_name.trim()) {
      toast.error("Organization name is required");
      return;
    }

    setSaving(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const insertData = {
        user_id: user.id,
        organization_name: form.organization_name.trim(),
        city: form.city.trim(),
        state: form.state,
        practice_type: form.practice_type,
        icu_model_description: form.icu_model_description,
        icu_beds: form.icu_beds ? parseInt(form.icu_beds) : null,
        open_vs_closed: form.open_vs_closed,
        schedule_description: form.schedule_description,
        call_frequency: form.call_frequency,
        nocturnist_coverage: form.nocturnist_coverage,
        tele_icu: form.tele_icu,
        base_salary: form.base_salary ? parseInt(form.base_salary) : null,
        rvu_rate: form.rvu_rate ? parseFloat(form.rvu_rate) : null,
        signing_bonus: form.signing_bonus ? parseInt(form.signing_bonus) : null,
        loan_repayment: form.loan_repayment ? parseInt(form.loan_repayment) : null,
        pto_days: form.pto_days ? parseInt(form.pto_days) : null,
        cme_budget: form.cme_budget ? parseInt(form.cme_budget) : null,
        malpractice_covered: form.malpractice_covered,
        comp_notes: form.comp_notes,
        has_residents: form.has_residents,
        has_fellows: form.has_fellows,
        has_apps: form.has_apps,
        app_count: form.app_count ? parseInt(form.app_count) : null,
        rt_coverage: form.rt_coverage,
        culture_notes: form.culture_notes,
        leadership_opportunities: form.leadership_opportunities,
        research_support: form.research_support,
        teaching_opportunities: form.teaching_opportunities,
        procedures_available: form.procedures_available,
        benefits_notes: form.benefits_notes,
        free_notes: form.free_notes,
        stage: form.stage,
      };

      const { data, error } = await supabase
        .from("opportunities")
        .insert(insertData)
        .select()
        .single();

      if (error) throw error;
      addOpportunity(data as Opportunity);
      toast.success("Opportunity created");
      router.push(`/opportunities/${data.id}`);
    } catch (err) {
      toast.error("Failed to create opportunity");
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/opportunities">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Opportunities
          </Link>
        </Button>
      </div>

      <h1 className="mb-6 text-2xl font-bold">Add New Opportunity</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Organization</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="org">Organization Name *</Label>
              <Input
                id="org"
                value={form.organization_name}
                onChange={(e) => update("organization_name", e.target.value)}
                placeholder="e.g. University of Michigan Health"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  placeholder="e.g. Ann Arbor"
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Select value={form.state} onValueChange={(v) => update("state", v)}>
                  <SelectTrigger id="state">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {US_STATES.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Practice Type</Label>
                <Select value={form.practice_type} onValueChange={(v) => update("practice_type", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="academic">Academic</SelectItem>
                    <SelectItem value="community">Community</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Pipeline Stage</Label>
                <Select value={form.stage} onValueChange={(v) => update("stage", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {PIPELINE_STAGES.map((s) => (
                      <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ICU Model */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">ICU Model</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>ICU Model</Label>
              <Select value={form.open_vs_closed} onValueChange={(v) => update("open_vs_closed", v)}>
                <SelectTrigger><SelectValue placeholder="Select model" /></SelectTrigger>
                <SelectContent>
                  {ICU_MODELS.map((m) => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="beds">ICU Beds</Label>
                <Input
                  id="beds"
                  type="number"
                  value={form.icu_beds}
                  onChange={(e) => update("icu_beds", e.target.value)}
                  placeholder="e.g. 24"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="icu_desc">ICU Model Description</Label>
              <Textarea
                id="icu_desc"
                value={form.icu_model_description}
                onChange={(e) => update("icu_model_description", e.target.value)}
                placeholder="Describe the ICU structure, unit types, patient mix..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Schedule & Call */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Schedule & Call</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Call Frequency</Label>
              <Select value={form.call_frequency} onValueChange={(v) => update("call_frequency", v)}>
                <SelectTrigger><SelectValue placeholder="Select frequency" /></SelectTrigger>
                <SelectContent>
                  {CALL_FREQUENCIES.map((f) => (
                    <SelectItem key={f} value={f}>{f}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="sched_desc">Schedule Description</Label>
              <Textarea
                id="sched_desc"
                value={form.schedule_description}
                onChange={(e) => update("schedule_description", e.target.value)}
                placeholder="Describe the typical week, service blocks, clinic days..."
                rows={3}
              />
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch
                  checked={form.nocturnist_coverage}
                  onCheckedChange={(v) => update("nocturnist_coverage", v)}
                />
                <Label>Nocturnist Coverage</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={form.tele_icu}
                  onCheckedChange={(v) => update("tele_icu", v)}
                />
                <Label>Tele-ICU</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compensation */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Compensation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="base">Base Salary ($)</Label>
                <Input
                  id="base"
                  type="number"
                  value={form.base_salary}
                  onChange={(e) => update("base_salary", e.target.value)}
                  placeholder="e.g. 350000"
                />
              </div>
              <div>
                <Label htmlFor="rvu">RVU Rate ($)</Label>
                <Input
                  id="rvu"
                  type="number"
                  step="0.01"
                  value={form.rvu_rate}
                  onChange={(e) => update("rvu_rate", e.target.value)}
                  placeholder="e.g. 45.00"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="bonus">Signing Bonus ($)</Label>
                <Input
                  id="bonus"
                  type="number"
                  value={form.signing_bonus}
                  onChange={(e) => update("signing_bonus", e.target.value)}
                  placeholder="e.g. 50000"
                />
              </div>
              <div>
                <Label htmlFor="loan">Loan Repayment ($)</Label>
                <Input
                  id="loan"
                  type="number"
                  value={form.loan_repayment}
                  onChange={(e) => update("loan_repayment", e.target.value)}
                  placeholder="e.g. 100000"
                />
              </div>
              <div>
                <Label htmlFor="pto">PTO Days</Label>
                <Input
                  id="pto"
                  type="number"
                  value={form.pto_days}
                  onChange={(e) => update("pto_days", e.target.value)}
                  placeholder="e.g. 30"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cme">CME Budget ($)</Label>
                <Input
                  id="cme"
                  type="number"
                  value={form.cme_budget}
                  onChange={(e) => update("cme_budget", e.target.value)}
                  placeholder="e.g. 5000"
                />
              </div>
              <div className="flex items-center gap-2 pt-6">
                <Switch
                  checked={form.malpractice_covered}
                  onCheckedChange={(v) => update("malpractice_covered", v)}
                />
                <Label>Malpractice Covered</Label>
              </div>
            </div>
            <div>
              <Label htmlFor="comp_notes">Compensation Notes</Label>
              <Textarea
                id="comp_notes"
                value={form.comp_notes}
                onChange={(e) => update("comp_notes", e.target.value)}
                placeholder="Other compensation details, incentives, partnerships..."
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Team Support */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Team Support</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Switch checked={form.has_residents} onCheckedChange={(v) => update("has_residents", v)} />
                <Label>Residents</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={form.has_fellows} onCheckedChange={(v) => update("has_fellows", v)} />
                <Label>Fellows</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={form.has_apps} onCheckedChange={(v) => update("has_apps", v)} />
                <Label>APPs</Label>
              </div>
            </div>
            {form.has_apps && (
              <div className="w-32">
                <Label htmlFor="app_count">Number of APPs</Label>
                <Input
                  id="app_count"
                  type="number"
                  value={form.app_count}
                  onChange={(e) => update("app_count", e.target.value)}
                />
              </div>
            )}
            <div>
              <Label htmlFor="rt">RT Coverage</Label>
              <Input
                id="rt"
                value={form.rt_coverage}
                onChange={(e) => update("rt_coverage", e.target.value)}
                placeholder="e.g. 24/7 RT coverage, 2:1 ratio"
              />
            </div>
          </CardContent>
        </Card>

        {/* Culture & Growth */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Culture & Growth</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="culture">Culture Notes</Label>
              <Textarea
                id="culture"
                value={form.culture_notes}
                onChange={(e) => update("culture_notes", e.target.value)}
                placeholder="Team dynamics, work-life balance, department culture..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="leadership">Leadership Opportunities</Label>
              <Textarea
                id="leadership"
                value={form.leadership_opportunities}
                onChange={(e) => update("leadership_opportunities", e.target.value)}
                placeholder="QI roles, medical director positions, committee roles..."
                rows={2}
              />
            </div>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <Switch checked={form.research_support} onCheckedChange={(v) => update("research_support", v)} />
                <Label>Research Support</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={form.teaching_opportunities} onCheckedChange={(v) => update("teaching_opportunities", v)} />
                <Label>Teaching Opportunities</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Procedures */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Available Procedures</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {PROCEDURES.map((proc) => (
                <div key={proc} className="flex items-center gap-2">
                  <Checkbox
                    checked={form.procedures_available.includes(proc)}
                    onCheckedChange={() => toggleProcedure(proc)}
                  />
                  <Label className="text-sm font-normal">{proc}</Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Additional Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="benefits">Benefits Notes</Label>
              <Textarea
                id="benefits"
                value={form.benefits_notes}
                onChange={(e) => update("benefits_notes", e.target.value)}
                placeholder="Health insurance, retirement, relocation assistance..."
                rows={2}
              />
            </div>
            <div>
              <Label htmlFor="notes">Free Notes</Label>
              <Textarea
                id="notes"
                value={form.free_notes}
                onChange={(e) => update("free_notes", e.target.value)}
                placeholder="Any other impressions, questions, or observations..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" type="button" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Create Opportunity"}
          </Button>
        </div>
      </form>
    </div>
  );
}
