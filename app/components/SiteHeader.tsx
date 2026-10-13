"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { site } from "../site";

const links = [
  { href: "/#work", label: "Work", match: "/" },
  { href: "/services/", label: "Services", match: "/services" },
  { href: "/about/", label: "About", match: "/about" },
];

function isActive(pathname: string, match: string): boolean {
  if (match === "/") return false;
  return pathname === match || pathname === `${match}/` || pathname.startsWith(`${match}/`);
}

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const onClick = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onClick);
    };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label={`${site.name} — home`}>
          <span className="brand-mark" aria-hidden="true">K</span>
          <span className="brand-text">
            <strong>{site.name}</strong>
            <small>Operations automation</small>
          </span>
        </Link>
        <div className="header-nav" ref={navRef}>
          <span className="header-signal"><i aria-hidden="true" /> Available</span>
          <nav aria-label="Primary">
            <button
              className="menu-toggle"
              type="button"
              aria-expanded={menuOpen}
              aria-controls={menuId}
              onClick={() => setMenuOpen((open) => !open)}
            >
              Menu
            </button>
            <ul className="nav-list" id={menuId} data-open={menuOpen}>
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(pathname, link.match) ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  className="nav-cta"
                  href="/contact/"
                  aria-current={isActive(pathname, "/contact") ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
