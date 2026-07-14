"use client";

import type { CSSProperties } from "react";
import { useState } from "react";

const steps = [
  {
    id: "inspect",
    number: "01",
    title: "Inspect",
    description: "Map the real inputs, exceptions, ownership, and failure states before choosing a tool.",
    outcome: "What this stage produces",
    signals: ["The workflow's real boundaries, written down", "Failure states named before they surprise anyone", "A clear owner for every decision"],
  },
  {
    id: "automate",
    number: "02",
    title: "Automate",
    description: "Move the repeatable work into predictable code and keep consequential judgment visible.",
    outcome: "What this stage produces",
    signals: ["Rules made explicit instead of tribal", "Sensitive actions gated behind approval", "The operator stays in control"],
  },
  {
    id: "verify",
    number: "03",
    title: "Verify",
    description: "Test the ugly paths, keep an audit trail, and hand over evidence another person can check.",
    outcome: "What this stage produces",
    signals: ["Tests that cover the failure paths", "Output someone else can review", "A documented way back if it breaks"],
  },
];

export function OperatingPipeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = steps[activeIndex];
  const progress = `${(activeIndex / (steps.length - 1)) * 100}%`;

  return (
    <div className="pipeline-board" style={{ "--pipeline-progress": progress } as CSSProperties}>
      <div className="pipeline-rail" aria-hidden="true"><span /></div>
      <div className="pipeline-steps">
        {steps.map((step, index) => (
          <button
            className="pipeline-step"
            data-active={index === activeIndex}
            key={step.id}
            type="button"
            aria-pressed={index === activeIndex}
            onClick={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
            onPointerEnter={() => setActiveIndex(index)}
          >
            <span className="pipeline-node" aria-hidden="true"><i /></span>
            <small>Stage {step.number}</small>
            <strong>{step.title}</strong>
            <span>{step.description}</span>
          </button>
        ))}
      </div>
      <div className="pipeline-output" aria-live="polite" key={active.id}>
        <p className="pipeline-output-label">{active.outcome}</p>
        <ul>
          {active.signals.map((signal) => <li key={signal}><span aria-hidden="true">✓</span>{signal}</li>)}
        </ul>
      </div>
    </div>
  );
}
