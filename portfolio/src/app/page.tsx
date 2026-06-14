"use client";

import { motion, type Variants } from "motion/react";
import Marquee from "@/components/Marquee";

/* ---------------------------------------------------------------- data --- */

const EXPERIENCE = [
  {
    role: "Blockchain Operation Lead",
    org: "Quillhash",
    note: "Campaigns, growth strategy & ecosystem ops",
    href: "https://github.com/Quillhash",
  },
  {
    role: "Chapter Lead",
    org: "CoinDCX",
    note: "Spreading crypto awareness on the ground",
    href: "https://github.com/coindcx-official",
  },
  {
    role: "Contributor",
    org: "Vega Protocol",
    note: "Building the future of decentralized finance",
    href: "https://github.com/vegaprotocol",
  },
  {
    role: "Founder & Lead",
    org: "GDSC — CDGI",
    note: "Building with the next generation of devs",
    href: "https://github.com/google",
  },
];

const PROJECTS = [
  {
    title: "Face-Recognition Voting",
    note: "An advanced voting system secured by facial recognition.",
    tag: "Security",
    href: "#",
  },
  {
    title: "Glance — A Case Study",
    note: "Breaking down the Indian unicorn behind your lock screen.",
    tag: "Writing",
    href: "https://medium.com/@iammohitjain999/glance-at-a-glance-350d4c9ec8b5",
  },
  {
    title: "DevRel Lab",
    note: "Community, content & developer-experience experiments.",
    tag: "Community",
    href: "https://devrellab.com",
  },
];

const SOCIALS = [
  { label: "Twitter", handle: "@MohitX_", href: "https://twitter.com/MohitX_" },
  {
    label: "LinkedIn",
    handle: "/m0hitx",
    href: "https://www.linkedin.com/in/m0hitx/",
  },
  {
    label: "Instagram",
    handle: "@mohitx._",
    href: "https://www.instagram.com/mohitx._/",
  },
  { label: "Website", handle: "devrellab.com", href: "https://devrellab.com" },
];

/* ------------------------------------------------------------ primitives --- */

const reveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.08,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block border-2 border-ink bg-accent-2 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-ink">
      {children}
    </span>
  );
}

/* ----------------------------------------------------------------- page --- */

