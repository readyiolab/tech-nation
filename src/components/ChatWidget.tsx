import { useEffect, useRef, useState } from "react";
import { X, Send, Bot } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { OPEN_CHAT_EVENT, type OpenChatDetail } from "@/lib/chat-bus";
import { apiPost } from "@/lib/api";

type Msg = { role: "bot" | "user"; text: string };

const QUICK = [
  "What services do you offer?",
  "Tell me about the free ISO trainings",
  "How do virtual labs work?",
  "How can I contact you?",
];

const WELCOME_POPUP =
  "Hi! I'm Nova 🤖 — your AI guide. Need help with services, trainings, or labs? Ask me anything!";

const POPUP_SESSION_KEY = "otn-chat-welcome-seen";

function answer(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("iso") || q.includes("free") || q.includes("certif"))
    return "Our ISO 27001 Lead Auditor and ISO 42001 (AI Management Systems) trainings are free — you only cover the certification exam fee ($340 and $360). Both include recorded sessions, live classes and placement support.";
  if (q.includes("lab"))
    return "Interactive virtual labs give you hands-on time with real AI and cybersecurity tooling in a safe, controlled environment — the same workflows you'd run on a live SOC shift.";
  if (q.includes("soc"))
    return "SOC Analyst Training puts you at the front line: traffic monitoring, triage and response drills, plus a portfolio you can show hiring managers. Seats are limited each cohort.";
  if (q.includes("price") || q.includes("cost") || q.includes("fee"))
    return "Training pricing depends on the track — several programs are free apart from the exam fee. Share your goals on the contact page and we'll send an exact quote.";
  if (q.includes("contact") || q.includes("call") || q.includes("email"))
    return "Reach us at techsupport@onetechnations.com or +1 240 422 8488. The contact page form routes straight to our team and we reply within one business day.";
  if (q.includes("ai") || q.includes("artificial"))
    return "On the AI side we run skill development programs, a project collaboration platform, and a mentorship initiative pairing you with experienced practitioners.";
  if (q.includes("service") || q.includes("offer") || q.includes("do you"))
    return "We cover six areas: Tech Solution, Cybersecurity, Artificial Intelligence, Tech Analysis, IT Consultation and Market Analysis. The Services page breaks each one down.";
  return "Good question. I can help with services, trainings, virtual labs, pricing and getting in touch. For anything deeper, the contact form reaches a human on our team quickly.";
}

