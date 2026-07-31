import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV, SITE } from "@/data/site";
import { cn } from "@/lib/utils";

function Mark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative grid shrink-0 place-items-center rounded-2xl bg-[image:var(--gradient-brand)] text-primary-foreground shadow-soft",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
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

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className="group flex min-w-0 items-center gap-3"
      aria-label="One Tech Nations home"
    >
      <Mark className="h-10 w-10 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3" />
      <span className="flex min-w-0 flex-col leading-none">
        <span className="font-display truncate text-[0.98rem] font-semibold tracking-tight">
          One Tech Nations
        </span>
        <span className="mt-1 text-[0.62rem] tracking-[0.22em] text-muted-foreground uppercase">
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
          scrolled ? "py-2" : "py-4 sm:py-5",
        )}
      >
        <div
          className={cn(
            "mx-auto w-full px-4 transition-all duration-500 sm:px-6",
            scrolled ? "max-w-6xl" : "max-w-7xl",
          )}
        >
          <div
            className={cn(
              "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-full px-3 py-2.5 transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] sm:px-4 lg:grid-cols-[auto_1fr_auto]",
              scrolled
                ? "border border-border/70 bg-card/85 shadow-soft backdrop-blur-xl"
                : "border border-border/40 bg-card/45 backdrop-blur-md",
            )}
          >

            <Logo />

            <nav className="hidden items-center justify-center gap-0.5 lg:flex">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  className="group relative rounded-full px-4 py-2.5 text-[0.9rem] font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground data-[status=active]:text-foreground"
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={cn(
                          "absolute inset-0 rounded-full bg-accent/70 transition-all duration-400 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
                          isActive
                            ? "scale-100 opacity-100"
                            : "scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-60",
                        )}
                      />
                      <span className="relative">{item.label}</span>
                      <span
                        className={cn(
                          "absolute -bottom-0.5 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-[image:var(--gradient-brand)] transition-all duration-500",
                          isActive ? "w-5" : "w-0",
                        )}
                      />
                    </>
                  )}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href="tel:+12404228488"
                className="hidden items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary xl:inline-flex"
              >
                <Phone className="h-3.5 w-3.5" />
                {SITE.phone}
              </a>
              <Button asChild variant="hero" size="sm" className="hidden rounded-full sm:inline-flex">
                <Link to="/contact">
                  Book a call
                  <ArrowUpRight />
                </Link>
              </Button>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                aria-expanded={open}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border bg-card/80 text-foreground transition-colors hover:bg-accent lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left bg-[image:var(--gradient-brand)] transition-transform duration-150 ease-out motion-reduce:hidden"
          style={{ transform: `scaleX(${progress})` }}
          aria-hidden="true"
        />
      </header>

      {/* Mobile drawer — slides in from the left */}
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
            "absolute inset-0 bg-ink/45 backdrop-blur-sm transition-opacity duration-500",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        <aside
          className={cn(
            "absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col overflow-y-auto border-r border-border bg-background shadow-lift transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
            open ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="bg-mesh pointer-events-none absolute inset-x-0 top-0 h-64 opacity-70" aria-hidden="true" />
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

          <nav className="relative mt-8 flex flex-col gap-2 px-5">
            {NAV.map((item, i) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
                className={cn(
                  "group flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] data-[status=active]:border-primary/40 data-[status=active]:bg-accent/60",
                  open ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0",
                )}
              >
                <span className="font-display text-2xl font-semibold tracking-tight">
                  {item.label}
                </span>
                <ArrowUpRight className="h-5 w-5 text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            ))}
          </nav>

          <div className="relative mt-auto space-y-4 px-5 pt-10 pb-8">
            <Button asChild variant="hero" size="xl" className="w-full rounded-2xl">
              <Link to="/contact" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
                Book a call
                <ArrowUpRight />
              </Link>
            </Button>
            <div className="space-y-1 text-sm text-muted-foreground">
              <a href={`mailto:${SITE.email}`} className="block break-all hover:text-primary">
                {SITE.email}
              </a>
              <a href="tel:+12404228488" className="block hover:text-primary">
                {SITE.phone}
              </a>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
