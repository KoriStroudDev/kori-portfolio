import { CaseStudy } from "../../components/CaseStudy";
import { createRouteMetadata, routeMetadata } from "../../route-metadata";

export const metadata = createRouteMetadata(routeMetadata.crmRescue);

export default function CrmRescuePage() {
  return <CaseStudy
    slug="crm-rescue"
    accent="amber"
    eyebrow="CRM Rescue · Local-first internal tool"
    title="CRM cleanup where every change can be explained"
    intro="CRM Rescue takes a messy CRM export and walks an operator through mapping, validation, and duplicate review — producing clean data plus an audit trail, without ever contacting a lead or touching the source CRM."
    facts={[
      { label: "Type", value: "Local web application" },
      { label: "Stack", value: "React · FastAPI · SQLite · Docker" },
      { label: "Status", value: "Version 0.1.0, verified locally with synthetic fixtures" },
      { label: "Data", value: "Stays on the local machine — no cloud, no AI, no outbound anything" },
    ]}
    problem={<>
      <p>Every operations team eventually inherits a CRM export full of duplicates, missing owners, stale deals, and half-filled fields. The usual options are bad: clean it by hand for days, or run a tool that &quot;fixes&quot; things silently so nobody can say why two contacts became one.</p>
      <p>Silent merges and opaque &quot;lead quality&quot; scores don&apos;t make data trustworthy — they just move the doubt somewhere you can&apos;t see it.</p>
    </>}
    audience={<p>Sales operations and small-business teams using Salesforce, HubSpot, or spreadsheet-based tracking who need to repair an export before a migration, a campaign, or a report — and need to show their work afterward.</p>}
    built={<>
      <p>A local-first web application that guides one operator through the whole cleanup: import a CSV, map its columns to a standard schema, run rule-based validation, review duplicate candidates with evidence side by side, and export clean data plus a complete change history.</p>
      <p>Salesforce and HubSpot are supported as mapping presets. The deterministic core is complete without AI — there is no model, no scoring black box, and no network dependency.</p>
    </>}
    workflowTitle="Six steps from raw export to an audit trail"
    workflowIntro="A six-step operator journey. The three screenshots below show the main screens used at steps 1, 3–4, and 5–6."
    workflow={[
      { title: "Import a CSV and map the columns", detail: "Pick the export format, load the file, and map each source column to the standard schema. A preview shows sample values so mapping is a decision, not a guess." },
      { title: "Validate and surface exceptions", detail: "Plain, predictable rules check emails, phones, dates, owners, and stages. Invalid rows stay visible with rule codes — nothing is silently dropped or corrected." },
      { title: "Review duplicate candidates", detail: "The tool generates candidate pairs with the matching evidence spelled out: which fields matched, and how confident the rule is. Scores create review items — they never merge anything." },
      { title: "Decide: merge or keep separate", detail: "Each pair needs an explicit confirmation, and each decision lands in the audit trail. In the demo, a person resolved all six candidates: two merges, four kept separate." },
      { title: "Check the pipeline's health", detail: "Attention flags highlight records with missing owners, stale activity, or no next step — described as operational next actions, not a mystery score." },
      { title: "Export the results and the audit", detail: "Cleaned CSV, change audit, and a quality report — reproducible, so rerunning the same inputs gives the same outputs. A local run can be deleted entirely when you're done." },
    ]}
    features={[
      { title: "Evidence-first duplicate review", detail: "Candidates show both records side by side with exact reason codes (name match, email match, phone match) so the decision is informed, not blind." },
      { title: "A real audit trail", detail: "Every normalization, score, and merge decision is recorded with its reason — the export includes the history, not just the outcome." },
      { title: "Local by design", detail: "Runtime CSVs, the SQLite database, and exports never leave the machine. The verified browser test observed zero non-loopback network requests." },
      { title: "Reproducible output", detail: "Two independent demo generations produced byte-identical manifests — cleanup you can rerun and get the same answer." },
    ]}
    humanIntro="The tool prepares decisions; it doesn't make them:"
    human={[
      { title: "Every merge", detail: "Similarity scores queue a review. Only an explicit confirmation changes a record, and the checkbox spells out what merging means." },
      { title: "Every keep-separate", detail: "Deciding two similar records are different people is also recorded — future reviewers see it was considered, not missed." },
      { title: "Contacting anyone", detail: "There is no email, SMS, enrichment, or CRM write-back. The tool cleans data; people decide what to do with it." },
    ]}
    screensTitle="Three screens across the six-step workflow"
    screensIntro="These three views show the operator's main touchpoints: import and mapping, duplicate decisions, and final review with exports and an audit trail."
    gallery="walkthrough"
    shots={[
      { src: "/projects/crm-rescue/import-mapping.png", alt: "CRM Rescue import step showing a synthetic CSV loaded, its 13 source columns, and dropdowns mapping each column to a standard CRM field", caption: "Step 1 of 6 — Import and map the CSV: source columns are matched to a standard schema, with sample values shown for context.", label: "Import and map a CSV", width: 1216, height: 1730 },
      { src: "/projects/crm-rescue/duplicate-review.png", alt: "CRM Rescue duplicate review dialog comparing two synthetic contact records with matching reason codes and a required keep-or-merge decision", caption: "Duplicate review: two candidate records side by side with the exact match evidence — confirming the merge is the operator's explicit decision.", label: "Compare likely duplicates", width: 1280, height: 720 },
      { src: "/projects/crm-rescue/results-audit.png", alt: "CRM Rescue results view showing quality score, active records, validation flags, duplicate reviews, reproducible export options, and the local audit trail table", caption: "Steps 5–6 of 6 — Review quality flags, export the cleaned file, and inspect the audit trail behind every change.", label: "Review results and audit", width: 1216, height: 1090 },
    ]}
    verificationIntro="Release evidence from the local verification run — synthetic fixtures, not customer data."
    stats={[
      { value: "24 → 22", label: "synthetic rows in, active records out (6 duplicate candidates resolved)" },
      { value: "12 + 4", label: "backend tests (91% configured coverage) + frontend tests" },
      { value: "0", label: "axe accessibility violations in the tested import and audit states" },
      { value: "0", label: "non-loopback network requests observed in the browser test" },
    ]}
    verificationNotes={<>
      <p>The repeatable demo processes 24 invented rows across Salesforce-style, HubSpot-style, and generic fixtures. A Chromium critical-flow test passed, dependency audits (npm and pinned Python) reported no known vulnerabilities, and two independent demo generations matched SHA-256 exactly. A backend test also sends a contact-data canary through the pipeline and asserts it never appears in application logs.</p>
    </>}
    boundaries={[
      "The portfolio example uses invented records. A real engagement would begin with a sanitized sample and rules tailored to the team's workflow.",
      "Designed for one local CSV at a time, with common North American phone formats and explainable exact/block-based duplicate matching.",
      "Every merge requires a person's approval. The app exports cleaned files and an audit trail; it does not write changes back to a CRM.",
      "This is a single-operator local tool, not a hosted multi-user service.",
    ]}
    sourceHref="https://github.com/KoriStroudDev/crm-rescue"
    nextHref="/services/"
    nextLabel="See how a project like this starts"
  />;
}
