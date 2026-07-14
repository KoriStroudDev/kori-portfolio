import Link from "next/link";
import { site } from "../site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <p className="footer-title">{site.name}</p>
          <p className="footer-role">{site.title}</p>
          <p className="footer-status"><i aria-hidden="true" /> Open to freelance, contract, and full-time work</p>
        </div>
        <nav aria-label="Case studies">
          <p className="footer-heading">Work</p>
          <Link href="/projects/tradeops/">TradeOps Data</Link>
          <Link href="/projects/ats-copilot/">ATS Copilot</Link>
          <Link href="/projects/crm-rescue/">CRM Rescue</Link>
        </nav>
        <nav aria-label="Pages">
          <p className="footer-heading">Site</p>
          <Link href="/services/">Services</Link>
          <Link href="/about/">About</Link>
          <Link href="/contact/">Contact</Link>
        </nav>
        <nav aria-label="Contact and profiles">
          <p className="footer-heading">Reach me</p>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={site.github} rel="me noreferrer" target="_blank">GitHub</a>
          <a href={site.linkedin} rel="me noreferrer" target="_blank">LinkedIn</a>
        </nav>
        <p className="footer-note">
          © 2026 {site.name}. This is a static site with no analytics, tracking, or contact form — email is the only channel, and nothing here collects visitor data.
        </p>
      </div>
    </footer>
  );
}
