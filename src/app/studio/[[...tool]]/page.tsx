"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export default function StudioPage() {
  if (
    !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === "placeholder"
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="max-w-md rounded-xl border bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold text-slate-900">
            Sanity Studio Not Configured
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            Set{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">
              NEXT_PUBLIC_SANITY_PROJECT_ID
            </code>{" "}
            in your environment variables to enable the content editor.
          </p>
          <p className="mt-4 text-xs text-slate-500">
            Create a free project at{" "}
            <a
              href="https://sanity.io/manage"
              className="text-blue-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              sanity.io/manage
            </a>
          </p>
        </div>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
