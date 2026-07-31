import { Link } from "@tanstack/react-router";
import {
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ICONS } from "@/components/icon-map";
import { CORE_SERVICES, NAV, SITE, SOCIALS } from "@/data/site";
import { apiPost } from "@/lib/api";
import { cn } from "@/lib/utils";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Footer() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "success">("idle");
  const [message, setMessage] = useState("");

  return (
    <footer className="relative mt-28 pt-20 overflow-hidden border-t border-border bg-surface">
      <div className="bg-halo pointer-events-none absolute inset-x-0 top-0 h-80" aria-hidden="true" />
      <div className="noise-overlay opacity-[0.04]" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        {/* Newsletter band */}
        <div className="-mt-16 overflow-hidden rounded-[2.25rem] bg-ink px-6 py-12 text-ink-foreground shadow-lift ring-1 ring-white/10 sm:px-12 sm:py-16">
          <div className="relative grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center">
            <div
              className="bg-mesh pointer-events-none absolute inset-0 opacity-40"
              aria-hidden="true"
            />
            <div className="glow-orb -left-16 top-0 h-56 w-56 opacity-30" aria-hidden="true" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[0.65rem] font-semibold tracking-[0.18em] uppercase backdrop-blur">
               
                Newsletter
              </span>
              <h2 className="display-title mt-5 text-2xl text-balance sm:text-3xl md:text-4xl">
                Get the practitioner's brief, once a month.
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed opacity-75 sm:text-base">
                Lab drops, cohort openings and field notes on AI and cyber. No noise, unsubscribe
                any time.
              </p>
            </div>

            <form
              className="relative"
              noValidate
              onSubmit={async (e) => {
                e.preventDefault();
                const value = email.trim();
                if (!value) {
                  setState("error");
                  setMessage("Please enter your email address.");
                  return;
                }
                if (!EMAIL_RE.test(value) || value.length > 255) {
                  setState("error");
                  setMessage("That email doesn't look right — check and try again.");
                  return;
                }
                try {
                  await apiPost("/newsletter/subscribe", {
                    email: value,
                    source: "website_footer",
                  });
                  setState("success");
                  setMessage("You're on the list. Look out for the next brief.");
                  setEmail("");
                  toast.success("You're on the list", {
                    description: "We'll send occasional updates — no noise.",
                  });
                } catch (err) {
                  setState("error");
                  setMessage(err instanceof Error ? err.message : "Subscription failed.");
                  toast.error(err instanceof Error ? err.message : "Subscription failed");
                }
              }}
            >
              <div
                className={cn(
                  "flex flex-col gap-2.5 rounded-[1.5rem] border bg-white/5 p-2.5 backdrop-blur transition-colors duration-300 sm:flex-row sm:items-center sm:rounded-full sm:p-2",
                  state === "error" ? "border-destructive/60" : "border-white/15",
                )}
              >
                <div className="relative flex-1">
                  <Mail
                    className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 opacity-60"
                    aria-hidden="true"
                  />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (state !== "idle") {
                        setState("idle");
                        setMessage("");
                      }
                    }}
                    placeholder="you@company.com"
                    aria-label="Email address"
                    aria-invalid={state === "error"}
                    aria-describedby="newsletter-status"
                    className="text-ink-foreground placeholder:text-ink-foreground/45 h-12 rounded-full border-transparent bg-transparent pl-11 shadow-none focus-visible:ring-0"
                  />
                </div>
                <Button
                  type="submit"
                  variant="warm"
                  size="lg"
                  className="h-12 w-full shrink-0 rounded-full px-6 sm:w-auto"
                >
                  Subscribe
                  <ArrowRight />
                </Button>
              </div>
              <p
                id="newsletter-status"
                role="status"
                aria-live="polite"
                className={cn(
                  "mt-3 flex items-start gap-1.5 pl-1 text-xs transition-colors",
                  state === "error"
                    ? "text-destructive"
                    : state === "success"
                      ? "text-teal"
                      : "opacity-55",
                )}
              >
                {state === "error" ? <AlertCircle className="mt-px h-3.5 w-3.5 shrink-0" /> : null}
                {state === "success" ? <CheckCircle2 className="mt-px h-3.5 w-3.5 shrink-0" /> : null}
                {state === "idle" ? "One email a month. No spam, ever. Unsubscribe in a click." : message}
              </p>
            </form>

          </div>
        </div>


        {/* Main grid */}
        <div className="grid gap-12 py-16 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[image:var(--gradient-brand)] text-primary-foreground">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                  <path
                    d="M12 3.2 19 6v5.4c0 4.2-2.8 7.6-7 9.4-4.2-1.8-7-5.2-7-9.4V6l7-2.8Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="font-display text-base font-semibold">{SITE.name}</span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              A hub connecting AI and cybersecurity enthusiasts to collaborate on the future of
              tech. Tech made easy.
            </p>
            <div className="mt-6 flex gap-2.5">
              {SOCIALS.map((s) => {
                const Icon = ICONS[s.icon];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={s.label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.16em] uppercase">Quick links</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="group inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.16em] uppercase">Services</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {CORE_SERVICES.slice(0, 5).map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.16em] uppercase">Contact</h3>
            <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a href={`mailto:${SITE.email}`} className="break-all hover:text-primary">
                  {SITE.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a href="tel:+12404228488" className="hover:text-primary">
                  {SITE.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{SITE.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-border py-7 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} One Tech Nations. All rights reserved.</p>
          <p>Designed by CyberlyUSA</p>
        </div>
      </div>
    </footer>
  );
}
