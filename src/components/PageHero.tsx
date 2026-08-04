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
    <section className="hero-dark relative overflow-hidden pt-28 pb-14 sm:pt-36 sm:pb-20">
      <div className="bg-hero-mesh pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="glow-orb -top-32 left-[-12%] h-[28rem] w-[28rem] opacity-40"
        aria-hidden="true"
      />
      <div
        className="glow-orb-signal right-[-8%] top-[20%] h-[20rem] w-[20rem] [animation-delay:2s]"
        aria-hidden="true"
      />
      <div
        className="grid-lines-hero pointer-events-none absolute inset-0 opacity-45 [mask-image:radial-gradient(70%_60%_at_50%_25%,black,transparent)]"
        aria-hidden="true"
      />
      <div className="noise-overlay" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="animate-rise flex max-w-4xl flex-col items-start gap-5">
          <p className="text-[0.7rem] font-semibold tracking-[0.2em] text-[var(--hero-signal)] uppercase">
            {eyebrow}
          </p>
          <h1 className="display-title text-[2.15rem] text-balance text-[var(--hero-fg)] sm:text-5xl md:text-6xl lg:text-[3.5rem] [&_.text-gradient]:bg-[image:var(--gradient-signal)] [&_.text-gradient]:bg-clip-text [&_.text-gradient]:text-transparent">
            {title}
          </h1>
          {subtitle ? (
            <BlurText
              text={subtitle}
              delay={70}
              animateBy="words"
              direction="top"
              className="max-w-2xl text-base leading-relaxed text-[var(--hero-muted)] sm:text-xl"
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
