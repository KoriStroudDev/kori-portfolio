import { createHash } from "node:crypto";
import { mkdir, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

export const SOCIAL_CARD_WIDTH = 1200;
export const SOCIAL_CARD_HEIGHT = 630;

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDirectory, "..");
const defaultOutputDirectory = resolve(projectRoot, "public", "social");

export const socialCards = [
  {
    file: "home.png",
    kicker: "KORI STROUD / PORTFOLIO",
    title: ["Operations", "Automation Developer"],
    titleSize: 49,
    subtitle: ["Python pipelines · browser tools", "Internal software built for review"],
    accent: "#9CFFB0",
    source: "public/projects/crm-rescue/results-audit.png",
    position: "top",
    panelLabel: "CRM RESCUE / AUDIT",
  },
  {
    file: "crm-rescue.png",
    kicker: "LOCAL-FIRST INTERNAL TOOL",
    title: ["CRM Rescue"],
    subtitle: ["Review duplicates explicitly", "Export clean data with an audit trail"],
    accent: "#FFC46B",
    source: "public/projects/crm-rescue/duplicate-review.png",
    position: "centre",
    panelLabel: "DUPLICATE REVIEW",
  },
  {
    file: "ats-copilot.png",
    kicker: "PRIVACY-CONSCIOUS CHROME EXTENSION",
    title: ["ATS Copilot"],
    subtitle: ["Fill recognized safe fields", "Keep sensitive answers and Submit manual"],
    accent: "#73B9FF",
    source: "public/projects/ats-copilot/panel-detect.png",
    position: "top",
    panelLabel: "SAFE-FIELD PLAN",
  },
  {
    file: "tradeops.png",
    kicker: "PROVENANCE-AWARE PYTHON PIPELINE",
    title: ["TradeOps Data"],
    subtitle: ["Deduplicate public-bid research", "Hold unclear source rights for review"],
    accent: "#9CFFB0",
    source: "public/projects/tradeops/rights-review.png",
    position: "centre",
    panelLabel: "SOURCE-RIGHTS REVIEW",
  },
  {
    file: "services.png",
    kicker: "FIXED-SCOPE SERVICE",
    title: ["Automation Fix", "Sprint"],
    subtitle: ["One repetitive workflow", "$350–$750 · scope approved first"],
    accent: "#9CFFB0",
    source: null,
    position: "centre",
    panelLabel: "SCOPE / BUILD / VERIFY",
  },
];

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function textLines(lines, { x, startY, size, lineHeight, weight = 700, fill = "#F3F7F5" }) {
  return lines
    .map(
      (line, index) =>
        `<text x="${x}" y="${startY + index * lineHeight}" fill="${fill}" font-family="Arial, Helvetica, sans-serif" font-size="${size}" font-weight="${weight}">${escapeXml(line)}</text>`,
    )
    .join("");
}

function servicePanel(accent) {
  const stages = [
    ["01", "SCOPE", "Map inputs, risks, and approvals"],
    ["02", "BUILD", "Create the smallest useful fix"],
    ["03", "VERIFY", "Test, document, and hand it over"],
  ];

  return Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="510" height="360" viewBox="0 0 510 360">
      <rect width="510" height="360" rx="18" fill="#0D171F"/>
      <rect x="22" y="20" width="466" height="46" rx="10" fill="#13242D" stroke="#2A424B"/>
      <circle cx="44" cy="43" r="6" fill="${accent}"/>
      <text x="62" y="49" fill="#E7F1EC" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="700">ONE BOUNDED WORKFLOW</text>
      ${stages
        .map(
          ([number, title, detail], index) => `
            <g transform="translate(22 ${87 + index * 82})">
              <rect width="466" height="66" rx="10" fill="#101E27" stroke="#28404A"/>
              <rect x="14" y="13" width="40" height="40" rx="8" fill="#172C31" stroke="${accent}"/>
              <text x="34" y="39" text-anchor="middle" fill="${accent}" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="700">${number}</text>
              <text x="70" y="29" fill="#F3F7F5" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="700">${title}</text>
              <text x="70" y="49" fill="#AFC2BA" font-family="Arial, Helvetica, sans-serif" font-size="13">${detail}</text>
              <path d="M427 33h20m-7-7 7 7-7 7" fill="none" stroke="${accent}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </g>`,
        )
        .join("")}
    </svg>
  `);
}

async function focusedPanel(card) {
  if (!card.source) return servicePanel(card.accent);

  const sourcePath = resolve(projectRoot, card.source);
  const mask = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="510" height="360">
      <rect width="510" height="360" rx="18" fill="white"/>
    </svg>
  `);

  return sharp(sourcePath)
    .resize(510, 360, {
      fit: "cover",
      position: card.position,
      kernel: sharp.kernel.lanczos3,
    })
    .composite([{ input: mask, blend: "dest-in" }])
    .png({ compressionLevel: 9, adaptiveFiltering: false, palette: false })
    .toBuffer();
}

