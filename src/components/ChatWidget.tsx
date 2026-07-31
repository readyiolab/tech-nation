import { useEffect, useRef, useState } from "react";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";
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

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "bot",
      text: "Hi, I'm Nova — the One Tech Nations assistant. Ask me about our services, trainings or labs.",
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
      setOpen(true);
      if (detail.prefill) setValue(detail.prefill);
      window.setTimeout(() => inputRef.current?.focus(), 120);
    };
    window.addEventListener(OPEN_CHAT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, onOpen);
  }, []);

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

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close assistant" : "Open assistant"}
        className={cn(
          "fixed right-4 bottom-4 z-50 grid h-14 w-14 place-items-center rounded-full bg-[image:var(--gradient-brand)] text-primary-foreground shadow-[var(--shadow-glow)] transition-transform duration-300 hover:scale-105 sm:right-6 sm:bottom-6",
          !open && "animate-pulse-ring",
        )}
      >
        {open ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>

      {open ? (
        <div className="animate-rise fixed right-4 bottom-22 z-50 flex h-[30rem] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-lift sm:right-6 sm:bottom-24">
          <div className="flex items-center gap-3 border-b border-border bg-[image:var(--gradient-brand)] px-4 py-3.5 text-primary-foreground">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-card/20">
              <Sparkles className="h-4.5 w-4.5" />
            </span>
            <div className="min-w-0">
              <p className="truncate font-display text-sm font-semibold">Nova Assistant</p>
              <p className="text-xs opacity-80">Typically replies instantly</p>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-surface px-4 py-4">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                  m.role === "bot"
                    ? "rounded-tl-sm border border-border bg-card text-foreground"
                    : "ml-auto rounded-tr-sm bg-primary text-primary-foreground",
                )}
              >
                {m.text}
              </div>
            ))}
            {typing ? (
              <div className="flex w-16 gap-1 rounded-2xl rounded-tl-sm border border-border bg-card px-3.5 py-3">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground"
                    style={{ animationDelay: `${d * 120}ms` }}
                  />
                ))}
              </div>
            ) : null}
            {msgs.length === 1 ? (
              <div className="flex flex-wrap gap-2 pt-1">
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
              placeholder="Ask a question…"
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
            <Link to="/contact" onClick={() => setOpen(false)} className="font-medium text-primary hover:underline">
              Submit a request
            </Link>
          </p>
        </div>
      ) : null}
    </>
  );
}
