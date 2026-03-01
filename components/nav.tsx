"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X, Globe } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/stories", label: "Stories" },
  { href: "/become-a-vendor", label: "Become a Vendor" },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count, openCart } = useCartStore();
  const cartCount = count();

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-charcoal/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            onClick={() => setMobileOpen(false)}
          >
            <div className="w-8 h-8 bg-saffron rounded-full flex items-center justify-center">
              <Globe className="w-4 h-4 text-white" />
            </div>
            <span
              className="font-display text-xl font-bold text-charcoal tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              World<span className="text-saffron">Specialties</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-charcoal/70 hover:text-charcoal transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* Cart button */}
            <button
              onClick={openCart}
              className="relative p-2 text-charcoal hover:text-saffron transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-coral text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-charcoal"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-cream border-t border-charcoal/10">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-base font-medium text-charcoal/70 hover:text-charcoal"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
