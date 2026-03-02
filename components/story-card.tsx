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
  });

  return (
    <Link
      href={`/stories/${story.slug}`}
      className="group block relative overflow-hidden"
      style={{ borderRadius: 12, textDecoration: "none" }}
    >
      {/* Full-bleed image — 3:4 portrait ratio, editorial magazine style */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
        <Image
          src={story.coverImage}
          alt={story.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Gradient — dark at bottom for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.18) 40%, rgba(0,0,0,0.88) 100%)",
          }}
        />

        {/* Region badge — top left */}
        <div className="absolute top-4 left-4">
          <span
            style={{
              fontSize: "9px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: "#F59E0B",
              background: "rgba(6,15,30,0.75)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(245,158,11,0.3)",
              padding: "4px 10px",
              borderRadius: 4,
            }}
          >
            {story.region} · {story.country}
          </span>
        </div>

        {/* Text content over image */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p
            style={{
              fontSize: "10px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.42)",
              marginBottom: 10,
              fontWeight: 500,
            }}
          >
            {formattedDate} · {story.author}
          </p>

          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(18px, 2vw, 23px)",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.18,
              letterSpacing: "-0.01em",
              marginBottom: 10,
            }}
          >
            {story.title}
          </h3>

          <p
            style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.6,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical" as const,
              marginBottom: 14,
            }}
          >
            {story.excerpt}
          </p>

          <span
            style={{
              fontSize: "10px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: "#F59E0B",
              transition: "opacity 0.3s",
            }}
          >
            Read Story →
          </span>
        </div>
      </div>
    </Link>
  );
}
