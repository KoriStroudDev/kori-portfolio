import Link from "next/link";
import { OperatingPipeline } from "./components/OperatingPipeline";
import { ProjectCard } from "./components/ProjectCard";
import { SkillMarquee } from "./components/SkillMarquee";
import { WorkflowDemo } from "./components/WorkflowDemo";
import { projects, services } from "./content";
import { createRouteMetadata, routeMetadata } from "./route-metadata";
import { emailHref } from "./site";

export const metadata = createRouteMetadata(routeMetadata.home);

export default function Home() {
  return (
    <main className="home-page" data-route="home">
      <section className="hero">
        <div className="hero-aurora" aria-hidden="true" />
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="availability-badge"><i aria-hidden="true" /> Available for freelance projects, contract work, and full-time roles</p>
            <h1>Turn operational drag into <span>software you can trust.</span></h1>
            <p className="hero-support">
              I build practical Python automation, browser tools, and internal software for the repetitive work that falls between your existing systems.
            </p>
            <div className="button-row">
              <Link className="button button-primary" href="/#work">See the work <span aria-hidden="true">↓</span></Link>
              <Link className="button button-secondary" href="/services/#starter-sprint">Start with a $350–$750 fix</Link>
            </div>
            <p className="hero-note">
              Every project here is working software I can demonstrate — built so the person responsible can review and control what it does.
            </p>
          </div>
          <WorkflowDemo />
        </div>
      </section>

      <SkillMarquee />

      <section className="section shell work-section" id="work" aria-labelledby="work-heading">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 id="work-heading">Three tools, three everyday operations problems.</h2>
          </div>
          <p>These are functioning projects, not concepts. Each case study walks through the problem, who it helps, how the workflow runs, and what I tested.</p>
        </div>
        <div className="project-list">
          {projects.map((project, index) => <ProjectCard project={project} index={index} key={project.slug} />)}
        </div>
      </section>

      <section className="section pipeline-section" id="method" aria-labelledby="pipeline-heading">
        <div className="shell">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">How I work</p>
              <h2 id="pipeline-heading">Inspect → Automate → Verify</h2>
            </div>
            <p>Select a stage to see what it covers. The goal is never maximum automation — it is the smallest reliable tool that makes the work easier to run.</p>
          </div>
          <OperatingPipeline />
        </div>
      </section>

      <section className="section shell" aria-labelledby="work-path-heading">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Two ways to work together</p>
            <h2 id="work-path-heading">One painful workflow — or a seat on the team.</h2>
          </div>
          <p>The same background carries both: understand the work firsthand, find where it breaks, and build the smallest tool that genuinely helps.</p>
        </div>
        <div className="pathway-grid">
          <article className="pathway-card business-path">
            <p className="eyebrow">For businesses</p>
            <h3>Fix one painful process first.</h3>
            <p>Start with a single spreadsheet, CSV, browser, or copy-and-paste workflow. The Automation Fix Sprint is fixed-scope and low-commitment: you see a working result before deciding anything bigger.</p>
            <Link className="text-link" href="/services/#starter-sprint">See the Automation Fix Sprint <span aria-hidden="true">→</span></Link>
          </article>
          <article className="pathway-card employer-path">
            <p className="eyebrow">For employers</p>
            <h3>Add an operator-minded builder.</h3>
            <p>I am open to remote full-time and contract roles in Python automation, internal tools, technical operations, browser workflows, and data quality.</p>
            <a className="text-link" href={emailHref("Full-time or contract role for Kori Stroud")}>Discuss a role <span aria-hidden="true">→</span></a>
          </article>
        </div>
      </section>

      <section className="section services-section">
        <div className="shell">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Services</p>
              <h2>Automate the busywork. Keep the judgment.</h2>
            </div>
            <p>Best for operational work that lives in spreadsheets, browser tabs, CSV exports, or repeated copy-and-paste.</p>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <article className="service-card" key={service.number}>
                <span className="service-number">{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
          <Link className="text-link section-link" href="/services/">How a project starts, what it costs, and where I draw lines <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="closing-cta">
        <div className="closing-grid-pattern" aria-hidden="true" />
        <div className="shell closing-grid">
          <div>
            <p className="eyebrow">Get in touch</p>
            <h2>Bring me the process everyone works around.</h2>
            <p>One screenshot, a sanitized sample, or a short description is enough to start.</p>
          </div>
          <div className="closing-actions">
            <Link className="button button-light" href="/contact/">Start a conversation <span aria-hidden="true">→</span></Link>
            <a href={emailHref("Opportunity for Kori Stroud")}>kori@tradeopsdata.com</a>
          </div>
        </div>
      </section>
    </main>
  );
}
