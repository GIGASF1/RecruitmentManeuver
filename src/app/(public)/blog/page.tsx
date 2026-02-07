import Link from "next/link";
import { ArrowRight, Calendar, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { client } from "@/sanity/client";

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string | null;
  author: string | null;
  publishedAt: string;
  category: string | null;
  featured: boolean;
  mainImage: { alt: string } | null;
}

const POSTS_QUERY = `*[_type == "blogPost"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  author,
  publishedAt,
  category,
  featured,
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

// Placeholder posts shown when Sanity is not configured
const placeholderPosts: BlogPost[] = [
  {
    _id: "placeholder-1",
    title: "Why Specialty-Specific Recruiting Matters in PCCM",
    slug: { current: "specialty-specific-recruiting" },
    excerpt:
      "Generic job boards miss the nuances that make or break a PCCM career match. From ICU staffing models to procedural volume expectations, specialty-specific recruiting delivers better outcomes for physicians and employers alike.",
    author: "Dr. Sarah Mitchell",
    publishedAt: "2025-12-15T00:00:00Z",
    category: "pccm-industry",
    featured: true,
    mainImage: null,
  },
  {
    _id: "placeholder-2",
    title: "How AI is Transforming Physician Recruitment in 2026",
    slug: { current: "ai-transforming-recruitment" },
    excerpt:
      "From automated credential verification to intelligent candidate matching, AI tools are reshaping how health systems find and hire physicians. Here's what PCCM programs need to know.",
    author: "James Chen",
    publishedAt: "2025-11-28T00:00:00Z",
    category: "ai-technology",
    featured: false,
    mainImage: null,
  },
  {
    _id: "placeholder-3",
    title: "5 Questions Every PCCM Fellow Should Ask During Interviews",
    slug: { current: "fellow-interview-questions" },
    excerpt:
      "Finishing fellowship? These five questions will help you evaluate whether a practice truly aligns with your clinical interests, lifestyle priorities, and long-term career goals.",
    author: "Maria Gonzalez",
    publishedAt: "2025-11-10T00:00:00Z",
    category: "career-advice",
    featured: false,
    mainImage: null,
  },
  {
    _id: "placeholder-4",
    title: "Reducing Time-to-Hire: A Data-Driven Approach for PCCM Programs",
    slug: { current: "reducing-time-to-hire" },
    excerpt:
      "PCCM vacancy costs average $7,500 per day. Learn how structured AI screening and intelligent matching can cut your time-to-hire by 60% while improving candidate quality.",
    author: "Dr. Sarah Mitchell",
    publishedAt: "2025-10-22T00:00:00Z",
    category: "recruiting-tips",
    featured: false,
    mainImage: null,
  },
];

export default async function BlogPage() {
  let posts: BlogPost[] = [];
  let usingSanity = false;

  try {
    if (client) {
      posts = await client.fetch<BlogPost[]>(POSTS_QUERY);
      usingSanity = true;
    }
  } catch {
    // Sanity not configured or no posts — fall through to placeholders
  }

  if (posts.length === 0) {
    posts = placeholderPosts;
  }

  const featuredPost = posts.find((p) => p.featured) || posts[0];
  const remainingPosts = posts.filter((p) => p._id !== featuredPost._id);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <Badge className="mb-4 border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-300 hover:bg-blue-500/10">
            Blog &amp; Insights
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            PCCM Recruiting{" "}
            <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Insights
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
            Expert perspectives on physician recruitment, career development,
            and the future of Pulmonary &amp; Critical Care Medicine.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="mx-auto -mt-8 max-w-7xl px-4 sm:px-6">
          <Card className="overflow-hidden border-blue-200 shadow-lg">
            <div className="grid lg:grid-cols-2">
              <div className="flex h-48 items-center justify-center bg-gradient-to-br from-blue-100 to-teal-50 lg:h-auto">
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/10">
                    <Tag className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="mt-2 text-sm font-medium text-slate-500">
                    Featured Article
                  </p>
                </div>
              </div>
              <div className="p-8 lg:p-10">
                {featuredPost.category && (
                  <Badge className="mb-3 border-teal-200 bg-teal-50 text-xs font-medium text-teal-700 hover:bg-teal-50">
                    {categoryLabels[featuredPost.category] ||
                      featuredPost.category}
                  </Badge>
                )}
                <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  {featuredPost.title}
                </h2>
                {featuredPost.excerpt && (
                  <p className="mt-3 text-base leading-relaxed text-slate-600">
                    {featuredPost.excerpt}
                  </p>
                )}
                <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
                  {featuredPost.author && (
                    <span className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5" />
                      {featuredPost.author}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(featuredPost.publishedAt)}
                  </span>
                </div>
                <div className="mt-6">
                  <Button
                    className="bg-blue-600 font-semibold hover:bg-blue-700"
                    asChild
                  >
                    <Link
                      href={
                        usingSanity
                          ? `/blog/${featuredPost.slug.current}`
                          : "#"
                      }
                    >
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </section>
      )}

      {/* Post Grid */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="mb-10 text-2xl font-bold text-slate-900">
            Latest Articles
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {remainingPosts.map((post) => (
              <Card
                key={post._id}
                className="group flex flex-col border-slate-200 transition-all hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex h-36 items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                    <Tag className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <CardHeader className="flex-1 pb-3">
                  {post.category && (
                    <Badge className="mb-2 w-fit border-slate-200 bg-slate-50 text-xs font-medium text-slate-600 hover:bg-slate-50">
                      {categoryLabels[post.category] || post.category}
                    </Badge>
                  )}
                  <CardTitle className="text-lg font-bold leading-snug text-slate-900 group-hover:text-blue-700">
                    {usingSanity ? (
                      <Link href={`/blog/${post.slug.current}`}>
                        {post.title}
                      </Link>
                    ) : (
                      post.title
                    )}
                  </CardTitle>
                  {post.excerpt && (
                    <CardDescription className="mt-2 line-clamp-3 text-sm text-slate-600">
                      {post.excerpt}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    {post.author && (
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {post.author}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(post.publishedAt)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {!usingSanity && (
            <div className="mt-12 rounded-xl border border-blue-200 bg-blue-50 p-6 text-center">
              <p className="text-sm font-medium text-blue-800">
                These are placeholder articles. Connect Sanity CMS to manage
                real blog content.
              </p>
              <p className="mt-1 text-xs text-blue-600">
                Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> in your
                environment variables to get started.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-teal-600 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to Find Your Ideal PCCM Role?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-blue-100">
            Join the platform built exclusively for Pulmonary &amp; Critical
            Care Medicine physicians and employers.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="bg-white font-semibold text-blue-700 hover:bg-slate-100"
              asChild
            >
              <Link href="/signup">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
