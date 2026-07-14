import type { Metadata } from "next";
import Link from "next/link";
import { emailHref } from "../site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Kori Stroud builds practical automation and internal tools, drawing on years of hands-on operational work in sales, service, and small-business environments.",
  alternates: { canonical: "/about/" },
};

const focusAreas = [
  "Operations automation",
  "Internal tools",
  "Browser workflows",
  "Data quality",
  "Practical AI",
];

export default function AboutPage() {
  return (
    <main data-route="about">
      <section className="page-hero">
        <div className="page-grid-pattern" aria-hidden="true" />
        <div className="shell">
          <nav className="route-trail" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><strong>About</strong></nav>
          <div className="page-hero-inner">
            <p className="eyebrow">About</p>
            <h1>I did the operational work before I started automating it</h1>
            <p className="lede">
              Software earns trust when the person responsible for the outcome can understand it, correct it, and see its limits. That standard comes from years on the other side of the desk.
            </p>
          </div>
        </div>
      </section>

      <section className="section shell about-grid">
        <aside className="about-aside">
          <div className="about-facts">
            <p className="about-facts-title">At a glance</p>
            <dl>
              <div><dt>Based in</dt><dd>Texas · works remote</dd></div>
              <div><dt>Open to</dt><dd>Freelance, contract, and full-time</dd></div>
              <div><dt>Builds with</dt><dd>Python, TypeScript, browser tooling</dd></div>
            </dl>
          </div>
          <div className="about-focus">
            <p className="about-facts-title">Current focus</p>
            <ul>
              {focusAreas.map((area) => <li key={area}>{area}</li>)}
            </ul>
          </div>
        </aside>
        <div className="prose about-prose">
          <p>
            Before I wrote software, I worked in sales, customer service, financial transactions, inventory, and small-business operations. I have been the person copying data between systems, chasing down a duplicate record, and finding out at the worst moment that a &quot;simple&quot; process had six exceptions nobody wrote down.
          </p>
          <p>
            That experience is why my software looks the way it does. I notice where a workflow actually fails — not where the diagram says it should — and I build for the operator who has to live with the result. Uncertainty becomes a review queue instead of a silent guess. Consequential actions wait for a person.
          </p>
          <p>
            Today I build focused tools around that principle: Python pipelines for messy data, browser tools for repetitive research and form work, and internal applications that make cleanup and review explainable.
          </p>
          <p>
            AI has a place in that work, but it is a layer, not the foundation. When a plain rule can do the job, I use the rule. When AI helps draft or summarize, the output stays editable, it is clear what data leaves the machine, and a person approves the result. I direct the work, test the behavior, and own what ships.
          </p>
          <p>
            I&apos;m open to freelance projects, contract engagements, and full-time roles where operational judgment and practical software belong together.
          </p>
        </div>
      </section>

      <section className="closing-cta">
        <div className="closing-grid-pattern" aria-hidden="true" />
        <div className="shell closing-grid">
          <div>
            <p className="eyebrow">Talk to me</p>
            <h2>Tell me about the work you&apos;re trying to fix.</h2>
            <p>Projects, contracts, and roles all start the same way — a short email.</p>
          </div>
          <div className="closing-actions">
            <Link className="button button-light" href="/contact/">Go to contact <span aria-hidden="true">→</span></Link>
            <a href={emailHref("Opportunity for Kori Stroud")}>kori@tradeopsdata.com</a>
          </div>
        </div>
      </section>
    </main>
  );
}
