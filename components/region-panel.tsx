'use client'

import { X, MapPin, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const REGION_META: Record<string, { name: string; description: string; flag: string }> = {
  europe: {
    name: 'Europe',
    description: 'Artisan pottery, golden honey, and centuries of craft.',
    flag: '🌍',
  },
  caribbean: {
    name: 'Caribbean',
    description: 'Bold sauces and tropical flavors from sun-drenched islands.',
    flag: '🏝️',
  },
  africa: {
    name: 'Africa',
    description: 'Ancient spice routes and vibrant artisan traditions.',
    flag: '✨',
  },
  asia: {
    name: 'Asia',
    description: 'Centuries of culinary mastery from the Far East to the Himalayas.',
    flag: '🌏',
  },
  americas: {
    name: 'The Americas',
    description: 'From Andean highlands to Mexican valleys — rich and complex.',
    flag: '🌎',
  },
  'middle-east': {
    name: 'Middle East',
    description: 'Silk Road treasures and timeless textile craftsmanship.',
    flag: '🌙',
  },
}

interface Product {
  slug: string
  name: string
  price: number
  images: string[]
  country: string
  tagline: string
}

interface Props {
  region: string | null
  locationLabel: string
  products: Product[]
  onClose: () => void
}

export default function RegionPanel({ region, locationLabel, products, onClose }: Props) {
  const meta = region ? REGION_META[region] : null
  const isOpen = !!region

  return (
    <>
      {/* Backdrop (mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden bg-black/40"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className="fixed top-0 right-0 bottom-0 z-50 flex flex-col overflow-y-auto"
        style={{
          width: 'min(420px, 100vw)',
          background: 'rgba(8, 18, 38, 0.96)',
          backdropFilter: 'blur(24px)',
          borderLeft: '1px solid rgba(245, 158, 11, 0.15)',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {meta && (
          <>
            {/* Header */}
            <div className="flex-shrink-0 p-7 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <button
                onClick={onClose}
                className="absolute top-5 right-5 p-2 rounded-full transition-colors hover:bg-white/10"
                style={{ color: '#94a3b8' }}
                aria-label="Close panel"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-2 mb-3" style={{ color: '#F59E0B' }}>
                <MapPin size={12} />
                <span style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }}>
                  {locationLabel}
                </span>
              </div>

              <h2
                className="mb-2"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '30px',
                  fontWeight: 700,
                  color: '#fff',
                  lineHeight: 1.1,
                }}
              >
                {meta.flag} {meta.name}
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: 1.65, marginTop: 6 }}>
                {meta.description}
              </p>
            </div>

            {/* Products */}
            <div className="flex-1 p-7 pt-5">
              <div
                className="flex items-center gap-2 mb-4"
                style={{ color: '#F59E0B', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }}
              >
                <ShoppingBag size={11} />
                <span>Available from {meta.name}</span>
              </div>

              {products.length === 0 ? (
                <p style={{ color: '#475569', fontSize: '14px' }}>
                  No products from this region yet — check back soon.
                </p>
              ) : (
                <div className="flex flex-col gap-3">
                  {products.slice(0, 5).map((product) => (
                    <Link
                      key={product.slug}
                      href={`/shop/${product.slug}`}
                      onClick={onClose}
                      className="flex gap-3 p-3 rounded-xl group transition-all duration-200"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        textDecoration: 'none',
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.background = 'rgba(245,158,11,0.08)'
                        ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,158,11,0.25)'
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'
                        ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'
                      }}
                    >
                      <div
                        className="flex-shrink-0 rounded-lg overflow-hidden"
                        style={{ width: 60, height: 60, background: '#1e3a5f' }}
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div style={{ fontSize: '11px', color: '#64748b', marginBottom: 2 }}>
                          {product.country}
                        </div>
                        <div
                          className="truncate"
                          style={{ fontSize: '13px', color: '#f1f5f9', fontWeight: 500, lineHeight: 1.35, marginBottom: 4 }}
                        >
                          {product.name}
                        </div>
                        <div style={{ fontSize: '15px', color: '#F59E0B', fontWeight: 600 }}>
                          ${product.price}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Footer CTA */}
            <div className="flex-shrink-0 p-7 pt-0">
              <Link
                href={`/regions/${region}`}
                onClick={onClose}
                className="flex items-center justify-center w-full py-3.5 rounded-xl font-medium transition-all duration-200"
                style={{
                  background: 'rgba(245,158,11,0.12)',
                  border: '1px solid rgba(245,158,11,0.35)',
                  color: '#F59E0B',
                  textDecoration: 'none',
                  fontSize: '13px',
                  letterSpacing: '0.04em',
                }}
              >
                Explore all from {meta.name} →
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  )
}
