export type Project = {
  slug: "tradeops" | "ats-copilot" | "crm-rescue";
  name: string;
  type: string;
  title: string;
  problem: string;
  summary: string;
  demoNote: string;
  image: string;
  imageAlt: string;
  accent: "green" | "blue" | "amber";
};

export const projects: Project[] = [
  {
    slug: "tradeops",
    name: "TradeOps Data",
    type: "Python data pipeline",
    title: "Public bid research, without the tab chaos.",
    problem:
      "Public construction opportunities are scattered across agency pages and portals with inconsistent titles, deadlines, and access rules.",
    summary:
      "TradeOps collects those pages into one reviewable report: every record keeps its source, duplicates are collapsed, and anything with unclear usage rights is held back for review instead of published.",
    demoNote:
      "In the offline demo, five synthetic records become four unique opportunities — one duplicate collapsed, one source held for rights review.",
    image: "/projects/tradeops/overview.png",
    imageAlt:
      "TradeOps demo report listing four synthetic construction opportunities with status columns",
    accent: "green",
  },
  {
    slug: "ats-copilot",
    name: "ATS Copilot",
    type: "Chrome extension",
    title: "Job application help that never touches Submit.",
    problem:
      "Repetitive job applications invite copy-paste errors, and most autofill tools grab the wrong page or push into fields that should stay personal.",
    summary:
      "ATS Copilot reads the job page you choose, compares its keywords against your resume, drafts editable text, and fills only recognized safe fields. Salary, visa, and demographic questions stay manual, and submitting is always your click.",
    demoNote:
      "In the verified browser flow, the extension kept the intended tab even after a decoy tab took focus, filled three safe fields, left three sensitive fields empty, and submitted nothing.",
    image: "/projects/ats-copilot/fixture-after-fill.png",
    imageAlt:
      "Synthetic job application form with safe fields filled by ATS Copilot and sensitive fields left empty",
    accent: "blue",
  },
  {
    slug: "crm-rescue",
    name: "CRM Rescue",
    type: "Local-first internal tool",
    title: "Messy CRM exports, cleaned up in the open.",
    problem:
      "CRM exports fill up with duplicates, missing owners, and inconsistent fields — and most cleanup tools fix them silently, so nobody can explain what changed.",
    summary:
      "CRM Rescue walks an operator through import, column mapping, validation, and duplicate review. Every merge needs an explicit confirmation, every change lands in an audit trail, and the data never leaves the local machine.",
    demoNote:
      "The repeatable demo takes 24 synthetic rows to 22 clean records, with all six duplicate candidates resolved by explicit human decisions.",
    image: "/projects/crm-rescue/duplicate-review.png",
    imageAlt:
      "CRM Rescue duplicate review comparing two synthetic contact records side by side",
    accent: "amber",
  },
];

export const services = [
  {
    number: "01",
    title: "Workflow Automation Assessment and Quick Win",
    description:
      "Map one repetitive process, find the highest-value failure point, and deliver a working fix or an implementation-ready plan.",
  },
  {
    number: "02",
    title: "CRM/Data Cleanup and Operational Reporting",
    description:
      "Turn inconsistent exports into validated, deduplicated data you can review — plus reports you can rerun.",
  },
  {
    number: "03",
    title: "Public-Data Monitoring or Browser Workflow Automation",
    description:
      "Careful collection and browser-assisted workflows that keep sources traceable, permissions minimal, and approvals human.",
  },
];
