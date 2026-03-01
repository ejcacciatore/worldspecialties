import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getStoryBySlug, getAllStories } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";

interface StoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const stories = getAllStories();
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) return {};
  return {
    title: story.title,
    description: story.excerpt,
  };
}

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-2xl font-bold text-charcoal mt-12 mb-4"
      style={{ fontFamily: "var(--font-display)" }}
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="text-xl font-semibold text-charcoal mt-8 mb-3"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-charcoal/70 leading-relaxed mb-6 text-lg" {...props} />
  ),
  hr: () => <hr className="border-charcoal/10 my-12" />,
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em className="text-charcoal italic" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-charcoal" {...props} />
  ),
};

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) notFound();

  const formattedDate = new Date(story.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back link */}
      <Link
        href="/stories"
        className="inline-flex items-center gap-2 text-sm text-charcoal/40 hover:text-charcoal transition-colors mb-10"
      >
        <ArrowLeft className="w-4 h-4" />
        All stories
      </Link>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {story.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-1 rounded-full bg-saffron/10 text-saffron font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h1
        className="text-4xl sm:text-5xl font-bold text-charcoal mb-6 leading-tight"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {story.title}
      </h1>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-charcoal/50 mb-10">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="w-4 h-4" />
          <span>
            {story.country} · {story.region}
          </span>
        </div>
        <span>{story.author}</span>
      </div>

      {/* Cover image */}
      <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-12 bg-charcoal/5">
        <Image
          src={story.coverImage}
          alt={story.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
          priority
        />
      </div>

      {/* Excerpt */}
      <p className="text-xl text-charcoal/80 italic leading-relaxed mb-12 border-l-4 border-saffron pl-6">
        {story.excerpt}
      </p>

      {/* MDX content */}
      <div className="prose prose-lg max-w-none">
        <MDXRemote source={story.content} components={mdxComponents} />
      </div>

      {/* CTA */}
      <div className="mt-16 p-8 bg-saffron/5 rounded-3xl border border-saffron/10">
        <h3
          className="text-xl font-bold text-charcoal mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Explore items from {story.country}
        </h3>
        <p className="text-charcoal/60 text-sm mb-4">
          Browse specialty goods from this region, sourced directly from
          artisans and small producers.
        </p>
        <Link
          href={`/regions/${story.region}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-saffron hover:text-coral transition-colors"
        >
          Shop {story.region} specialties →
        </Link>
      </div>
    </article>
  );
}
