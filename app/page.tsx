import Link from "next/link";
import { CopyEmail } from "./components/CopyEmail";
import { OperatingPipeline } from "./components/OperatingPipeline";
import { ProjectCard } from "./components/ProjectCard";
import { SkillMarquee } from "./components/SkillMarquee";
import { WorkflowDemo } from "./components/WorkflowDemo";
import { projects, services } from "./content";
import { createRouteMetadata, routeMetadata } from "./route-metadata";
import { emailHref, site } from "./site";

export const metadata = createRouteMetadata(routeMetadata.home);

export default function Home() {
  return (
    <main className="home-page" data-route="home">
      <section className="hero">
        <div className="hero-aurora" aria-hidden="true" />
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="availability-badge"><i aria-hidden="true" /> Available for freelance projects, contract work, and full-time roles</p>
            <p className="hero-personal">Kori Stroud · Operations Automation Developer</p>
            <h1>Python automation for <span>the work your team does every day.</span></h1>
            <p className="hero-support">
              I turn repetitive spreadsheets, browser tasks, and messy data into reliable tools. I worked in customer service, sales, and operations before building software, so I understand the work behind the workflow.
            </p>
            <div className="button-row">
              <Link className="button button-primary" href="/#work">Explore my projects <span aria-hidden="true">↓</span></Link>
              <Link className="button button-secondary" href="/contact/">Discuss a role or project <span aria-hidden="true">→</span></Link>
            </div>
            <nav className="hero-quicklinks" aria-label="Quick paths">
              <a href={emailHref("Résumé request for Kori Stroud")}>Recruiter? Request my résumé <span aria-hidden="true">↗</span></a>
              <Link href="/services/#starter-sprint">Business owner? Start with a small fix <span aria-hidden="true">↗</span></Link>
            </nav>
            <p className="hero-note">
              Explore functioning, reviewable software demos below — with clear explanations of what I built and what I tested.
            </p>
          </div>
          <WorkflowDemo />
        </div>
      </section>

      <SkillMarquee />

      <section className="section shell" aria-labelledby="work-path-heading">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Two ways to work together</p>
            <h2 id="work-path-heading">Choose what brings you here.</h2>
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
            <div className="closing-copy">
              <p>Prefer to copy my address?</p>
              <CopyEmail email={site.email} />
            </div>
            <a href={emailHref("Opportunity for Kori Stroud")}>{site.email}</a>
          </div>
        </div>
      </section>
    </main>
  );
}