function baseArtwork(card) {
  const titleStart = card.title.length === 1 ? 255 : 218;
  const subtitleStart = card.title.length === 1 ? 338 : 350;
  const titleSize = card.titleSize ?? 58;

  return Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#070B12"/>
          <stop offset="0.68" stop-color="#0A131B"/>
          <stop offset="1" stop-color="#101C24"/>
        </linearGradient>
        <radialGradient id="glow" cx="0.23" cy="0.25" r="0.8">
          <stop offset="0" stop-color="${card.accent}" stop-opacity="0.14"/>
          <stop offset="1" stop-color="${card.accent}" stop-opacity="0"/>
        </radialGradient>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="#FFFFFF" stroke-opacity="0.035"/>
        </pattern>
      </defs>
      <rect width="1200" height="630" fill="url(#bg)"/>
      <rect width="1200" height="630" fill="url(#glow)"/>
      <rect width="1200" height="630" fill="url(#grid)"/>
      <rect x="0" y="0" width="12" height="630" fill="${card.accent}"/>
      <rect x="70" y="58" width="48" height="48" rx="10" fill="#111E27" stroke="${card.accent}" stroke-width="2"/>
      <text x="94" y="91" text-anchor="middle" fill="${card.accent}" font-family="Arial, Helvetica, sans-serif" font-size="25" font-weight="800">K</text>
      <text x="134" y="78" fill="#F3F7F5" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700">Kori Stroud</text>
      <text x="134" y="99" fill="#91A69D" font-family="Arial, Helvetica, sans-serif" font-size="13">Operations automation</text>
      <text x="72" y="162" fill="${card.accent}" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="700" letter-spacing="1.7">${escapeXml(card.kicker)}</text>
      ${textLines(card.title, { x: 70, startY: titleStart, size: titleSize, lineHeight: 66, weight: 760 })}
      ${textLines(card.subtitle, { x: 72, startY: subtitleStart, size: 24, lineHeight: 34, weight: 400, fill: "#B8C9C1" })}
      <line x1="72" y1="505" x2="555" y2="505" stroke="#33434B"/>
      <circle cx="80" cy="550" r="5" fill="${card.accent}"/>
      <text x="96" y="556" fill="#DCE8E3" font-family="Arial, Helvetica, sans-serif" font-size="17">kori.tradeopsdata.com</text>
      <rect x="630" y="130" width="540" height="410" rx="24" fill="#081016" stroke="#2E444E" stroke-width="2"/>
      <text x="654" y="120" fill="#8EA49A" font-family="Arial, Helvetica, sans-serif" font-size="13" font-weight="700" letter-spacing="1.4">${escapeXml(card.panelLabel)}</text>
    </svg>
  `);
}

function panelFrame(accent) {
  return Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
      <rect x="645" y="145" width="510" height="360" rx="18" fill="none" stroke="#4E6872" stroke-width="2"/>
      <rect x="663" y="521" width="118" height="3" rx="1.5" fill="${accent}"/>
      <circle cx="1125" cy="522" r="4" fill="${accent}"/>
      <circle cx="1110" cy="522" r="4" fill="#36515B"/>
      <circle cx="1095" cy="522" r="4" fill="#36515B"/>
    </svg>
  `);
}

export async function generateSocialCards({ outputDirectory = defaultOutputDirectory } = {}) {
  await mkdir(outputDirectory, { recursive: true });
  const results = [];

  for (const card of socialCards) {
    const destination = resolve(outputDirectory, card.file);
    const panel = await focusedPanel(card);

    await sharp({
      create: {
        width: SOCIAL_CARD_WIDTH,
        height: SOCIAL_CARD_HEIGHT,
        channels: 4,
        background: "#070B12",
      },
    })
      .composite([
        { input: baseArtwork(card), left: 0, top: 0 },
        { input: panel, left: 645, top: 145 },
        { input: panelFrame(card.accent), left: 0, top: 0 },
      ])
      .png({ compressionLevel: 9, adaptiveFiltering: false, palette: false })
      .toFile(destination);

    const bytes = await readFile(destination);
    results.push({
      file: card.file,
      path: destination,
      sha256: createHash("sha256").update(bytes).digest("hex"),
    });
  }

  return results;
}

const invokedDirectly =
  process.argv[1] && resolve(process.argv[1]).toLowerCase() === fileURLToPath(import.meta.url).toLowerCase();

if (invokedDirectly) {
  const outputArgument = process.argv.find((argument) => argument.startsWith("--output="));
  const outputDirectory = outputArgument
    ? resolve(process.cwd(), outputArgument.slice("--output=".length))
    : defaultOutputDirectory;

  generateSocialCards({ outputDirectory })
    .then((results) => {
      for (const result of results) console.log(`${result.sha256}  ${result.file}`);
    })
    .catch((error) => {
      console.error(error);
      process.exitCode = 1;
    });
}
