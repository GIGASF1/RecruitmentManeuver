"use client";

import { useEffect, useState, useCallback, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  DollarSign,
  Users,
  Building2,
  Star,
  Plus,
  Sparkles,
  Send,
  FileText,
  Trash2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/client";
import { useAppStore } from "@/store/app-store";
import { computeScore } from "@/lib/scoring/engine";
import { generateInterviewQuestions, summarizeCallNotes, draftNegotiationEmail } from "@/lib/ai";
import { PIPELINE_STAGES } from "@/lib/constants";
import { CATEGORY_LABELS } from "@/types";
import type { Opportunity, Preferences, OpportunityScore, Note, Task, ScoringCategory } from "@/types";
import { toast } from "sonner";

export default function OpportunityDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { preferences, updateOpportunity } = useAppStore();
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [score, setScore] = useState<OpportunityScore | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newNote, setNewNote] = useState("");
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const [oppRes, scoreRes, notesRes, tasksRes] = await Promise.all([
      supabase.from("opportunities").select("*").eq("id", id).eq("user_id", user.id).single(),
      supabase.from("opportunity_scores").select("*").eq("opportunity_id", id).order("created_at", { ascending: false }).limit(1),
      supabase.from("notes").select("*").eq("opportunity_id", id).order("created_at", { ascending: false }),
      supabase.from("tasks").select("*").eq("opportunity_id", id).order("created_at", { ascending: false }),
    ]);

    if (oppRes.data) setOpportunity(oppRes.data as Opportunity);
    if (scoreRes.data && scoreRes.data.length > 0) {
      const s = scoreRes.data[0];
      setScore({
        ...s,
        breakdown: typeof s.breakdown === "string" ? JSON.parse(s.breakdown) : s.breakdown,
      } as OpportunityScore);
    }
    if (notesRes.data) setNotes(notesRes.data as Note[]);
    if (tasksRes.data) setTasks(tasksRes.data as Task[]);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handleScore() {
    if (!opportunity || !preferences) {
      toast.error("Please complete onboarding first to set your preferences.");
      return;
    }

    const result = computeScore(opportunity, preferences);
    const supabase = createClient();

    // Delete old scores for this opportunity
    await supabase.from("opportunity_scores").delete().eq("opportunity_id", id);

    const { data, error } = await supabase
      .from("opportunity_scores")
      .insert({
        opportunity_id: id,
        score_total: result.score_total,
        breakdown: result.breakdown,
        rationale: result.rationale,
      })
      .select()
      .single();

    if (error) {
      toast.error("Failed to save score");
      return;
    }

    setScore({
      ...data,
      breakdown: typeof data.breakdown === "string" ? JSON.parse(data.breakdown) : data.breakdown,
    } as OpportunityScore);
    toast.success(`Fit score: ${result.score_total}/100`);
  }

  async function handleStageChange(newStage: string) {
    if (!opportunity) return;
    const supabase = createClient();
    const { error } = await supabase
      .from("opportunities")
      .update({ stage: newStage })
      .eq("id", id);

    if (!error) {
      setOpportunity({ ...opportunity, stage: newStage as Opportunity["stage"] });
      updateOpportunity(id, { stage: newStage as Opportunity["stage"] });
      toast.success("Stage updated");
    }
  }

  async function handleAddNote() {
    if (!newNote.trim()) return;
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("notes")
      .insert({ user_id: user.id, opportunity_id: id, content: newNote.trim() })
      .select()
      .single();

    if (!error && data) {
      setNotes([data as Note, ...notes]);
      setNewNote("");
      toast.success("Note added");
    }
  }

  async function handleAddTask() {
    if (!newTask.trim()) return;
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("tasks")
      .insert({ user_id: user.id, opportunity_id: id, title: newTask.trim(), status: "todo" })
      .select()
      .single();

    if (!error && data) {
      setTasks([data as Task, ...tasks]);
      setNewTask("");
      toast.success("Task added");
    }
  }

  async function handleDeleteNote(noteId: string) {
    const supabase = createClient();
    await supabase.from("notes").delete().eq("id", noteId);
    setNotes(notes.filter((n) => n.id !== noteId));
  }

  async function handleToggleTask(taskId: string, currentStatus: string) {
    const newStatus = currentStatus === "done" ? "todo" : "done";
    const supabase = createClient();
    await supabase.from("tasks").update({ status: newStatus }).eq("id", taskId);
    setTasks(tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus as Task["status"] } : t)));
  }

  function scoreColor(val: number): string {
    if (val >= 70) return "text-green-600";
    if (val >= 50) return "text-amber-600";
    return "text-red-600";
  }

  function barColor(val: number): string {
    if (val >= 7) return "bg-green-500";
    if (val >= 5) return "bg-amber-500";
    return "bg-red-500";
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 animate-pulse rounded bg-muted" />
        <div className="h-64 animate-pulse rounded-lg bg-muted" />
      </div>
    );
  }

  if (!opportunity) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-lg font-semibold">Opportunity not found</h2>
        <Button className="mt-4" asChild>
          <Link href="/opportunities">Back to Opportunities</Link>
        </Button>
      </div>
    );
  }

  const stageInfo = PIPELINE_STAGES.find((s) => s.value === opportunity.stage);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/opportunities">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{opportunity.organization_name}</h1>
            <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {opportunity.city}, {opportunity.state}
              </span>
              <span className="capitalize">{opportunity.practice_type}</span>
              {opportunity.base_salary && (
                <span className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  ${(opportunity.base_salary / 1000).toFixed(0)}k
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Select value={opportunity.stage} onValueChange={handleStageChange}>
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PIPELINE_STAGES.map((s) => (
                  <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Badge className={stageInfo?.color + " text-white"}>{stageInfo?.label}</Badge>
          </div>
        </div>
      </div>

      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="score">Fit Score</TabsTrigger>
          <TabsTrigger value="notes">Notes & Tasks</TabsTrigger>
          <TabsTrigger value="ai">AI Tools</TabsTrigger>
        </TabsList>

        {/* Details Tab */}
        <TabsContent value="details" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card>
              <CardHeader><CardTitle className="text-sm">ICU Model</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                {opportunity.open_vs_closed && <p><strong>Model:</strong> {opportunity.open_vs_closed}</p>}
                {opportunity.icu_beds && <p><strong>ICU Beds:</strong> {opportunity.icu_beds}</p>}
                {opportunity.icu_model_description && <p>{opportunity.icu_model_description}</p>}
                {!opportunity.open_vs_closed && !opportunity.icu_model_description && (
                  <p className="text-muted-foreground italic">No ICU details added yet.</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-sm">Schedule & Call</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                {opportunity.call_frequency && <p><strong>Call:</strong> {opportunity.call_frequency}</p>}
                <p><strong>Nocturnist:</strong> {opportunity.nocturnist_coverage ? "Yes" : "No"}</p>
                <p><strong>Tele-ICU:</strong> {opportunity.tele_icu ? "Yes" : "No"}</p>
                {opportunity.schedule_description && <p>{opportunity.schedule_description}</p>}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-sm">Compensation</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                {opportunity.base_salary && <p><strong>Base:</strong> ${opportunity.base_salary.toLocaleString()}</p>}
                {opportunity.rvu_rate && <p><strong>RVU Rate:</strong> ${opportunity.rvu_rate}</p>}
                {opportunity.signing_bonus && <p><strong>Signing Bonus:</strong> ${opportunity.signing_bonus.toLocaleString()}</p>}
                {opportunity.loan_repayment && <p><strong>Loan Repayment:</strong> ${opportunity.loan_repayment.toLocaleString()}</p>}
                {opportunity.pto_days && <p><strong>PTO:</strong> {opportunity.pto_days} days</p>}
                {opportunity.cme_budget && <p><strong>CME:</strong> ${opportunity.cme_budget.toLocaleString()}</p>}
                <p><strong>Malpractice:</strong> {opportunity.malpractice_covered ? "Covered" : "Not specified"}</p>
                {opportunity.comp_notes && <p className="mt-2 text-muted-foreground">{opportunity.comp_notes}</p>}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-sm">Team Support</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex flex-wrap gap-2">
                  <Badge variant={opportunity.has_residents ? "default" : "secondary"}>
                    <Users className="mr-1 h-3 w-3" />
                    Residents: {opportunity.has_residents ? "Yes" : "No"}
                  </Badge>
                  <Badge variant={opportunity.has_fellows ? "default" : "secondary"}>
                    Fellows: {opportunity.has_fellows ? "Yes" : "No"}
                  </Badge>
                  <Badge variant={opportunity.has_apps ? "default" : "secondary"}>
                    APPs: {opportunity.has_apps ? `Yes${opportunity.app_count ? ` (${opportunity.app_count})` : ""}` : "No"}
                  </Badge>
                </div>
                {opportunity.rt_coverage && <p><strong>RT Coverage:</strong> {opportunity.rt_coverage}</p>}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-sm">Culture & Growth</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                {opportunity.culture_notes ? (
                  <p>{opportunity.culture_notes}</p>
                ) : (
                  <p className="text-muted-foreground italic">No culture notes yet.</p>
                )}
                {opportunity.leadership_opportunities && (
                  <p><strong>Leadership:</strong> {opportunity.leadership_opportunities}</p>
                )}
                <div className="flex gap-2 mt-2">
                  <Badge variant={opportunity.research_support ? "default" : "secondary"}>
                    Research: {opportunity.research_support ? "Yes" : "No"}
                  </Badge>
                  <Badge variant={opportunity.teaching_opportunities ? "default" : "secondary"}>
                    Teaching: {opportunity.teaching_opportunities ? "Yes" : "No"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-sm">Procedures</CardTitle></CardHeader>
              <CardContent>
                {opportunity.procedures_available.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {opportunity.procedures_available.map((p) => (
                      <Badge key={p} variant="outline" className="text-xs">{p}</Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground italic">No procedures listed.</p>
                )}
              </CardContent>
            </Card>
          </div>

          {(opportunity.benefits_notes || opportunity.free_notes) && (
            <Card>
              <CardHeader><CardTitle className="text-sm">Additional Notes</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                {opportunity.benefits_notes && <p><strong>Benefits:</strong> {opportunity.benefits_notes}</p>}
                {opportunity.free_notes && <p>{opportunity.free_notes}</p>}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Score Tab */}
        <TabsContent value="score" className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Fit Score</h2>
              <p className="text-sm text-muted-foreground">
                Computed from your preferences and this opportunity&apos;s details.
              </p>
            </div>
            <Button onClick={handleScore}>
              <Star className="mr-2 h-4 w-4" />
              {score ? "Re-Score" : "Calculate Score"}
            </Button>
          </div>

          {score ? (
            <>
              <Card>
                <CardContent className="py-6">
                  <div className="flex items-center gap-6">
                    <div className={`text-5xl font-bold ${scoreColor(score.score_total)}`}>
                      {score.score_total}
                    </div>
                    <div className="flex-1">
                      <Progress value={score.score_total} className="h-3" />
                      <p className="mt-2 text-sm text-muted-foreground">{score.rationale}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Score Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {score.breakdown.map((item) => (
                    <div key={item.category}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">
                          {CATEGORY_LABELS[item.category as ScoringCategory]}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {item.raw_score}/10 (weight: {item.weight})
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${barColor(item.raw_score)}`}
                            style={{ width: `${(item.raw_score / 10) * 100}%` }}
                          />
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{item.rationale}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center py-12">
                <Star className="mb-4 h-12 w-12 text-muted-foreground/40" />
                <h3 className="text-lg font-semibold">No score yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Click &quot;Calculate Score&quot; to see how this opportunity matches your preferences.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Notes & Tasks Tab */}
        <TabsContent value="notes" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a note about this opportunity..."
                    rows={2}
                    className="flex-1"
                  />
                  <Button size="sm" onClick={handleAddNote} disabled={!newNote.trim()}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Separator />
                {notes.length === 0 ? (
                  <p className="py-4 text-center text-sm text-muted-foreground">
                    No notes yet. Add your first note above.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {notes.map((note) => (
                      <div key={note.id} className="group flex gap-2 rounded-md border p-3">
                        <div className="flex-1">
                          <p className="text-sm whitespace-pre-wrap">{note.content}</p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {new Date(note.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100"
                          onClick={() => handleDeleteNote(note.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Tasks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a task..."
                    onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
                  />
                  <Button size="sm" onClick={handleAddTask} disabled={!newTask.trim()}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Separator />
                {tasks.length === 0 ? (
                  <p className="py-4 text-center text-sm text-muted-foreground">
                    No tasks yet.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center gap-3 rounded-md border p-3 cursor-pointer"
                        onClick={() => handleToggleTask(task.id, task.status)}
                      >
                        <div className={`h-4 w-4 rounded border-2 flex items-center justify-center ${
                          task.status === "done" ? "bg-primary border-primary" : "border-muted-foreground"
                        }`}>
                          {task.status === "done" && (
                            <svg className="h-3 w-3 text-primary-foreground" viewBox="0 0 12 12">
                              <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" fill="none" />
                            </svg>
                          )}
                        </div>
                        <span className={`text-sm flex-1 ${task.status === "done" ? "line-through text-muted-foreground" : ""}`}>
                          {task.title}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* AI Tools Tab */}
        <TabsContent value="ai" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <AIToolCard
              icon={<Sparkles className="h-5 w-5" />}
              title="Interview Questions"
              description="Generate tailored interview questions based on your preferences."
              action={async () => {
                if (!preferences) return "Complete onboarding first.";
                const questions = await generateInterviewQuestions(opportunity, preferences);
                return questions.map((q, i) => `${i + 1}. ${q}`).join("\n\n");
              }}
            />
            <AIToolCard
              icon={<FileText className="h-5 w-5" />}
              title="Summarize Notes"
              description="Get an AI summary of your notes for this opportunity."
              action={async () => {
                const allNotes = notes.map((n) => n.content).join("\n\n");
                return await summarizeCallNotes(allNotes);
              }}
            />
            <AIToolCard
              icon={<Send className="h-5 w-5" />}
              title="Draft Negotiation Email"
              description="Generate a professional negotiation email."
              action={async () => {
                return await draftNegotiationEmail({
                  organization: opportunity.organization_name,
                  baseSalary: opportunity.base_salary ?? undefined,
                  signingBonus: opportunity.signing_bonus ?? undefined,
                  items: ["Base salary", "Signing bonus", "PTO"],
                });
              }}
            />
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            AI features are currently in preview and return demo content. Full AI integration coming soon.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AIToolCard({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: () => Promise<string>;
}) {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const output = await action();
      setResult(output);
    } catch {
      setResult("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle className="text-sm">{title}</CardTitle>
          <Badge variant="secondary" className="ml-auto text-xs">Preview</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground mb-3">{description}</p>
        {result ? (
          <div className="rounded-md bg-muted p-3 text-xs whitespace-pre-wrap max-h-64 overflow-y-auto">
            {result}
          </div>
        ) : (
          <Button size="sm" variant="outline" onClick={handleClick} disabled={loading} className="w-full">
            {loading ? "Generating..." : "Generate"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
