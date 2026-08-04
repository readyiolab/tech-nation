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
import { HeroCarousel } from "@/components/HeroCarousel";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { Eyebrow } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { ICONS } from "@/components/icon-map";
import { CORE_SERVICES, METRICS, OFFERS, POSTS, PROJECTS } from "@/data/site";
import { apiGet } from "@/lib/api";
import BlurText from "@/components/react-bits/BlurText";
import CurvedLoop from "@/components/react-bits/CurvedLoop";
import RotatingText from "@/components/react-bits/RotatingText";
import ScrollFloat from "@/components/react-bits/ScrollFloat";
import ScrollVelocity from "@/components/react-bits/ScrollVelocity";
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
      {/* HERO — Signal Night (mobile-first premium, desktop unchanged layout) */}
      <section className="hero-dark relative flex min-h-0 flex-col overflow-hidden md:min-h-[100svh]">
        <div className="bg-hero-mesh pointer-events-none absolute inset-0" aria-hidden="true" />
        {/* Heavy décor only on desktop for performance */}
        <div
          className="glow-orb pointer-events-none absolute -top-40 left-[-15%] hidden h-[32rem] w-[32rem] opacity-40 md:block"
          aria-hidden="true"
        />
        <div
          className="glow-orb-signal pointer-events-none absolute top-[18%] right-[-8%] hidden h-[22rem] w-[22rem] md:block [animation-delay:2.5s]"
          aria-hidden="true"
        />
        <div
          className="glow-orb pointer-events-none absolute bottom-[-10%] left-[35%] hidden h-72 w-72 opacity-25 md:block [animation-delay:5s]"
          aria-hidden="true"
        />
        <div
          className="grid-lines-hero pointer-events-none absolute inset-0 hidden opacity-50 md:block [mask-image:radial-gradient(75%_65%_at_50%_30%,black,transparent)]"
          aria-hidden="true"
        />
        {/* Soft mobile glow only */}
        <div
          className="pointer-events-none absolute top-24 right-0 h-48 w-48 rounded-full bg-[var(--hero-signal)] opacity-20 blur-3xl md:hidden"
          aria-hidden="true"
        />
        <div className="noise-overlay hidden md:block" aria-hidden="true" />
        <div className="vignette" aria-hidden="true" />

        <div className="page-container relative grid w-full flex-1 items-center gap-8 pt-20 pb-8 sm:pt-24 sm:pb-10 md:gap-10 md:pt-36 md:pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pb-20">
          <div className="relative z-10 flex w-full flex-col items-start gap-4 text-left sm:gap-5 md:gap-6">
            <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[0.68rem] font-semibold tracking-[0.18em] text-[var(--hero-signal)] uppercase backdrop-blur-sm">
              One Tech Nations
            </span>

            <h1 className="display-title w-full max-w-xl text-[2.25rem] leading-[1.12] font-semibold text-balance text-[var(--hero-fg)] sm:text-[2.625rem] md:text-5xl md:leading-[1.08] lg:text-[3.4rem]">
              <span className="inline">IT solutions for </span>
              <RotatingText
                texts={["AI", "Cybersecurity", "Training", "Cloud", "GRC"]}
                mainClassName="inline-flex overflow-hidden rounded-md bg-white px-2.5 py-0.5 text-black align-baseline"
                staggerFrom="last"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2200}
              />
            </h1>

            <p className="w-full max-w-lg text-[0.95rem] leading-relaxed text-[var(--hero-muted)] sm:text-base md:text-lg">
              Workshops, customized training, and a living knowledge base — built by practitioners,
              not a slide deck.
            </p>

            <div className="flex w-full flex-col items-stretch gap-3 pt-1 md:flex-row md:flex-wrap md:items-center">
              <Button
                asChild
                size="xl"
                className="h-12 w-full rounded-full bg-white px-7 text-black hover:bg-white/90 hover:text-black md:h-14 md:w-auto"
              >
                <Link to="/services">
                  Explore services
                  <ArrowRight />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="xl"
                className="hidden h-12 rounded-full border-white/25 bg-transparent px-7 text-white hover:border-white/45 hover:bg-white/5 hover:text-white md:inline-flex md:h-14"
              >
                <Link to="/about">More about us</Link>
              </Button>
              <button
                type="button"
                onClick={() => openChat({ prefill: "What services do you offer?" })}
                aria-label="Ask our AI assistant"
                className="group hidden h-14 w-14 place-items-center rounded-full border border-white/25 text-[var(--hero-muted)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--hero-signal)_45%,transparent)] hover:text-[var(--hero-signal)] md:grid"
              >
                <MessagesSquare className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-start gap-x-4 gap-y-2 pt-1 text-xs text-[var(--hero-muted)] sm:text-sm">
              {["Trusted company", "Innovative solutions", "Proven track record"].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[var(--hero-signal)]" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Desktop carousel only — hidden below 768px */}
          <div className="relative z-10 hidden w-full max-w-md self-center md:block lg:max-w-none">
            <HeroCarousel />
          </div>
        </div>

        <div className="hero-marquee relative mt-2 border-y border-white/10 py-2.5 md:mt-0 md:py-4">
          <ScrollVelocity
            texts={[
              "AI Integration  ·  Virtual Labs  ·  Cybersecurity  ·  GRC Advisory  ·  ",
              "Custom Training  ·  Threat Modeling  ·  Community Forums  ·  ",
            ]}
            velocity={80}
            numCopies={4}
            className="text-[var(--hero-muted)]"
            scrollerClassName="flex whitespace-nowrap font-display text-xs font-medium tracking-wide text-white/40 uppercase sm:text-sm md:text-xl md:font-semibold md:tracking-tight md:normal-case md:text-[var(--hero-muted)] md:leading-none lg:text-3xl xl:text-4xl"
            parallaxClassName="parallax py-0.5 md:py-1"
          />
        </div>
      </section>

      {/* SERVICES */}
      <section className="relative overflow-hidden section-pad bg-surface">
        <div className="bg-halo pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="noise-overlay" aria-hidden="true" />
        <div className="relative page-container">
          <div className="flex flex-col items-center text-center">
            <Eyebrow>Services we offer</Eyebrow>
            <ScrollFloat
              containerClassName="my-3 text-center"
              textClassName="display-title font-display text-balance text-foreground"
              animationDuration={1}
              ease="power2.out"
              scrollStart="top bottom-=10%"
              scrollEnd="center center"
              stagger={0.025}
            >
              Professional IT services
            </ScrollFloat>
            <BlurText
              text="A comprehensive analysis of your existing IT setup. Through thorough assessments we identify areas for improvement, surface potential hazards, and uncover innovative opportunities."
              delay={60}
              animateBy="words"
              className="mx-auto max-w-2xl justify-center text-base leading-relaxed text-muted-foreground sm:text-lg"
            />
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CORE_SERVICES.map((s, i) => {
              const Icon = ICONS[s.icon];
              return (
                <Reveal key={s.slug} delay={i * 70}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="group relative flex h-full flex-col overflow-hidden rounded-[1.85rem] border border-border/80 bg-card shadow-soft transition-all duration-500 hover:-translate-y-2 hover:border-primary/35 hover:shadow-lift"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={SERVICE_CARD_IMAGES[s.slug]}
                        alt={`${s.title} illustration`}
                        loading="lazy"
                        width={960}
                        height={720}
                        className="h-full w-full object-cover transition-transform duration-[900ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
                      />
                      <span
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-transparent"
                        aria-hidden="true"
                      />
                      <span className="absolute top-4 left-4 rounded-full bg-background/90 px-3 py-1 text-[0.65rem] font-semibold tracking-[0.16em] text-primary uppercase shadow-soft backdrop-blur">
                        0{i + 1}
                      </span>
                      <span className="absolute -bottom-6 left-6 grid h-12 w-12 place-items-center rounded-2xl bg-[image:var(--gradient-brand)] text-primary-foreground shadow-lift ring-4 ring-card">
                        <Icon className="h-5 w-5" />
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-7 pt-10">
                      <h3 className="font-display text-xl font-semibold tracking-tight">{s.title}</h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {s.summary}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
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

      <section className="overflow-hidden bg-ink text-ink-foreground">
        <CurvedLoop
          marqueeText="AI ✦ Cybersecurity ✦ Training ✦ Virtual Labs ✦ GRC ✦ IT Consulting ✦"
          speed={2.2}
          curveAmount={280}
          direction="left"
          interactive
          className="fill-white/90"
          containerClassName="py-8 sm:py-10"
        />
      </section>

      {/* STATS / CTA BAND */}
      <section className="page-container pt-10 sm:pt-14">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.25rem] bg-ink px-6 py-14 text-ink-foreground shadow-lift ring-1 ring-white/10 sm:px-12 sm:py-16">
            <div
              className="bg-mesh pointer-events-none absolute inset-0 opacity-40"
              aria-hidden="true"
            />
            <div className="glow-orb -right-10 top-0 h-64 w-64 opacity-40" aria-hidden="true" />
            <div className="noise-overlay opacity-20 mix-blend-soft-light" aria-hidden="true" />
            <div className="relative grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
              <div>
                <BlurText
                  text="Are you ready to grow your IT solution?"
                  delay={90}
                  animateBy="words"
                  className="display-title text-3xl text-balance sm:text-4xl"
                />
                <p className="mt-4 max-w-xl text-base leading-relaxed opacity-80 sm:text-lg">
                  Discover growth opportunities, enhance efficiency, and stay ahead in the rapidly
                  evolving tech landscape. Let's fuel your success together.
                </p>
                <Button asChild variant="warm" size="lg" className="mt-7 rounded-full">
                  <Link to="/services">
                    See all services
                    <ArrowRight />
                  </Link>
                </Button>
              </div>
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-soft">
                {METRICS.map((s) => (
                  <div key={s.label} className="bg-ink/75 px-5 py-7 backdrop-blur">
                    <dt className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                      <Counter value={s.value} suffix={s.suffix} />
                    </dt>
                    <dd className="mt-1.5 text-sm opacity-70">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>
      </section>
      {/* SPECIAL OFFERS */}
      <section className="section-pad page-container">
        <div className="flex flex-col items-center text-center">
          <Eyebrow>Special offers</Eyebrow>
          <ScrollFloat
            containerClassName="my-3 text-center"
            textClassName="display-title font-display text-balance text-foreground"
            scrollStart="top bottom-=10%"
            scrollEnd="center center"
            stagger={0.02}
          >
            Certification tracks at a discount
          </ScrollFloat>
          <BlurText
            text="Career-grade programs with live cohorts, recorded sessions and placement support."
            delay={70}
            className="mx-auto max-w-2xl justify-center text-base leading-relaxed text-muted-foreground sm:text-lg"
          />
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {OFFERS.map((o, i) => (
            <Reveal key={o.slug} delay={i * 80}>
              <article className="lift-hover group flex h-full flex-col overflow-hidden rounded-[1.85rem] border border-border/80 bg-card shadow-soft">
                <div className="relative aspect-[16/9] overflow-hidden bg-surface-2">
                  <img
                    src={offerImages[i]}
                    alt={`${o.title} programme visual`}
                    loading="lazy"
                    width={900}
                    height={700}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent"
                    aria-hidden="true"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-card/95 px-3 py-1.5 text-xs font-semibold shadow-soft backdrop-blur">
                    {o.badge}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {o.period}
                  </div>
                  <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">{o.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{o.blurb}</p>
                  <ul className="mt-5 space-y-2 text-sm">
                    {o.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                        <span className="text-muted-foreground">{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-border/80 pt-5">
                    <span className="font-display text-base font-semibold text-primary">{o.price}</span>
                    <Button asChild size="sm" variant="outline" className="rounded-full">
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
      <section className="relative overflow-hidden bg-surface section-pad">
        <div className="bg-halo pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="noise-overlay" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-5xl px-4 sm:px-6">
          <div className="flex flex-col items-center text-center">
            <Eyebrow>Our testimonial</Eyebrow>
            <ScrollFloat
              containerClassName="my-3 text-center"
              textClassName="display-title font-display text-balance text-foreground"
              scrollStart="top bottom-=10%"
              scrollEnd="center center"
              stagger={0.025}
            >
              What our clients are saying
            </ScrollFloat>
            <BlurText
              text="Practitioners who went from theory to shift-ready."
              delay={80}
              className="justify-center text-base leading-relaxed text-muted-foreground sm:text-lg"
            />
          </div>
          <div className="mt-14">
            <TestimonialCarousel />
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="section-pad page-container">
        <Reveal>
          <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
            <div className="flex flex-col items-start text-left">
              <Eyebrow>Our completed projects</Eyebrow>
              <ScrollFloat
                containerClassName="my-3 text-left"
                textClassName="display-title font-display text-balance text-foreground"
                scrollStart="top bottom-=10%"
                scrollEnd="center center"
                stagger={0.02}
              >
                Recently completed projects
              </ScrollFloat>
              <BlurText
                text="Selected engagements across media, GRC tooling and cyber risk."
                delay={70}
                className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
              />
            </div>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/contact">
                Start a project
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </Reveal>
        <div className="mt-14 space-y-6">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.no} delay={i * 90}>
              <article
                className={`group relative grid overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-soft transition-all duration-500 hover:border-primary/30 hover:shadow-lift lg:grid-cols-2 ${i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
                  }`}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-surface-2 lg:aspect-auto lg:min-h-[280px]">
                  <img
                    src={projectImages[i]}
                    alt={`${p.title} project visual`}
                    loading="lazy"
                    width={1200}
                    height={912}
                    className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
                  />
                  <span
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-ink/10"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-3">
                    <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-foreground shadow-soft backdrop-blur">
                      {p.tag}
                    </span>
                    <span className="rounded-full bg-ink/70 px-3 py-1.5 font-display text-xs font-semibold tracking-[0.14em] text-white backdrop-blur">
                      {p.no}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col justify-center p-8 sm:p-10">
                  <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
                    Case study {p.no}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-primary">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {p.body}
                  </p>
                  <Link
                    to="/contact"
                    className="mt-8 inline-flex w-fit items-center gap-1.5 rounded-full border border-border/80 bg-surface px-4 py-2 text-sm font-semibold text-primary transition-colors hover:border-primary/35 hover:bg-accent"
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
      <section className="relative overflow-hidden bg-surface section-pad">
        <div className="bg-halo pointer-events-none absolute inset-0 opacity-80" aria-hidden="true" />
        <div className="relative page-container">
          <Reveal>
            <div className="grid items-end gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
              <div className="flex flex-col items-start text-left">
                <Eyebrow>Quality support</Eyebrow>
                <ScrollFloat
                  containerClassName="my-3 text-left"
                  textClassName="display-title font-display text-balance text-foreground"
                  scrollStart="top bottom-=10%"
                  scrollEnd="center center"
                  stagger={0.02}
                >
                  Improve quality with strategic integration
                </ScrollFloat>
                <BlurText
                  text="IT services customized for your agency — from first assessment to continuous improvement."
                  delay={70}
                  className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
                />
              </div>
              <div className="flex lg:justify-end">
                <Button asChild variant="hero" size="lg" className="rounded-full">
                  <Link to="/services">
                    See all services
                    <ArrowRight />
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <Reveal delay={80}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border/70 bg-card p-8 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lift sm:p-9">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[image:var(--gradient-brand)] text-primary-foreground shadow-soft">
                  <Zap className="h-6 w-6" />
                </span>
                <h3 className="mt-7 font-display text-2xl font-semibold tracking-tight">
                  Tech solution
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  We are dedicated to providing excellent services, from architecture reviews to
                  hands-on implementation with your team.
                </p>
                <Link
                  to="/services"
                  className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                >
                  Explore solutions
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={140}>
              <button
                type="button"
                onClick={() => openChat({ prefill: "I need help choosing a program" })}
                className="group relative flex h-full w-full flex-col overflow-hidden rounded-[1.75rem] border border-border/70 bg-ink p-8 text-left text-ink-foreground shadow-lift transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-glow)] sm:p-9"
              >
                <div
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_90%_10%,color-mix(in_oklab,var(--primary)_35%,transparent),transparent_70%)]"
                  aria-hidden="true"
                />
                <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-white/12 ring-1 ring-white/20 backdrop-blur">
                  <MessagesSquare className="h-6 w-6" />
                </span>
                <h3 className="relative mt-7 font-display text-2xl font-semibold tracking-tight">
                  Quick support
                </h3>
                <p className="relative mt-1 text-sm font-medium text-sky-200/90">Chat now · 24/7</p>
                <p className="relative mt-3 flex-1 text-sm leading-relaxed text-white/70 sm:text-base">
                  Use our chat agent for continuous, efficient engagement — your inquiries answered
                  promptly and precisely.
                </p>
                <span className="relative mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                  Open assistant
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="relative overflow-hidden bg-surface section-pad">
        <div className="noise-overlay" aria-hidden="true" />
        <div className="relative page-container">
          <Reveal>
            <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
              <div className="flex flex-col items-start text-left">
                <Eyebrow>News post</Eyebrow>
                <ScrollFloat
                  containerClassName="my-3 text-left"
                  textClassName="display-title font-display text-balance text-foreground"
                  scrollStart="top bottom-=10%"
                  scrollEnd="center center"
                  stagger={0.02}
                >
                  Latest updates and news
                </ScrollFloat>
                <BlurText
                  text="Perspectives on IT, cybersecurity and applied AI."
                  delay={70}
                  className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
                />
              </div>
              <Button asChild variant="outline" className="rounded-full">
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
                    className="lift-hover group flex h-full flex-col rounded-[1.5rem] border border-border/80 bg-card p-6 shadow-soft"
                  >
                    <span className="w-fit rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                      {p.category}
                    </span>
                    <h3 className="mt-4 font-display text-lg leading-snug font-semibold tracking-tight transition-colors group-hover:text-primary">
                      {p.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {p.excerpt}
                    </p>
                    <span className="mt-6 flex items-center justify-between border-t border-border/80 pt-4 text-xs text-muted-foreground">
                      {p.date}
                      <ArrowUpRight className="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </Link>
                ) : (
                  <Link
                    to="/blog"
                    className="lift-hover group flex h-full flex-col rounded-[1.5rem] border border-border/80 bg-card p-6 shadow-soft"
                  >
                    <span className="w-fit rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                      {p.category}
                    </span>
                    <h3 className="mt-4 font-display text-lg leading-snug font-semibold tracking-tight transition-colors group-hover:text-primary">
                      {p.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {p.excerpt}
                    </p>
                    <span className="mt-6 flex items-center justify-between border-t border-border/80 pt-4 text-xs text-muted-foreground">
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
      <section className="page-container section-pad">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card px-6 py-14 text-center shadow-soft sm:px-12 sm:py-16">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_70%_at_50%_0%,color-mix(in_oklab,var(--primary)_14%,transparent),transparent_70%)]"
              aria-hidden="true"
            />
            <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-5">
              <Eyebrow>Ready to transform your business?</Eyebrow>
              <ScrollFloat
                containerClassName="my-2 text-center"
                textClassName="display-title font-display text-balance text-foreground"
                scrollStart="top bottom-=5%"
                scrollEnd="center center"
                stagger={0.02}
              >
                Build your secure tech future
              </ScrollFloat>
              <BlurText
                text="We're dedicated to providing excellent services. Tell us where you are and we'll map the next step."
                delay={70}
                className="max-w-xl justify-center text-base leading-relaxed text-muted-foreground sm:text-lg"
              />
              <div className="mt-2 flex flex-wrap justify-center gap-3">
                <Button asChild variant="hero" size="xl" className="rounded-full">
                  <Link to="/contact">
                    Start a conversation
                    <ArrowRight />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="xl" className="rounded-full">
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
