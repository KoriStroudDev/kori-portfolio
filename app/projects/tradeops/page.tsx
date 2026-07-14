import { CaseStudy } from "../../components/CaseStudy";
import { createRouteMetadata, routeMetadata } from "../../route-metadata";

export const metadata = createRouteMetadata(routeMetadata.tradeOps);

export default function TradeOpsPage() {
  return <CaseStudy
    slug="tradeops"
    accent="green"
    eyebrow="TradeOps Data · Python data pipeline"
    title="Scattered bid pages become one reviewable report"
    intro="Public construction opportunities live on dozens of inconsistent agency pages and portals. TradeOps collects them into a single research report that keeps sources, duplicates, and usage rights visible — so an estimator spends time judging work, not assembling links."
    facts={[
      { label: "Type", value: "Python data pipeline" },
      { label: "Stack", value: "Python · Pydantic · SQLite · Playwright" },
      { label: "Status", value: "Working system, verified locally. Portfolio demo uses synthetic fixtures." },
      { label: "Data", value: "Offline, project-owned sample records only" },
    ]}
    problem={<>
      <p>Finding public construction work means checking city portals, county feeds, and procurement platforms that all describe the same kinds of opportunities differently. Titles, deadlines, documents, and access rules vary page by page. The same bid shows up in two places under two names.</p>
      <p>An estimator doing this by hand loses hours to assembly work — and still ends up with a spreadsheet that has no record of where each fact came from or whether the source allows reuse.</p>
    </>}
    audience={<p>Contractors and estimating teams who research public construction bids by trade and region — and anyone whose research workflow means re-checking the same public sources every week.</p>}
    built={<>
      <p>A Python pipeline that reads opportunity pages, converts each one into a single canonical record, classifies the relevant trade, collapses near-duplicates, remembers what it has already seen, and applies a per-source usage-rights decision before anything is released into a report.</p>
      <p>The output is a set of local files an estimator can actually review: an HTML summary page plus JSON and CSV exports, with quarantined records preserved and explained rather than silently dropped.</p>
    </>}
    workflowIntro="This is the demonstrated sequence from the offline demo — five synthetic source records in, four reviewable opportunities out."
    workflow={[
      { title: "Read the source pages", detail: "The full system collects from live pages using async HTTP, static extraction, platform-aware adapters, and a Playwright fallback for dynamic sites. The standalone public demo reads project-owned HTML fixtures instead — the same workflow shape, with no network path." },
      { title: "Normalize into one record shape", detail: "Pydantic models standardize identifiers, titles, deadlines, documents, locations, and trade codes, so every downstream step works with the same structure regardless of the source." },
      { title: "Classify the trade", detail: "A trade filter tags each record with relevant trade categories — and records its reasons and disqualifiers, so a surprising match can be traced instead of trusted." },
      { title: "Collapse duplicates and skip the already-seen", detail: "Near-duplicate records merge into one opportunity. SQLite tracks previously seen bid IDs: in the demo, the first pass records four new IDs and a second pass skips all four." },
      { title: "Apply the source-rights decision", detail: "Every source starts quarantined. Only records from sources with an explicitly reviewed usage policy are released; the rest stay preserved internally with a reason code." },
      { title: "Produce the reviewable output", detail: "Approved records land in an HTML review page plus JSON and CSV exports. Quarantined records are listed with their reason — visible, not vanished." },
    ]}
    features={[
      { title: "Provenance on every record", detail: "Each opportunity keeps its source link and collection context, so any fact in the report can be traced back to the page it came from." },
      { title: "Duplicate prevention across runs", detail: "Seen-state in SQLite means re-running the pipeline doesn't resurface old records as new — the demo proves the second pass skips everything from the first." },
      { title: "A rights gate that defaults to no", detail: "Unreviewed sources can't leak into a report by accident. Quarantine is the default state, and release requires an explicit per-source decision." },
      { title: "Evidence over confidence", detail: "Weak or missing evidence becomes a visible hold instead of confident copy. Disqualifiers are recorded alongside matches." },
    ]}
    humanEyebrow="Estimator decisions"
    humanTitle="What the operator controls"
    humanIntro="The pipeline assembles and organizes the research; the estimator still makes the decisions that affect the business:"
    human={[
      { title: "Whether to pursue a bid", detail: "The report surfaces opportunities and evidence. The team decides whether each one fits its capabilities, schedule, and priorities." },
      { title: "Whether a source may be reused", detail: "A person reviews each source's terms and records the export decision the gate enforces." },
      { title: "What gets shared", detail: "Reports remain local until someone chooses to share or import them elsewhere." },
    ]}
    screensIntro="Real output from the verified offline demo — synthetic records on the reserved .test domain, no real agencies or contractors."
    gallery="featured"
    shots={[
      { src: "/projects/tradeops/overview.png", alt: "TradeOps demo report listing four synthetic construction opportunities with trade codes, deadlines, and source links", caption: "The demo report: four unique synthetic opportunities, each with its trade code, deadline, evidence, and source link.", label: "TradeOps demo report", width: 1440, height: 1000 },
      { src: "/projects/tradeops/rights-review.png", alt: "TradeOps rights review view showing three exported records and one quarantined source with a reason code", caption: "The rights gate at work: three records released, one source held back with its reason code visible.", label: "Source-rights review", width: 1440, height: 1000 },
      { src: "/projects/tradeops/demo-output.png", alt: "Full TradeOps demo output page rendered in a browser, showing demo counts, the public-safe review feed, and the rights-aware exclusion table", caption: "The actual demo output file rendered in a browser — this is a data/output view of the supplied artifact, not a separate product screen.", label: "Demo output file (index.html)", width: 1440, height: 1804 },
    ]}
    verificationIntro="These numbers describe the local test suite and the reproducible offline demo — engineering evidence, not customer outcomes."
    stats={[
      { value: "1,457", label: "tests passed (1 optional dependency skip)" },
      { value: "5 → 4", label: "synthetic records deduplicated in the demo" },
      { value: "3 + 1", label: "records released + quarantined by the rights gate" },
      { value: "0", label: "network requests in the demo run" },
    ]}
    verificationNotes={<>
      <p>The full local suite passed 1,457 tests with one skip (an optional Excel-export test that needs <code>openpyxl</code>). The portfolio demo runs offline against project-owned fixtures and asserts the counts above, including the second-pass duplicate skip and the rights-gate outcome. The demo manifest also records that no email, SMS, scheduler, CRM, feed, or deployment action was possible in the demo path.</p>
    </>}
    boundaries={[
      "New source portals are added and reviewed individually; the pipeline is not a universal crawler.",
      "The report organizes opportunities and evidence. It does not score contractor fit or make bid decisions.",
      "The portfolio example uses invented records. Production setup would start with the sources, trades, and review rules a team actually uses.",
      "Source-rights rules enforce a team's documented policy; they are not legal advice or blanket permission to reuse data.",
    ]}
    sourceHref="https://github.com/KoriStroudDev/tradeops-data-demo"
    nextHref="/projects/ats-copilot/"
    nextLabel="Next case study: ATS Copilot"
  />;
}
