import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV, SITE } from "@/data/site";
import { cn } from "@/lib/utils";

function Mark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative grid shrink-0 place-items-center overflow-hidden rounded-[1.05rem] bg-[image:var(--gradient-brand)] text-primary-foreground shadow-[var(--shadow-glow)] ring-1 ring-white/25",
        className,
      )}
    >
      <span
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_55%)]"
        aria-hidden="true"
      />
      <svg viewBox="0 0 24 24" className="relative h-5 w-5" fill="none" aria-hidden="true">
        <path
          d="M12 3.2 19 6v5.4c0 4.2-2.8 7.6-7 9.4-4.2-1.8-7-5.2-7-9.4V6l7-2.8Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M9 12.2 11.2 14.4 15.4 10"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function Logo({ onClick, compact }: { onClick?: () => void; compact?: boolean }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className="group flex min-w-0 items-center gap-3"
      aria-label="One Tech Nations home"
    >
      <Mark
        className={cn(
          "transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:rotate-3",
          compact ? "h-10 w-10" : "h-11 w-11",
        )}
      />
      <span className="flex min-w-0 flex-col leading-none">
        <span className="font-display truncate text-[1.02rem] font-semibold tracking-tight">
          One Tech Nations
        </span>
        <span className="mt-1.5 hidden items-center gap-1.5 text-[0.62rem] tracking-[0.2em] text-muted-foreground uppercase sm:inline-flex">
          <span className="h-1 w-1 rounded-full bg-[image:var(--gradient-brand)]" />
          AI · Cyber · Skills
        </span>
      </span>
    </Link>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
          scrolled ? "py-2.5" : "py-4 sm:py-5",
        )}
      >
        <div
          className={cn(
            "mx-auto w-full px-3 transition-all duration-500 sm:px-6",
            scrolled ? "max-w-6xl" : "max-w-7xl",
          )}
        >
          <div
            className={cn(
              "relative grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 overflow-hidden rounded-[1.65rem] px-3 py-2.5 transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] sm:gap-4 sm:rounded-full sm:px-4 lg:grid-cols-[auto_1fr_auto]",
              scrolled
                ? "border border-border/80 bg-card/92 shadow-lift backdrop-blur-2xl"
                : "border border-white/50 bg-card/65 shadow-soft backdrop-blur-xl ring-1 ring-primary/10",
            )}
          >
            <div
              className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
              aria-hidden="true"
            />
            <div
              className={cn(
                "pointer-events-none absolute -top-16 left-1/2 h-28 w-56 -translate-x-1/2 rounded-full bg-[image:var(--gradient-brand)] blur-3xl transition-opacity duration-500",
                scrolled ? "opacity-20" : "opacity-30",
              )}
              aria-hidden="true"
            />

            <Logo compact={scrolled} />

            <nav className="relative hidden justify-center lg:flex">
              <div className="relative flex items-center gap-0.5 rounded-full border border-border/60 bg-background/55 p-1 shadow-inner backdrop-blur-md">
                {NAV.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    activeOptions={{ exact: item.to === "/" }}
                    className="group relative rounded-full px-4 py-2 text-[0.88rem] font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground"
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={cn(
                            "absolute inset-0 rounded-full transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
                            isActive
                              ? "bg-[image:var(--gradient-brand)] opacity-100 shadow-soft"
                              : "bg-accent/0 opacity-0 group-hover:bg-accent/80 group-hover:opacity-100",
                          )}
                        />
                        <span
                          className={cn(
                            "relative transition-colors duration-300",
                            isActive && "font-semibold text-primary-foreground",
                          )}
                        >
                          {item.label}
                        </span>
                      </>
                    )}
                  </Link>
                ))}
              </div>
            </nav>

            <div className="relative flex items-center gap-2">
              <a
                href="tel:+12404228488"
                className="hidden items-center gap-2 rounded-full border border-border/70 bg-background/50 px-3.5 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:border-primary/35 hover:text-primary xl:inline-flex"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-accent text-primary">
                  <Phone className="h-3.5 w-3.5" />
                </span>
                {SITE.phone}
              </a>
              <Button
                asChild
                variant="hero"
                size="sm"
                className="hidden rounded-full px-4 shadow-[var(--shadow-glow)] sm:inline-flex"
              >
                <Link to="/contact">
                  Book a call
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                aria-expanded={open}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border/80 bg-background/70 text-foreground transition-all duration-300 hover:border-primary/30 hover:bg-accent lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

    
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-[60] lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <button
          type="button"
          tabIndex={open ? 0 : -1}
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-ink/50 backdrop-blur-sm transition-opacity duration-500",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        <aside
          className={cn(
            "absolute inset-y-0 left-0 flex w-[min(88%,22.5rem)] max-w-sm flex-col overflow-y-auto border-r border-border/80 bg-background/96 shadow-lift backdrop-blur-2xl transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
            open ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="bg-mesh pointer-events-none absolute inset-x-0 top-0 h-72 opacity-80" aria-hidden="true" />
          <div
            className="pointer-events-none absolute -top-10 right-0 h-40 w-40 rounded-full bg-[image:var(--gradient-brand)] opacity-25 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative flex items-center justify-between px-5 pt-5">
            <Logo onClick={() => setOpen(false)} />
            <button
              type="button"
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="relative mx-5 mt-6 flex items-center gap-2 rounded-2xl border border-border/70 bg-card/80 px-3.5 py-3 text-xs text-muted-foreground shadow-soft">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-[image:var(--gradient-brand)] text-primary-foreground">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <div>
              <p className="font-medium text-foreground">Explore One Tech Nations</p>
              <p className="mt-0.5">Training · Labs · Security · AI</p>
            </div>
          </div>

          <nav className="relative mt-6 flex flex-col gap-2 px-5">
            {NAV.map((item, i) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
                className={cn(
                  "group flex items-center justify-between rounded-2xl border border-border/80 bg-card/90 px-5 py-4 transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] data-[status=active]:border-transparent data-[status=active]:bg-[image:var(--gradient-brand)] data-[status=active]:text-primary-foreground data-[status=active]:shadow-soft",
                  open ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0",
                )}
              >
                <span className="font-display text-xl font-semibold tracking-tight">
                  {item.label}
                </span>
                <ArrowUpRight className="h-5 w-5 opacity-70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-data-[status=active]:opacity-100" />
              </Link>
            ))}
          </nav>

          <div className="relative mt-auto space-y-4 px-5 pt-10 pb-[max(2rem,env(safe-area-inset-bottom))]">
            <Button asChild variant="hero" size="xl" className="w-full rounded-2xl">
              <Link to="/contact" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
                Book a call
                <ArrowUpRight />
              </Link>
            </Button>
            <div className="space-y-1.5 rounded-2xl border border-border/70 bg-card/70 px-4 py-3 text-sm text-muted-foreground">
              <a href={`mailto:${SITE.email}`} className="block break-all hover:text-primary">
                {SITE.email}
              </a>
              <a
                href="tel:+12404228488"
                className="inline-flex items-center gap-2 hover:text-primary"
              >
                <Phone className="h-3.5 w-3.5" />
                {SITE.phone}
              </a>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
