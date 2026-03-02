'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import RegionPanel from './region-panel'
import { ChevronDown } from 'lucide-react'

const GlobeScene = dynamic(() => import('./globe-scene'), { ssr: false })

interface Product {
  slug: string
  name: string
  price: number
  images: string[]
  country: string
  region: string
  tagline: string
}

interface Props {
  products: Product[]
}

export default function GlobeHeroSection({ products }: Props) {
  const [activeRegion, setActiveRegion] = useState<string | null>(null)
  const [activeLabel, setActiveLabel] = useState('')
  const [globeLoaded, setGlobeLoaded] = useState(false)
  const heroRef = useRef<HTMLElement>(null)

  // Animate in on mount
  useEffect(() => {
    const timer = setTimeout(() => setGlobeLoaded(true), 800)
    return () => clearTimeout(timer)
  }, [])

  const handleRegionClick = useCallback((region: string, label: string) => {
    setActiveRegion(region)
    setActiveLabel(label)
  }, [])

  const handleGlobeClick = useCallback(() => {
    setActiveRegion(null)
  }, [])

  const handlePanelClose = useCallback(() => {
    setActiveRegion(null)
  }, [])

  const regionProducts = activeRegion
    ? products.filter((p) => p.region === activeRegion)
    : []

  return (
    <>
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{
          height: '100svh',
          background: 'linear-gradient(160deg, #060f1e 0%, #0a1628 50%, #0d1f3c 100%)',
        }}
      >
        {/* Globe */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: globeLoaded ? 1 : 0,
            transition: 'opacity 1.8s ease-out',
          }}
        >
          <GlobeScene onRegionClick={handleRegionClick} onGlobeClick={handleGlobeClick} />
        </div>

        {/* Star field texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 20% 80%, rgba(245,158,11,0.04) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(56,189,248,0.04) 0%, transparent 50%)',
          }}
        />

        {/* Bottom gradient fade into editorial */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: '180px',
            background: 'linear-gradient(to bottom, transparent, #0a1628 100%)',
          }}
        />

        {/* Hero text overlay */}
        <div
          className="absolute bottom-20 left-0 px-8 md:px-16 max-w-xl pointer-events-none"
          style={{
            opacity: globeLoaded ? 1 : 0,
            transform: globeLoaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1.2s ease-out 0.6s, transform 1.2s ease-out 0.6s',
          }}
        >
          <div
            className="mb-3"
            style={{
              fontSize: '10px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#F59E0B',
              fontWeight: 600,
            }}
          >
            World Specialties
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.08,
              marginBottom: 16,
            }}
          >
            Extraordinary things
            <br />
            <span style={{ color: '#F59E0B' }}>from the world&apos;s</span>
            <br />
            most special places.
          </h1>
          <p
            style={{
              fontSize: '14px',
              color: '#94a3b8',
              lineHeight: 1.7,
              maxWidth: 320,
            }}
          >
            Spin the globe. Click a glowing dot.
            <br />
            Discover something remarkable.
          </p>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none"
          style={{
            opacity: globeLoaded ? 0.5 : 0,
            transition: 'opacity 1s ease-out 1.5s',
          }}
        >
          <span style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#94a3b8' }}>
            Scroll
          </span>
          <ChevronDown size={14} color="#94a3b8" className="animate-bounce" />
        </div>

        {/* Loading state */}
        {!globeLoaded && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <div
                style={{
                  width: 56,
                  height: 56,
                  border: '2px solid rgba(245,158,11,0.2)',
                  borderTopColor: '#F59E0B',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  margin: '0 auto 16px',
                }}
              />
              <div style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#475569', textTransform: 'uppercase' }}>
                Loading the world…
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Region panel (slides in over globe) */}
      <RegionPanel
        region={activeRegion}
        locationLabel={activeLabel}
        products={regionProducts}
        onClose={handlePanelClose}
      />

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  )
}
