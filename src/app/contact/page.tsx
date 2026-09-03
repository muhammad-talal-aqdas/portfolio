import Link from "next/link";

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
        <p className="mt-8 max-w-xl font-mono text-xs leading-8 tracking-[0.14em] text-white/50">This channel is being configured. Check back soon to start a conversation about a project, collaboration, or a good idea.</p>
        <span className="mt-12 h-px w-32 bg-[#00f2ff]/60 shadow-[0_0_18px_#00f2ff]" />
      </section>
    </main>
  );
}
