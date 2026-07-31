import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { TESTIMONIALS } from "@/data/site";

export function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = TESTIMONIALS.length;
  const touchX = useRef<number | null>(null);

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count],
  );

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => go(1), 6500);
    return () => window.clearInterval(id);
  }, [paused, go]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
      aria-roledescription="carousel"
    >
      <div className="overflow-hidden rounded-[2rem]">
        <div
          className="flex transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={t.author}
              aria-hidden={i !== index}
              className="w-full shrink-0 px-1"
            >
              <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-8 shadow-soft sm:p-12">
                <div
                  className="bg-mesh pointer-events-none absolute inset-0 opacity-40"
                  aria-hidden="true"
                />
                <div className="relative">
                  <Quote className="h-9 w-9 text-primary/25" />
                  <p className="mt-5 font-display text-xl leading-snug font-semibold sm:text-2xl">
                    {t.title}
                  </p>
                  <blockquote className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-8 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-t border-border pt-6">
                    <span className="flex min-w-0 items-center gap-3">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-brand)] font-display text-sm font-semibold text-primary-foreground">
                        {t.author[0]}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold">{t.author}</span>
                        <span className="block text-xs text-muted-foreground">{t.role}</span>
                      </span>
                    </span>
                    <span className="flex shrink-0 gap-0.5">
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} className="h-4 w-4 fill-amber text-amber" />
                      ))}
                    </span>
                  </figcaption>
                </div>
              </div>
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-7 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <div className="flex min-w-0 items-center gap-2">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.author}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show testimonial from ${t.author}`}
              aria-current={i === index}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                i === index
                  ? "w-10 bg-[image:var(--gradient-brand)]"
                  : "w-4 bg-border hover:bg-primary/40",
              )}
            />
          ))}
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-foreground transition-all duration-300 hover:-translate-x-0.5 hover:border-primary/40 hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-foreground transition-all duration-300 hover:translate-x-0.5 hover:border-primary/40 hover:text-primary"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
