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
    <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
      <div className="bg-mesh pointer-events-none absolute inset-0 opacity-80" aria-hidden="true" />
      <div
        className="grid-lines pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(60%_60%_at_50%_30%,black,transparent)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="animate-rise flex flex-col items-start gap-5">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="max-w-4xl text-4xl leading-[1.05] font-semibold text-balance sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">{subtitle}</p>
          ) : null}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-sm text-muted-foreground"
          >
            <Link to="/" className="transition-colors hover:text-primary">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{crumb}</span>
          </nav>
        </div>
      </div>
    </section>
  );
}
