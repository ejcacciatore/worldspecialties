import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import CartDrawer from "@/components/cart-drawer";
import SmoothScroll from "@/components/smooth-scroll";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "World Specialties | Extraordinary Items from Around the World",
    template: "%s | World Specialties",
  },
  description:
    "Discover rare spices, handcrafted pottery, hot sauces, and specialty goods sourced from the world's most exceptional places. Every item tells a story.",
  keywords: [
    "specialty foods",
    "artisan goods",
    "world spices",
    "Italian pottery",
    "Caribbean hot sauce",
    "global marketplace",
    "rare ingredients",
  ],
  openGraph: {
    type: "website",
    siteName: "World Specialties",
    title: "World Specialties | Extraordinary Items from Around the World",
    description:
      "Rare spices, handcrafted pottery, hot sauces, and specialty goods from around the world.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-cream text-charcoal antialiased min-h-screen flex flex-col">
        <SmoothScroll />
        <Nav />
        <CartDrawer />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
