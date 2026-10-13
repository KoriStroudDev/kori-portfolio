import assert from "node:assert/strict";
import { access, mkdtemp, readFile, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import sharp from "sharp";
import {
  generateSocialCards,
  SOCIAL_CARD_HEIGHT,
  SOCIAL_CARD_WIDTH,
  socialCards,
} from "../scripts/generate-social-cards.mjs";

const root = new URL("../", import.meta.url);

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(new URL(pathname, "http://localhost"), {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

/**
 * Route identity table. Every public route must carry its own data-route
 * marker and a unique H1 so that "wrong page with HTTP 200" can never pass.
 */
const routes = [
  ["/", "home", "Python automation for"],
  ["/services/", "services", "Automation help for teams drowning in manual steps"],
  ["/about/", "about", "I did the operational work before I started automating it"],
  ["/contact/", "contact", "A short message is enough to start"],
  ["/privacy/", "privacy", "Privacy and optional live chat"],
  ["/projects/tradeops/", "project-tradeops", "Scattered bid pages become one reviewable report"],
  ["/projects/ats-copilot/", "project-ats-copilot", "Application help that reads the right tab and never hits Submit"],
  ["/projects/crm-rescue/", "project-crm-rescue", "CRM cleanup where every change can be explained"],
];

/** Copy that must never reappear (removed self-referential/robotic devices). */
const bannedPhrases = [
  /actions hidden from the user/i,
  /verified project releases/i,
  /portfolio release checks/i,
  /Not concepts\. Working systems with receipts/i,
  /AVAILABLE MODULE/,
  /CLIENT_PROTOCOL|TEAM_PROTOCOL/,
  /release:\/\/|artifact:\/\/|pipeline:\/\/|operator:\/\/|channel:\/\/|system:\/\/|service:\/\/|local:\/\//,
  /verified session|RELEASE READY|run release-check/i,
];

/** Private data that must never ship. */
const privacyPatterns = [
  /[A-Za-z0-9._%+-]+@(gmail|yahoo|outlook|hotmail)\.[A-Za-z]{2,}/i,
  /\b(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}\b/,
  /[A-Z]:\\Users\\/i,
];

const socialMetadataRoutes = [
  {
    route: "/",
    file: "index.html",
    browserTitle: "Kori Stroud | Operations Automation Developer",
    canonical: "https://kori.tradeopsdata.com/",
    title: "Kori Stroud | Operations Automation Developer",
    description: "Practical Python automation, browser tools, and internal software for repetitive operational work.",
    image: "https://kori.tradeopsdata.com/social/home.png",
  },
  {
    route: "/projects/crm-rescue/",
    file: "projects/crm-rescue/index.html",
    browserTitle: "CRM Rescue case study | Kori Stroud",
    canonical: "https://kori.tradeopsdata.com/projects/crm-rescue/",
    title: "CRM Rescue | Reviewable CRM Cleanup",
    description: "Map, validate, review duplicates, and export clean CRM data locally—with every merge decided by a person.",
    image: "https://kori.tradeopsdata.com/social/crm-rescue.png",
  },
  {
    route: "/projects/ats-copilot/",
    file: "projects/ats-copilot/index.html",
    browserTitle: "ATS Copilot case study | Kori Stroud",
    canonical: "https://kori.tradeopsdata.com/projects/ats-copilot/",
    title: "ATS Copilot | Safer Job-Application Assistance",
    description: "Scan the chosen job page and fill recognized safe fields while sensitive answers and Submit stay manual.",
    image: "https://kori.tradeopsdata.com/social/ats-copilot.png",
  },
  {
    route: "/projects/tradeops/",
    file: "projects/tradeops/index.html",
    browserTitle: "TradeOps Data case study | Kori Stroud",
    canonical: "https://kori.tradeopsdata.com/projects/tradeops/",
    title: "TradeOps Data | Reviewable Public-Bid Research",
    description: "A provenance-aware Python pipeline for deduplicating public bid research and holding unclear source rights for review.",
    image: "https://kori.tradeopsdata.com/social/tradeops.png",
  },
  {
    route: "/services/",
    file: "services/index.html",
    browserTitle: "Services | Kori Stroud",
    canonical: "https://kori.tradeopsdata.com/services/",
    title: "Automation Fix Sprint | Kori Stroud",
    description: "A fixed-scope $350–$750 sprint for one repetitive spreadsheet, browser, CSV, or reporting workflow.",
    image: "https://kori.tradeopsdata.com/social/services.png",
  },
];

function tagAttribute(tag, attribute) {
  return tag.match(new RegExp(`\\s${attribute}=["']([^"']*)["']`, "i"))?.[1];
}

function metaContent(html, attribute, value) {
  const matches = [...html.matchAll(/<meta\b[^>]*>/gi)].filter(
    ([tag]) => tagAttribute(tag, attribute) === value,
  );
  assert.equal(matches.length, 1, `expected one ${attribute}=${value} meta tag`);
  return tagAttribute(matches[0][0], "content");
}

function assertSocialMetadata(html, expected) {
  assert.equal(html.match(/<title>(.*?)<\/title>/i)?.[1], expected.browserTitle);
  assert.equal(metaContent(html, "property", "og:url"), expected.canonical);
  assert.equal(metaContent(html, "property", "og:title"), expected.title);
  assert.equal(metaContent(html, "property", "og:description"), expected.description);
  assert.equal(metaContent(html, "property", "og:image"), expected.image);
  assert.equal(metaContent(html, "property", "og:image:width"), "1200");
  assert.equal(metaContent(html, "property", "og:image:height"), "630");
  assert.equal(metaContent(html, "name", "twitter:title"), expected.title);
  assert.equal(metaContent(html, "name", "twitter:description"), expected.description);
  assert.equal(metaContent(html, "name", "twitter:image"), expected.image);
}

function assertCommonDocumentRules(html, route) {
  assert.match(html, /Skip to main content/);
  assert.match(html, /Kori Stroud/);
  assert.equal((html.match(/<main\b/gi) ?? []).length, 1, `expected one main on ${route}`);
  assert.equal((html.match(/<h1\b/gi) ?? []).length, 1, `expected one h1 on ${route}`);
  assert.doesNotMatch(html, /tabindex=["'][1-9]/i, `positive tabindex on ${route}`);
  assert.doesNotMatch(html, /<a\b[^>]*href=["']\s*["']/i, `empty link href on ${route}`);
  for (const image of html.matchAll(/<img\b[^>]*>/gi)) {
    assert.match(image[0], /\salt=["'][^"']+["']/i, `image missing descriptive alt text on ${route}`);
  }
  const ids = [...html.matchAll(/\sid=["']([^"']+)["']/gi)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length, `duplicate id found on ${route}`);
  for (const pattern of bannedPhrases) {
    assert.doesNotMatch(html, pattern, `banned phrase ${pattern} on ${route}`);
  }
  for (const pattern of privacyPatterns) {
    assert.doesNotMatch(html, pattern, `private data ${pattern} on ${route}`);
  }
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
}

test("privacy patterns catch only synthetic test fixtures", () => {
  const fixtures = [
    ["private.user", "gmail.com"].join("@"),
    ["212", "555", "0199"].join("-"),
    ["C:", "Users", "Example", "private.csv"].join("\\"),
  ];

  for (const [index, fixture] of fixtures.entries()) {
    assert.match(fixture, privacyPatterns[index]);
  }
});

/**
 * Internal links must use the canonical trailing-slash form (or a hash form
 * rooted at a canonical path). A slashless internal page link is exactly the
 * defect that made /services depend on server fallback behavior.
 */
function assertCanonicalInternalLinks(html, route) {
  const allowedExact = new Set(["/", "/#work", "/#method", "/services/#starter-sprint"]);
  for (const match of html.matchAll(/<a\b[^>]*href=["'](\/[^"']*)["']/gi)) {
    const href = match[1];
    if (allowedExact.has(href)) continue;
    if (/\.(png|svg|xml|txt|ico|webp|pdf)$/i.test(href)) continue;
    assert.match(
      href,
      /^\/(?:[a-z0-9-]+\/)*(?:#[a-z0-9-]+)?$/i,
      `non-canonical internal link "${href}" on ${route}`,
    );
    assert.doesNotMatch(
      href,
      /^\/(?:[a-z0-9-]+\/)*[a-z0-9-]+(?:#|$)/i,
      `internal link missing trailing slash: "${href}" on ${route}`,
    );
  }
}

for (const [route, marker, heading] of routes) {
  test(`server-renders ${route} with its own identity`, async () => {
    const response = await render(route);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
    const html = await response.text();
    const visibleText = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ");
    assert.match(visibleText, new RegExp(heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(html, new RegExp(`data-route=["']${marker}["']`), `missing route marker on ${route}`);
    assertCommonDocumentRules(html, route);
    assertCanonicalInternalLinks(html, route);
  });
}

test("home has no self-test metric strip and no portfolio self-verification theater", async () => {
  const response = await render("/");
  const html = await response.text();
  assert.doesNotMatch(html, /proof-strip/);
  assert.doesNotMatch(html, /12\s*\/\s*12/);
  // The hero demo replays the real CRM Rescue demo instead.
  assert.match(html, /How one of my tools handles a cleanup run/);
  assert.match(html, /24 rows arrive from three messy sample CSV exports/);
  assert.match(html, /22 clean records leave with a full audit trail/);
  assert.match(html, /Replay/);
  // Deterministic project demos remain.
  assert.match(html, /Deterministic TradeOps record flow demonstration/);
  assert.match(html, /Interactive synthetic ATS Copilot demonstration/);
  assert.match(html, /Inspect → Automate → Verify/);
});

test("brand mark contains no decorative slash", async () => {
  const response = await render("/");
  const html = await response.text();
  const brandMark = html.match(/<span class="brand-mark"[^>]*>(.*?)<\/span>/s);
  assert.ok(brandMark, "brand mark missing");
  assert.equal(brandMark[1].replace(/<[^>]*>/g, "").trim(), "K");
  assert.doesNotMatch(brandMark[1], /\//);
});

test("home exposes all required public routes with canonical hrefs", async () => {
  const response = await render("/");
  const html = await response.text();
  for (const href of [
    "/projects/tradeops/",
    "/projects/ats-copilot/",
    "/projects/crm-rescue/",
    "/services/",
    "/about/",
    "/contact/",
    "/services/#starter-sprint",
  ]) {
    assert.match(html, new RegExp(`href=["']${href.replace(/[/#]/g, "\\$&")}["']`), `home must link to ${href}`);
  }
  assert.match(html, /property="og:image"/);
  assert.match(html, /\/social\/home\.png/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /id="work"/);
});

test("services page explains the sprint and lands the anchor", async () => {
  const response = await render("/services/");
  const html = await response.text();
  assert.match(html, /id="starter-sprint"/);
  assert.match(html, /\$350–\$750/);
  assert.match(html, /You bring one workflow/);
  assert.match(html, /You get a working result/);
  assert.match(html, /Opens a pre-addressed email draft/);
  assert.doesNotMatch(html, /system-panel/);
  const css = await readFile(new URL("app/globals.css", root), "utf8");
  assert.match(css, /\.starter-price\s*\{[^}]*white-space:\s*nowrap/s);
  assert.match(css, /\.starter-price\s*\{[^}]*font-variant-numeric:\s*tabular-nums/s);
});

test("contact page offers both intents, copy email, and a labeled mail action", async () => {
  const response = await render("/contact/");
  const html = await response.text();
  assert.match(html, /I have a workflow or project/i);
  assert.match(html, /hiring for a role or contract/i);
  assert.match(html, /mailto:kori@tradeopsdata\.com\?subject=/);
  assert.match(html, /Copy email/);
  assert.match(html, /kori@tradeopsdata\.com/);
  assert.match(html, /https:\/\/github\.com\/KoriStroudDev/);
  assert.match(html, /https:\/\/www\.linkedin\.com\/in\/koristroud\//);
  assert.match(html, /Live chat is optional and loads tawk.to only when you click Chat with Kori/i);
  assert.match(html, /Nothing sends until you hit send/i);
});

test("case studies follow the problem-first structure with verification demoted", async () => {
  for (const route of ["/projects/tradeops/", "/projects/ats-copilot/", "/projects/crm-rescue/"]) {
    const response = await render(route);
    const html = await response.text();
    const problemAt = html.indexOf("What kept going wrong");
    const workflowAt = html.indexOf('id="workflow"');
    const screensAt = html.indexOf('id="screens"');
    const verificationAt = html.indexOf("What I tested");
    assert.ok(problemAt > -1 && workflowAt > problemAt && screensAt > workflowAt && verificationAt > screensAt,
      `case study section order broken on ${route}`);
    assert.match(html, /human-panel/);
    assert.match(html, /Current scope/);
    assert.match(html, /case-local-nav/);
    assert.match(html, /shot-gallery/);
  }
});

test("case studies preserve the deployed clarity update", async () => {
  const crm = await (await render("/projects/crm-rescue/")).text();
  assert.match(crm, /Six steps from raw export to an audit trail/);
  assert.match(crm, /screenshots below show the main screens used at steps 1, 3–4, and 5–6/);
  assert.match(crm, /Three screens across the six-step workflow/);
  assert.match(crm, /Step 1 of 6 — Import and map the CSV/);
  assert.match(crm, /Steps 5–6 of 6 — Review quality flags/);
  assert.match(crm, /single-operator local tool, not a hosted multi-user service/);

  const tradeOps = await (await render("/projects/tradeops/")).text();
  assert.match(tradeOps, /Estimator decisions/);
  assert.match(tradeOps, /What the operator controls/);
  assert.match(tradeOps, /Whether to pursue a bid/);
  assert.match(tradeOps, /Reports remain local until someone chooses to share or import them elsewhere/);
  assert.match(tradeOps, /pipeline is not a universal crawler/);

  const ats = await (await render("/projects/ats-copilot/")).text();
  assert.match(ats, /verified locally and installable from the packaged release/);
  assert.match(ats, /Five views from the packaged release show the journey/);
  assert.match(ats, /7 \+ 3/);
  assert.match(ats, /Available today as a local Chrome extension build/);
  assert.match(ats, /Structured extraction is strongest on supported job pages/);
});

test("case studies link to their exact public source repositories", async () => {
  const sources = [
    ["/projects/crm-rescue/", "https://github.com/KoriStroudDev/crm-rescue"],
    ["/projects/ats-copilot/", "https://github.com/KoriStroudDev/ats-copilot"],
    ["/projects/tradeops/", "https://github.com/KoriStroudDev/tradeops-data-demo"],
  ];

  for (const [route, source] of sources) {
    const html = await (await render(route)).text();
    assert.match(html, new RegExp(`href=["']${source.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`));
    assert.match(html, />View source on GitHub<\/a>/);
  }
});

test("required routes expose complete and unique server-rendered social metadata", async () => {
  const titles = new Set();
  const descriptions = new Set();
  const images = new Set();

  for (const expected of socialMetadataRoutes) {
    const html = await (await render(expected.route)).text();
    assertSocialMetadata(html, expected);
    titles.add(expected.title);
    descriptions.add(expected.description);
    images.add(expected.image);
  }

  assert.equal(titles.size, socialMetadataRoutes.length);
  assert.equal(descriptions.size, socialMetadataRoutes.length);
  assert.equal(images.size, socialMetadataRoutes.length);
});

test("static routes preserve the complete route-specific social metadata", async () => {
  for (const expected of socialMetadataRoutes) {
    const html = await readFile(new URL(`dist/client/${expected.file}`, root), "utf8");
    assertSocialMetadata(html, expected);
  }
});

test("social cards are deterministic focused 1200 by 630 PNGs", async () => {
  const first = await mkdtemp(join(tmpdir(), "kori-social-a-"));
  const second = await mkdtemp(join(tmpdir(), "kori-social-b-"));

  try {
    const firstResults = await generateSocialCards({ outputDirectory: first });
    const secondResults = await generateSocialCards({ outputDirectory: second });
    assert.equal(firstResults.length, socialCards.length);
    assert.equal(secondResults.length, socialCards.length);

    for (const card of socialCards) {
      const firstPath = join(first, card.file);
      const secondPath = join(second, card.file);
      assert.deepEqual(await readFile(firstPath), await readFile(secondPath), `${card.file} is not deterministic`);

      const metadata = await sharp(firstPath).metadata();
      assert.equal(metadata.format, "png");
      assert.equal(metadata.width, SOCIAL_CARD_WIDTH);
      assert.equal(metadata.height, SOCIAL_CARD_HEIGHT);

      const publicCard = new URL(`public/social/${card.file}`, root);
      await access(publicCard);
      const publicMetadata = await sharp(fileURLToPath(publicCard)).metadata();
      assert.equal(publicMetadata.width, SOCIAL_CARD_WIDTH);
      assert.equal(publicMetadata.height, SOCIAL_CARD_HEIGHT);
    }
  } finally {
    await Promise.all([
      rm(first, { recursive: true, force: true }),
      rm(second, { recursive: true, force: true }),
    ]);
  }
});

test("ATS case study uses the recaptured extension evidence", async () => {
  const response = await render("/projects/ats-copilot/");
  const html = await response.text();
  for (const src of [
    "/projects/ats-copilot/fixture-before.png",
    "/projects/ats-copilot/panel-scan.png",
    "/projects/ats-copilot/panel-detect.png",
    "/projects/ats-copilot/panel-filled.png",
    "/projects/ats-copilot/fixture-after-fill.png",
  ]) {
    assert.match(html, new RegExp(src.replace(/[/.]/g, "\\$&")), `missing ATS evidence ${src}`);
  }
  assert.doesNotMatch(html, /synthetic-fixture\.png/);
});

test("CRM case study walks three full-width steps with no orphan cell", async () => {
  const response = await render("/projects/crm-rescue/");
  const html = await response.text();
  assert.match(html, /gallery-walkthrough/);
  assert.equal((html.match(/class="shot shot-landscape"/g) ?? []).length, 3);
});

const exportedRoutes = [
  ["index.html", "home", "https://kori.tradeopsdata.com/"],
  ["projects/tradeops/index.html", "project-tradeops", "https://kori.tradeopsdata.com/projects/tradeops/"],
  ["projects/ats-copilot/index.html", "project-ats-copilot", "https://kori.tradeopsdata.com/projects/ats-copilot/"],
  ["projects/crm-rescue/index.html", "project-crm-rescue", "https://kori.tradeopsdata.com/projects/crm-rescue/"],
  ["services/index.html", "services", "https://kori.tradeopsdata.com/services/"],
  ["about/index.html", "about", "https://kori.tradeopsdata.com/about/"],
  ["contact/index.html", "contact", "https://kori.tradeopsdata.com/contact/"],
];

test("static export contains every route with matching identity and canonical URL", async () => {
  for (const [path, marker, canonical] of exportedRoutes) {
    const html = await readFile(new URL(`dist/client/${path}`, root), "utf8");
    assert.match(html, new RegExp(`data-route=["']${marker}["']`), `${path} must be the ${marker} page`);
    if (marker !== "home") {
      assert.doesNotMatch(html, /data-route=["']home["']/, `${path} must not contain homepage content`);
    }
    assert.match(html, new RegExp(`rel=["']canonical["'] href=["']${canonical.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`));
    assert.doesNotMatch(html, /http:\/\/localhost|preview boundary/i);
    assertCanonicalInternalLinks(html, path);
  }

  const notFound = await readFile(new URL("dist/client/404.html", root), "utf8");
  assert.match(notFound, /data-route=["']not-found["']/);
  assert.match(notFound, /That page doesn/);

  const robots = await readFile(new URL("dist/client/robots.txt", root), "utf8");
  const sitemap = await readFile(new URL("dist/client/sitemap.xml", root), "utf8");
  assert.match(robots, /https:\/\/kori\.tradeopsdata\.com\/sitemap\.xml/);
  assert.match(sitemap, /https:\/\/kori\.tradeopsdata\.com\/contact\//);
});

test("static export ships the client-navigation payloads for both URL forms", async () => {
  for (const rsc of [
    "index.rsc",
    "services.rsc",
    "about.rsc",
    "contact.rsc",
    "projects/tradeops.rsc",
    "projects/ats-copilot.rsc",
    "projects/crm-rescue.rsc",
  ]) {
    await access(new URL(`dist/client/${rsc}`, root));
  }
});

test("every referenced project screenshot exists in the export", async () => {
  const clientDir = new URL("dist/client/", root);
  for (const [path] of exportedRoutes) {
    const html = await readFile(new URL(path, clientDir), "utf8");
    for (const match of html.matchAll(/src=["'](\/projects\/[^"']+\.png)["']/g)) {
      await access(new URL(match[1].slice(1), clientDir));
    }
  }
});

test("anchors clear the sticky header", async () => {
  const css = await readFile(new URL("app/globals.css", root), "utf8");
  assert.match(css, /scroll-margin-top/);
  const home = await readFile(new URL("dist/client/index.html", root), "utf8");
  assert.match(home, /id="work"/);
  const services = await readFile(new URL("dist/client/services/index.html", root), "utf8");
  assert.match(services, /id="starter-sprint"/);
});

test("styling keeps responsive and reduced-motion fallbacks", async () => {
  const css = await readFile(new URL("app/globals.css", root), "utf8");
  assert.match(css, /@media \(max-width: 640px\)/);
  assert.match(css, /@media \(max-width: 760px\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /animation:\s*none !important/);
  // Type floors: no sub-12px font sizes in the stylesheet.
  for (const match of css.matchAll(/font-size:\s*0?\.([0-9]+)rem/g)) {
    const value = Number(`0.${match[1]}`);
    assert.ok(value >= 0.75, `font-size ${value}rem is below the 12px floor`);
  }
});

test("removed starter surfaces and heavy dependencies stay removed", async () => {
  const packageJson = await readFile(new URL("package.json", root), "utf8");
  assert.doesNotMatch(packageJson, /react-loading-skeleton|drizzle|framer-motion/);
  await assert.rejects(access(new URL("app/_sites-preview", root)));
  await assert.rejects(access(new URL("app/components/ReleaseTerminal.tsx", root)));
  await assert.rejects(access(new URL("app/components/SystemPanel.tsx", root)));
});

test("exported assets contain no private runtime data", async () => {
  const clientDir = new URL("dist/client/", root);
  async function* walk(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const path = join(entry.parentPath ?? entry.path ?? dir.pathname, entry.name);
      if (entry.isDirectory()) yield* walk(path);
      else yield path;
    }
  }
  for await (const file of walk(clientDir.pathname.replace(/^\/(?=[A-Za-z]:)/, ""))) {
    if (!/\.(html|js|css|txt|xml|json|rsc)$/i.test(file)) continue;
    const content = await readFile(file, "utf8");
    for (const pattern of privacyPatterns) {
      assert.doesNotMatch(content, pattern, `private data ${pattern} in ${file}`);
    }
  }
});

test("homepage offers recruiter and business paths after refresh", async () => {
  const response = await render("/");
  const html = await response.text();
  assert.match(html, /Recruiter\? Request my résumé/);
  assert.match(html, /Business owner\? Start with a small fix/);
  assert.match(html, /mailto:kori@tradeopsdata\.com\?subject=R/);
  assert.match(html, /Copy email/);
  assert.match(html, /Python automation for/);
  assert.match(html, /kori@tradeopsdata\.com/);
});

test("contact page lets recruiters request a résumé", async () => {
  const response = await render("/contact/");
  const html = await response.text();
  assert.match(html, /Recruiter or hiring manager\?/);
  assert.match(html, /Request résumé/);
});

// Optional live chat is visible on every route, but the third-party widget
// is deliberately NOT embedded or loaded by the static HTML before interaction.
test("site exposes click-to-load live chat with an email fallback and privacy page", async () => {
  for (const route of ["/", "/contact/", "/privacy/"]) {
    const html = await (await render(route)).text();
    assert.match(html, /Chat with Kori/);
    assert.match(html, /Opens third-party chat on click/);
    assert.ok(!html.includes('src="https://embed.tawk.to/'), "Chat script must not load before click");
  }
  const privacy = await (await render("/privacy/")).text();
  assert.match(privacy, /data-route=["']privacy["']/);
  assert.match(privacy, /tawk.to privacy policy/);
  assert.match(privacy, /kori@tradeopsdata.com/);
});
