"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { createClient } from "@/lib/supabase/client";
import { useAppStore } from "@/store/app-store";
import type { Profile, Preferences, ScoringCategory } from "@/types";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const { setProfile, setPreferences } = useAppStore();

  useEffect(() => {
    async function loadUser() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      // Load profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (profile) {
        setProfile(profile as Profile);

        // Redirect to onboarding if not completed (unless already there)
        if (!profile.onboarding_completed && !pathname.startsWith("/onboarding")) {
          router.push("/onboarding");
          setLoading(false);
          return;
        }
      } else if (!pathname.startsWith("/onboarding")) {
        // No profile at all — go to onboarding
        router.push("/onboarding");
        setLoading(false);
        return;
      }

      // Load preferences
      const { data: prefs } = await supabase
        .from("preferences")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (prefs) {
        // Parse weights from JSON if needed
        const weights = typeof prefs.weights === "string"
          ? JSON.parse(prefs.weights)
          : prefs.weights;
        setPreferences({ ...prefs, weights } as Preferences & { weights: Record<ScoringCategory, number> });
      }

      setLoading(false);
    }

    loadUser();
  }, [router, pathname, setProfile, setPreferences]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Onboarding gets a clean layout (no sidebar)
  if (pathname.startsWith("/onboarding")) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  return (
    <div className="flex h-screen">
      <AppSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