function RobotAvatar({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative grid place-items-center overflow-hidden rounded-2xl bg-[image:var(--gradient-brand)] text-primary-foreground shadow-soft",
        className,
      )}
    >
      <span
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_55%)]"
        aria-hidden="true"
      />
      <Bot className="relative h-[55%] w-[55%]" strokeWidth={2.2} aria-hidden="true" />
      <span
        className="absolute right-1.5 bottom-1.5 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-white/80"
        aria-hidden="true"
      />
    </span>
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [value, setValue] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "bot",
      text: "Hi, I'm Nova — your robot assistant at One Tech Nations. Ask me about our services, trainings or labs.",
    },
  ]);
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [msgs, typing, open]);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent<OpenChatDetail>).detail ?? {};
      setShowPopup(false);
      setOpen(true);
      if (detail.prefill) setValue(detail.prefill);
      window.setTimeout(() => inputRef.current?.focus(), 120);
    };
    window.addEventListener(OPEN_CHAT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, onOpen);
  }, []);

  // Welcome popup when visitor lands
  useEffect(() => {
    try {
      if (sessionStorage.getItem(POPUP_SESSION_KEY)) return;
    } catch {
      /* ignore */
    }

    const showTimer = window.setTimeout(() => {
      setShowPopup(true);
      try {
        sessionStorage.setItem(POPUP_SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
    }, 1800);

    const hideTimer = window.setTimeout(() => setShowPopup(false), 12000);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    if (open) setShowPopup(false);
  }, [open]);

  const persistLead = (transcript: Msg[]) => {
    if (transcript.length < 3) return;
    const lastUser = [...transcript].reverse().find((m) => m.role === "user");
    void apiPost("/chatbot/leads", {
      transcript,
      summary: lastUser?.text?.slice(0, 500) || "Chatbot conversation",
      page_url: typeof window !== "undefined" ? window.location.href : null,
    }).catch(() => {
      /* non-blocking */
    });
  };

  const send = (text: string) => {
    const clean = text.trim();
    if (!clean) return;
    const userMsg: Msg = { role: "user", text: clean };
    setMsgs((m) => [...m, userMsg]);
    setValue("");
    setTyping(true);
    window.setTimeout(() => {
      const botMsg: Msg = { role: "bot", text: answer(clean) };
      setTyping(false);
      setMsgs((m) => {
        const next = [...m, botMsg];
        if (next.filter((x) => x.role === "user").length >= 2) {
          persistLead(next);
        }
        return next;
      });
    }, 700);
  };

  const openChat = () => {
    setShowPopup(false);
    setOpen(true);
    window.setTimeout(() => inputRef.current?.focus(), 120);
  };

  return (
    <>
      {/* Welcome popup bubble */}
      {showPopup && !open ? (
        <div
          className="animate-rise fixed right-4 bottom-[calc(5.25rem+env(safe-area-inset-bottom))] z-50 w-[min(18.5rem,calc(100vw-5.5rem))] sm:right-6 sm:bottom-[6.5rem]"
          role="dialog"
          aria-label="Chat welcome message"
        >
          <div className="relative rounded-2xl rounded-br-md border border-border/80 bg-card px-4 py-3.5 shadow-lift">
            <button
              type="button"
              onClick={() => setShowPopup(false)}
              aria-label="Dismiss welcome message"
              className="absolute top-2 right-2 grid h-7 w-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            <div className="flex gap-3 pr-5">
              <RobotAvatar className="h-10 w-10 shrink-0" />
              <div className="min-w-0">
                <p className="font-display text-sm font-semibold text-foreground">Nova</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{WELCOME_POPUP}</p>
                <button
                  type="button"
                  onClick={openChat}
                  className="mt-2.5 text-xs font-semibold text-primary hover:underline"
                >
                  Chat with me →
                </button>
              </div>
            </div>
            <span
              className="absolute -bottom-2 right-6 h-4 w-4 rotate-45 border-r border-b border-border/80 bg-card"
              aria-hidden="true"
            />
          </div>
        </div>
      ) : null}

      {/* Robot launcher */}
      <button
        type="button"
        onClick={() => (open ? setOpen(false) : openChat())}
        aria-label={open ? "Close assistant" : "Open robot assistant"}
        className={cn(
          "fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 transition-transform duration-300 hover:scale-105 sm:right-6 sm:bottom-6",
          !open && "animate-pulse-ring rounded-2xl",
        )}
      >
        {open ? (
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-ink text-ink-foreground shadow-lift">
            <X className="h-6 w-6" />
          </span>
        ) : (
          <RobotAvatar className="h-14 w-14 shadow-[var(--shadow-glow)] ring-4 ring-primary/15" />
        )}
      </button>

      {open ? (
        <div className="animate-rise fixed right-4 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-50 flex h-[min(30rem,calc(100dvh-8.5rem))] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-[1.75rem] border border-border/80 bg-card shadow-lift ring-1 ring-primary/10 sm:right-6 sm:bottom-24 sm:h-[30rem]">
          <div className="relative flex items-center gap-3 overflow-hidden border-b border-white/10 bg-[image:var(--gradient-brand)] px-4 py-3.5 text-primary-foreground">
            <RobotAvatar className="relative h-10 w-10 shrink-0 ring-1 ring-white/30" />
            <div className="relative min-w-0">
              <p className="truncate font-display text-sm font-semibold">Nova · Robot Assistant</p>
              <p className="flex items-center gap-1.5 text-xs opacity-85">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
                Online · replies instantly
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="relative ml-auto grid h-8 w-8 place-items-center rounded-lg text-white/80 transition-colors hover:bg-white/15 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-surface px-4 py-4">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "flex gap-2",
                  m.role === "user" ? "justify-end" : "items-end",
                )}
              >
                {m.role === "bot" ? <RobotAvatar className="mb-0.5 h-7 w-7 shrink-0" /> : null}
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                    m.role === "bot"
                      ? "rounded-bl-sm border border-border bg-card text-foreground"
                      : "rounded-br-sm bg-primary text-primary-foreground",
                  )}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {typing ? (
              <div className="flex items-end gap-2">
                <RobotAvatar className="h-7 w-7 shrink-0" />
                <div className="flex w-16 gap-1 rounded-2xl rounded-bl-sm border border-border bg-card px-3.5 py-3">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground"
                      style={{ animationDelay: `${d * 120}ms` }}
                    />
                  ))}
                </div>
              </div>
            ) : null}
            {msgs.length === 1 ? (
              <div className="flex flex-wrap gap-2 pt-1 pl-9">
                {QUICK.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => send(q)}
                    className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    {q}
                  </button>
                ))}
              </div>
            ) : null}
            <div ref={endRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(value);
            }}
            className="flex items-center gap-2 border-t border-border bg-card px-3 py-3"
          >
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Ask Nova…"
              aria-label="Message"
              className="h-10 min-w-0 flex-1 rounded-full border border-border bg-surface px-4 text-sm outline-none focus:border-primary/50"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

          <p className="border-t border-border bg-card px-4 pb-3 text-center text-xs text-muted-foreground">
            Need a human?{" "}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="font-medium text-primary hover:underline"
            >
              Submit a request
            </Link>
          </p>
        </div>
      ) : null}
    </>
  );
}
