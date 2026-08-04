import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV, SITE } from "@/data/site";
import { cn } from "@/lib/utils";

function Logo({
  onClick,
  compact,
}: {
  onClick?: () => void;
  compact?: boolean;
}) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className="inline-flex shrink-0 items-center"
      aria-label="One Tech Nations home"
    >
      <img
        src="/logo-tech.png"
        alt="One Tech Nations"
        width={220}
        height={220}
        className={cn(
          "object-contain transition-[height] duration-300",
          compact ? "h-10 w-auto sm:h-11" : "h-12 w-auto sm:h-14",
        )}
      />
    </Link>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  // Dark cinematic heroes on home + inner pages — transparent nav until scroll
  const overDarkHero = !scrolled;

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-black/5 bg-white/85 shadow-[0_8px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        {/* Unique scroll progress accent */}
        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left bg-[image:var(--gradient-signal)] transition-opacity duration-300",
            scrolled ? "opacity-100" : "opacity-0",
          )}
          style={{ transform: `scaleX(${progress})` }}
          aria-hidden="true"
        />

        <div
          className={cn(
            "page-container flex items-center justify-between gap-4 transition-[height] duration-300",
            scrolled ? "h-14 sm:h-16" : "h-16 sm:h-[4.25rem]",
          )}
        >
          <Logo compact={scrolled} />

          <nav className="hidden items-center gap-0.5 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-colors",
                  overDarkHero
                    ? "text-white/75 hover:text-white data-[status=active]:text-white"
                    : "text-muted-foreground hover:text-foreground data-[status=active]:text-foreground",
                  // Unique scrolled active: bottom signal bar instead of underline pill
                  scrolled &&
                    "data-[status=active]:after:absolute data-[status=active]:after:inset-x-3 data-[status=active]:after:bottom-0.5 data-[status=active]:after:h-0.5 data-[status=active]:after:rounded-full data-[status=active]:after:bg-[image:var(--gradient-signal)] data-[status=active]:after:content-['']",
                  !scrolled &&
                    "data-[status=active]:underline data-[status=active]:underline-offset-8",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="tel:+12404228488"
              className={cn(
                "hidden items-center gap-2 text-sm font-medium transition-colors xl:inline-flex",
                overDarkHero
                  ? "text-white/80 hover:text-white"
                  : "text-muted-foreground hover:text-primary",
              )}
            >
              <Phone className="h-3.5 w-3.5" />
              {SITE.phone}
            </a>
            <Button
              asChild
              size="sm"
              className={cn(
                "hidden sm:inline-flex",
                overDarkHero
                  ? "border border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
                  : scrolled
                    ? "bg-ink text-ink-foreground hover:bg-ink/90"
                    : "",
              )}
              variant={overDarkHero ? "outline" : scrolled ? "default" : "default"}
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
              className={cn(
                "grid h-10 w-10 place-items-center lg:hidden",
                overDarkHero ? "text-white" : "text-foreground",
              )}
            >
              <Menu className="h-5 w-5" />
            </button>
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
            "absolute inset-0 bg-ink/50 transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        <aside
          className={cn(
            "absolute inset-y-0 left-0 flex w-[min(88%,22rem)] max-w-sm flex-col overflow-y-auto border-r border-border bg-white transition-transform duration-300",
            open ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <Logo onClick={() => setOpen(false)} />
            <button
              type="button"
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid h-10 w-10 place-items-center text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-col px-2 py-4">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className="border-b border-border/60 px-4 py-3.5 text-base font-medium text-foreground data-[status=active]:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto space-y-3 border-t border-border px-5 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <Button asChild className="w-full">
              <Link to="/contact" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
                Book a call
                <ArrowUpRight />
              </Link>
            </Button>
            <a
              href={`mailto:${SITE.email}`}
              className="block break-all text-sm text-muted-foreground hover:text-primary"
            >
              {SITE.email}
            </a>
            <a
              href="tel:+12404228488"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
            >
              <Phone className="h-3.5 w-3.5" />
              {SITE.phone}
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
