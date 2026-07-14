"use client";

import { useEffect, useState } from "react";

/**
 * Replays the real CRM Rescue release demo as a short sequence.
 * Every number shown here comes from the verified, reproducible demo run
 * (24 synthetic rows, 6 duplicate candidates, 2 merges, 4 kept separate,
 * 22 active records). Synthetic data only.
 */
const steps = [
  {
    stage: "Import",
    detail: "24 rows arrive from three messy sample CSV exports",
    tone: "done",
  },
  {
    stage: "Validate",
    detail: "Broken and incomplete rows stay visible instead of vanishing",
    tone: "done",
  },
  {
    stage: "Flag",
    detail: "6 possible duplicates are queued for a person to review",
    tone: "review",
  },
  {
    stage: "Decide",
    detail: "2 merged, 4 kept separate — each one an explicit approval",
    tone: "human",
  },
  {
    stage: "Export",
    detail: "22 clean records leave with a full audit trail",
    tone: "done",
  },
] as const;

export function WorkflowDemo() {
  const [visibleSteps, setVisibleSteps] = useState<number>(steps.length);
  const [runNumber, setRunNumber] = useState(0);
  const complete = visibleSteps >= steps.length;

  useEffect(() => {
    if (runNumber === 0) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      const timer = window.setTimeout(() => setVisibleSteps(steps.length), 0);
      return () => window.clearTimeout(timer);
    }
    const timers = steps.map((_, index) =>
      window.setTimeout(() => setVisibleSteps(index + 1), 350 + index * 520),
    );
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [runNumber]);

  const replay = () => {
    if (!complete) return;
    setVisibleSteps(0);
    setRunNumber((value) => value + 1);
  };

  return (
    <div className="workflow-demo" data-state={complete ? "complete" : "running"}>
      <div className="demo-chrome">
        <span className="demo-dots" aria-hidden="true"><i /><i /><i /></span>
        <p>How one of my tools handles a cleanup run</p>
        <small>synthetic data</small>
      </div>
      <div className="demo-body">
        <p className="demo-intro">A real demo run from CRM Rescue, one of the projects below:</p>
        <ol className="demo-steps" aria-live="polite">
          {steps.map((step, index) => {
            const shown = index < visibleSteps;
            const active = index === visibleSteps && !complete;
            return (
              <li key={step.stage} data-tone={step.tone} data-state={shown ? "shown" : active ? "active" : "pending"}>
                <span className="demo-mark" aria-hidden="true">{shown ? (step.tone === "review" ? "!" : "✓") : "·"}</span>
                <strong>{step.stage}</strong>
                <span className="demo-detail">{shown ? step.detail : active ? "…" : ""}</span>
              </li>
            );
          })}
        </ol>
        <p className="demo-summary" data-visible={complete}>
          No silent changes — every merge was someone&apos;s explicit decision.
        </p>
      </div>
      <div className="demo-footer">
        <span>Reproducible demo · verified release evidence</span>
        <button type="button" disabled={!complete} onClick={replay}>
          {complete ? "Replay ↻" : "Running…"}
        </button>
      </div>
    </div>
  );
}
