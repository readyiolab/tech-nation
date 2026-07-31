import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check, Sparkles } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Counter } from "@/components/Counter";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { Eyebrow, SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ICONS } from "@/components/icon-map";
import { CORE_SERVICES, FAQS, METRICS, PROCESS, SERVICE_STORIES } from "@/data/site";
import svcSecurity from "@/assets/svc-security.jpg";
import svcAi from "@/assets/svc-ai.jpg";
import svcLabs from "@/assets/svc-labs.jpg";
import svcConsulting from "@/assets/svc-consulting.jpg";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "IT, AI & Cybersecurity Services | One Tech Nations" },
      {
        name: "description",
        content:
          "Information security services, AI enablement, interactive virtual labs, IT consultation and market analysis — delivered with advanced tooling and tailored strategy.",
      },
      { property: "og:title", content: "Services | One Tech Nations" },
      {
        property: "og:description",
        content:
          "Comprehensive information security, AI and IT advisory services designed to protect and accelerate your business.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Services,
});

const STORY_IMAGES: Record<string, string> = {
  security: svcSecurity,
  ai: svcAi,
  labs: svcLabs,
  consulting: svcConsulting,
};

const REASONS = [
  {
    no: "01",
    title: "Latest technologies",
    body: "We utilize the most advanced and reliable tools to secure your business data and systems.",
  },
  {
    no: "02",
    title: "Unique solutions",
    body: "Our tailored strategies are designed to meet the specific needs of your business.",
  },
  {
    no: "03",
    title: "Powerful strategies",
    body: "We implement robust security measures to ensure maximum protection for your organization.",
  },
  {
    no: "04",
    title: "Timely delivery",
    body: "We deliver on time, meeting your most urgent security needs without cutting corners.",
  },
];

