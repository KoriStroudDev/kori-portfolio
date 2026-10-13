import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../site";

export const metadata: Metadata = {
  title: "Privacy and chat",
  description: "How the optional tawk.to chat on Kori Stroud's portfolio works and what data it may process.",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <main data-route="privacy">
      <section className="page-hero">
        <div className="shell page-hero-inner">
          <p className="eyebrow">Privacy</p>
          <h1>Privacy and optional live chat</h1>
          <p className="lede">You can browse this portfolio without opening live chat. Email remains available as an alternative.</p>
        </div>
      </section>
      <section className="section shell">
        <div className="prose">
          <h2>How chat works</h2>
          <p>The site does not load the third-party tawk.to chat script until you press the Chat with Kori button. Once opened, the service can process your message and technical information such as your IP address, browser and device details. It may also use cookies and browser storage to support chat sessions.</p>
          <p>Chat conversations are handled by tawk.to and can be viewed and replied to by the site&apos;s operator. Do not share passwords, account numbers, or sensitive personal documents through the chat.</p>
          <h2>Other contact choices</h2>
          <p>There is no first-party contact form or first-party analytics service. You can email <a href={`mailto:${site.email}`}>{site.email}</a> without activating the chat widget. Sending email uses your chosen mail service.</p>
          <h2>Third-party information</h2>
          <p>Read the <a href="https://www.tawk.to/privacy-policy/" target="_blank" rel="noopener noreferrer">tawk.to privacy policy</a> for its data practices. Questions about this site&apos;s contact choices can be sent to the email above.</p>
          <p><Link href="/contact/">Return to contact options →</Link></p>
        </div>
      </section>
    </main>
  );
}
