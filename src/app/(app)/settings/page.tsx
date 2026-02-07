"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/client";
import { useAppStore } from "@/store/app-store";
import { CATEGORY_LABELS, SCORING_CATEGORIES } from "@/types";
import type { ScoringCategory } from "@/types";
import { toast } from "sonner";

export default function SettingsPage() {
  const { profile, preferences, setProfile, setPreferences } = useAppStore();
  const [name, setName] = useState(profile?.full_name ?? "");
  const [weights, setWeights] = useState<Record<ScoringCategory, number>>(
    preferences?.weights ?? Object.fromEntries(SCORING_CATEGORIES.map(c => [c, 5])) as Record<ScoringCategory, number>
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) setName(profile.full_name);
    if (preferences) setWeights(preferences.weights);
  }, [profile, preferences]);

  async function handleSave() {
    setSaving(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Update profile name
      const { error: profileErr } = await supabase
        .from("profiles")
        .update({ full_name: name.trim() })
        .eq("user_id", user.id);

      if (profileErr) throw profileErr;

      // Update weights
      const { error: prefsErr } = await supabase
        .from("preferences")
        .update({ weights })
        .eq("user_id", user.id);

      if (prefsErr) throw prefsErr;

      if (profile) setProfile({ ...profile, full_name: name.trim() });
      if (preferences) setPreferences({ ...preferences, weights });

      toast.success("Settings saved");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Update your profile and scoring preferences.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Label>Specialty</Label>
            <div className="mt-1">
              <Badge>Pulmonary & Critical Care Medicine</Badge>
            </div>
          </div>
          {profile && (
            <div className="text-sm text-muted-foreground">
              {profile.training_level === "attending" ? "Attending" : "Fellow"} &middot; {profile.years_out} year(s) out
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Scoring Weights</CardTitle>
          <p className="text-sm text-muted-foreground">
            Adjust how much each category matters in your fit scores. Changes will apply to all future scores.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {SCORING_CATEGORIES.map((cat) => (
            <div key={cat}>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm">{CATEGORY_LABELS[cat]}</Label>
                <span className="text-sm font-medium w-6 text-right">{weights[cat]}</span>
              </div>
              <Slider
                value={[weights[cat]]}
                onValueChange={([v]) => setWeights({ ...weights, [cat]: v })}
                min={0}
                max={10}
                step={1}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Separator />

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  );
}
