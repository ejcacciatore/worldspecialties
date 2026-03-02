import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Shop",
  description: "Extraordinary specialty goods from around the world — opening soon.",
};

export default function ShopPage() {
  return (
    <div
      style={{
        minHeight: "100svh",
        background: "linear-gradient(160deg, #060f1e 0%, #0a1628 60%, #0d1f3c 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "120px 24px 80px",
      }}
    >
      <img
        src="/nQPVp01.svg"
        alt=""
        width={52}
        height={52}
        style={{
          filter: "brightness(0) saturate(100%) invert(72%) sepia(64%) saturate(1500%) hue-rotate(5deg) brightness(98%)",
          marginBottom: 32,
          opacity: 0.9,
        }}
      />

      <p
        style={{
          fontSize: "10px",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "#F59E0B",
          fontWeight: 600,
          marginBottom: 20,
        }}
      >
        Coming Soon
      </p>

      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(36px, 6vw, 68px)",
          fontWeight: 700,
          color: "#ffffff",
          lineHeight: 1.08,
          letterSpacing: "-0.025em",
          marginBottom: 24,
          maxWidth: 640,
        }}
      >
        The shop is almost ready.
      </h1>

      <p
        style={{
          fontSize: "17px",
          color: "rgba(255,255,255,0.45)",
          lineHeight: 1.75,
          maxWidth: 460,
          marginBottom: 48,
        }}
      >
        We&apos;re finalizing our first collection of specialty goods from
        artisans around the world. Join the waitlist to be first to know when we
        open.
      </p>

      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
        <Link
          href="/#waitlist"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "#F59E0B",
            color: "#000",
            padding: "14px 28px",
            borderRadius: 8,
            fontSize: "12px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Join the Waitlist <ArrowRight size={13} />
        </Link>
        <Link
          href="/stories"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.7)",
            padding: "14px 28px",
            borderRadius: 8,
            fontSize: "12px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontWeight: 600,
            textDecoration: "none",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          Read Our Stories
        </Link>
      </div>
    </div>
  );
}
