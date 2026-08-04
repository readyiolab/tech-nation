import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import heroClean from "@/assets/hero-clean.png";
import heroIllustration from "@/assets/hero-illustration.png";
import svcCardAi from "@/assets/svc-card-ai.jpg";
import svcCardCyber from "@/assets/svc-card-cyber.jpg";
import svcSecurity from "@/assets/svc-security.jpg";

const SLIDES = [
  {
    src: heroClean,
    alt: "Secure AI systems shield illustration",
    label: "Secure AI",
  },
  {
    src: heroIllustration,
    alt: "Technology infrastructure illustration",
    label: "IT Solutions",
  },
  {
    src: svcCardAi,
    alt: "Artificial intelligence training and systems",
    label: "Artificial Intelligence",
  },
  {
    src: svcCardCyber,
    alt: "Cybersecurity operations and defense",
    label: "Cybersecurity",
  },
  {
    src: svcSecurity,
    alt: "Security operations and risk practice",
    label: "Security Ops",
  },
] as const;

const AUTOPLAY_MS = 4500;

export function HeroCarousel({ className }: { className?: string }) {
  const [api, setApi] = useState<CarouselApi>();
  const [index, setIndex] = useState(0);

  const onSelect = useCallback((embla: NonNullable<CarouselApi>) => {
    setIndex(embla.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  useEffect(() => {
    if (!api) return;
    const id = window.setInterval(() => {
      if (api.canScrollNext()) api.scrollNext();
      else api.scrollTo(0);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [api]);

  return (
    <div className={cn("relative w-full", className)}>
      <div
        className="glow-orb-signal pointer-events-none absolute inset-[8%] opacity-45 blur-2xl"
        aria-hidden="true"
      />
      <Carousel
        setApi={setApi}
        opts={{ loop: true, align: "center" }}
        className="relative w-full"
      >
        <CarouselContent className="-ml-0">
          {SLIDES.map((slide) => (
            <CarouselItem key={slide.label} className="pl-0 basis-full">
              <div className="relative mx-auto aspect-square w-full max-w-lg overflow-hidden">
                <img
                  src={slide.src}
                  alt={slide.alt}
                  width={1024}
                  height={1024}
                  className="h-full w-full object-cover object-center [mask-image:radial-gradient(72%_72%_at_50%_45%,black_38%,transparent_100%)] drop-shadow-[0_30px_80px_color-mix(in_oklab,var(--hero-signal)_25%,transparent)]"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-[12%] flex justify-center">
                  <span className="rounded-full border border-white/15 bg-[color-mix(in_oklab,var(--hero-bg)_55%,transparent)] px-3.5 py-1 text-[0.7rem] font-medium tracking-[0.14em] text-[var(--hero-fg)] uppercase backdrop-blur-md">
                    {slide.label}
                  </span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => api?.scrollPrev()}
          className="absolute top-1/2 left-1 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-[color-mix(in_oklab,var(--hero-bg)_60%,transparent)] text-[var(--hero-fg)] backdrop-blur-md transition-colors hover:border-[color-mix(in_oklab,var(--hero-signal)_45%,transparent)] hover:text-[var(--hero-signal)] sm:left-2"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => api?.scrollNext()}
          className="absolute top-1/2 right-1 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-[color-mix(in_oklab,var(--hero-bg)_60%,transparent)] text-[var(--hero-fg)] backdrop-blur-md transition-colors hover:border-[color-mix(in_oklab,var(--hero-signal)_45%,transparent)] hover:text-[var(--hero-signal)] sm:right-2"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </Carousel>

      <div className="mt-4 flex items-center justify-center gap-2" role="tablist" aria-label="Hero slides">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.label}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Go to ${slide.label}`}
            onClick={() => api?.scrollTo(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === index
                ? "w-7 bg-[image:var(--gradient-signal)]"
                : "w-1.5 bg-white/30 hover:bg-white/55",
            )}
          />
        ))}
      </div>
    </div>
  );
}
