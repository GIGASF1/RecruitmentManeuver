"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, Filter, Building2, MapPin, DollarSign, CheckSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppStore } from "@/store/app-store";
import { createClient } from "@/lib/supabase/client";
import { PIPELINE_STAGES } from "@/lib/constants";
import type { Opportunity, PipelineStage } from "@/types";

const stageColors: Record<PipelineStage, string> = {
  researching: "bg-slate-100 text-slate-700",
  applied: "bg-blue-100 text-blue-700",
  interviewing: "bg-amber-100 text-amber-700",
  offer_received: "bg-purple-100 text-purple-700",
  negotiating: "bg-orange-100 text-orange-700",
  accepted: "bg-green-100 text-green-700",
  declined: "bg-red-100 text-red-700",
};

export default function OpportunitiesPage() {
  const { opportunities, setOpportunities, compareIds, toggleCompare } = useAppStore();
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("opportunities")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (data) setOpportunities(data as Opportunity[]);
      setLoaded(true);
    }
    load();
  }, [setOpportunities]);

  const filtered = opportunities.filter((o) => {
    if (search) {
      const q = search.toLowerCase();
      if (
        !o.organization_name.toLowerCase().includes(q) &&
        !o.city.toLowerCase().includes(q) &&
        !o.state.toLowerCase().includes(q)
      ) return false;
    }
    if (stageFilter !== "all" && o.stage !== stageFilter) return false;
    if (typeFilter !== "all" && o.practice_type !== typeFilter) return false;
    return true;
  });

  if (!loaded) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 animate-pulse rounded bg-muted" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Opportunities</h1>
          <p className="text-muted-foreground">
            {opportunities.length} total &middot; {filtered.length} shown
          </p>
        </div>
        <div className="flex gap-2">
          {compareIds.length >= 2 && (
            <Button variant="outline" asChild>
              <Link href="/compare">
                Compare ({compareIds.length})
              </Link>
            </Button>
          )}
          <Button asChild>
            <Link href="/opportunities/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Opportunity
            </Link>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, city, or state..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={stageFilter} onValueChange={setStageFilter}>
          <SelectTrigger className="w-[160px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stages</SelectItem>
            {PIPELINE_STAGES.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="academic">Academic</SelectItem>
            <SelectItem value="community">Community</SelectItem>
            <SelectItem value="hybrid">Hybrid</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Opportunity List */}
      {filtered.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Building2 className="mb-4 h-12 w-12 text-muted-foreground/40" />
            <h3 className="text-lg font-semibold">No opportunities yet</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              {opportunities.length === 0
                ? "Start by adding your first opportunity."
                : "No opportunities match your current filters."}
            </p>
            {opportunities.length === 0 && (
              <Button asChild>
                <Link href="/opportunities/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Opportunity
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((opp) => (
            <Card key={opp.id} className="transition-colors hover:bg-accent/50">
              <CardContent className="flex items-center gap-4 p-4">
                {/* Compare checkbox */}
                <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={compareIds.includes(opp.id)}
                    onCheckedChange={() => toggleCompare(opp.id)}
                    disabled={!compareIds.includes(opp.id) && compareIds.length >= 4}
                    aria-label={`Select ${opp.organization_name} for comparison`}
                  />
                </div>

                {/* Main content — clickable */}
                <Link href={`/opportunities/${opp.id}`} className="flex flex-1 items-center gap-4 min-w-0">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold truncate">{opp.organization_name}</h3>
                      <Badge variant="secondary" className={stageColors[opp.stage]}>
                        {PIPELINE_STAGES.find((s) => s.value === opp.stage)?.label}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {opp.city}, {opp.state}
                      </span>
                      <span className="capitalize">{opp.practice_type}</span>
                      {opp.base_salary && (
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-3.5 w-3.5" />
                          ${(opp.base_salary / 1000).toFixed(0)}k base
                        </span>
                      )}
                      {opp.nocturnist_coverage && (
                        <span className="flex items-center gap-1">
                          <CheckSquare className="h-3.5 w-3.5" />
                          Nocturnist
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
