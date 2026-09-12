import Link from "next/link";
import { ContactIcon } from "@/components/ContactIcons";
import { contactLinks, contactNote, secondaryContactLinks, slackLink } from "@/data/portfolio";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#050a0e] px-6 py-8 text-[#e8faff] sm:px-12">
      <header className="flex items-center justify-between border-b border-[#00f2ff]/20 pb-5 font-mono text-[10px] tracking-[0.22em] text-white/40 uppercase">
        <Link href="/" className="text-white/65 transition-colors hover:text-[#00f2ff]">← Back to menu</Link>
        <span>[ contact / open channel ]</span>
      </header>
      <section className="mx-auto flex min-h-[75vh] max-w-4xl flex-col items-center justify-center text-center">
        <p className="font-mono text-[10px] tracking-[0.35em] text-[#00f2ff]/70 uppercase">[ transmission ready ]</p>
        <h1 className="mt-7 text-5xl font-normal tracking-[0.14em] text-white uppercase sm:text-8xl">Contact Me</h1>

        <ul className="mt-12 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
          {contactLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer"
                className="flex items-center gap-4 border border-[#00f2ff]/25 bg-[#00f2ff]/[0.03] px-5 py-4 font-mono text-[11px] tracking-[0.2em] text-white/75 uppercase transition-colors hover:border-[#00f2ff]/70 hover:bg-[#00f2ff]/10 hover:text-[#00f2ff]"
              >
                <ContactIcon name={link.icon} />
                <span className="flex flex-1 flex-col items-start gap-0.5 text-left">
                  <span>{link.label}</span>
                  <span className="text-[9px] tracking-[0.12em] text-white/35 normal-case">{link.value}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <ul className="mt-6 flex flex-wrap items-center justify-center gap-5">
          {secondaryContactLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-white/50 uppercase transition-colors hover:text-[#00f2ff]"
              >
                <ContactIcon name={link.icon} />
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={slackLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-white/50 uppercase transition-colors hover:text-[#00f2ff]"
            >
              <ContactIcon name="slack" />
              Slack
            </a>
          </li>
        </ul>

        <a
          href="/resume.pdf"
          download
          className="mt-10 flex items-center gap-3 border border-[#ffb700]/40 bg-[#ffb700]/[0.04] px-7 py-3.5 font-mono text-[11px] tracking-[0.22em] text-[#ffb700] uppercase transition-colors hover:border-[#ffb700] hover:bg-[#ffb700]/10"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 3v12" />
            <path d="m7 10 5 5 5-5" />
            <path d="M5 21h14" />
          </svg>
          Download my resume
        </a>

        <p className="mt-8 font-mono text-[10px] tracking-[0.18em] text-white/30">{contactNote}</p>
        <span className="mt-10 h-px w-32 bg-[#00f2ff]/60 shadow-[0_0_18px_#00f2ff]" />
      </section>
    </main>
  );
}
