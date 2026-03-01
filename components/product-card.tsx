import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

const categoryColors: Record<string, string> = {
  spices: "bg-saffron text-charcoal",
  sauces: "bg-coral text-white",
  pottery: "bg-amber-600 text-white",
  textiles: "bg-red-700 text-white",
  "coffee & tea": "bg-teal text-white",
  "honey & preserves": "bg-amber-400 text-charcoal",
  condiments: "bg-emerald-600 text-white",
};

export default function ProductCard({ product }: ProductCardProps) {
  const categoryColor =
    categoryColors[product.category] || "bg-charcoal/20 text-charcoal";

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-charcoal/5">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${categoryColor}`}
          >
            {product.category}
          </span>
        </div>
        {product.featured && (
          <div className="absolute top-3 right-3">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-forest text-cream">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-xs font-medium text-charcoal/50 uppercase tracking-wider mb-1">
          {product.country}
        </p>
        <h3
          className="font-display text-lg font-semibold text-charcoal mb-2 leading-snug group-hover:text-saffron transition-colors"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {product.name}
        </h3>
        <p className="text-sm text-charcoal/60 line-clamp-2 mb-4">
          {product.tagline}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-charcoal">
            ${product.price}
          </span>
          <span className="text-sm font-medium text-teal group-hover:text-coral transition-colors">
            View item →
          </span>
        </div>
      </div>
    </Link>
  );
}
