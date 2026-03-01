import { getAllProducts, CATEGORIES, REGIONS } from "@/lib/products";
import ProductCard from "@/components/product-card";
import { SlidersHorizontal } from "lucide-react";

interface ShopPageProps {
  searchParams: Promise<{ category?: string; region?: string; sort?: string }>;
}

export const metadata = {
  title: "Shop",
  description: "Browse all specialty items from around the world.",
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const { category, region, sort } = params;

  let products = getAllProducts();

  // Filter
  if (category) {
    products = products.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }
  if (region) {
    products = products.filter(
      (p) => p.region.toLowerCase() === region.toLowerCase()
    );
  }

  // Sort
  if (sort === "price-asc") products.sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") products.sort((a, b) => b.price - a.price);

  const activeFilters = [
    category && `Category: ${category}`,
    region && `Region: ${REGIONS.find((r) => r.slug === region)?.name || region}`,
  ].filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1
          className="text-4xl font-bold text-charcoal mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Shop
        </h1>
        <p className="text-charcoal/60">
          {products.length} item{products.length !== 1 ? "s" : ""}
          {activeFilters.length > 0 && ` · ${activeFilters.join(" · ")}`}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar filters */}
        <aside className="lg:w-56 flex-shrink-0">
          <div className="bg-white rounded-2xl p-6 space-y-8 sticky top-24">
            <div className="flex items-center gap-2 text-sm font-semibold text-charcoal">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </div>

            {/* Category filter */}
            <div>
              <p className="text-xs font-semibold text-charcoal/40 uppercase tracking-wider mb-3">
                Category
              </p>
              <div className="space-y-1">
                <a
                  href="/shop"
                  className={`block text-sm py-1 px-2 rounded-lg transition-colors ${
                    !category
                      ? "bg-saffron/10 text-saffron font-medium"
                      : "text-charcoal/60 hover:text-charcoal"
                  }`}
                >
                  All
                </a>
                {CATEGORIES.map((cat) => (
                  <a
                    key={cat}
                    href={`/shop?category=${encodeURIComponent(cat)}${region ? `&region=${region}` : ""}`}
                    className={`block text-sm py-1 px-2 rounded-lg transition-colors capitalize ${
                      category?.toLowerCase() === cat.toLowerCase()
                        ? "bg-saffron/10 text-saffron font-medium"
                        : "text-charcoal/60 hover:text-charcoal"
                    }`}
                  >
                    {cat}
                  </a>
                ))}
              </div>
            </div>

            {/* Region filter */}
            <div>
              <p className="text-xs font-semibold text-charcoal/40 uppercase tracking-wider mb-3">
                Region
              </p>
              <div className="space-y-1">
                <a
                  href={`/shop${category ? `?category=${encodeURIComponent(category)}` : ""}`}
                  className={`block text-sm py-1 px-2 rounded-lg transition-colors ${
                    !region
                      ? "bg-saffron/10 text-saffron font-medium"
                      : "text-charcoal/60 hover:text-charcoal"
                  }`}
                >
                  All regions
                </a>
                {REGIONS.map((reg) => (
                  <a
                    key={reg.slug}
                    href={`/shop?region=${reg.slug}${category ? `&category=${encodeURIComponent(category)}` : ""}`}
                    className={`block text-sm py-1 px-2 rounded-lg transition-colors ${
                      region === reg.slug
                        ? "bg-saffron/10 text-saffron font-medium"
                        : "text-charcoal/60 hover:text-charcoal"
                    }`}
                  >
                    {reg.emoji} {reg.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Products grid */}
        <div className="flex-1">
          {/* Sort bar */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-charcoal/50">
              Showing {products.length} result{products.length !== 1 ? "s" : ""}
            </p>
            <select
              className="text-sm border border-charcoal/20 rounded-lg px-3 py-2 bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-saffron"
              defaultValue={sort || ""}
              onChange={(e) => {
                const url = new URL(window.location.href);
                if (e.target.value) url.searchParams.set("sort", e.target.value);
                else url.searchParams.delete("sort");
                window.location.href = url.toString();
              }}
            >
              <option value="">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-charcoal/40 text-lg mb-4">
                No items found for these filters.
              </p>
              <a
                href="/shop"
                className="text-sm font-medium text-teal hover:text-coral transition-colors"
              >
                Clear filters
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
