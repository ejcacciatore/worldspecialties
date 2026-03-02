import Link from "next/link";
import { ArrowRight, Truck, Shield, Star } from "lucide-react";
import { getAllProducts } from "@/lib/products";
import { getAllStories } from "@/lib/mdx";
import StoryCard from "@/components/story-card";
import GlobeHeroSection from "@/components/globe-hero-section";
import NotifyForm from "@/components/notify-form";

export default function HomePage() {
  const allProducts = getAllProducts();
  const stories = getAllStories().slice(0, 3);

  return (
    <>
      {/* GLOBE HERO — full screen, dark navy, interactive */}
      <GlobeHeroSection products={allProducts} />

      {/* STORIES — dark navy continuation from globe */}
      <section
        id="stories"
        style={{ background: "#0a1628" }}
        className="py-28"
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
                  marginBottom: 12,
                }}
              >
                While you wait
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(28px, 4vw, 42px)",
                  fontWeight: 700,
                  color: "#ffffff",
                  lineHeight: 1.1,
                }}
              >
                Read the Stories
              </h2>
              <p
                style={{
                  color: "#94a3b8",
                  fontSize: "15px",
                  marginTop: 10,
                  maxWidth: 480,
                  lineHeight: 1.65,
                }}
              >
                Every product we carry has a story — of the hands that made it,
                the land it came from, and the tradition it carries forward.
              </p>
            </div>
            <Link
              href="/stories"
              className="hidden sm:flex items-center gap-2 transition-colors"
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "12px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              All stories <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stories.map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
          </div>

          <div className="mt-10 text-center md:hidden">
            <Link
              href="/stories"
              className="inline-flex items-center gap-2 text-sm"
              style={{ color: "#F59E0B", textDecoration: "none" }}
            >
              All stories <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* NOTIFY / FEEDBACK — be first to know */}
      <section
        style={{
          background: "linear-gradient(160deg, #060f1e 0%, #0d1f3c 100%)",
          borderTop: "1px solid rgba(245,158,11,0.1)",
        }}
        className="py-28"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-2xl">
            <p
              style={{
                fontSize: "10px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#F59E0B",
                fontWeight: 600,
                marginBottom: 12,
              }}
            >
              Be the first to know
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 700,
                color: "#ffffff",
                lineHeight: 1.1,
                marginBottom: 16,
              }}
            >
              We&apos;re almost ready.
              <br />
              <span style={{ color: "#F59E0B" }}>Tell us what you think.</span>
            </h2>
            <p
              style={{
                color: "#94a3b8",
                fontSize: "15px",
                lineHeight: 1.7,
                marginBottom: 36,
                maxWidth: 440,
              }}
            >
              Drop your email and share any thoughts — we read every single one.
              You&apos;ll be the first to know the moment we open.
            </p>
            <NotifyForm />
          </div>
        </div>
      </section>

      {/* BECOME A VENDOR CTA */}
      <section className="py-28 bg-forest">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-saffron uppercase tracking-widest mb-5">
              Partner with us
            </p>
            <h2
              className="text-4xl sm:text-5xl font-bold text-cream mb-6 leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Do you make something extraordinary?
            </h2>
            <p className="text-cream/70 text-lg mb-10 leading-relaxed max-w-2xl">
              We handle the storefront, the marketing, and the customers. You
              focus on making exceptional products. If you produce specialty
              goods from anywhere in the world, we want to hear your story.
            </p>
            <Link
              href="/become-a-vendor"
              className="inline-flex items-center gap-2 bg-saffron hover:bg-amber-500 text-white font-semibold px-8 py-4 rounded-xl transition-all text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Apply to Become a Vendor
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="py-20 bg-white border-t border-charcoal/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
            <div>
              <div className="w-12 h-12 bg-saffron/10 rounded-full flex items-center justify-center mx-auto mb-5">
                <Star className="w-5 h-5 text-saffron" />
              </div>
              <h3 className="font-semibold text-charcoal mb-2">Sourced Directly</h3>
              <p className="text-sm text-charcoal/55 leading-relaxed">
                We work directly with artisans and small producers — no intermediaries,
                better prices, more money to the maker.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-5">
                <Shield className="w-5 h-5 text-teal" />
              </div>
              <h3 className="font-semibold text-charcoal mb-2">Authenticity Guaranteed</h3>
              <p className="text-sm text-charcoal/55 leading-relaxed">
                Every product is verified for origin and authenticity. We visit
                producers and stand behind every item we sell.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-coral/10 rounded-full flex items-center justify-center mx-auto mb-5">
                <Truck className="w-5 h-5 text-coral" />
              </div>
              <h3 className="font-semibold text-charcoal mb-2">Ships Worldwide</h3>
              <p className="text-sm text-charcoal/55 leading-relaxed">
                Our fulfillment partners ship from the source to your door with
                careful packaging and full tracking.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
