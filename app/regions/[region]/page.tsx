import { notFound } from "next/navigation";
import { getProductsByRegion, REGIONS } from "@/lib/products";
import ProductCard from "@/components/product-card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface RegionPageProps {
  params: Promise<{ region: string }>;
}

export async function generateStaticParams() {
  return REGIONS.map((r) => ({ region: r.slug }));
}

export async function generateMetadata({ params }: RegionPageProps) {
  const { region: regionSlug } = await params;
  const region = REGIONS.find((r) => r.slug === regionSlug);
  if (!region) return {};
  return {
    title: `${region.name} Specialties`,
    description: region.description,
  };
}

export default async function RegionPage({ params }: RegionPageProps) {
  const { region: regionSlug } = await params;
  const region = REGIONS.find((r) => r.slug === regionSlug);
  if (!region) notFound();

  const products = getProductsByRegion(regionSlug);

  return (
    <div>
      {/* Header */}
      <section
        className={`py-20 bg-gradient-to-br ${region.bg}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to shop
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">{region.emoji}</span>
          </div>
          <h1
            className="text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {region.name}
          </h1>
          <p className="text-white/80 text-lg max-w-xl">
            {region.description}
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-charcoal/40 text-lg mb-4">
                No items from this region yet.
              </p>
              <Link
                href="/become-a-vendor"
                className="text-sm font-medium text-teal hover:text-coral transition-colors"
              >
                Know a producer here? Tell them to apply →
              </Link>
            </div>
          ) : (
            <>
              <p className="text-charcoal/60 mb-8">
                {products.length} item{products.length !== 1 ? "s" : ""} from{" "}
                {region.name}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
