import Link from "next/link";
import { contactLinks, contactNote, secondaryContactLinks } from "@/data/portfolio";

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
                className="flex items-center justify-between border border-[#00f2ff]/25 bg-[#00f2ff]/[0.03] px-5 py-4 font-mono text-[11px] tracking-[0.2em] text-white/75 uppercase transition-colors hover:border-[#00f2ff]/70 hover:bg-[#00f2ff]/10 hover:text-[#00f2ff]"
              >
                <span>{link.label}</span>
                <span className="text-[9px] tracking-[0.12em] text-white/35 normal-case">{link.value}</span>
              </a>
            </li>
          ))}
        </ul>

        <ul className="mt-6 flex flex-wrap items-center justify-center gap-4">
          {secondaryContactLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[10px] tracking-[0.22em] text-white/40 uppercase transition-colors hover:text-[#00f2ff]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-10 font-mono text-[10px] tracking-[0.18em] text-white/30">{contactNote}</p>
        <span className="mt-12 h-px w-32 bg-[#00f2ff]/60 shadow-[0_0_18px_#00f2ff]" />
      </section>
    </main>
  );
}
