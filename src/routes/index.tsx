import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  MessagesSquare,
  Zap,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { openChat } from "@/lib/chat-bus";
import { Counter } from "@/components/Counter";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { Eyebrow, SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { ICONS } from "@/components/icon-map";
import { CORE_SERVICES, METRICS, OFFERS, POSTS, PROJECTS } from "@/data/site";
import { apiGet } from "@/lib/api";
import heroArt from "@/assets/hero-clean.png";
import courseSoc from "@/assets/course-soc.jpg";
import courseGrc from "@/assets/course-grc.jpg";
import projectMedia from "@/assets/project-media.jpg";
import projectGrc from "@/assets/project-grc.jpg";
import projectRisk from "@/assets/project-risk.jpg";
import svcCardTech from "@/assets/svc-card-tech.jpg";
import svcCardCyber from "@/assets/svc-card-cyber.jpg";
import svcCardAi from "@/assets/svc-card-ai.jpg";
import svcCardAnalysis from "@/assets/svc-card-analysis.jpg";
import svcCardConsulting from "@/assets/svc-card-consulting.jpg";
import svcCardMarket from "@/assets/svc-card-market.jpg";

const projectImages = [projectMedia, projectGrc, projectRisk];

const SERVICE_CARD_IMAGES: Record<string, string> = {
  "tech-solution": svcCardTech,
  cybersecurity: svcCardCyber,
  "artificial-intelligence": svcCardAi,
  "tech-analysis": svcCardAnalysis,
  "it-consultation": svcCardConsulting,
  "market-analysis": svcCardMarket,
};


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "One Tech Nations | AI & Cybersecurity Training and IT Services" },
      {
        name: "description",
        content:
          "Hands-on AI and cybersecurity training, interactive virtual labs, certification tracks and IT consulting from One Tech Nations.",
      },
      { property: "og:title", content: "One Tech Nations | AI & Cybersecurity Experts" },
      {
        property: "og:description",
        content:
          "Interactive virtual labs, SOC and ISO certification training, and IT consulting built for modern teams.",
      },
    ],
  }),
  component: Home,
});

const MARQUEE = [
  "AI Integration Workshops",
  "Customized Training",
  "Cybersecurity Knowledge Base",
  "Community Forums",
  "Virtual Labs",
  "GRC Advisory",
  "Threat Modeling",
];

