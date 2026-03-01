import Link from "next/link";
import { Globe, Instagram, Facebook, Twitter } from "lucide-react";

const shopLinks = [
  { href: "/shop?category=spices", label: "Spices" },
  { href: "/shop?category=sauces", label: "Sauces & Condiments" },
  { href: "/shop?category=pottery", label: "Pottery" },
  { href: "/shop?category=textiles", label: "Textiles" },
  { href: "/shop?category=coffee+%26+tea", label: "Coffee & Tea" },
  { href: "/shop?category=honey+%26+preserves", label: "Honey & Preserves" },
];

const companyLinks = [
  { href: "/stories", label: "Our Stories" },
  { href: "/become-a-vendor", label: "Become a Vendor" },
  { href: "/about", label: "About Us" },
  { href: "/shipping", label: "Shipping Info" },
  { href: "/contact", label: "Contact" },
];

const regionLinks = [
  { href: "/regions/europe", label: "Europe" },
  { href: "/regions/caribbean", label: "Caribbean" },
  { href: "/regions/africa", label: "Africa" },
  { href: "/regions/asia", label: "Asia" },
  { href: "/regions/americas", label: "The Americas" },
  { href: "/regions/middle-east", label: "Middle East" },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream/80">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-saffron rounded-full flex items-center justify-center">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <span
                className="font-display text-xl font-bold text-cream tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                World<span className="text-saffron">Specialties</span>
              </span>
            </div>
            <p className="text-sm text-cream/60 leading-relaxed mb-6">
              Extraordinary items from the world&apos;s most special places. Every
              product tells a story of craft, tradition, and the people who keep
              it alive.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="p-2 text-cream/40 hover:text-saffron transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 text-cream/40 hover:text-saffron transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 text-cream/40 hover:text-saffron transition-colors"
                aria-label="Twitter/X"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop by category */}
          <div>
            <h3 className="text-cream font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/60 hover:text-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop by region */}
          <div>
            <h3 className="text-cream font-semibold mb-4">By Region</h3>
            <ul className="space-y-2">
              {regionLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/60 hover:text-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-cream font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/60 hover:text-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream/40">
            © {new Date().getFullYear()} World Specialties. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-xs text-cream/40 hover:text-cream/60 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-cream/40 hover:text-cream/60 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
