import type { Metadata } from "next";
import Link from "next/link";
import { CopyEmail } from "../components/CopyEmail";
import { emailHref, site } from "../site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Kori Stroud about Python automation, projects, or roles by email or optional live chat.",
  alternates: { canonical: "/contact/" },
};

const projectBody = [
  "Hi Kori,",
  "",
  "The workflow: (what the process is, in a sentence or two)",
  "How it runs today: (spreadsheets, browser tabs, CSV exports, copy-and-paste...)",
  "Where it hurts: (time, errors, backlog)",
  "",
  "(Attach a screenshot or a sanitized sample if you have one.)",
].join("\n");

const roleBody = [
  "Hi Kori,",
  "",
  "The role or contract: ",
  "The team and what it works on: ",
  "Link to the description (if public): ",
].join("\n");

export default function ContactPage() {
  return (
    <main data-route="contact">
      <section className="page-hero contact-hero">
        <div className="page-grid-pattern" aria-hidden="true" />
        <div className="shell">
          <nav className="route-trail" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><strong>Contact</strong></nav>
          <div className="page-hero-inner">
            <p className="eyebrow">Contact</p>
            <h1>A short message is enough to start</h1>
            <p className="lede">
              Email me directly or select Chat with Kori in the corner to start a conversation. Whether it&apos;s a workflow you want fixed or a role you&apos;re hiring for, I respond personally.
            </p>
          </div>
        </div>
      </section>

      <section className="section shell contact-section" aria-labelledby="intent-heading">
        <h2 className="sr-only" id="intent-heading">Choose the closest starting point</h2>
        <div className="intent-grid">
          <article className="intent-card">
            <p className="eyebrow">I have a workflow or project</p>
            <h3>Tell me about the process.</h3>
            <p>What the workflow is, how it runs today, and where it hurts. A screenshot or a sanitized sample says more than a long write-up — but a couple of sentences is genuinely enough.</p>
            <a className="button button-primary" href={emailHref("Workflow project for Kori Stroud", projectBody)}>
              Start a project email
            </a>
            <small className="action-note">Opens a pre-addressed draft with a few starter prompts in your mail app. Nothing sends until you hit send.</small>
          </article>
          <article className="intent-card">
            <p className="eyebrow">I&apos;m hiring for a role or contract</p>
            <h3>Tell me about the team.</h3>
            <p>I&apos;m open to remote full-time and contract work in Python automation, internal tools, technical operations, browser workflows, and data quality. A link to the role description is perfect.</p>
            <a className="button button-primary" href={emailHref("Role or contract for Kori Stroud", roleBody)}>
              Start a hiring email
            </a>
            <small className="action-note">Opens a pre-addressed draft in your mail app. Nothing sends until you hit send.</small>
          </article>
        </div>

        <div className="resume-request">
          <div>
            <strong>Recruiter or hiring manager?</strong>
            <p>Ask for my current résumé. I&apos;ll send the relevant version directly.</p>
          </div>
          <a className="button button-secondary" href={emailHref("Résumé request for Kori Stroud")}>Request résumé <span aria-hidden="true">→</span></a>
        </div>

        <aside className="email-panel" aria-labelledby="email-panel-heading">
          <div>
            <p className="eyebrow" id="email-panel-heading">Prefer your own email client or webmail?</p>
            <p>Copy the address and write to me however you normally would:</p>
            <CopyEmail email={site.email} />
          </div>
          <div className="email-panel-links">
            <p className="eyebrow">Elsewhere</p>
            <a href={site.github} rel="me noreferrer" target="_blank">GitHub <span aria-hidden="true">↗</span></a>
            <a href={site.linkedin} rel="me noreferrer" target="_blank">LinkedIn <span aria-hidden="true">↗</span></a>
          </div>
        </aside>

        <p className="privacy-note">
          Email buttons open a draft in your email application; nothing sends automatically. Live chat is optional and loads tawk.to only when you click Chat with Kori. Chat messages and technical data are handled by that third-party service. Read the <Link href="/privacy/">privacy information</Link>.
        </p>
      </section>
    </main>
  );
}
