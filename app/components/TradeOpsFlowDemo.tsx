"use client";

import { useEffect, useState } from "react";

const records = [
  { id: "TX-4401", source: "city portal" },
  { id: "TX-4402", source: "county feed" },
  { id: "TX-4402", source: "agency mirror", duplicate: true },
  { id: "TX-4403", source: "public notice", held: true },
  { id: "TX-4404", source: "district page" },
];

export function TradeOpsFlowDemo() {
  const [stage, setStage] = useState(4);
  const [runNumber, setRunNumber] = useState(0);
  const running = stage < 4;

  useEffect(() => {
    if (runNumber === 0) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      const timer = window.setTimeout(() => setStage(4), 0);
      return () => window.clearTimeout(timer);
    }

    const timers = [0, 520, 1040, 1560, 2080].map((delay, index) =>
      window.setTimeout(() => setStage(index), delay),
    );
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [runNumber]);

  const replay = () => {
    if (running) return;
    setStage(0);
    setRunNumber((value) => value + 1);
  };

  return (
    <div
      className="tradeops-flow"
      data-stage={stage}
      role="group"
      tabIndex={0}
      onFocus={(event) => {
        if (event.currentTarget === event.target) replay();
      }}
      onPointerEnter={replay}
      aria-label="Deterministic TradeOps record flow demonstration"
    >
      <div className="flow-chrome">
        <span aria-hidden="true"><i /><i /><i /></span>
        <code>TradeOps demo — 5 sample records</code>
        <small>{running ? "processing" : "synthetic data"}</small>
      </div>
      <div className="flow-workspace">
        <section className="flow-input" aria-label="Five synthetic input records">
          <header><span>INPUT</span><b>05 records</b></header>
          <div className="flow-records">
            {records.map((record, index) => (
              <div
                data-visible={stage >= 1}
                data-duplicate={Boolean(record.duplicate && stage >= 2)}
                data-held={Boolean(record.held && stage >= 3)}
                key={`${record.id}-${index}`}
              >
                <span>{record.id}</span>
                <small>{record.duplicate && stage >= 2 ? "duplicate" : record.held && stage >= 3 ? "rights hold" : record.source}</small>
              </div>
            ))}
          </div>
        </section>

        <div className="flow-gates" aria-label="Pipeline gates">
          <div data-complete={stage >= 2} data-active={stage === 1}><span>01</span><b>DEDUPE</b></div>
          <i aria-hidden="true">↓</i>
          <div data-complete={stage >= 3} data-active={stage === 2}><span>02</span><b>RIGHTS</b></div>
          <i aria-hidden="true">↓</i>
          <div data-complete={stage >= 4} data-active={stage === 3}><span>03</span><b>NORMALIZE</b></div>
        </div>

        <section className="flow-output" data-visible={stage >= 4} aria-label="Verified output">
          <header><span>OUTPUT</span><b>04 unique</b></header>
          <div className="flow-output-ring"><span>4</span><small>reviewable records</small></div>
          <div className="flow-output-stats">
            <p><span>03</span><small>released</small></p>
            <p data-held="true"><span>01</span><small>quarantined</small></p>
          </div>
        </section>
      </div>
      <div className="flow-footer">
        <p><span aria-hidden="true">✓</span> 5 in · 1 duplicate collapsed · 1 source held · 4 unique out</p>
        <button type="button" onClick={replay} disabled={running}>{running ? "Processing…" : "Replay flow ↗"}</button>
      </div>
    </div>
  );
}
