import Link from "next/link";
import { ArrowRight, Truck, Shield, Globe, Star } from "lucide-react";
import { getFeaturedProducts, REGIONS } from "@/lib/products";
import { getAllStories } from "@/lib/mdx";
import ProductCard from "@/components/product-card";
import StoryCard from "@/components/story-card";

export default function HomePage() {
  const featuredProducts = getFeaturedProducts().slice(0, 4);
  const stories = getAllStories().slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-charcoal">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 50%, #F59E0B 0%, transparent 50%),
                              radial-gradient(circle at 75% 20%, #0D9488 0%, transparent 40%),
                              radial-gradient(circle at 60% 80%, #F97316 0%, transparent 35%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 bg-saffron/20 text-saffron text-sm font-medium px-4 py-2 rounded-full mb-8">
              <Globe className="w-4 h-4" />
              <span>From 30+ countries and counting</span>
            </div>

            {/* Heading */}
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-cream leading-tight mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Extraordinary things from the world&apos;s most{" "}
              <span className="text-saffron italic">special</span> places.
            </h1>

            <p className="text-lg sm:text-xl text-cream/70 mb-10 max-w-2xl leading-relaxed">
              Every jar, bowl, and bottle on World Specialties comes with a
              story — of the hands that made it, the land it came from, and the
              tradition it carries forward.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 bg-saffron hover:bg-amber-500 text-white font-semibold px-8 py-4 rounded-xl transition-all text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/stories"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-cream font-semibold px-8 py-4 rounded-xl transition-all text-base backdrop-blur-sm border border-white/20"
              >
                Read the Stories
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-6 mt-12">
              <div className="flex items-center gap-2 text-cream/50 text-sm">
                <Truck className="w-4 h-4" />
                <span>Worldwide shipping</span>
              </div>
              <div className="flex items-center gap-2 text-cream/50 text-sm">
                <Shield className="w-4 h-4" />
                <span>Secure checkout</span>
              </div>
              <div className="flex items-center gap-2 text-cream/50 text-sm">
                <Star className="w-4 h-4" />
                <span>Artisan sourced</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm font-semibold text-saffron uppercase tracking-widest mb-2">
                Hand-picked
              </p>
              <h2
                className="text-4xl font-bold text-charcoal"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Featured Items
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-teal hover:text-coral transition-colors"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm font-medium text-teal hover:text-coral transition-colors"
            >
              View all items <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* BROWSE BY REGION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-saffron uppercase tracking-widest mb-2">
              Explore the world
            </p>
            <h2
              className="text-4xl font-bold text-charcoal"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Shop by Region
            </h2>
            <p className="mt-4 text-charcoal/60 max-w-xl mx-auto">
              From the spice markets of Fes to the volcanic shores of Ischia —
              every region has its treasures.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {REGIONS.map((region) => (
              <Link
                key={region.slug}
                href={`/regions/${region.slug}`}
                className="group relative overflow-hidden rounded-2xl aspect-square flex flex-col items-center justify-center text-center p-4 transition-all hover:-translate-y-1"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${region.bg} opacity-90 group-hover:opacity-100 transition-opacity`}
                />
                <div className="relative z-10">
                  <div className="text-4xl mb-2">{region.emoji}</div>
                  <p className="font-semibold text-white text-sm">
                    {region.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* STORIES */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm font-semibold text-saffron uppercase tracking-widest mb-2">
                Behind the product
              </p>
              <h2
                className="text-4xl font-bold text-charcoal"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Stories & Craft
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
      <section className="py-24 bg-forest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-saffron uppercase tracking-widest mb-4">
              Partner with us
            </p>
            <h2
              className="text-4xl sm:text-5xl font-bold text-cream mb-6 leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Do you make something extraordinary?
            </h2>
            <p className="text-cream/70 text-lg mb-8 leading-relaxed max-w-2xl">
              We handle the storefront, the marketing, and the customers. You
              focus on making exceptional products and shipping them. If you
              produce specialty goods from anywhere in the world, we want to
              hear your story.
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-12 h-12 bg-saffron/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-saffron" />
              </div>
              <h3 className="font-semibold text-charcoal mb-2">
                Sourced Directly
              </h3>
              <p className="text-sm text-charcoal/60 leading-relaxed">
                We work directly with artisans and small producers. No
                intermediaries, which means better prices and more money to the
                maker.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-teal" />
              </div>
              <h3 className="font-semibold text-charcoal mb-2">
                Authenticity Guaranteed
              </h3>
              <p className="text-sm text-charcoal/60 leading-relaxed">
                Every product is verified for origin and authenticity. We visit
                producers, verify their process, and stand behind every item we
                sell.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-coral/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-6 h-6 text-coral" />
              </div>
              <h3 className="font-semibold text-charcoal mb-2">
                Ships Worldwide
              </h3>
              <p className="text-sm text-charcoal/60 leading-relaxed">
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
