import Link from "next/link";

export default function NotFound() {
  return (
    <main data-route="not-found">
      <section className="page-hero not-found-hero">
        <div className="page-grid-pattern" aria-hidden="true" />
        <div className="shell">
          <nav className="route-trail" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><strong>404</strong></nav>
          <div className="page-hero-inner">
            <p className="eyebrow">404 — page not found</p>
            <h1>That page doesn&apos;t exist</h1>
            <p className="lede">The address may have changed or been mistyped. Everything on this site is one click away:</p>
            <nav className="not-found-links" aria-label="Helpful destinations">
              <Link className="button button-primary" href="/">Home</Link>
              <Link className="button button-secondary" href="/#work">Selected work</Link>
              <Link className="button button-secondary" href="/services/">Services</Link>
              <Link className="button button-secondary" href="/contact/">Contact</Link>
            </nav>
          </div>
        </div>
      </section>
    </main>
  );
}