function Home() {
  const offerImages = [courseSoc, courseGrc, courseSoc, courseGrc];
  const { data: blogRes } = useQuery({
    queryKey: ["blogs", "home"],
    queryFn: () =>
      apiGet<{
        data: Array<{
          slug: string;
          title: string;
          excerpt: string | null;
          category: string | null;
          published_at: string | null;
        }>;
      }>("/blogs?limit=4"),
    retry: false,
  });

  const homePosts =
    blogRes?.data?.length
      ? blogRes.data.map((p) => ({
          slug: p.slug,
          title: p.title,
          excerpt: p.excerpt || "",
          category: p.category || "Blog",
          date: p.published_at
            ? new Date(p.published_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "",
          fromApi: true as const,
        }))
      : POSTS.map((p) => ({ ...p, fromApi: false as const }));

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="bg-mesh pointer-events-none absolute inset-0" aria-hidden="true" />
        <div
          className="grid-lines pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(70%_60%_at_50%_20%,black,transparent)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="animate-rise flex flex-col items-start gap-6">
            <Eyebrow>One Tech Nations</Eyebrow>
            <h1 className="text-4xl leading-[1.03] font-semibold text-balance sm:text-5xl lg:text-6xl">
              We specialize in <span className="text-gradient">IT solutions</span> that make AI and
              security work together.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              AI and cybersecurity integration workshops, customized training programs, and a living
              knowledge base — built by a community of practitioners, not a slide deck.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild variant="hero" size="xl">
                <Link to="/services">
                  Explore services
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link to="/about">More about us</Link>
              </Button>
              <button
                type="button"
                onClick={() => openChat({ prefill: "What services do you offer?" })}
                className="group inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-5 py-3 text-sm font-medium text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
              >
                <MessagesSquare className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                Ask our AI assistant
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-muted-foreground">
              {["Trusted company", "Innovative solutions", "Proven track record"].map((t) => (
                <span key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-teal" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div
              className="absolute inset-10 rounded-full bg-[image:var(--gradient-brand)] opacity-10 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative rounded-[2rem] border border-border bg-card/70 p-8 shadow-soft backdrop-blur-sm sm:p-10">
              <img
                src={heroArt}
                alt="Simple glass shield illustration representing secure, AI-driven systems"
                width={1024}
                height={1024}
                className="animate-float mx-auto w-full max-w-sm"
              />
              <div className="mt-6 grid grid-cols-2 gap-3 text-center">
                <div className="rounded-2xl border border-border bg-background/70 px-4 py-3">
                  <p className="font-display text-lg font-semibold">24/7</p>
                  <p className="text-xs text-muted-foreground">Lab access</p>
                </div>
                <div className="rounded-2xl border border-border bg-background/70 px-4 py-3">
                  <p className="font-display text-lg font-semibold">1:1</p>
                  <p className="text-xs text-muted-foreground">Mentorship</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* marquee */}
        <div className="relative mt-16 overflow-hidden border-y border-border bg-card/60 py-4 backdrop-blur">
          <div className="animate-marquee flex w-max gap-10 pr-10">
            {[...MARQUEE, ...MARQUEE].map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-3 text-sm font-medium tracking-wide text-muted-foreground whitespace-nowrap"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="bg-halo pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Services we offer"
              title="Providing complete professional IT services"
              subtitle="A comprehensive analysis of your existing IT setup. Through thorough assessments we identify areas for improvement, surface potential hazards, and uncover innovative opportunities."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CORE_SERVICES.map((s, i) => {
              const Icon = ICONS[s.icon];
              return (
                <Reveal key={s.slug} delay={i * 70}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-soft transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-lift"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={SERVICE_CARD_IMAGES[s.slug]}
                        alt={`${s.title} illustration`}
                        loading="lazy"
                        width={960}
                        height={720}
                        className="h-full w-full object-cover transition-transform duration-[900ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                      />
                      <span
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent"
                        aria-hidden="true"
                      />
                      <span className="absolute top-4 left-4 rounded-full bg-background/85 px-3 py-1 text-[0.65rem] font-semibold tracking-[0.16em] text-primary uppercase backdrop-blur">
                        0{i + 1}
                      </span>
                      <span className="absolute -bottom-6 left-6 grid h-12 w-12 place-items-center rounded-2xl bg-[image:var(--gradient-brand)] text-primary-foreground shadow-lift">
                        <Icon className="h-5 w-5" />
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-7 pt-10">
                      <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {s.summary}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                        Learn more
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>


      {/* STATS / CTA BAND */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-14 text-ink-foreground sm:px-12">
            <div
              className="bg-mesh pointer-events-none absolute inset-0 opacity-30"
              aria-hidden="true"
            />
            <div className="relative grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
              <div>
                <h2 className="text-3xl leading-tight font-semibold text-balance sm:text-4xl">
                  Are you ready to grow your IT solution?
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed opacity-80">
                  Discover growth opportunities, enhance efficiency, and stay ahead in the rapidly
                  evolving tech landscape. Let's fuel your success together.
                </p>
                <Button asChild variant="warm" size="lg" className="mt-7">
                  <Link to="/services">
                    See all services
                    <ArrowRight />
                  </Link>
                </Button>
              </div>
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
                {METRICS.map((s) => (
                  <div key={s.label} className="bg-ink/70 px-5 py-7 backdrop-blur">
                    <dt className="font-display text-3xl font-semibold">
                      <Counter value={s.value} suffix={s.suffix} />
                    </dt>
                    <dd className="mt-1 text-sm opacity-70">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>
      </section>

      {/* SPECIAL OFFERS */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Special offers"
            title="Certification tracks at a discount"
            subtitle="Career-grade programs with live cohorts, recorded sessions and placement support."
          />
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {OFFERS.map((o, i) => (
            <Reveal key={o.slug} delay={i * 80}>
              <article className="lift-hover group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card">
                <div className="relative aspect-[16/9] overflow-hidden bg-surface-2">
                  <img
                    src={offerImages[i]}
                    alt={`${o.title} programme visual`}
                    loading="lazy"
                    width={900}
                    height={700}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-card/90 px-3 py-1.5 text-xs font-semibold backdrop-blur">
                    {o.badge}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {o.period}
                  </div>
                  <h3 className="mt-3 font-display text-xl font-semibold">{o.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{o.blurb}</p>
                  <ul className="mt-5 space-y-2 text-sm">
                    {o.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                        <span className="text-muted-foreground">{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
                    <span className="text-sm font-semibold">{o.price}</span>
                    <Button asChild size="sm" variant="outline">
                      <Link to="/contact">Enroll now</Link>
                    </Button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative overflow-hidden bg-surface py-20 sm:py-28">
        <div className="bg-halo pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-5xl px-4 sm:px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Our testimonial"
              title="What our clients are saying"
              subtitle="Practitioners who went from theory to shift-ready."
            />
          </Reveal>
          <div className="mt-14">
            <TestimonialCarousel />
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <Reveal>
          <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
            <SectionHeading
              align="left"
              eyebrow="Our completed projects"
              title="Recently completed projects"
              subtitle="Selected engagements across media, GRC tooling and cyber risk."
            />
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/contact">
                Start a project
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.no} delay={i * 90}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-border bg-card transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:border-primary/40 hover:shadow-lift">
                <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
                  <img
                    src={projectImages[i]}
                    alt={`${p.title} project visual`}
                    loading="lazy"
                    width={1200}
                    height={912}
                    className="h-full w-full object-cover transition-transform duration-[900ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-card/90 px-3 py-1.5 text-xs font-semibold backdrop-blur">
                    {p.tag}
                  </span>
                  <span className="absolute top-4 right-4 font-display text-xs font-semibold text-card-foreground/70">
                    {p.no}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-display text-xl font-semibold transition-colors group-hover:text-primary">
                    {p.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {p.body}
                  </p>
                  <Link
                    to="/contact"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
                  >
                    Discuss a similar project
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>


      {/* QUALITY SUPPORT */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 sm:pb-28">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-border bg-card p-8 sm:p-10">
              <div
                className="bg-mesh pointer-events-none absolute inset-0 opacity-60"
                aria-hidden="true"
              />
              <div className="relative">
                <Eyebrow>Quality support</Eyebrow>
                <h2 className="mt-5 text-3xl leading-tight font-semibold text-balance">
                  Improve quality with strategic integration of technology.
                </h2>
                <p className="mt-4 max-w-md text-muted-foreground">
                  IT services customized for your agency — from first assessment to continuous
                  improvement.
                </p>
              </div>
              <Button asChild variant="hero" size="lg" className="relative mt-8 self-start">
                <Link to="/services">
                  See all services
                  <ArrowRight />
                </Link>
              </Button>
            </div>
          </Reveal>
          <div className="grid gap-6">
            <Reveal delay={80}>
              <div className="lift-hover flex gap-5 rounded-[2rem] border border-border bg-card p-8">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent text-primary">
                  <Zap className="h-6 w-6" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-xl font-semibold">Tech solution</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    We are dedicated to providing excellent services, from architecture reviews to
                    hands-on implementation with your team.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <button
                type="button"
                onClick={() => openChat({ prefill: "I need help choosing a program" })}
                className="lift-hover flex w-full gap-5 rounded-[2rem] border border-border bg-card p-8 text-left"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-teal/15 text-teal-foreground">
                  <MessagesSquare className="h-6 w-6" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-xl font-semibold">
                    Quick support <span className="text-primary">— chat now</span>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Use our chat agent for continuous, efficient engagement available 24/7 — your
                    inquiries answered promptly and precisely.
                  </p>
                </div>
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="relative overflow-hidden bg-surface py-20 sm:py-28">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
              <SectionHeading
                align="left"
                eyebrow="News post"
                title="Latest updates and news"
                subtitle="Perspectives on IT, cybersecurity and applied AI."
              />
              <Button asChild variant="outline">
                <Link to="/blog">
                  All articles
                  <ArrowRight />
                </Link>
              </Button>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {homePosts.map((p, i) => (
              <Reveal key={p.slug} delay={i * 70}>
                {p.fromApi ? (
                  <Link
                    to="/blog/$slug"
                    params={{ slug: p.slug }}
                    className="lift-hover group flex h-full flex-col rounded-3xl border border-border bg-card p-6"
                  >
                    <span className="w-fit rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                      {p.category}
                    </span>
                    <h3 className="mt-4 font-display text-lg leading-snug font-semibold transition-colors group-hover:text-primary">
                      {p.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {p.excerpt}
                    </p>
                    <span className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                      {p.date}
                      <ArrowUpRight className="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </Link>
                ) : (
                  <Link
                    to="/blog"
                    className="lift-hover group flex h-full flex-col rounded-3xl border border-border bg-card p-6"
                  >
                    <span className="w-fit rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                      {p.category}
                    </span>
                    <h3 className="mt-4 font-display text-lg leading-snug font-semibold transition-colors group-hover:text-primary">
                      {p.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {p.excerpt}
                    </p>
                    <span className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                      {p.date}
                      <ArrowUpRight className="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </Link>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card px-6 py-16 text-center sm:px-12">
            <div className="bg-mesh pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
              <Eyebrow>Ready to transform your business?</Eyebrow>
              <h2 className="text-3xl leading-tight font-semibold text-balance sm:text-5xl">
                Let's build your <span className="text-gradient">secure tech future</span> together.
              </h2>
              <p className="text-muted-foreground">
                We're dedicated to providing excellent services. Tell us where you are and we'll map
                the next step.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild variant="hero" size="xl">
                  <Link to="/contact">
                    Start a conversation
                    <ArrowRight />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="xl">
                  <Link to="/about">Our vision</Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
