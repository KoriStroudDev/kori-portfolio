import Image from "next/image";
import Link from "next/link";
import type { Project } from "../content";
import { AtsInteractiveDemo } from "./AtsInteractiveDemo";
import { TradeOpsFlowDemo } from "./TradeOpsFlowDemo";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className={`project-card accent-${project.accent}`}>
      <div className="project-card-copy">
        <p className="project-index">0{index + 1} · {project.type}</p>
        <h3>{project.title}</h3>
        <p className="project-problem">{project.problem}</p>
        <p className="project-summary">{project.summary}</p>
        <details className="project-detail-disclosure">
          <summary>What the demo shows</summary>
          <p>{project.demoNote}</p>
        </details>
        <Link className="text-link" href={`/projects/${project.slug}/`}>
          Read the {project.name} case study <span aria-hidden="true">→</span>
        </Link>
      </div>
      <div className="project-card-media">
        {project.slug === "tradeops" ? (
          <TradeOpsFlowDemo />
        ) : project.slug === "ats-copilot" ? (
          <AtsInteractiveDemo />
        ) : (
          <div className="project-window">
            <div className="project-window-bar">
              <span aria-hidden="true"><i /><i /><i /></span>
              <code>CRM Rescue — duplicate review</code>
              <small>synthetic data</small>
            </div>
            <div className="project-window-image">
              <Image
                src={project.image}
                alt={project.imageAlt}
                width={1424}
                height={905}
                sizes="(max-width: 800px) 100vw, 48vw"
                unoptimized
              />
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