function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Security, AI and IT services <span className="text-gradient">that hold up in practice</span>
          </>
        }
        subtitle="Comprehensive services designed to protect your business from modern threats — advanced technologies, expert consultation and hands-on labs for your team."
        crumb="Services"
      />

      {/* METRICS / COUNTERS */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <Reveal>
          <dl className="relative grid gap-px overflow-hidden rounded-[2.25rem] border border-white/10 bg-ink text-ink-foreground shadow-lift sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-mesh pointer-events-none absolute inset-0 opacity-35" aria-hidden="true" />
            {METRICS.map((m) => (
              <div key={m.label} className="relative bg-ink/80 px-6 py-10 backdrop-blur transition-colors hover:bg-ink/60">
                <dt className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                  <span className="text-white">
                    <Counter value={m.value} suffix={m.suffix} />
                  </span>
                </dt>
                <dd className="mt-3">
                  <span className="block text-sm font-medium">{m.label}</span>
                  <span className="mt-1 block text-xs opacity-70">{m.hint}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* ALTERNATING STORY SECTIONS */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="How we help"
            title="Four ways teams work with us"
            subtitle="Each engagement starts with your reality — the tooling you already own, the gaps you already feel, and the timeline you actually have."
          />
        </Reveal>

        <div className="mt-16 flex flex-col gap-20 sm:gap-28">
          {SERVICE_STORIES.map((s, i) => {
            const flip = i % 2 === 1;
            return (
              <div
                key={s.slug}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <Reveal className={flip ? "lg:order-2" : undefined}>
                  <div className="group relative">
                    <div
                      className="bg-halo pointer-events-none absolute -inset-8 opacity-70"
                      aria-hidden="true"
                    />
                    <div className="relative overflow-hidden rounded-[2rem] border border-border/80 bg-card shadow-lift transition-shadow duration-500 group-hover:shadow-lift">
                      <img
                        src={STORY_IMAGES[s.image]}
                        alt={`${s.title} illustration`}
                        loading="lazy"
                        width={1200}
                        height={912}
                        className="w-full object-cover transition-transform duration-[900ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                      />
                      <span className="media-mask pointer-events-none absolute inset-0" aria-hidden="true" />
                    </div>
                    <span className="glass-panel absolute -bottom-5 left-6 flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold tracking-[0.12em] uppercase shadow-soft">
                      <Sparkles className="h-3.5 w-3.5 text-primary" />
                      {s.kicker}
                    </span>
                  </div>
                </Reveal>

                <Reveal delay={110} className={flip ? "lg:order-1" : undefined}>
                  <div className="flex flex-col items-start gap-5">
                    <Eyebrow>{s.kicker}</Eyebrow>
                    <h3 className="display-title max-w-xl text-3xl text-balance sm:text-4xl">
                      {s.title}
                    </h3>
                    <p className="max-w-xl leading-relaxed text-muted-foreground">{s.body}</p>
                    <ul className="mt-1 grid gap-3">
                      {s.points.map((p) => (
                        <li key={p} className="flex items-start gap-3">
                          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-brand)] text-primary-foreground">
                            <Check className="h-3 w-3" />
                          </span>
                          <span className="text-sm text-muted-foreground">{p}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild variant="hero" size="lg" className="mt-3 rounded-full">
                      <Link to="/services/$slug" params={{ slug: s.slug }}>
                        Explore this service
                        <ArrowRight />
                      </Link>
                    </Button>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </section>

      {/* FULL CATALOGUE */}
      <section className="relative overflow-hidden bg-surface section-pad">
        <div className="bg-halo pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="noise-overlay" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Full catalogue"
              title={
                <>
                  Every service we <span className="text-gradient">offer</span>
                </>
              }
              subtitle="From training and labs to consulting, tech analysis and market research."
            />
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {CORE_SERVICES.map((s, i) => {
              const Icon = ICONS[s.icon];
              return (
                <Reveal key={s.slug} delay={i * 70}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="lift-hover group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border/80 bg-card p-7 shadow-soft"
                  >
                    <span
                      className="bg-mesh pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-60"
                      aria-hidden="true"
                    />
                    <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent text-primary transition-colors duration-300 group-hover:bg-[image:var(--gradient-brand)] group-hover:text-primary-foreground">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="relative mt-6 font-display text-xl font-semibold tracking-tight">{s.title}</h3>
                    <p className="relative mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {s.summary}
                    </p>
                    <span className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      Service details
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title="A simple path from first call to lasting change"
            subtitle="No jargon tax, no surprise scope. Four steps, agreed up front."
          />
        </Reveal>
        <div className="relative mt-14">
          <div
            className="absolute top-[3.25rem] right-0 left-0 hidden h-px bg-border lg:block"
            aria-hidden="true"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={i * 100}>
                <div className="group relative flex h-full flex-col rounded-[1.75rem] border border-border/80 bg-card p-7 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-lift">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-[image:var(--gradient-brand)] font-display text-sm font-semibold text-primary-foreground shadow-soft">
                    {p.step}
                  </span>
                  <h3 className="mt-6 font-display text-lg font-semibold">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="relative overflow-hidden bg-surface py-20 sm:py-28">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Why choose us"
              title="Why teams pick One Tech Nations"
              subtitle="From data protection to compliance management, we cover every aspect of information security so your business operates seamlessly."
            />
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {REASONS.map((r, i) => (
              <Reveal key={r.no} delay={i * 80}>
                <div className="lift-hover h-full rounded-[1.75rem] border border-border/80 bg-card p-7 shadow-soft">
                  <span className="font-display text-3xl font-semibold text-primary/30">
                    {r.no}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold">{r.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Client stories"
            title="What people say after the first cohort"
            subtitle="Practitioners who went from theory to shift-ready."
          />
        </Reveal>
        <div className="mt-14">
          <TestimonialCarousel />
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 sm:pb-28">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                align="left"
                eyebrow="FAQ"
                title="Frequently asked questions"
                subtitle="Still unsure? Our team answers in plain language — no jargon tax."
              />
              <Button asChild variant="hero" size="lg" className="mt-8 rounded-full">
                <Link to="/contact">
                  Ask us anything
                  <ArrowRight />
                </Link>
              </Button>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((f, i) => (
                <AccordionItem
                  key={f.q}
                  value={`item-${i}`}
                  className="mb-3 overflow-hidden rounded-2xl border border-border bg-card px-5 transition-colors hover:border-primary/30"
                >
                  <AccordionTrigger className="py-5 text-left font-display text-base font-medium hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 sm:pb-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.25rem] bg-ink px-6 py-16 text-center text-ink-foreground shadow-lift ring-1 ring-white/10 sm:px-12 sm:py-20">
            <div className="bg-mesh pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
            <div className="glow-orb left-1/2 top-0 h-64 w-64 -translate-x-1/2 opacity-35" aria-hidden="true" />
            <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
              <h2 className="display-title text-3xl text-balance sm:text-4xl">
                Tell us where you are. We'll map the next step.
              </h2>
              <p className="opacity-80">
                A short discovery call within 48 hours, a scoped proposal, and a timeline agreed up
                front.
              </p>
              <Button asChild variant="warm" size="xl" className="rounded-full">
                <Link to="/contact">
                  Book a discovery call
                  <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
