import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, Clock } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { apiGet } from "@/lib/api";

type BlogListItem = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string | null;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  published_at: string | null;
  read_time_minutes: number | null;
};

type BlogListResponse = {
  success: boolean;
  data: BlogListItem[];
};

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog | AI, Cybersecurity & IT Insights — One Tech Nations" },
      {
        name: "description",
        content:
          "Latest updates and news on IT solutions, cybersecurity practice, applied AI and data privacy from the One Tech Nations team.",
      },
      { property: "og:title", content: "One Tech Nations Blog" },
      {
        property: "og:description",
        content: "Perspectives on IT solutions, cybersecurity, applied AI and data privacy.",
      },
    ],
  }),
  component: Blog,
});

function formatDate(value: string | null) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function Blog() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["blogs", "published"],
    queryFn: () => apiGet<BlogListResponse>("/blogs?limit=24"),
  });

  const posts = data?.data || [];
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHero
        eyebrow="News post"
        title={
          <>
            Latest <span className="text-gradient">updates and news</span>
          </>
        }
        subtitle="Field notes from practitioners working across AI, cyber defense and IT strategy."
        crumb="Blog"
      />

      <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 sm:pb-28">
        {isLoading ? <p className="text-muted-foreground">Loading posts…</p> : null}
        {isError ? (
          <p className="text-muted-foreground">
            Blog posts are temporarily unavailable. Please check back soon.
          </p>
        ) : null}
        {!isLoading && !isError && posts.length === 0 ? (
          <p className="text-muted-foreground">No published posts yet. Check back soon.</p>
        ) : null}

        {featured ? (
          <Reveal>
            <article className="group grid overflow-hidden rounded-[2rem] border border-border bg-card lg:grid-cols-2">
              <div className="relative aspect-[16/10] overflow-hidden bg-surface-2 lg:aspect-auto">
                {featured.cover_image_url ? (
                  <img
                    src={featured.cover_image_url}
                    alt={featured.cover_image_alt || featured.title}
                    loading="lazy"
                    width={900}
                    height={700}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full min-h-[16rem] w-full bg-[image:var(--gradient-brand)] opacity-80" />
                )}
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-12">
                {featured.category ? (
                  <span className="w-fit rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                    {featured.category}
                  </span>
                ) : null}
                <h2 className="mt-5 font-display text-3xl leading-tight font-semibold text-balance">
                  {featured.title}
                </h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">{featured.excerpt}</p>
                <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{formatDate(featured.published_at)}</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {featured.read_time_minutes || 5} min read
                  </span>
                </div>
                <Button asChild variant="hero" className="mt-8 self-start">
                  <Link to="/blog/$slug" params={{ slug: featured.slug }}>
                    Read more
                    <ArrowUpRight />
                  </Link>
                </Button>
              </div>
            </article>
          </Reveal>
        ) : null}

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
              <article className="lift-hover group flex h-full flex-col rounded-3xl border border-border bg-card p-7">
                {p.category ? (
                  <span className="w-fit rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                    {p.category}
                  </span>
                ) : null}
                <h2 className="mt-4 font-display text-xl leading-snug font-semibold transition-colors group-hover:text-primary">
                  {p.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {p.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                  <span>
                    {formatDate(p.published_at)} · {p.read_time_minutes || 5} min read
                  </span>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: p.slug }}
                    className="inline-flex items-center gap-1 font-medium text-primary"
                  >
                    Read more
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
