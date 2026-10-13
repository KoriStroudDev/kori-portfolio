"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "../site";

// The exact widget URL supplied by the site owner on October 13, 2026.
// Loading begins only when a visitor explicitly clicks the launcher.
const WIDGET_URL = "https://embed.tawk.to/6acdeda286334634c50ff0f1/1k4q6ghek";

type ChatState = "idle" | "loading" | "ready" | "error";

type TawkApi = {
  onLoad?: () => void;
  maximize?: () => void;
};

declare global {
  interface Window {
    Tawk_API?: TawkApi;
    Tawk_LoadStart?: Date;
  }
}

export function TawkChat() {
  const [state, setState] = useState<ChatState>("idle");

  const openChat = () => {
    if (typeof window === "undefined") return;
    // For a previously loaded widget, simply reopen it.
    if (window.Tawk_API?.maximize) {
      window.Tawk_API.maximize();
      setState("ready");
      return;
    }
    if (state === "loading") return;

    setState("loading");
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();
    window.Tawk_API.onLoad = () => {
      window.Tawk_API?.maximize?.();
      setState("ready");
    };

    // No third-party script, iframe, or cookie gets loaded by our code on page load.
    const script = document.createElement("script");
    script.async = true;
    script.src = WIDGET_URL;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    script.onerror = () => {
      script.remove();
      setState("error");
    };
    document.body.appendChild(script);
  };

  // Once loaded, the provider's native widget manages its own button and window.
  if (state === "ready") return null;

  return (
    <aside className="tawk-launcher" aria-label="Optional live chat">
      <button
        type="button"
        className="tawk-launcher-button"
        onClick={openChat}
        disabled={state === "loading"}
        aria-label="Chat with Kori using tawk.to"
      >
        <span className="tawk-launcher-icon" aria-hidden="true">✉</span>
        {state === "loading" ? "Opening chat…" : "Chat with Kori"}
      </button>
      {state === "error" ? (
        <p className="tawk-launcher-note" role="status">
          Chat could not load. <a href={`mailto:${site.email}`}>Email me instead</a>.
        </p>
      ) : (
        <p className="tawk-launcher-note">Opens third-party chat on click · <Link href="/privacy/">Privacy</Link></p>
      )}
    </aside>
  );
}
