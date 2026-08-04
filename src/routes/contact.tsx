import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  CalendarClock,
  Check,
  Clock,
  Mail,
  MapPin,
  MessagesSquare,
  Phone,
} from "lucide-react";
import { toast } from "sonner";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CORE_SERVICES, FAQS, SITE } from "@/data/site";
import { openChat } from "@/lib/chat-bus";
import { apiPost } from "@/lib/api";
import contactVisual from "@/assets/contact-visual.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact One Tech Nations | Talk to an AI & Cyber Specialist" },
      {
        name: "description",
        content:
          "Get in touch with One Tech Nations in Fredericksburg, VA for training, virtual labs, cybersecurity and IT consulting. We reply within one business day.",
      },
      { property: "og:title", content: "Contact One Tech Nations" },
      {
        property: "og:description",
        content: "Tell us your challenge — training, security or AI enablement. We reply fast.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const CONTACT_CARDS = [
  {
    icon: Mail,
    label: "Email us",
    value: SITE.email,
    hint: "Best for detailed briefs",
    href: `mailto:${SITE.email}`,
  },
  {
    icon: Phone,
    label: "Call us",
    value: SITE.phone,
    hint: "Mon–Fri, 9am–6pm ET",
    href: "tel:+12404228488",
  },
  {
    icon: MapPin,
    label: "Visit us",
    value: SITE.address,
    hint: "By appointment",
  },
  {
    icon: Clock,
    label: "Response time",
    value: "Within one business day",
    hint: "Usually much faster",
  },
];

const EXPECTATIONS = [
  "A reply from a specialist, not a sales script",
  "A short discovery call within 48 hours",
  "A scoped proposal with timeline and pricing",
];

