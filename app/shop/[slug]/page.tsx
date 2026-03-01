import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug, getAllProducts } from "@/lib/products";
import { ArrowLeft, MapPin, Package, Star } from "lucide-react";
import AddToCartButton from "@/components/add-to-cart-button";
import ProductCard from "@/components/product-card";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.tagline,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  // Related products (same region or category, not same slug)
  const allProducts = getAllProducts();
  const related = allProducts
    .filter(
      (p) =>
        p.slug !== slug &&
        (p.region === product.region || p.category === product.category)
    )
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-charcoal/40 mb-8">
        <Link href="/shop" className="hover:text-charcoal transition-colors">
          Shop
        </Link>
        <span>/</span>
        <Link
          href={`/regions/${product.region}`}
          className="hover:text-charcoal transition-colors capitalize"
        >
          {product.region}
        </Link>
        <span>/</span>
        <span className="text-charcoal">{product.name}</span>
      </div>

      {/* Product detail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
        {/* Image */}
        <div className="relative aspect-square rounded-3xl overflow-hidden bg-charcoal/5">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          {/* Origin + category */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1.5 text-xs font-medium text-charcoal/50">
              <MapPin className="w-3.5 h-3.5" />
              <span>{product.origin || product.country}</span>
            </div>
            <span className="text-charcoal/20">·</span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-saffron/10 text-saffron capitalize">
              {product.category}
            </span>
            {product.featured && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-forest/10 text-forest flex items-center gap-1">
                <Star className="w-3 h-3" /> Featured
              </span>
            )}
          </div>

          <h1
            className="text-4xl font-bold text-charcoal mb-4 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {product.name}
          </h1>

          <p className="text-xl text-charcoal/60 italic mb-6">
            {product.tagline}
          </p>

          {/* Price */}
          <div className="text-4xl font-bold text-charcoal mb-8">
            ${product.price}
            <span className="text-base font-normal text-charcoal/40 ml-2">
              USD
            </span>
          </div>

          {/* Description */}
          <p className="text-charcoal/70 leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Meta info */}
          {product.weight && (
            <div className="flex items-center gap-2 text-sm text-charcoal/50 mb-6">
              <Package className="w-4 h-4" />
              <span>{product.weight}</span>
            </div>
          )}

          {/* Add to cart */}
          {product.inStock ? (
            <AddToCartButton product={product} />
          ) : (
            <button
              disabled
              className="w-full bg-charcoal/10 text-charcoal/40 font-semibold py-4 rounded-xl cursor-not-allowed text-base"
            >
              Out of Stock
            </button>
          )}

          <p className="text-xs text-charcoal/40 mt-4 text-center">
            Secure checkout powered by Stripe · Ships from {product.country}
          </p>
        </div>
      </div>

      {/* The Story */}
      {product.story && (
        <section className="mb-24">
          <div className="max-w-2xl">
            <h2
              className="text-3xl font-bold text-charcoal mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              The Story
            </h2>
            <p className="text-charcoal/70 leading-relaxed text-lg">
              {product.story}
            </p>
          </div>
        </section>
      )}

      {/* Related products */}
      {related.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2
              className="text-2xl font-bold text-charcoal"
              style={{ fontFamily: "var(--font-display)" }}
            >
              You might also like
            </h2>
            <Link
              href="/shop"
              className="text-sm font-medium text-teal hover:text-coral transition-colors"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
