import fs from "fs";
import path from "path";

export interface Product {
  slug: string;
  name: string;
  region: string;
  country: string;
  category: string;
  price: number;
  currency: string;
  images: string[];
  tagline: string;
  description: string;
  story: string;
  featured: boolean;
  inStock: boolean;
  weight?: string;
  origin?: string;
}

const PRODUCTS_DIR = path.join(process.cwd(), "data", "products");

export function getAllProducts(): Product[] {
  const files = fs.readdirSync(PRODUCTS_DIR).filter((f) => f.endsWith(".json"));
  return files.map((file) => {
    const content = fs.readFileSync(path.join(PRODUCTS_DIR, file), "utf-8");
    return JSON.parse(content) as Product;
  });
}

export function getProductBySlug(slug: string): Product | null {
  const file = path.join(PRODUCTS_DIR, `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  const content = fs.readFileSync(file, "utf-8");
  return JSON.parse(content) as Product;
}

export function getFeaturedProducts(): Product[] {
  return getAllProducts().filter((p) => p.featured);
}

export function getProductsByRegion(region: string): Product[] {
  return getAllProducts().filter((p) => p.region === region);
}

export function getProductsByCategory(category: string): Product[] {
  return getAllProducts().filter((p) => p.category === category);
}

export const REGIONS = [
  {
    slug: "europe",
    name: "Europe",
    emoji: "🫒",
    bg: "from-blue-400 to-blue-600",
    description: "Ancient artisan traditions from the Mediterranean to Scandinavia",
  },
  {
    slug: "caribbean",
    name: "Caribbean",
    emoji: "🌶️",
    bg: "from-orange-400 to-red-500",
    description: "Fiery island flavors and hand-crafted goods",
  },
  {
    slug: "africa",
    name: "Africa",
    emoji: "🌍",
    bg: "from-yellow-400 to-amber-600",
    description: "Vibrant spices, rich textiles, and ancient traditions",
  },
  {
    slug: "asia",
    name: "Asia",
    emoji: "🍵",
    bg: "from-emerald-400 to-teal-600",
    description: "Centuries-old techniques and rare ingredients",
  },
  {
    slug: "americas",
    name: "The Americas",
    emoji: "🌽",
    bg: "from-purple-400 to-violet-600",
    description: "From the Andes highlands to the Amazon rainforest",
  },
  {
    slug: "middle-east",
    name: "Middle East",
    emoji: "🏺",
    bg: "from-red-400 to-rose-600",
    description: "Legendary spice routes and timeless craftsmanship",
  },
];

export const CATEGORIES = [
  "spices",
  "sauces",
  "pottery",
  "textiles",
  "coffee & tea",
  "honey & preserves",
  "condiments",
];
