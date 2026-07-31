import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock } from "lucide-react";
import { apiGet } from "@/lib/api";

type BlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content_html: string;
  category: string | null;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  published_at: string | null;
  read_time_minutes: number | null;
  seo_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  canonical_url: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  author_name: string | null;
};

type BlogResponse = { success: boolean; data: BlogPost };

const SITE_URL = import.meta.env.VITE_SITE_URL || "https://onetechnations.com";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    try {
      const res = await apiGet<BlogResponse>(`/blogs/slug/${params.slug}`);
      return res.data;
    } catch {
      throw notFound();
    }
  },
  head: ({ loaderData }) => {
    const post = loaderData;
    if (!post) return {};
    const title = post.seo_title || `${post.title} | One Tech Nations`;
    const description = post.meta_description || post.excerpt || "";
    const canonical = post.canonical_url || `${SITE_URL}/blog/${post.slug}`;
    const ogTitle = post.og_title || post.title;
    const ogDescription = post.og_description || description;
    const ogImage = post.og_image || post.cover_image_url || "";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        ...(post.meta_keywords ? [{ name: "keywords", content: post.meta_keywords }] : []),
        { property: "og:title", content: ogTitle },
        { property: "og:description", content: ogDescription },
        { property: "og:type", content: "article" },
        ...(ogImage ? [{ property: "og:image", content: ogImage }] : []),
        { property: "og:url", content: canonical },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: ogTitle },
        { name: "twitter:description", content: ogDescription },
      ],
      links: [{ rel: "canonical", href: canonical }],
    };
  },
  component: BlogPostPage,
});

function formatDate(value: string | null) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function BlogPostPage() {
  const post = Route.useLoaderData();

  const canonical = post.canonical_url || `${SITE_URL}/blog/${post.slug}`;
  const description = post.meta_description || post.excerpt || "";
  const ogImage = post.og_image || post.cover_image_url || "";
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description,
    image: ogImage || undefined,
    datePublished: post.published_at || undefined,
    author: post.author_name
      ? { "@type": "Person", name: post.author_name }
      : { "@type": "Organization", name: "One Tech Nations" },
    mainEntityOfPage: canonical,
  };

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to blog
      </Link>

      {post.category ? (
        <span className="mt-8 inline-flex rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
          {post.category}
        </span>
      ) : null}

      <h1 className="mt-5 font-display text-4xl leading-tight font-semibold text-balance sm:text-5xl">
        {post.title}
      </h1>

      <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <span>{formatDate(post.published_at)}</span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          {post.read_time_minutes || 5} min read
        </span>
        {post.author_name ? <span>By {post.author_name}</span> : null}
      </div>

      {post.cover_image_url ? (
        <img
          src={post.cover_image_url}
          alt={post.cover_image_alt || post.title}
          className="mt-10 w-full rounded-[1.5rem] border border-border object-cover"
          width={1200}
          height={675}
        />
      ) : null}

      {post.excerpt ? (
        <p className="mt-8 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
      ) : null}

      <div
        className="blog-prose mt-10"
        dangerouslySetInnerHTML={{ __html: post.content_html }}
      />
    </article>
  );
}
