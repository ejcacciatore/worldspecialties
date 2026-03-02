import { getAllStories } from "@/lib/mdx";
import StoryCard from "@/components/story-card";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Stories",
  description:
    "The people, places, and traditions behind every item on World Specialties.",
};

export default function StoriesPage() {
  const stories = getAllStories();

  return (
    <>
      {/* ── Hero header — dark editorial ────────────────────────── */}
      <div
        style={{
          background: "linear-gradient(160deg, #060f1e 0%, #0a1628 60%, #0d1f3c 100%)",
          paddingTop: 68, // nav height
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
          <p
            style={{
              fontSize: "10px",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#F59E0B",
              fontWeight: 600,
              marginBottom: 20,
            }}
          >
            World Specialties Editorial
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 6vw, 74px)",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              marginBottom: 20,
              maxWidth: 760,
            }}
          >
            Craft, Culture &<br />
            <span style={{ color: "#F59E0B" }}>the People Behind</span>
            <br />
            the Products.
          </h1>
          <p
            style={{
              fontSize: "16px",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.75,
              maxWidth: 520,
            }}
          >
            We travel to the source, meet the makers, and bring their stories
            back. Every purchase supports a craftsperson.
          </p>
        </div>
      </div>

      {/* ── Stories grid ────────────────────────────────────────── */}
      <div
        style={{ background: "#0a1628" }}
        className="pb-24 md:pb-32"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {stories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {stories.map((story) => (
                <StoryCard key={story.slug} story={story} />
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "80px 0",
                color: "rgba(255,255,255,0.25)",
                fontSize: "14px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Stories coming soon.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
