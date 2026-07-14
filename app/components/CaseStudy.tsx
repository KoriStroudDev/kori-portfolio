import Link from "next/link";
import type { ReactNode } from "react";
import { ZoomableShot, type Shot } from "./ZoomableShot";

type Fact = { label: string; value: string };
type Step = { title: string; detail: string };
type Item = { title: string; detail: string };
type Stat = { value: string; label: string };

export type CaseStudyProps = {
  slug: string;
  accent: "green" | "blue" | "amber";
  eyebrow: string;
  title: string;
  intro: string;
  facts: Fact[];
  problem: ReactNode;
  audience: ReactNode;
  built: ReactNode;
  workflowTitle?: string;
  workflowIntro: string;
  workflow: Step[];
  features: Item[];
  humanEyebrow?: string;
  humanTitle?: string;
  humanIntro: string;
  human: Item[];
  screensTitle?: string;
  screensIntro: string;
  gallery: "walkthrough" | "featured";
  shots: Shot[];
  verificationIntro: string;
  stats: Stat[];
  verificationNotes: ReactNode;
  boundaries: string[];
  sourceHref: string;
  nextHref: string;
  nextLabel: string;
};

export function CaseStudy(props: CaseStudyProps) {
  return (
    <main className={`case-page case-accent-${props.accent}`} data-route={`project-${props.slug}`}>
      <section className="case-hero">
        <div className="page-grid-pattern" aria-hidden="true" />
        <div className="shell">
          <nav className="route-trail" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/#work">Work</Link><span aria-hidden="true">/</span><strong>{props.eyebrow.split(" · ")[0]}</strong>
          </nav>
          <div className="case-hero-grid">
            <div className="case-hero-copy">
              <p className="eyebrow">{props.eyebrow}</p>
              <h1>{props.title}</h1>
              <p className="lede">{props.intro}</p>
              <div className="button-row">
                <a className="button button-primary" href="#workflow">See how it works <span aria-hidden="true">↓</span></a>
                <Link className="button button-secondary" href="/contact/">Discuss a similar workflow</Link>
                <a className="button button-secondary" href={props.sourceHref}>View source on GitHub</a>
              </div>
            </div>
            <aside className="case-facts" aria-label="Project facts">
              <p className="case-facts-title">Project facts</p>
              <dl>
                {props.facts.map((fact) => (
                  <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>
                ))}
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <nav className="case-local-nav" aria-label="Case study sections">
        <div className="shell">
          <a href="#overview">Overview</a>
          <a href="#workflow">Workflow</a>
          <a href="#screens">Screens</a>
          <a href="#verification">Testing</a>
        </div>
      </nav>

      <section className="section shell case-overview" id="overview" aria-labelledby="overview-heading">
        <div className="case-overview-grid">
          <article>
            <p className="eyebrow">The problem</p>
            <h2 id="overview-heading">What kept going wrong</h2>
            <div className="prose">{props.problem}</div>
          </article>
          <article>
            <p className="eyebrow">Who it&apos;s for</p>
            <h3>Who would use this</h3>
            <div className="prose">{props.audience}</div>
          </article>
          <article>
            <p className="eyebrow">The build</p>
            <h3>What I built</h3>
            <div className="prose">{props.built}</div>
          </article>
        </div>
      </section>

      <section className="section case-workflow" id="workflow" aria-labelledby="workflow-heading">
        <div className="shell">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">The workflow</p>
              <h2 id="workflow-heading">{props.workflowTitle ?? "How a run actually goes"}</h2>
            </div>
            <p>{props.workflowIntro}</p>
          </div>
          <ol className="workflow-steps">
            {props.workflow.map((step, index) => (
              <li key={step.title}>
                <span className="workflow-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section shell case-features" aria-labelledby="features-heading">
        <div className="case-features-grid">
          <div>
            <p className="eyebrow">Worth a closer look</p>
            <h2 id="features-heading">The most useful parts</h2>
            <ul className="feature-list">
              {props.features.map((feature) => (
                <li key={feature.title}><strong>{feature.title}</strong><span>{feature.detail}</span></li>
              ))}
            </ul>
          </div>
          <aside className="human-panel">
            <p className="eyebrow">{props.humanEyebrow ?? "Deliberately manual"}</p>
            <h3>{props.humanTitle ?? "What stays human"}</h3>
            <p className="human-intro">{props.humanIntro}</p>
            <ul>
              {props.human.map((item) => (
                <li key={item.title}><strong>{item.title}</strong><span>{item.detail}</span></li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="section section-tint case-screens" id="screens" aria-labelledby="screens-heading">
        <div className="shell">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">The real screens</p>
              <h2 id="screens-heading">{props.screensTitle ?? "What it looks like in use"}</h2>
            </div>
            <p>{props.screensIntro}</p>
          </div>
          <div className={`shot-gallery gallery-${props.gallery}`}>
            {props.shots.map((shot, index) => (
              <ZoomableShot shot={shot} index={index} key={shot.src} />
            ))}
          </div>
        </div>
      </section>

      <section className="section shell case-verification" id="verification" aria-labelledby="verification-heading">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Technical verification</p>
            <h2 id="verification-heading">What I tested</h2>
          </div>
          <p>{props.verificationIntro}</p>
        </div>
        <div className="verification-grid">
          <div className="stat-row">
            {props.stats.map((stat) => (
              <div className="stat" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
          <div className="prose verification-notes">{props.verificationNotes}</div>
        </div>
        <div className="boundary-panel">
          <h3>Current scope</h3>
          <ul>
            {props.boundaries.map((boundary) => <li key={boundary}>{boundary}</li>)}
          </ul>
        </div>
      </section>

      <section className="next-project">
        <div className="shell next-project-inner">
          <p className="eyebrow">Keep exploring</p>
          <Link href={props.nextHref}>{props.nextLabel} <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </main>
  );
}
