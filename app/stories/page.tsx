import { getAllStories } from "@/lib/mdx";
import StoryCard from "@/components/story-card";
import { BookOpen } from "lucide-react";

export const metadata = {
  title: "Stories",
  description:
    "The people, places, and traditions behind every item on World Specialties.",
};

export default function StoriesPage() {
  const stories = getAllStories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="max-w-2xl mb-16">
        <div className="flex items-center gap-2 text-saffron text-sm font-semibold uppercase tracking-widest mb-4">
          <BookOpen className="w-4 h-4" />
          <span>Our stories</span>
        </div>
        <h1
          className="text-5xl font-bold text-charcoal mb-6 leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Craft, Culture & the People Behind the Products
        </h1>
        <p className="text-charcoal/60 text-lg leading-relaxed">
          Every item on World Specialties has a story. We travel to the source,
          meet the makers, and bring those stories back. Because knowing where
          something came from makes it taste, feel, and mean more.
        </p>
      </div>

      {/* Stories grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((story) => (
          <StoryCard key={story.slug} story={story} />
        ))}
      </div>

      {stories.length === 0 && (
        <div className="text-center py-20 text-charcoal/40">
          No stories yet. Check back soon.
        </div>
      )}
    </div>
  );
}
