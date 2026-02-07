"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, GitCompareArrows, Star, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppStore } from "@/store/app-store";
import { createClient } from "@/lib/supabase/client";
import { computeScore } from "@/lib/scoring/engine";
import { CATEGORY_LABELS } from "@/types";
import { PIPELINE_STAGES } from "@/lib/constants";
import type { Opportunity, OpportunityScore, ScoringCategory } from "@/types";

interface CompareItem {
  opportunity: Opportunity;
  score: OpportunityScore | null;
}

export default function ComparePage() {
  const { compareIds, clearCompare, toggleCompare, preferences } = useAppStore();
  const [items, setItems] = useState<CompareItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadItems = useCallback(async () => {
    if (compareIds.length === 0) {
      setItems([]);
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const { data: opps } = await supabase
      .from("opportunities")
      .select("*")
      .in("id", compareIds);

    if (!opps) {
      setLoading(false);
      return;
    }

    const results: CompareItem[] = [];
    for (const opp of opps) {
      const opportunity = opp as Opportunity;

      // Try to get stored score, or compute new one
      const { data: scores } = await supabase
        .from("opportunity_scores")
        .select("*")
        .eq("opportunity_id", opp.id)
        .order("created_at", { ascending: false })
        .limit(1);

      let score: OpportunityScore | null = null;
      if (scores && scores.length > 0) {
        const s = scores[0];
        score = {
          ...s,
          breakdown: typeof s.breakdown === "string" ? JSON.parse(s.breakdown) : s.breakdown,
        } as OpportunityScore;
      } else if (preferences) {
        // Compute score on the fly
        const computed = computeScore(opportunity, preferences);
        score = {
          id: "computed",
          opportunity_id: opp.id,
          score_total: computed.score_total,
          breakdown: computed.breakdown,
          rationale: computed.rationale,
          created_at: new Date().toISOString(),
        };
      }

      results.push({ opportunity, score });
    }

    // Sort by score descending
    results.sort((a, b) => (b.score?.score_total ?? 0) - (a.score?.score_total ?? 0));
    setItems(results);
    setLoading(false);
  }, [compareIds, preferences]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  function getBestValue(field: string): string | number | null {
    let best: number | null = null;
    for (const item of items) {
      const val = item.opportunity[field as keyof Opportunity] as number | null;
      if (val != null && (best == null || val > best)) best = val;
    }
    return best;
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 animate-pulse rounded bg-muted" />
        <div className="h-96 animate-pulse rounded-lg bg-muted" />
      </div>
    );
  }

  if (compareIds.length < 2) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Compare Opportunities</h1>
        <Card>
          <CardContent className="flex flex-col items-center py-16">
            <GitCompareArrows className="mb-4 h-12 w-12 text-muted-foreground/40" />
            <h3 className="text-lg font-semibold">Select opportunities to compare</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Go to the Opportunities page and check 2–4 items to compare.
            </p>
            <Button asChild>
              <Link href="/opportunities">Go to Opportunities</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const comparisonRows = [
    { label: "Location", render: (o: Opportunity) => `${o.city}, ${o.state}` },
    { label: "Practice Type", render: (o: Opportunity) => o.practice_type.charAt(0).toUpperCase() + o.practice_type.slice(1) },
    { label: "Stage", render: (o: Opportunity) => PIPELINE_STAGES.find(s => s.value === o.stage)?.label ?? o.stage },
    { label: "ICU Model", render: (o: Opportunity) => o.open_vs_closed || "—" },
    { label: "ICU Beds", render: (o: Opportunity) => o.icu_beds?.toString() ?? "—" },
    { label: "Call Frequency", render: (o: Opportunity) => o.call_frequency || "—" },
    { label: "Nocturnist", render: (o: Opportunity) => o.nocturnist_coverage ? "Yes" : "No" },
    { label: "Tele-ICU", render: (o: Opportunity) => o.tele_icu ? "Yes" : "No" },
    { label: "Base Salary", render: (o: Opportunity) => o.base_salary ? `$${o.base_salary.toLocaleString()}` : "—", isNumeric: true, field: "base_salary" },
    { label: "RVU Rate", render: (o: Opportunity) => o.rvu_rate ? `$${o.rvu_rate}` : "—" },
    { label: "Signing Bonus", render: (o: Opportunity) => o.signing_bonus ? `$${o.signing_bonus.toLocaleString()}` : "—", isNumeric: true, field: "signing_bonus" },
    { label: "Loan Repayment", render: (o: Opportunity) => o.loan_repayment ? `$${o.loan_repayment.toLocaleString()}` : "—", isNumeric: true, field: "loan_repayment" },
    { label: "PTO Days", render: (o: Opportunity) => o.pto_days?.toString() ?? "—", isNumeric: true, field: "pto_days" },
    { label: "CME Budget", render: (o: Opportunity) => o.cme_budget ? `$${o.cme_budget.toLocaleString()}` : "—", isNumeric: true, field: "cme_budget" },
    { label: "Malpractice", render: (o: Opportunity) => o.malpractice_covered ? "Covered" : "—" },
    { label: "Residents", render: (o: Opportunity) => o.has_residents ? "Yes" : "No" },
    { label: "Fellows", render: (o: Opportunity) => o.has_fellows ? "Yes" : "No" },
    { label: "APPs", render: (o: Opportunity) => o.has_apps ? `Yes${o.app_count ? ` (${o.app_count})` : ""}` : "No" },
    { label: "Research", render: (o: Opportunity) => o.research_support ? "Yes" : "No" },
    { label: "Teaching", render: (o: Opportunity) => o.teaching_opportunities ? "Yes" : "No" },
    { label: "Procedures", render: (o: Opportunity) => o.procedures_available.length > 0 ? o.procedures_available.length.toString() : "—" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="ghost" size="sm" asChild className="mb-2">
            <Link href="/opportunities">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Compare Opportunities</h1>
          <p className="text-sm text-muted-foreground">
            Comparing {items.length} opportunities side by side.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={clearCompare}>
          Clear Selection
        </Button>
      </div>

      {/* Score Summary Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {items.map(({ opportunity, score }) => (
          <Card key={opportunity.id} className="relative">
            <button
              className="absolute right-2 top-2 rounded-full p-1 hover:bg-muted"
              onClick={() => toggleCompare(opportunity.id)}
              aria-label="Remove from comparison"
            >
              <X className="h-3 w-3" />
            </button>
            <CardContent className="pt-6 pb-4 text-center">
              <p className="font-semibold text-sm truncate mb-1">{opportunity.organization_name}</p>
              <p className="text-xs text-muted-foreground mb-3">
                {opportunity.city}, {opportunity.state}
              </p>
              {score ? (
                <>
                  <div className={`text-3xl font-bold ${
                    score.score_total >= 70 ? "text-green-600" :
                    score.score_total >= 50 ? "text-amber-600" : "text-red-600"
                  }`}>
                    {score.score_total}
                  </div>
                  <p className="text-xs text-muted-foreground">Fit Score</p>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">No score</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Category Radar Summary */}
      {items.some(i => i.score) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Star className="h-4 w-4" />
              Score Breakdown by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.keys(CATEGORY_LABELS).map((cat) => (
                <div key={cat}>
                  <p className="text-xs font-medium mb-1">
                    {CATEGORY_LABELS[cat as ScoringCategory]}
                  </p>
                  <div className="flex items-center gap-2">
                    {items.map(({ opportunity, score }) => {
                      const catScore = score?.breakdown.find(b => b.category === cat);
                      const val = catScore?.raw_score ?? 0;
                      return (
                        <div key={opportunity.id} className="flex-1">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  val >= 7 ? "bg-green-500" :
                                  val >= 5 ? "bg-amber-500" : "bg-red-500"
                                }`}
                                style={{ width: `${(val / 10) * 100}%` }}
                              />
                            </div>
                            <span className="text-xs w-6 text-right">{val.toFixed(0)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
              {/* Legend */}
              <div className="flex flex-wrap gap-3 mt-4 pt-3 border-t">
                {items.map(({ opportunity }, i) => (
                  <div key={opportunity.id} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <div className={`h-2 w-2 rounded-full ${
                      i === 0 ? "bg-blue-500" : i === 1 ? "bg-green-500" : i === 2 ? "bg-amber-500" : "bg-purple-500"
                    }`} />
                    {opportunity.organization_name}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Detailed Comparison</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-40">Field</TableHead>
                {items.map(({ opportunity }) => (
                  <TableHead key={opportunity.id} className="min-w-[160px]">
                    <Link href={`/opportunities/${opportunity.id}`} className="hover:underline">
                      {opportunity.organization_name}
                    </Link>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Fit Score row */}
              <TableRow className="bg-muted/50 font-medium">
                <TableCell>Fit Score</TableCell>
                {items.map(({ opportunity, score }) => (
                  <TableCell key={opportunity.id}>
                    {score ? (
                      <Badge className={
                        score.score_total >= 70 ? "bg-green-100 text-green-700" :
                        score.score_total >= 50 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
                      }>
                        {score.score_total}/100
                      </Badge>
                    ) : "—"}
                  </TableCell>
                ))}
              </TableRow>

              {comparisonRows.map((row) => {
                const best = row.field ? getBestValue(row.field) : null;
                return (
                  <TableRow key={row.label}>
                    <TableCell className="font-medium text-sm">{row.label}</TableCell>
                    {items.map(({ opportunity }) => {
                      const val = row.render(opportunity);
                      const numericVal = row.field
                        ? (opportunity[row.field as keyof Opportunity] as number | null)
                        : null;
                      const isBest = row.isNumeric && numericVal != null && numericVal === best && items.length > 1;

                      return (
                        <TableCell key={opportunity.id} className="text-sm">
                          <span className={isBest ? "font-semibold text-green-600" : ""}>
                            {val}
                          </span>
                          {isBest && <span className="ml-1 text-green-600 text-xs">★</span>}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
