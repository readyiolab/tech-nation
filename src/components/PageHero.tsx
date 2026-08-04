import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import BlurText from "@/components/react-bits/BlurText";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  crumb,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  crumb: string;
}) {
  return (
    <section className="hero-dark relative overflow-hidden pt-24 pb-10 sm:pt-32 sm:pb-16 md:pt-36 md:pb-20">
      <div className="bg-hero-mesh pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="glow-orb -top-32 left-[-12%] hidden h-[28rem] w-[28rem] opacity-40 md:block"
        aria-hidden="true"
      />
      <div
        className="glow-orb-signal top-[20%] right-[-8%] hidden h-[20rem] w-[20rem] md:block [animation-delay:2s]"
        aria-hidden="true"
      />
      <div
        className="grid-lines-hero pointer-events-none absolute inset-0 hidden opacity-45 md:block [mask-image:radial-gradient(70%_60%_at_50%_25%,black,transparent)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-20 right-0 h-40 w-40 rounded-full bg-[var(--hero-signal)] opacity-20 blur-3xl md:hidden"
        aria-hidden="true"
      />
      <div className="noise-overlay hidden md:block" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />

      <div className="page-container relative">
        <div className="animate-rise flex max-w-4xl flex-col items-start gap-4 sm:gap-5">
          <p className="text-[0.7rem] font-semibold tracking-[0.2em] text-[var(--hero-signal)] uppercase">
            {eyebrow}
          </p>
          <h1 className="display-title text-[2rem] leading-[1.12] text-balance text-[var(--hero-fg)] sm:text-[2.5rem] md:text-5xl md:leading-[1.08] lg:text-[3.5rem] [&_.text-gradient]:bg-[image:var(--gradient-signal)] [&_.text-gradient]:bg-clip-text [&_.text-gradient]:text-transparent">
            {title}
          </h1>
          {subtitle ? (
            <BlurText
              text={subtitle}
              delay={70}
              animateBy="words"
              direction="top"
              className="max-w-2xl text-base leading-relaxed text-[var(--hero-muted)] sm:text-lg md:text-xl"
            />
          ) : null}
          <nav
            aria-label="Breadcrumb"
            className="mt-1 flex items-center gap-1.5 text-sm text-[var(--hero-muted)]"
          >
            <Link to="/" className="transition-colors hover:text-[var(--hero-fg)]">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 opacity-60" />
            <span className="font-medium text-[var(--hero-fg)]">{crumb}</span>
          </nav>
        </div>
      </div>
    </section>
  );
}
