import Link from "next/link";
import { ArrowRight, Truck, Shield, Star } from "lucide-react";
import { getAllProducts, getFeaturedProducts } from "@/lib/products";
import { getAllStories } from "@/lib/mdx";
import ProductCard from "@/components/product-card";
import StoryCard from "@/components/story-card";
import GlobeHeroSection from "@/components/globe-hero-section";

export default function HomePage() {
  const allProducts = getAllProducts();
  const featuredProducts = getFeaturedProducts().slice(0, 4);
  const stories = getAllStories().slice(0, 3);

  return (
    <>
      {/* GLOBE HERO — full screen, dark navy, interactive */}
      <GlobeHeroSection products={allProducts} />

      {/* FEATURED PRODUCTS — continues dark navy from globe fade */}
      <section
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
                Hand-picked
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
                Featured This Week
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden sm:flex items-center gap-2 text-sm font-medium transition-colors"
              style={{ color: "rgba(255,255,255,0.45)", fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase" }}
              onMouseEnter={undefined}
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>

          <div className="mt-10 text-center sm:hidden">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm"
              style={{ color: "#F59E0B" }}
            >
              View all items <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* TRANSITION BAND — dark navy to cream */}
      <div
        style={{
          height: 120,
          background: "linear-gradient(to bottom, #0a1628, #FDFAF5)",
        }}
      />

      {/* STORIES — cream */}
      <section className="py-24 bg-cream -mt-1">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-sm font-semibold text-saffron uppercase tracking-widest mb-3">
                Behind the product
              </p>
              <h2
                className="text-4xl font-bold text-charcoal"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Stories &amp; Craft
              </h2>
            </div>
            <Link
              href="/stories"
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-teal hover:text-coral transition-colors"
            >
              All stories <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stories.map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
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
