const productionUrl = "https://kori.tradeopsdata.com";

export const site = {
  name: "Kori Stroud",
  shortName: "Kori",
  title: "Operations Automation Developer",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? productionUrl,
  email: "kori@tradeopsdata.com",
  github: "https://github.com/KoriStroudDev",
  linkedin: "https://www.linkedin.com/in/koristroud/",
};

export function emailHref(subject: string, body?: string): string {
  const params = new URLSearchParams({ subject });
  if (body) params.set("body", body);
  return `mailto:${site.email}?${params.toString().replace(/\+/g, "%20")}`;
}
