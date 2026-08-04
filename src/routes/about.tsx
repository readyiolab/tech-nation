import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass, Layers, Sparkles, Target, Eye } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Counter } from "@/components/Counter";
import { Eyebrow, SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { ICONS } from "@/components/icon-map";
import { METRICS, TIMELINE, VALUES } from "@/data/site";
import aboutVisual from "@/assets/about-visual.jpg";
import aboutCommunity from "@/assets/about-community.jpg";
import aboutMission from "@/assets/about-mission.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About One Tech Nations | A Hub for AI & Cyber Practitioners" },
      {
        name: "description",
        content:
          "One Tech Nations is a community where students, veterans, entrepreneurs and ethical hackers learn, network and shape the future of technology together.",
      },
      { property: "og:title", content: "About One Tech Nations" },
      {
        property: "og:description",
        content:
          "A thriving hub where AI and cybersecurity enthusiasts network, learn and explore the boundless potential of technology.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const PILLARS = [
  {
    icon: Compass,
    eyebrow: "Our vision",
    title: "Shaping the future of tech together",
    body: "We believe in the transformative power of collaboration. Our platform is a dynamic nexus where like-minded individuals converge to explore the limitless possibilities of technology — whether you're chasing the latest AI breakthrough or navigating the complexities of the digital realm.",
  },
  {
    icon: Layers,
    eyebrow: "What sets us apart",
    title: "Diverse resources for holistic growth",
    body: "Resources meticulously curated to fuel your curiosity: insightful posts unravelling tech trends, expert perspectives that go deep on AI and cybersecurity, and a knowledge base that grows with the community. We go beyond the conventional.",
  },
  {
    icon: Sparkles,
    eyebrow: "Our commitment",
    title: "Fostering creativity and knowledge-sharing",
    body: "We're committed to an environment where creativity flourishes and knowledge becomes a shared currency. Every member is a vital contributor to the narrative of One Tech Nations — where the future of tech isn't just imagined, it's co-created.",
  },
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="About One Tech Nations"
        title={
          <>
            A community built around <span className="text-gradient">real practice</span>
          </>
        }
        subtitle="Visionary innovation emerges when a collection of diverse minds engages in open dialogue — so we built a place for exactly that."
        crumb="About"
      />

      {/* INTRO */}
      <section className="page-container section-pad">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="group relative">
              <div className="glow-orb -left-8 top-8 h-56 w-56 opacity-30" aria-hidden="true" />
              <div className="bg-halo pointer-events-none absolute -inset-8 opacity-70" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[2rem] border border-border/80 shadow-lift">
                <img
                  src={aboutVisual}
                  alt="Abstract glass cubes connected by a network, representing collaborative technology"
                  loading="lazy"
                  width={1200}
                  height={1008}
                  className="w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
                />
                <span className="media-mask pointer-events-none absolute inset-0" aria-hidden="true" />
              </div>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <div className="flex flex-col gap-6">
              <Eyebrow>Welcome</Eyebrow>
              <h2 className="display-title text-3xl text-balance sm:text-4xl">
                Where students, veterans and builders learn side by side
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                One Tech Nations is founded on the premise that visionary innovation emerges when a
                collection of diverse minds engages in an open dialogue. That's why we've created a
                thriving hub where AI and cybersecurity aficionados can network, learn, and explore
                the boundless potential of technology.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                Students immerse themselves alongside industry veterans, entrepreneurs, programmers,
                ethical hackers, and technologists of all kinds in our online forums and virtual
                events.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="hero" size="lg" className="rounded-full">
                  <Link to="/contact">
                    Become a member
                    <ArrowRight />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link to="/services">See our services</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* COUNTERS */}
      <section className="page-container">
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

      {/* MISSION / VISION */}
      <section className="page-container section-pad">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="flex flex-col gap-6">
              <Eyebrow>Mission & vision</Eyebrow>
              <h2 className="display-title text-3xl text-balance sm:text-4xl">
                Tech made easy — for everyone who shows up curious
              </h2>
              <div className="grid gap-5">
                <div className="lift-hover flex gap-5 rounded-3xl border border-border/80 bg-card p-7 shadow-soft">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[image:var(--gradient-brand)] text-primary-foreground shadow-soft">
                    <Target className="h-6 w-6" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-semibold">Our mission</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      To make advanced AI and cybersecurity skill accessible through hands-on labs,
                      honest mentorship and training designed around real work, not slideware.
                    </p>
                  </div>
                </div>
                <div className="lift-hover flex gap-5 rounded-3xl border border-border/80 bg-card p-7 shadow-soft">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-teal/15 text-teal-foreground">
                    <Eye className="h-6 w-6" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-semibold">Our vision</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      One connected tech nation where knowledge moves freely across borders, roles
                      and experience levels — and where the next practitioner is always being
                      mentored by the last.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="group relative lg:order-none">
              <div className="bg-halo pointer-events-none absolute -inset-8 opacity-70" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[2rem] border border-border shadow-soft">
                <img
                  src={aboutMission}
                  alt="Illustration of a telescope and milestone markers along a rising path"
                  loading="lazy"
                  width={1200}
                  height={912}
                  className="w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* VALUES */}
      <section className="relative overflow-hidden bg-surface section-pad">
        <div className="bg-halo pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="noise-overlay" aria-hidden="true" />
        <div className="relative page-container">
          <Reveal>
            <SectionHeading
              eyebrow="Our values"
              title={
                <>
                  Four things we refuse to <span className="text-gradient">compromise</span> on
                </>
              }
              subtitle="They shape how we teach, how we consult and how we show up after go-live."
            />
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => {
              const Icon = ICONS[v.icon];
              return (
                <Reveal key={v.title} delay={i * 90}>
                  <article className="lift-hover flex h-full flex-col rounded-[1.75rem] border border-border/80 bg-card p-7 shadow-soft">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[image:var(--gradient-brand)] text-primary-foreground shadow-soft">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-6 font-display text-lg font-semibold tracking-tight">{v.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="page-container section-pad">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                align="left"
                eyebrow="Our journey"
                title="From a study circle to a tech nation"
                subtitle="Every milestone came from members asking for something harder."
              />
              <div className="mt-8 overflow-hidden rounded-[2rem] border border-border/80 shadow-lift">
                <img
                  src={aboutCommunity}
                  alt="Illustration of a connected global community of practitioners"
                  loading="lazy"
                  width={1200}
                  height={912}
                  className="w-full object-cover"
                />
              </div>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <ol className="relative border-l-2 border-primary/20 pl-8 sm:pl-10">
              {TIMELINE.map((t, i) => (
                <li key={t.year} className="relative pb-10 last:pb-0">
                  <span className="absolute top-1 -left-[2.35rem] grid h-7 w-7 place-items-center rounded-full border border-primary/30 bg-card shadow-soft sm:-left-[3.15rem]">
                    <span className="h-2.5 w-2.5 rounded-full bg-[image:var(--gradient-brand)]" />
                  </span>
                  <Reveal delay={i * 80}>
                    <div className="lift-hover rounded-[1.75rem] border border-border/80 bg-card p-7 shadow-soft">
                      <span className="font-display text-sm font-semibold tracking-[0.14em] text-primary uppercase">
                        {t.year}
                      </span>
                      <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">{t.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ETHOS */}
      <section className="relative overflow-hidden bg-surface section-pad">
        <div className="noise-overlay" aria-hidden="true" />
        <div className="relative page-container">
          <Reveal>
            <SectionHeading
              eyebrow="Our ethos"
              title="Built on collaboration, curiosity and craft"
              subtitle="Three commitments that shape everything we build with our community."
            />
          </Reveal>
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <article className="lift-hover flex h-full flex-col rounded-[1.75rem] border border-border/80 bg-card p-8 shadow-soft">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[image:var(--gradient-brand)] text-primary-foreground shadow-soft">
                    <p.icon className="h-6 w-6" />
                  </span>
                  <span className="mt-6 text-xs tracking-[0.14em] text-muted-foreground uppercase">
                    {p.eyebrow}
                  </span>
                  <h3 className="mt-2 font-display text-xl leading-snug font-semibold tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-container section-pad">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.25rem] bg-ink px-6 py-16 text-center text-ink-foreground shadow-lift ring-1 ring-white/10 sm:px-12 sm:py-20">
            <div className="bg-mesh pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
            <div className="glow-orb left-1/2 top-0 h-64 w-64 -translate-x-1/2 opacity-35" aria-hidden="true" />
            <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
              <h2 className="display-title text-3xl text-balance sm:text-4xl">
                Join us as we build the future — one tech nation, hand in hand.
              </h2>
              <p className="opacity-80">
                Embark on a journey of collaborative learning, where the pulse of technology beats
                in unison with the passion of our community. Tech made easy.
              </p>
              <Button asChild variant="warm" size="xl" className="rounded-full bg-white text-white">
                <Link to="/contact">
                  Become a member
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
