"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, ArrowRight, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store/app-store";
import { createClient } from "@/lib/supabase/client";
import { PIPELINE_STAGES } from "@/lib/constants";
import type { Opportunity, Task } from "@/types";

export default function DashboardPage() {
  const { profile, opportunities, setOpportunities, tasks, setTasks } = useAppStore();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [oppsRes, tasksRes] = await Promise.all([
        supabase.from("opportunities").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
        supabase.from("tasks").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
      ]);

      if (oppsRes.data) setOpportunities(oppsRes.data as Opportunity[]);
      if (tasksRes.data) setTasks(tasksRes.data as Task[]);
      setLoaded(true);
    }
    load();
  }, [setOpportunities, setTasks]);

  const pipelineCounts = PIPELINE_STAGES.map((stage) => ({
    ...stage,
    count: opportunities.filter((o) => o.stage === stage.value).length,
  }));

  const activeTasks = tasks.filter((t) => t.status !== "done").slice(0, 5);

  // Rule-based recommended actions
  const recommendations: { text: string; href: string; priority: "high" | "medium" | "low" }[] = [];

  if (opportunities.length === 0) {
    recommendations.push({
      text: "Add your first opportunity to start tracking",
      href: "/opportunities/new",
      priority: "high",
    });
  }

  const researching = opportunities.filter((o) => o.stage === "researching");
  if (researching.length > 3) {
    recommendations.push({
      text: `You have ${researching.length} opportunities in research — consider applying to your top picks`,
      href: "/opportunities",
      priority: "medium",
    });
  }

  const offers = opportunities.filter((o) => o.stage === "offer_received");
  if (offers.length > 0) {
    recommendations.push({
      text: `You have ${offers.length} offer(s) — compare them side by side`,
      href: "/compare",
      priority: "high",
    });
  }

  const interviewing = opportunities.filter((o) => o.stage === "interviewing");
  if (interviewing.length > 0) {
    recommendations.push({
      text: `${interviewing.length} active interview(s) — prepare your questions`,
      href: "/opportunities",
      priority: "medium",
    });
  }

  if (opportunities.length > 1 && opportunities.length <= 4) {
    recommendations.push({
      text: "Compare your opportunities to see which is the best fit",
      href: "/compare",
      priority: "low",
    });
  }

  if (!loaded) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 animate-pulse rounded bg-muted" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome back{profile?.full_name ? `, ${profile.full_name.split(" ")[0]}` : ""}
          </h1>
          <p className="text-muted-foreground">
            Here&apos;s your recruiting pipeline at a glance.
          </p>
        </div>
        <Button asChild>
          <Link href="/opportunities/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Opportunity
          </Link>
        </Button>
      </div>

      {/* Pipeline Cards */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Pipeline</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
          {pipelineCounts.map((stage) => (
            <Card key={stage.value} className="relative overflow-hidden">
              <div className={`absolute left-0 top-0 h-full w-1 ${stage.color}`} />
              <CardContent className="p-4 pl-5">
                <p className="text-2xl font-bold">{stage.count}</p>
                <p className="text-xs text-muted-foreground">{stage.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Tasks */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base">My Tasks</CardTitle>
            <Badge variant="secondary">{activeTasks.length} pending</Badge>
          </CardHeader>
          <CardContent>
            {activeTasks.length === 0 ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                <CheckCircle2 className="mx-auto mb-2 h-8 w-8 text-muted-foreground/50" />
                No pending tasks. You&apos;re all caught up!
              </div>
            ) : (
              <ul className="space-y-3">
                {activeTasks.map((task) => (
                  <li key={task.id} className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {task.status === "in_progress" ? (
                        <Clock className="h-4 w-4 text-amber-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{task.title}</p>
                      {task.due_date && (
                        <p className="text-xs text-muted-foreground">
                          Due: {new Date(task.due_date).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <Badge variant={task.status === "in_progress" ? "default" : "secondary"} className="text-xs">
                      {task.status === "in_progress" ? "In Progress" : "To Do"}
                    </Badge>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Recommended Actions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Recommended Next Actions</CardTitle>
          </CardHeader>
          <CardContent>
            {recommendations.length === 0 ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                <CheckCircle2 className="mx-auto mb-2 h-8 w-8 text-muted-foreground/50" />
                No recommendations right now. Keep exploring!
              </div>
            ) : (
              <ul className="space-y-3">
                {recommendations.map((rec, i) => (
                  <li key={i}>
                    <Link
                      href={rec.href}
                      className="flex items-center gap-3 rounded-md border p-3 transition-colors hover:bg-accent"
                    >
                      <div
                        className={`h-2 w-2 rounded-full ${
                          rec.priority === "high"
                            ? "bg-red-500"
                            : rec.priority === "medium"
                            ? "bg-amber-500"
                            : "bg-blue-500"
                        }`}
                      />
                      <span className="flex-1 text-sm">{rec.text}</span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
