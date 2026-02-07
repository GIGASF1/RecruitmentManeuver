import { create } from "zustand";
import type { Opportunity, Profile, Preferences, Task, PipelineSummary } from "@/types";

interface AppState {
  // User state
  profile: Profile | null;
  preferences: Preferences | null;
  setProfile: (profile: Profile | null) => void;
  setPreferences: (preferences: Preferences | null) => void;

  // Opportunities
  opportunities: Opportunity[];
  setOpportunities: (opportunities: Opportunity[]) => void;
  addOpportunity: (opportunity: Opportunity) => void;
  updateOpportunity: (id: string, updates: Partial<Opportunity>) => void;
  removeOpportunity: (id: string) => void;

  // Tasks
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;

  // Compare
  compareIds: string[];
  toggleCompare: (id: string) => void;
  clearCompare: () => void;

  // Pipeline
  getPipelineSummary: () => PipelineSummary[];
}

export const useAppStore = create<AppState>((set, get) => ({
  profile: null,
  preferences: null,
  setProfile: (profile) => set({ profile }),
  setPreferences: (preferences) => set({ preferences }),

  opportunities: [],
  setOpportunities: (opportunities) => set({ opportunities }),
  addOpportunity: (opportunity) =>
    set((s) => ({ opportunities: [opportunity, ...s.opportunities] })),
  updateOpportunity: (id, updates) =>
    set((s) => ({
      opportunities: s.opportunities.map((o) =>
        o.id === id ? { ...o, ...updates } : o
      ),
    })),
  removeOpportunity: (id) =>
    set((s) => ({
      opportunities: s.opportunities.filter((o) => o.id !== id),
      compareIds: s.compareIds.filter((cid) => cid !== id),
    })),

  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  addTask: (task) => set((s) => ({ tasks: [task, ...s.tasks] })),
  updateTask: (id, updates) =>
    set((s) => ({
      tasks: s.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    })),

  compareIds: [],
  toggleCompare: (id) =>
    set((s) => {
      if (s.compareIds.includes(id)) {
        return { compareIds: s.compareIds.filter((cid) => cid !== id) };
      }
      if (s.compareIds.length >= 4) return s;
      return { compareIds: [...s.compareIds, id] };
    }),
  clearCompare: () => set({ compareIds: [] }),

  getPipelineSummary: () => {
    const stages = [
      "researching",
      "applied",
      "interviewing",
      "offer_received",
      "negotiating",
      "accepted",
      "declined",
    ] as const;
    return stages.map((stage) => ({
      stage,
      count: get().opportunities.filter((o) => o.stage === stage).length,
    }));
  },
}));
