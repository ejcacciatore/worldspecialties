import Link from "next/link";
import Image from "next/image";
import type { Story } from "@/lib/mdx";

interface StoryCardProps {
  story: Story;
}

export default function StoryCard({ story }: StoryCardProps) {
  const formattedDate = new Date(story.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link
      href={`/stories/${story.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-charcoal/5">
        <Image
          src={story.coverImage}
          alt={story.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/90 text-charcoal capitalize">
            {story.region} · {story.country}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-xs text-charcoal/40 mb-2">
          {formattedDate} · {story.author}
        </p>
        <h3
          className="font-display text-xl font-semibold text-charcoal mb-3 leading-snug group-hover:text-saffron transition-colors"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {story.title}
        </h3>
        <p className="text-sm text-charcoal/60 line-clamp-3 mb-4">
          {story.excerpt}
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          {story.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-saffron/10 text-saffron font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
