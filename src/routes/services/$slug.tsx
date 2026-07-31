import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ICONS } from "@/components/icon-map";
import { CORE_SERVICES, FAQS } from "@/data/site";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = CORE_SERVICES.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const title = loaderData?.service.title ?? "Service";
    const desc = loaderData?.service.summary ?? "";
    return {
      meta: [
        { title: `${title} Services | One Tech Nations` },
        { name: "description", content: desc },
        { property: "og:title", content: `${title} | One Tech Nations` },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: ServiceDetail,
});

const BENEFITS = [
  "Latest technologies and reliable tooling",
  "Unique solutions matched to your context",
  "Powerful, defensible security strategies",
  "Timely delivery against agreed milestones",
];

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  const Icon = ICONS[service.icon];
  const others = CORE_SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHero
        eyebrow="Service details"
        title={service.title}
        subtitle={service.summary}
        crumb={service.title}
      />

      <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 sm:pb-28">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div className="flex flex-col gap-10">
            <Reveal>
              <div className="rounded-[2rem] border border-border bg-card p-8 sm:p-10">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[image:var(--gradient-brand)] text-primary-foreground">
                  <Icon className="h-7 w-7" />
                </span>
                <h2 className="mt-6 font-display text-2xl font-semibold">
                  What this service covers
                </h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">{service.body}</p>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Our team ensures every aspect of your digital infrastructure is secure, compliant
                  and resilient against potential risks and vulnerabilities — with cutting-edge
                  solutions and personalized strategies tailored to your organization.
                </p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {BENEFITS.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2.5 rounded-2xl bg-surface px-4 py-3.5 text-sm"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                      <span className="text-muted-foreground">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div>
                <Eyebrow>Frequently asked questions</Eyebrow>
                <Accordion type="single" collapsible className="mt-6 w-full">
                  {FAQS.map((f, i) => (
                    <AccordionItem
                      key={f.q}
                      value={`item-${i}`}
                      className="mb-3 overflow-hidden rounded-2xl border border-border bg-card px-5"
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
              </div>
            </Reveal>
          </div>

          <aside className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
            <Reveal delay={60}>
              <nav className="rounded-[2rem] border border-border bg-card p-6">
                <h2 className="font-display text-lg font-semibold">List of services</h2>
                <ul className="mt-4 space-y-1.5">
                  {CORE_SERVICES.map((s) => {
                    const active = s.slug === service.slug;
                    return (
                      <li key={s.slug}>
                        <Link
                          to="/services/$slug"
                          params={{ slug: s.slug }}
                          className={`flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm transition-colors ${
                            active
                              ? "bg-[image:var(--gradient-brand)] text-primary-foreground"
                              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                          }`}
                        >
                          <span className="truncate">{s.title}</span>
                          <ArrowRight className="h-4 w-4 shrink-0" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </Reveal>

            <Reveal delay={140}>
              <div className="relative overflow-hidden rounded-[2rem] bg-ink p-8 text-ink-foreground">
                <div
                  className="bg-mesh pointer-events-none absolute inset-0 opacity-30"
                  aria-hidden="true"
                />
                <div className="relative">
                  <h2 className="font-display text-xl leading-snug font-semibold">
                    Ready to elevate your business?
                  </h2>
                  <p className="mt-3 text-sm opacity-80">
                    We're dedicated to providing excellent services. Tell us your challenge and
                    we'll scope it with you.
                  </p>
                  <Button asChild variant="warm" className="mt-6 w-full">
                    <Link to="/contact">
                      Get in touch
                      <ArrowRight />
                    </Link>
                  </Button>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>

        <Reveal>
          <div className="mt-20">
            <h2 className="font-display text-2xl font-semibold">Related services</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {others.slice(0, 3).map((s) => {
                const OtherIcon = ICONS[s.icon];
                return (
                  <Link
                    key={s.slug}
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="lift-hover group rounded-3xl border border-border bg-card p-7"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent text-primary">
                      <OtherIcon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-semibold group-hover:text-primary">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {s.summary}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
