import Link from "next/link";
import { services } from "../content";
import { createRouteMetadata, routeMetadata } from "../route-metadata";
import { emailHref } from "../site";

export const metadata = createRouteMetadata(routeMetadata.services);

const details = [
  {
    best: "Teams with one repetitive, failure-prone process and a clear operator who owns the outcome.",
    delivers: "A workflow map, a prioritized quick win, and a tested fix or an implementation-ready plan.",
    boundary: "I don't take on vague transformation programs, and I don't touch production systems before scope, data handling, and approvals are agreed.",
  },
  {
    best: "Operations teams working around inconsistent CRM exports, duplicate records, and manual reporting.",
    delivers: "Import mapping, validation rules, duplicate candidates you can review, an audit trail, and exports you can rerun.",
    boundary: "No silent merges, no opaque lead scoring, and no writing back to your CRM or contacting anyone without a separate, explicit agreement.",
  },
  {
    best: "Teams repeatedly collecting legitimate public information or doing structured browser work by hand.",
    delivers: "A source and permission review, a bounded collection or browser workflow, visible failure states, and human review points.",
    boundary: "No scraping restricted data, no evading access controls, and no automatic submissions — a person always makes the consequential move.",
  },
];

const sprintSteps = [
  { title: "You bring one workflow", detail: "A repetitive spreadsheet, CSV, browser, reporting, or copy-and-paste task. A screenshot and a short description are enough." },
  { title: "I map it and build the fix", detail: "I document how the work actually flows, then build the smallest tool that removes the drag — using sanitized or synthetic test data." },
  { title: "You get a working result", detail: "The automation or repair itself, test evidence showing it behaves, and plain operating notes so your team can run it." },
];

export default function ServicesPage() {
  return (
    <main data-route="services">
      <section className="page-hero">
        <div className="page-grid-pattern" aria-hidden="true" />
        <div className="shell">
          <nav className="route-trail" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><strong>Services</strong></nav>
          <div className="page-hero-inner">
            <p className="eyebrow">Services</p>
            <h1>Automation help for teams drowning in manual steps</h1>
            <p className="lede">
              I work with small operations, sales, and back-office teams whose day runs on spreadsheets, browser tabs, and copy-and-paste. The best first project is one bounded workflow with a visible owner and a costly failure mode.
            </p>
          </div>
        </div>
      </section>

      <section className="section shell" id="starter-sprint" aria-labelledby="starter-sprint-heading">
        <article className="starter-offer">
          <div className="starter-copy">
            <p className="eyebrow">The starting point</p>
            <h2 id="starter-sprint-heading">Automation Fix Sprint</h2>
            <p className="starter-lede">
              One painful workflow, fixed scope, no long commitment. This is the low-risk way to find out what working with me is like — and whether automation is even the right answer for your process.
            </p>
            <ol className="sprint-steps">
              {sprintSteps.map((step, index) => (
                <li key={step.title}>
                  <span aria-hidden="true">{index + 1}</span>
                  <div>
                    <strong>{step.title}</strong>
                    <p>{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="starter-boundary">
              If your workflow isn&apos;t a responsible fit for a small sprint — too risky, too entangled, or better solved without software — I&apos;ll tell you before any paid work begins.
            </p>
          </div>
          <aside className="starter-aside">
            <p className="starter-price">$350–$750</p>
            <p className="starter-meta">Fixed scope · usually 2–5 business days</p>
            <p>Priced by the size of the workflow. You approve the scope and price before anything starts.</p>
            <a className="button button-light" href={emailHref("Automation Fix Sprint inquiry")}>Describe your workflow</a>
            <small className="action-note">Opens a pre-addressed email draft in your mail app — nothing sends until you hit send.</small>
          </aside>
        </article>
      </section>

      <section className="section shell offer-list" aria-labelledby="offers-heading">
        <div className="section-heading">
          <p className="eyebrow">Beyond the sprint</p>
          <h2 id="offers-heading">Three ways I typically help</h2>
        </div>
        {services.map((service, index) => (
          <article className="offer" key={service.number}>
            <header>
              <span className="offer-number">{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </header>
            <dl>
              <div><dt>Good fit if</dt><dd>{details[index].best}</dd></div>
              <div><dt>You receive</dt><dd>{details[index].delivers}</dd></div>
              <div><dt>Where I draw lines</dt><dd>{details[index].boundary}</dd></div>
            </dl>
          </article>
        ))}
      </section>

      <section className="section section-tint">
        <div className="shell principles-grid">
          <div>
            <p className="eyebrow">Working principles</p>
            <h2>Useful before clever.</h2>
          </div>
          <ul className="principle-list">
            <li><strong>Start narrow.</strong><span>Define the smallest useful workflow and agree on what &quot;done&quot; means.</span></li>
            <li><strong>Keep changes explainable.</strong><span>Source context, reasons, and history stay visible in the output.</span></li>
            <li><strong>Keep judgment human.</strong><span>Consequential actions wait for explicit review and approval.</span></li>
            <li><strong>Earn complexity.</strong><span>The predictable version has to be valuable before AI gets added.</span></li>
          </ul>
        </div>
      </section>

      <section className="closing-cta">
        <div className="closing-grid-pattern" aria-hidden="true" />
        <div className="shell closing-grid">
          <div>
            <p className="eyebrow">Next step</p>
            <h2>Start with the workflow, not a technology wish list.</h2>
            <p>Tell me what the process is and where it hurts — I&apos;ll tell you honestly whether it&apos;s worth automating.</p>
          </div>
          <div className="closing-actions">
            <Link className="button button-light" href="/contact/">Go to contact <span aria-hidden="true">→</span></Link>
            <a href={emailHref("Operations automation project inquiry")}>kori@tradeopsdata.com</a>
          </div>
        </div>
      </section>
    </main>
  );
}
