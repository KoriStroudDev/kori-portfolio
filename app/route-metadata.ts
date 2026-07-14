import type { Metadata } from "next";
import { site } from "./site";

type RouteMetadataOptions = {
  browserTitle: string;
  absoluteBrowserTitle?: boolean;
  browserDescription: string;
  canonical: string;
  socialTitle: string;
  socialDescription: string;
  socialImage: string;
  socialImageAlt: string;
};

export function createRouteMetadata({
  browserTitle,
  absoluteBrowserTitle = false,
  browserDescription,
  canonical,
  socialTitle,
  socialDescription,
  socialImage,
  socialImageAlt,
}: RouteMetadataOptions): Metadata {
  const image = {
    url: socialImage,
    width: 1200,
    height: 630,
    alt: socialImageAlt,
  };

  return {
    title: absoluteBrowserTitle ? { absolute: browserTitle } : browserTitle,
    description: browserDescription,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: new URL(canonical, site.url),
      siteName: `${site.name} — ${site.title}`,
      title: socialTitle,
      description: socialDescription,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: [image],
    },
  };
}

export const routeMetadata = {
  home: {
    browserTitle: "Kori Stroud | Operations Automation Developer",
    absoluteBrowserTitle: true,
    browserDescription:
      "Practical Python automation, browser tools, and internal software for repetitive operational work. Available for freelance projects, contract work, and full-time roles.",
    canonical: "/",
    socialTitle: "Kori Stroud | Operations Automation Developer",
    socialDescription:
      "Practical Python automation, browser tools, and internal software for repetitive operational work.",
    socialImage: "/social/home.png",
    socialImageAlt: "Kori Stroud operations automation portfolio preview",
  },
  crmRescue: {
    browserTitle: "CRM Rescue case study",
    browserDescription:
      "A local-first internal tool that walks an operator through CRM export cleanup — import, mapping, validation, duplicate review, and audited exports, with every merge a human decision.",
    canonical: "/projects/crm-rescue/",
    socialTitle: "CRM Rescue | Reviewable CRM Cleanup",
    socialDescription:
      "Map, validate, review duplicates, and export clean CRM data locally—with every merge decided by a person.",
    socialImage: "/social/crm-rescue.png",
    socialImageAlt: "CRM Rescue duplicate review interface",
  },
  atsCopilot: {
    browserTitle: "ATS Copilot case study",
    browserDescription:
      "A Chrome extension that helps with job applications — scanning the page you choose, comparing keywords, and filling only safe fields. Submitting always stays yours.",
    canonical: "/projects/ats-copilot/",
    socialTitle: "ATS Copilot | Safer Job-Application Assistance",
    socialDescription:
      "Scan the chosen job page and fill recognized safe fields while sensitive answers and Submit stay manual.",
    socialImage: "/social/ats-copilot.png",
    socialImageAlt: "ATS Copilot safe-field review interface",
  },
  tradeOps: {
    browserTitle: "TradeOps Data case study",
    browserDescription:
      "A Python pipeline that turns scattered public construction bid pages into one reviewable report — with provenance, duplicate prevention, and source-rights review built in.",
    canonical: "/projects/tradeops/",
    socialTitle: "TradeOps Data | Reviewable Public-Bid Research",
    socialDescription:
      "A provenance-aware Python pipeline for deduplicating public bid research and holding unclear source rights for review.",
    socialImage: "/social/tradeops.png",
    socialImageAlt: "TradeOps Data source-rights review interface",
  },
  services: {
    browserTitle: "Services",
    browserDescription:
      "Workflow automation, CRM/data cleanup, and browser workflow services for small operations teams — starting with a fixed-scope $350–$750 sprint.",
    canonical: "/services/",
    socialTitle: "Automation Fix Sprint | Kori Stroud",
    socialDescription:
      "A fixed-scope $350–$750 sprint for one repetitive spreadsheet, browser, CSV, or reporting workflow.",
    socialImage: "/social/services.png",
    socialImageAlt: "Automation Fix Sprint scope, build, and verify workflow",
  },
} satisfies Record<string, RouteMetadataOptions>;
