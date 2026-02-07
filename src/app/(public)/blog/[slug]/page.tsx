import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { client } from "@/sanity/client";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "next-sanity";

interface BlogPostFull {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string | null;
  author: string | null;
  publishedAt: string;
  category: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any[];
  mainImage: { alt: string } | null;
}

const POST_QUERY = `*[_type == "blogPost" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  author,
  publishedAt,
  category,
  body,
  mainImage
}`;

const categoryLabels: Record<string, string> = {
  "pccm-industry": "PCCM Industry",
  "recruiting-tips": "Recruiting Tips",
  "career-advice": "Career Advice",
  "ai-technology": "AI & Technology",
  "platform-updates": "Platform Updates",
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mb-4 mt-10 text-2xl font-bold text-slate-900">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-8 text-xl font-semibold text-slate-900">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mb-2 mt-6 text-lg font-semibold text-slate-900">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="mb-4 text-base leading-7 text-slate-700">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-blue-300 bg-blue-50/50 py-3 pl-6 pr-4 text-slate-700 italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-slate-900">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm font-mono text-slate-800">
        {children}
      </code>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        className="text-blue-600 underline hover:text-blue-800"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 list-disc space-y-2 pl-6 text-slate-700">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 list-decimal space-y-2 pl-6 text-slate-700">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-7">{children}</li>,
    number: ({ children }) => <li className="leading-7">{children}</li>,
  },
};

export async function generateStaticParams() {
  if (!client) return [];

  try {
    const slugs = await client.fetch<{ slug: { current: string } }[]>(
      `*[_type == "blogPost"]{ slug }`
    );
    return slugs.map((post) => ({ slug: post.slug.current }));
  } catch {
    return [];
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!client) {
    notFound();
  }

  let post: BlogPostFull | null = null;
  try {
    post = await client.fetch<BlogPostFull>(POST_QUERY, { slug });
  } catch {
    notFound();
  }

  if (!post) notFound();

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-1 text-sm text-slate-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          {post.category && (
            <Badge className="mb-4 border-teal-400/30 bg-teal-500/10 px-3 py-1 text-sm font-medium text-teal-300 hover:bg-teal-500/10">
              {categoryLabels[post.category] || post.category}
            </Badge>
          )}

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-400">
            {post.author && (
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {post.author}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formatDate(post.publishedAt)}
            </span>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <article className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {post.body ? (
            <PortableText
              value={post.body}
              components={portableTextComponents}
            />
          ) : (
            <p className="text-slate-600">
              This post has no content yet. Add content in Sanity Studio.
            </p>
          )}

          <Separator className="my-12" />

          {/* Back to blog */}
          <div className="flex items-center justify-between">
            <Button variant="outline" asChild>
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                All Articles
              </Link>
            </Button>
            <div className="flex items-center gap-1.5 text-sm text-slate-500">
              <Tag className="h-3.5 w-3.5" />
              {post.category
                ? categoryLabels[post.category] || post.category
                : "Uncategorized"}
            </div>
          </div>
        </div>
      </article>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-teal-600 py-14">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-white">
            Find Your Ideal PCCM Role
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-blue-100">
            AI-powered matching for Pulmonary &amp; Critical Care Medicine
            physicians.
          </p>
          <div className="mt-6">
            <Button
              size="lg"
              className="bg-white font-semibold text-blue-700 hover:bg-slate-100"
              asChild
            >
              <Link href="/signup">Create Your Profile</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
