"use client";

import { useEffect, useState } from "react";

const fields = [
  { id: "name", label: "Full name", value: "Jordan Rivera", state: "recognized", safe: true },
  { id: "email", label: "Email", value: "jordan@example.test", state: "recognized", safe: true },
  { id: "location", label: "Location", value: "Austin, TX", state: "recognized", safe: true },
  { id: "veteran", label: "Veteran status", value: "Not captured", state: "sensitive · held", safe: false },
];

export function AtsInteractiveDemo() {
  const [scanIndex, setScanIndex] = useState(fields.length);
  const [selectedIndex, setSelectedIndex] = useState(fields.length - 1);
  const [runNumber, setRunNumber] = useState(0);
  const running = scanIndex < fields.length;
  const activeIndex = running ? Math.min(scanIndex, fields.length - 1) : selectedIndex;
  const active = fields[activeIndex];

  useEffect(() => {
    if (runNumber === 0) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      const timer = window.setTimeout(() => setScanIndex(fields.length), 0);
      return () => window.clearTimeout(timer);
    }

    const timers = [
      window.setTimeout(() => setScanIndex(0), 0),
      ...fields.slice(1).map((_, index) =>
        window.setTimeout(() => setScanIndex(index + 1), 440 + index * 440),
      ),
      window.setTimeout(() => setScanIndex(fields.length), fields.length * 440 + 180),
    ];
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [runNumber]);

  const replay = () => {
    if (running) return;
    setScanIndex(0);
    setRunNumber((value) => value + 1);
  };

  return (
    <div
      className="ats-demo"
      data-scan-complete={!running}
      role="group"
      tabIndex={0}
      aria-label="Interactive synthetic ATS Copilot demonstration"
      onFocus={(event) => {
        if (event.currentTarget === event.target) replay();
      }}
      onPointerEnter={replay}
    >
      <div className="ats-browser">
        <div className="ats-browser-bar">
          <span aria-hidden="true"><i /><i /><i /></span>
          <code>jobs.example.test/apply</code>
          <small>synthetic fixture</small>
        </div>
        <div className="ats-form">
          <div className="ats-form-heading"><span>Application</span><small>4 fields detected</small></div>
          {fields.map((field, index) => (
            <button
              className="ats-field"
              data-active={field.id === active.id}
              data-safe={field.safe}
              key={field.id}
              type="button"
              aria-pressed={field.id === active.id}
              disabled={running}
              onClick={() => setSelectedIndex(index)}
              onFocus={() => {
                if (!running) setSelectedIndex(index);
              }}
            >
              <small>{field.label}</small>
              <span>{field.value}</span>
              <i aria-hidden="true">{field.safe ? "✓" : "—"}</i>
            </button>
          ))}
        </div>
      </div>
      <aside className="ats-panel">
        <div className="ats-panel-title"><span>ATS COPILOT</span><small>tab captured</small></div>
        <div className="ats-scan-status"><i aria-hidden="true" /> {running ? "Scanning fields" : "Scan complete"}</div>
        <div className="ats-active-field" aria-live="polite">
          <small>Inspecting field</small>
          <strong>{active.label}</strong>
          <span data-safe={active.safe}>{active.safe ? "Ready for human review" : "Protected field skipped"}</span>
        </div>
        <div className="ats-mini-log">
          <p><span>tab</span><b>captured</b></p>
          <p><span>permissions</span><b>minimum</b></p>
          <p data-final={!running}><span>submit</span><b>disabled</b></p>
        </div>
        <button className="ats-replay" type="button" onClick={replay} disabled={running}>{running ? "Scanning…" : "Replay scan ↗"}</button>
      </aside>
    </div>
  );
}
