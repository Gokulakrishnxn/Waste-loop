"use client";

import React, { useCallback, useRef, useState } from "react";
import { AlertCircle, AlertTriangle } from "lucide-react";
import { calculateProjectWaste } from "@/lib/calculator";
import { ProjectInput, WasteResult } from "@/lib/calculator/types";
import { fetchClimateData } from "@/lib/services/climate";
import { AnalysisView } from "@/components/analysis/analysis-view";
import { EmptyState } from "@/components/analysis/empty-state";
import { ProjectForm } from "@/components/calculator/project-form";
import { PageShell } from "@/components/layout/page-shell";

const DEFAULT_INPUT: ProjectInput = {
  buildingType: "office",
  buildingScale: "medium",
  builtUpArea: 10000,
  users: 500,
  materials: ["concrete", "brick"],
  location: "Chennai, Tamil Nadu, India",
};

export default function Home() {
  const [input, setInput] = useState<ProjectInput>(DEFAULT_INPUT);
  const [result, setResult] = useState<WasteResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<number>(0);
  const [hasAnalyzed, setHasAnalyzed] = useState<boolean>(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const resultsRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = useCallback(async () => {
    setIsLoading(true);
    setGeneralError(null);
    setLoadingStep(0);

    try {
      // Step 1: Validate & ingest project parameters
      await new Promise((r) => setTimeout(r, 200));
      setLoadingStep(1);

      // Step 2: Compute construction embodied waste
      await new Promise((r) => setTimeout(r, 200));
      setLoadingStep(2);

      // Step 3: Fetch site climate telemetry
      const climate = await fetchClimateData(input.location);
      await new Promise((r) => setTimeout(r, 200));
      setLoadingStep(3);

      // Step 4: Generate waste streams & circular management plan
      await new Promise((r) => setTimeout(r, 200));
      const calculatedResult = calculateProjectWaste(input, climate);

      setResult(calculatedResult);
      setHasAnalyzed(true);

      // Scroll to results only on mobile devices (< 768px)
      if (typeof window !== "undefined" && window.innerWidth < 768) {
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 120);
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred during calculation. Please check your inputs.";
      setGeneralError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [input]);

  return (
    <PageShell>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start">
        {/* Left Column: Project Input */}
        <aside className="lg:col-span-5 xl:col-span-5 space-y-4">
          <ProjectForm
            input={input}
            onChange={setInput}
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
            hasAnalyzed={hasAnalyzed}
            loadingStep={loadingStep}
          />

          {generalError && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs text-red-800 space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2 font-semibold">
                <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
                <span>Location Analysis Notice</span>
              </div>
              <p className="leading-relaxed opacity-90">{generalError}</p>
            </div>
          )}

          {result?.climate.isFallback && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-xs text-amber-900 flex items-start gap-2.5 animate-fadeIn">
              <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <span className="font-semibold block mb-0.5">Climate Fallback Active</span>
                {result.climate.statusMessage}
              </div>
            </div>
          )}
        </aside>

        {/* Right Column: Analysis Output (or EmptyState prior to calculation) */}
        <section
          ref={resultsRef}
          aria-live="polite"
          className="lg:col-span-7 xl:col-span-7 min-w-0"
        >
          {result ? (
            <AnalysisView result={result} />
          ) : (
            <EmptyState isLoading={isLoading} loadingStep={loadingStep} />
          )}
        </section>
      </div>
    </PageShell>
  );
}
