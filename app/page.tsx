import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllProducts } from "@/lib/products";
import { getAllStories } from "@/lib/mdx";
import StoryCard from "@/components/story-card";
import GlobeHeroSection from "@/components/globe-hero-section";

export default function HomePage() {
  const allProducts = getAllProducts();
  const stories = getAllStories().slice(0, 3);

  return (
    <>
      {/* ── GLOBE HERO — full screen, interactive ────────────────── */}
      <GlobeHeroSection products={allProducts} />

      {/* ── MISSION STATEMENT — OceanX stark white reveal ─────────── */}
      <section
        style={{ background: "#ffffff" }}
        className="py-28 md:py-36"
      >
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#F59E0B",
              fontWeight: 600,
              marginBottom: 28,
            }}
          >
            Our mission
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 5vw, 58px)",
              fontWeight: 700,
              color: "#0a1628",
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              marginBottom: 32,
            }}
          >
            A world where every extraordinary
            <br className="hidden md:block" /> thing finds its way to your door.
          </h2>
          <p
            style={{
              fontSize: "17px",
              color: "#64748b",
              lineHeight: 1.75,
              maxWidth: 620,
              margin: "0 auto 40px",
            }}
          >
            We travel the world to find artisans, small producers, and makers
            of exceptional things — and we bring their work directly to you.
            Every product carries a story. Every purchase supports a craftsperson.
          </p>
          <Link
            href="/stories"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#0a1628",
              color: "#ffffff",
              padding: "14px 32px",
              borderRadius: 8,
              fontSize: "12px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 600,
              textDecoration: "none",
              transition: "background 0.2s",
            }}
          >
            Read the Stories <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ── STORIES — editorial grid on dark ──────────────────────── */}
      <section
        id="stories"
        style={{ background: "#0a1628" }}
        className="py-24 md:py-32"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "#F59E0B",
                  fontWeight: 600,
                  marginBottom: 14,
                }}
              >
                While you wait
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(28px, 4vw, 46px)",
                  fontWeight: 700,
                  color: "#ffffff",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                }}
              >
                Stories &amp; Craft
              </h2>
            </div>
            <Link
              href="/stories"
              className="hidden sm:flex items-center gap-2"
              style={{
                color: "rgba(255,255,255,0.35)",
                fontSize: "11px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              All stories <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {stories.map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
          </div>
        </div>
      </section>

      {/* ── BECOME A VENDOR ────────────────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(135deg, #064e3b 0%, #065f46 100%)",
        }}
        className="py-28"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <p
              style={{
                fontSize: "10px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#F59E0B",
                fontWeight: 600,
                marginBottom: 20,
              }}
            >
              Partner with us
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 5vw, 60px)",
                fontWeight: 700,
                color: "#ffffff",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                marginBottom: 24,
              }}
            >
              Do you make something
              <br />
              <span style={{ color: "#F59E0B" }}>extraordinary?</span>
            </h2>
            <p
              style={{
                fontSize: "17px",
                color: "rgba(255,255,255,0.62)",
                lineHeight: 1.75,
                maxWidth: 540,
                marginBottom: 40,
              }}
            >
              We handle the storefront, the marketing, and the customers. You
              focus on making exceptional products. If you produce specialty
              goods from anywhere in the world, we want to hear your story.
            </p>
            <Link
              href="/become-a-vendor"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#F59E0B",
                color: "#000",
                padding: "16px 36px",
                borderRadius: 8,
                fontSize: "12px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Apply to Become a Vendor <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── VALUE PROPS — clean white ──────────────────────────────── */}
      <section style={{ background: "#fafafa" }} className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
            {[
              {
                label: "Sourced Directly",
                body: "We work directly with artisans and small producers — no intermediaries, better prices, more money to the maker.",
                accent: "#F59E0B",
              },
              {
                label: "Authenticity Guaranteed",
                body: "Every product is verified for origin and authenticity. We visit producers and stand behind everything we sell.",
                accent: "#0D9488",
              },
              {
                label: "Ships Worldwide",
                body: "Our fulfillment partners ship from source to door with careful packaging and full tracking.",
                accent: "#F97316",
              },
            ].map(({ label, body, accent }) => (
              <div key={label}>
                <div
                  style={{
                    width: 3,
                    height: 32,
                    background: accent,
                    margin: "0 auto 20px",
                    borderRadius: 2,
                  }}
                />
                <h3
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#0a1628",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  {label}
                </h3>
                <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.7 }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