function Contact() {
  const [service, setService] = useState("");
  const [sending, setSending] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let's talk about your <span className="text-gradient">next move</span>
          </>
        }
        subtitle="Training, virtual labs, security programs or AI enablement — tell us where you are and we'll map the path forward."
        crumb="Contact"
      />

      {/* CONTACT CARDS */}
      <section className="page-container">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CONTACT_CARDS.map((c, i) => {
            const inner = (
              <>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent text-primary transition-colors duration-300 group-hover:bg-[image:var(--gradient-brand)] group-hover:text-primary-foreground">
                  <c.icon className="h-5 w-5" />
                </span>
                <p className="mt-6 text-xs tracking-[0.14em] text-muted-foreground uppercase">
                  {c.label}
                </p>
                <p className="mt-2 font-display text-base leading-snug font-semibold break-words">
                  {c.value}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">{c.hint}</p>
              </>
            );
            return (
              <Reveal key={c.label} delay={i * 80}>
                {c.href ? (
                  <a
                    href={c.href}
                    className="lift-hover group flex h-full flex-col rounded-[1.75rem] border border-border/80 bg-card p-7 shadow-soft"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="lift-hover group flex h-full flex-col rounded-[1.75rem] border border-border/80 bg-card p-7 shadow-soft">
                    {inner}
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* AI ASSISTANT ENTRY */}
      <section className="page-container mt-14">
        <Reveal>
          <div className="glass-panel relative overflow-hidden rounded-[2rem] p-7 shadow-lift sm:p-9">
            <div className="bg-mesh pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
            <div className="glow-orb -right-10 top-0 h-48 w-48 opacity-30" aria-hidden="true" />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[image:var(--gradient-brand)] text-primary-foreground shadow-soft">
                  <MessagesSquare className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-display text-xl font-semibold">
                    In a hurry? Ask Nova, our AI assistant
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    Get instant answers on trainings, labs and pricing — then send your request
                    straight to the team.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="hero"
                  size="lg"
                  className="rounded-full"
                  onClick={() => openChat({ prefill: "I'd like to submit a request" })}
                >
                  Chat now
                  <ArrowRight />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full"
                  onClick={() => openChat({ prefill: "How much do your trainings cost?" })}
                >
                  Ask about pricing
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FORM + SIDE */}
      <section className="page-container section-pad">
        <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <Reveal>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const fd = new FormData(form);
                setSending(true);
                try {
                  await apiPost("/contact", {
                    name: String(fd.get("name") || "").trim(),
                    email: String(fd.get("email") || "").trim(),
                    company: String(fd.get("company") || "").trim() || null,
                    service: service || null,
                    message: String(fd.get("message") || "").trim(),
                  });
                  toast.success("Message sent", {
                    description: "Thanks — a specialist will reply within one business day.",
                  });
                  form.reset();
                  setService("");
                } catch (err) {
                  toast.error(err instanceof Error ? err.message : "Could not send message");
                } finally {
                  setSending(false);
                }
              }}
              className="glass-panel relative overflow-hidden rounded-[2rem] p-8 shadow-lift sm:p-10"
            >
              <div
                className="bg-mesh pointer-events-none absolute inset-x-0 top-0 h-48 opacity-70"
                aria-hidden="true"
              />
              <div className="relative">
                <Eyebrow>Send a message</Eyebrow>
                <h2 className="display-title mt-5 text-2xl sm:text-3xl">
                  Tell us about your challenge
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Fill in the form and we'll get back to you with concrete next steps.
                </p>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full name</Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      placeholder="Ada Lovelace"
                      className="h-12 rounded-xl"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      className="h-12 rounded-xl"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="company">Company (optional)</Label>
                    <Input
                      id="company"
                      name="company"
                      placeholder="Acme Inc."
                      className="h-12 rounded-xl"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="service">Service of interest</Label>
                    <Select value={service} onValueChange={setService}>
                      <SelectTrigger id="service" className="h-12 rounded-xl">
                        <SelectValue placeholder="Choose a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {CORE_SERVICES.map((s) => (
                          <SelectItem key={s.slug} value={s.slug}>
                            {s.title}
                          </SelectItem>
                        ))}
                        <SelectItem value="training">Certification training</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2 sm:col-span-2">
                    <Label htmlFor="message">How can we help?</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell us about your team, timeline and goals…"
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="xl"
                  disabled={sending}
                  className="mt-8 w-full rounded-full sm:w-auto"
                >
                  {sending ? "Sending…" : "Send message"}
                  <ArrowRight />
                </Button>
                <p className="mt-4 text-xs text-muted-foreground">
                  We respect your privacy and will never share your details with third parties.
                </p>
              </div>
            </form>
          </Reveal>

          <Reveal delay={100}>
            <div className="flex h-full flex-col gap-6">
              <div className="overflow-hidden rounded-[2rem] border border-border/80 bg-card shadow-lift">
                <img
                  src={contactVisual}
                  alt="Illustration of message bubbles, an envelope and a map pin"
                  loading="lazy"
                  width={1200}
                  height={912}
                  className="w-full object-cover"
                />
              </div>

              <div className="rounded-[2rem] border border-border/80 bg-card p-8 shadow-soft">
                <h3 className="font-display text-lg font-semibold">What happens next</h3>
                <ul className="mt-5 grid gap-3">
                  {EXPECTATIONS.map((e) => (
                    <li key={e} className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-brand)] text-primary-foreground">
                        <Check className="h-3 w-3" />
                      </span>
                      <span className="text-sm text-muted-foreground">{e}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative flex-1 overflow-hidden rounded-[2rem] bg-ink p-8 text-ink-foreground shadow-lift ring-1 ring-white/10">
                <div className="bg-mesh pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
                <div className="glow-orb -right-6 -bottom-6 h-36 w-36 opacity-40" aria-hidden="true" />
                <div className="relative flex h-full flex-col">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10">
                    <MessagesSquare className="h-5 w-5" />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold">Prefer to chat?</h3>
                  <p className="mt-3 text-sm opacity-80">
                    Our assistant is available 24/7 in the bottom-right corner for quick answers on
                    services, trainings and labs.
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm opacity-75">
                    <CalendarClock className="h-4 w-4" />
                    Discovery calls within 48 hours
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative overflow-hidden bg-surface section-pad">
        <div className="bg-halo pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-4xl px-4 sm:px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Before you write"
              title="Quick answers to common questions"
              subtitle="If your question isn't here, the form above reaches a real specialist."
            />
          </Reveal>
          <Reveal delay={90}>
            <Accordion type="single" collapsible className="mt-12 w-full">
              {FAQS.map((f, i) => (
                <AccordionItem
                  key={f.q}
                  value={`c-${i}`}
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
          <Reveal delay={140}>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button asChild variant="hero" size="lg" className="rounded-full">
                <Link to="/services">
                  Browse services
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link to="/about">About us</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
