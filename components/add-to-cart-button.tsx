"use client";

import { ShoppingBag, Check } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import type { Product } from "@/lib/products";

export default function AddToCartButton({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = () => {
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      country: product.country,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      className={`w-full font-semibold py-4 rounded-xl transition-all text-base flex items-center justify-center gap-2 ${
        added
          ? "bg-forest text-cream"
          : "bg-saffron hover:bg-amber-500 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5"
      }`}
    >
      {added ? (
        <>
          <Check className="w-5 h-5" />
          Added to cart!
        </>
      ) : (
        <>
          <ShoppingBag className="w-5 h-5" />
          Add to Cart — ${product.price}
        </>
      )}
    </button>
  );
}
