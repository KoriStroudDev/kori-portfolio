"use client";

import { useRef, useState } from "react";

type CopyState = "idle" | "copied" | "manual";

export function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<CopyState>("idle");
  const emailRef = useRef<HTMLSpanElement>(null);
  const resetTimer = useRef<number | undefined>(undefined);

  const selectAddress = () => {
    const node = emailRef.current;
    if (!node) return;
    const selection = window.getSelection();
    if (!selection) return;
    const range = document.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const copy = async () => {
    window.clearTimeout(resetTimer.current);
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
      resetTimer.current = window.setTimeout(() => setState("idle"), 4000);
    } catch {
      // Clipboard API unavailable (permissions, older browser, http): select
      // the visible address so a manual Ctrl+C / long-press copy works.
      selectAddress();
      setState("manual");
    }
  };

  return (
    <div className="copy-email">
      <span className="copy-email-address" ref={emailRef}>{email}</span>
      <button className="button button-secondary copy-email-button" type="button" onClick={copy}>
        {state === "copied" ? "Copied ✓" : "Copy email"}
      </button>
      <p className="copy-email-status" role="status" aria-live="polite">
        {state === "copied" && "Email address copied to your clipboard."}
        {state === "manual" && "Copying isn't available in this browser — the address is selected, so you can copy it yourself."}
      </p>
    </div>
  );
}