export default function Home() {
  return (
    <main className="font-mono text-ink">
      {/* ===== NAV ===== */}
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b-2 border-ink bg-paper/90 px-5 py-3 backdrop-blur sm:px-8">
        <a href="#top" className="font-display text-lg font-bold tracking-tight">
          MOHIT<span className="text-accent">.</span>
        </a>
        <nav className="hidden gap-6 text-xs font-bold uppercase tracking-widest sm:flex">
          <a href="#work" className="hover:text-accent">
            Work
          </a>
          <a href="#projects" className="hover:text-accent">
            Projects
          </a>
          <a href="#contact" className="hover:text-accent">
            Contact
          </a>
        </nav>
        <a
          href="https://calendly.com/mohitx/30min"
          target="_blank"
          rel="noreferrer"
          className="border-2 border-ink bg-accent px-3 py-1 text-xs font-bold uppercase tracking-widest text-paper transition-transform hover:-translate-y-0.5"
        >
          Let&apos;s talk
        </a>
      </header>

      {/* ===== HERO ===== */}
      <section
        id="top"
        className="relative flex min-h-screen flex-col justify-center px-5 pt-24 sm:px-8"
      >
        <motion.div
          initial="hidden"
          animate="show"
          variants={reveal}
          className="mb-6"
        >
          <SectionTag>Blockchain × Web3 × DevRel</SectionTag>
        </motion.div>

        <h1 className="font-display font-bold uppercase leading-[0.85] tracking-tighter">
          {["MOHIT", "JAIN"].map((word, i) => (
            <motion.span
              key={word}
              custom={i + 1}
              initial="hidden"
              animate="show"
              variants={reveal}
              className="block text-[18vw] sm:text-[15vw] lg:text-[13rem]"
            >
              {word}
              {i === 1 && <span className="text-accent">/</span>}
            </motion.span>
          ))}
        </h1>

        <motion.p
          custom={4}
          initial="hidden"
          animate="show"
          variants={reveal}
          className="mt-8 max-w-xl text-sm leading-relaxed sm:text-base"
        >
          I foster Web3 communities, host events and make crypto less scary —
          one block at a time. Currently leading blockchain ops at{" "}
          <a
            href="https://github.com/Quillhash"
            className="underline decoration-accent decoration-2 underline-offset-4"
          >
            Quillhash
          </a>
          , based in Indore, India.
        </motion.p>

        <motion.div
          custom={5}
          initial="hidden"
          animate="show"
          variants={reveal}
          className="absolute bottom-6 right-5 text-right text-xs uppercase tracking-widest sm:right-8"
        >
          <span className="block opacity-60">Scroll</span>
          <span aria-hidden className="text-2xl text-accent">
            ↓
          </span>
        </motion.div>
      </section>

      {/* ===== TICKER ===== */}
      <div className="border-y-2 border-ink bg-ink py-4 font-display text-2xl font-bold uppercase tracking-tight text-paper sm:text-4xl">
        <Marquee
          items={[
            "Web3",
            "Communities",
            "DevRel",
            "Blockchain",
            "Events",
            "Product",
            "Content",
          ]}
        />
      </div>

      {/* ===== ABOUT ===== */}
      <section className="grid gap-8 border-b-2 border-ink px-5 py-20 sm:px-8 lg:grid-cols-12">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={reveal}
          className="lg:col-span-4"
        >
          <SectionTag>About</SectionTag>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={reveal}
          custom={1}
          className="lg:col-span-8"
        >
          <p className="font-display text-2xl font-medium leading-snug sm:text-4xl">
            A multitasker, content creator and certified tech geek diving deep
            into <span className="text-accent">Web 3.0</span> — building
            communities, hosting epic events and spreading awareness about the
            decentralized future.
          </p>
        </motion.div>
      </section>

      {/* ===== WORK / EXPERIENCE ===== */}
      <section id="work" className="px-5 py-20 sm:px-8">
        <div className="mb-10 flex items-end justify-between">
          <SectionTag>Experience</SectionTag>
          <span className="hidden font-display text-sm uppercase tracking-widest opacity-50 sm:block">
            ( Selected )
          </span>
        </div>

        <ul className="border-t-2 border-ink">
          {EXPERIENCE.map((job, i) => (
            <motion.li
              key={job.org}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={reveal}
              custom={i}
              className="group border-b-2 border-ink"
            >
              <a
                href={job.href}
                target="_blank"
                rel="noreferrer"
                className="grid items-baseline gap-2 py-6 transition-colors group-hover:bg-ink group-hover:text-paper sm:grid-cols-12 sm:gap-4 sm:px-4"
              >
                <span className="font-display text-xl font-bold sm:col-span-5 sm:text-3xl">
                  {job.org}
                </span>
                <span className="text-xs uppercase tracking-widest sm:col-span-4">
                  {job.role}
                </span>
                <span className="text-xs opacity-70 sm:col-span-3 sm:text-right">
                  {job.note}
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </section>

      {/* ===== TICKER 2 ===== */}
      <div className="border-y-2 border-ink bg-accent py-4 font-display text-2xl font-bold uppercase tracking-tight text-paper sm:text-4xl">
        <Marquee
          reverse
          items={[
            "Let's build it together",
            "Decentralize everything",
            "GM ☀",
          ]}
        />
      </div>

      {/* ===== PROJECTS ===== */}
      <section id="projects" className="px-5 py-20 sm:px-8">
        <div className="mb-10">
          <SectionTag>Projects & Stuff</SectionTag>
        </div>
        <div className="grid gap-px border-2 border-ink bg-ink sm:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={reveal}
              custom={i}
              className="flex min-h-[15rem] flex-col justify-between bg-paper p-6 transition-colors hover:bg-accent-2"
            >
              <span className="self-start border-2 border-ink px-2 py-1 text-[0.65rem] font-bold uppercase tracking-widest">
                {p.tag}
              </span>
              <div>
                <h3 className="font-display text-2xl font-bold leading-tight">
                  {p.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed opacity-70">
                  {p.note}
                </p>
                <span className="mt-4 inline-block text-sm font-bold">
                  View ↗
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section
        id="contact"
        className="border-t-2 border-ink bg-ink px-5 py-24 text-paper sm:px-8"
      >
        <SectionTag>Let&apos;s Connect</SectionTag>
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={reveal}
          className="mt-6 font-display text-[12vw] font-bold uppercase leading-none tracking-tighter lg:text-[9rem]"
        >
          Say <span className="text-accent-2">hello</span>
        </motion.h2>

        <a
          href="https://calendly.com/mohitx/30min"
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-block border-2 border-accent-2 bg-accent-2 px-6 py-3 font-display text-lg font-bold uppercase tracking-tight text-ink transition-transform hover:-translate-y-1"
        >
          Schedule a meet →
        </a>

        <ul className="mt-16 grid gap-px border-2 border-paper/30 sm:grid-cols-4">
          {SOCIALS.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="flex h-full flex-col gap-1 p-5 transition-colors hover:bg-accent hover:text-paper"
              >
                <span className="text-xs uppercase tracking-widest opacity-60">
                  {s.label}
                </span>
                <span className="font-display text-lg font-bold">
                  {s.handle}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="flex flex-col items-center justify-between gap-2 bg-ink px-5 py-6 text-xs uppercase tracking-widest text-paper/60 sm:flex-row sm:px-8">
        <span>© {new Date().getFullYear()} Mohit Jain</span>
        <span>Indore, India — building the decentralized future</span>
      </footer>
    </main>
  );
}
