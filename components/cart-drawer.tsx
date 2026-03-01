"use client";

import { useEffect } from "react";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/lib/cart-store";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total } =
    useCartStore();
  const cartTotal = total();

  // Close on ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [closeCart]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleCheckout = async () => {
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const { url } = await response.json();
      if (url) window.location.href = url;
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-charcoal/50 z-40 transition-opacity"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-cream z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-charcoal/10">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-saffron" />
            <h2 className="text-lg font-semibold text-charcoal">Your Cart</h2>
            {items.length > 0 && (
              <span className="text-sm text-charcoal/50">
                ({items.length} {items.length === 1 ? "item" : "items"})
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 text-charcoal/50 hover:text-charcoal transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col h-[calc(100%-80px)]">
          {items.length === 0 ? (
            /* Empty state */
            <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-saffron/10 flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-saffron" />
              </div>
              <div>
                <p className="font-semibold text-charcoal mb-1">
                  Your cart is empty
                </p>
                <p className="text-sm text-charcoal/50">
                  Discover extraordinary items from around the world
                </p>
              </div>
              <button
                onClick={closeCart}
                className="mt-2 text-sm font-medium text-teal hover:text-coral transition-colors"
              >
                Continue shopping →
              </button>
            </div>
          ) : (
            <>
              {/* Items list */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.slug}
                    className="flex gap-4 bg-white rounded-xl p-4"
                  >
                    {/* Image */}
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-charcoal/5">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-charcoal/40 mb-0.5">
                        {item.country}
                      </p>
                      <p className="text-sm font-medium text-charcoal line-clamp-2 mb-2">
                        {item.name}
                      </p>

                      {/* Quantity + remove */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.slug, item.quantity - 1)
                            }
                            className="w-6 h-6 rounded-full bg-charcoal/10 flex items-center justify-center hover:bg-charcoal/20 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-medium w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.slug, item.quantity + 1)
                            }
                            className="w-6 h-6 rounded-full bg-charcoal/10 flex items-center justify-center hover:bg-charcoal/20 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-charcoal">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeItem(item.slug)}
                            className="text-charcoal/30 hover:text-coral transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer / checkout */}
              <div className="border-t border-charcoal/10 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-charcoal/60">Subtotal</span>
                  <span className="text-xl font-bold text-charcoal">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-charcoal/40">
                  Shipping and taxes calculated at checkout
                </p>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-saffron hover:bg-amber-500 text-white font-semibold py-4 rounded-xl transition-colors text-sm"
                >
                  Checkout — ${cartTotal.toFixed(2)}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
