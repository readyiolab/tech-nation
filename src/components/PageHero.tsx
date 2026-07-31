import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Eyebrow } from "@/components/SectionHeading";
import type { ReactNode } from "react";

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
    <section className="relative overflow-hidden pt-28 pb-12 sm:pt-40 sm:pb-24">
      <div className="bg-mesh pointer-events-none absolute inset-0 opacity-90" aria-hidden="true" />
      <div className="glow-orb -top-24 left-1/4 h-72 w-72" aria-hidden="true" />
      <div
        className="glow-orb right-[8%] bottom-0 h-64 w-64 opacity-15 [animation-delay:2s]"
        aria-hidden="true"
      />
      <div
        className="grid-lines pointer-events-none absolute inset-0 opacity-35 [mask-image:radial-gradient(55%_55%_at_50%_28%,black,transparent)]"
        aria-hidden="true"
      />
      <div className="noise-overlay" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="animate-rise flex flex-col items-start gap-5">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="display-title max-w-4xl text-[2.15rem] text-balance sm:text-5xl md:text-6xl lg:text-[3.75rem]">
            {title}
          </h1>
          {subtitle ? (
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-xl">
              {subtitle}
            </p>
          ) : null}
          <nav
            aria-label="Breadcrumb"
            className="mt-1 flex items-center gap-1.5 rounded-full border border-border/70 bg-card/60 px-3.5 py-1.5 text-sm text-muted-foreground backdrop-blur"
          >
            <Link to="/" className="transition-colors hover:text-primary">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 opacity-60" />
            <span className="font-medium text-foreground">{crumb}</span>
          </nav>
        </div>
      </div>
    </section>
  );
}
