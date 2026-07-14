import { CaseStudy } from "../../components/CaseStudy";
import { createRouteMetadata, routeMetadata } from "../../route-metadata";

export const metadata = createRouteMetadata(routeMetadata.atsCopilot);

export default function AtsCopilotPage() {
  return <CaseStudy
    slug="ats-copilot"
    accent="blue"
    eyebrow="ATS Copilot · Chrome extension"
    title="Application help that reads the right tab and never hits Submit"
    intro="ATS Copilot is a side-panel Chrome extension for job seekers: scan the posting you choose, see how your resume's keywords line up, draft editable text, and fill the routine fields — while salary, visa, and demographic questions stay yours, and submitting stays a human click."
    facts={[
      { label: "Type", value: "Chrome extension (Manifest V3)" },
      { label: "Stack", value: "TypeScript · Chrome MV3 · Playwright" },
      { label: "Status", value: "Version 0.2.1, verified locally and installable from the packaged release." },
      { label: "Data", value: "Career data stays in extension storage; AI drafting is opt-in per action" },
    ]}
    problem={<>
      <p>Applying to jobs means retyping the same contact details into slightly different forms, tab after tab. Generic autofill tools make it worse in two ways: they guess at the wrong page when your focus moves, and they push values into fields that deserve thought — salary expectations, work authorization, demographic questions.</p>
      <p>The technical root of the first problem is real: between clicking an extension&apos;s icon and pressing its Scan button, browser focus can change, so &quot;the active tab&quot; may no longer be the job you meant.</p>
    </>}
    audience={<p>Job seekers running repetitive application sessions — especially anyone who wants drafting and form help but refuses to let a tool answer sensitive questions or submit on their behalf.</p>}
    built={<>
      <p>A side-panel extension that captures the exact tab you clicked it on, at the moment of the click — the browser gesture Chrome already trusts. When you later press Scan, it reads that saved target first, so a decoy tab stealing focus doesn&apos;t redirect the scan.</p>
      <p>Scanning extracts structured job details (structured JobPosting data first, then known ATS patterns, then a generic fallback) and computes a plain keyword overlap against your resume — presented as &quot;a guide, not a verdict.&quot; Drafting through an AI provider is user-triggered and always editable. Field filling is allowlist-based: recognized, non-sensitive fields only.</p>
    </>}
    workflowIntro="The verified user journey, in the order it actually happens — every consequential step is a click you make."
    workflow={[
      { title: "Click the extension on the job tab", detail: "That click captures the exact tab, window, and origin into session state, and opens the side panel. No background browsing, no always-on permissions." },
      { title: "Scan the page — explicitly", detail: "Scan resolves the saved target first, then extracts title, company, location, and description. In the verified test, a decoy tab took focus after the click and the scan still read the original job page." },
      { title: "Review the keyword comparison", detail: "A plain overlap count between the posting's top keywords and your resume — the same inputs always score the same, and the panel calls it a guide, not a verdict." },
      { title: "Draft where it helps (optional)", detail: "Generate cover-letter or answer drafts through the AI provider you configure. Output lands in an editable box; nothing is pasted anywhere without you." },
      { title: "Detect fields, review the plan, fill the safe ones", detail: "Detect lists every field it found with the value it would fill. Salary, work authorization, visa, demographic, unknown, and custom fields are marked 'skipped — never auto-filled.' Fill selected dispatches real input events the page can see." },
      { title: "Submit yourself — always", detail: "The fill code has no submit, click, or form-request path at all. The banner in the panel says it plainly: review every field, then click the site's own submit button." },
    ]}
    features={[
      { title: "Target capture at the gesture", detail: "Tab identity is recorded when Chrome grants temporary access — the moment you click — instead of being guessed later. Closed tabs clear their record automatically." },
      { title: "Minimum-permission model", detail: "No permanent all-sites access. If the temporary grant expires, the extension asks for one origin, once, when needed." },
      { title: "Fail-closed fill boundary", detail: "Both the panel and the content script enforce the safe-field allowlist independently. Unknown controls and custom dropdowns fail closed to manual." },
      { title: "Redacted diagnostics", detail: "Debug exports strip URLs' query strings, email addresses, local paths, and credential-shaped values. Page diagnostics use counts and booleans, not page text." },
    ]}
    humanIntro="Some fields are decisions, not data entry — the extension treats them that way:"
    human={[
      { title: "Salary, authorization, visa, demographics", detail: "Always skipped, even when your saved profile has an answer — the panel shows the saved value and asks you to enter it yourself." },
      { title: "Cover letters and custom questions", detail: "Drafts are a starting point in an editable box. What gets pasted into an application is up to you." },
      { title: "Submitting", detail: "There is no code path that submits a form. Finishing an application is always your click on the site's own button." },
    ]}
    screensIntro="Five views from the packaged release show the journey from scanning a chosen job page to filling recognized fields. All data shown is invented, and Submit remains untouched."
    gallery="walkthrough"
    shots={[
      { src: "/projects/ats-copilot/fixture-before.png", alt: "Synthetic job page for a fictional company showing a banner reading 'Synthetic portfolio demonstration', a job description, and an empty application form with an input-event counter at zero", caption: "The page the user chooses: the synthetic fixture posting, form empty, page-event counter at 0.", label: "Synthetic job fixture — before", width: 1920, height: 1350 },
      { src: "/projects/ats-copilot/panel-scan.png", alt: "ATS Copilot panel after a scan showing extracted job title, company, and location, the job description, keyword chips with check marks, a resume match score, and a 'Job detected (json-ld)' notice", caption: "After a user-triggered scan: extracted details, keyword overlap against the resume, and how the job was detected. The score text calls itself a guide, not a verdict.", label: "Side panel — scan results", width: 630, height: 1410, portrait: true },
      { src: "/projects/ats-copilot/panel-detect.png", alt: "ATS Copilot Fill tab listing detected form fields with checkboxes and values for safe fields, while salary, work authorization, and gender rows read 'skipped — never auto-filled'", caption: "Field detection: recognized safe fields are selectable with their values shown; salary, work authorization, and demographic questions are skipped with the reason spelled out.", label: "Side panel — field detection", width: 608, height: 1412, portrait: true },
      { src: "/projects/ats-copilot/panel-filled.png", alt: "ATS Copilot Fill tab after filling, showing seven fields with a green 'filled' status, sensitive fields still marked skipped, and a '7 filled' confirmation", caption: "After Fill selected: seven safe fields report 'filled', the sensitive rows are unchanged, and the banner still points the user at the site's own submit button.", label: "Side panel — after fill", width: 608, height: 1439, portrait: true },
      { src: "/projects/ats-copilot/fixture-after-fill.png", alt: "The synthetic application form with name, email, phone, links, and city filled in, salary and authorization and gender fields empty, the Submit Application button unclicked, and an input-event counter reading 7", caption: "Back on the page: safe fields hold real values (the page's own event counter saw 7 input events), sensitive fields are untouched, and Submit was never clicked.", label: "Synthetic job fixture — after fill", width: 1568, height: 1593 },
    ]}
    verificationIntro="Verified against the packaged release — a browser-boundary test, not just unit tests."
    stats={[
      { value: "61", label: "tests passed with strict TypeScript checks" },
      { value: "7 + 3", label: "safe fields filled, sensitive fields left empty in the verified flow" },
      { value: "0", label: "known npm vulnerabilities at release" },
      { value: "Never", label: "submits — the fill path contains no submit code" },
    ]}
    verificationNotes={<>
      <p>The v0.2.1 release verification covered the decoy-tab flow (the scan used the captured target even after another tab became active), safe-field filling with sensitive exclusions on the synthetic fixture, and a dated read-only scan of one public Greenhouse posting. The release scan found no remote scripts, eval, or source maps in the packaged files. The screenshots above were captured fresh from that same packaged release for this page.</p>
    </>}
    boundaries={[
      "Available today as a local Chrome extension build. A Chrome Web Store release would be a separate publication step.",
      "Structured extraction is strongest on supported job pages; other sites use a fallback and may need site-specific tuning.",
      "AI drafting is optional and uses the provider the user configures. Every draft remains editable and should be reviewed.",
      "The extension fills recognized text fields only. Salary, authorization, demographic questions, file uploads, and unfamiliar controls stay manual.",
    ]}
    sourceHref="https://github.com/KoriStroudDev/ats-copilot"
    nextHref="/projects/crm-rescue/"
    nextLabel="Next case study: CRM Rescue"
  />;
}
