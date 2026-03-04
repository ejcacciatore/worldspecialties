'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import RegionPanel from './region-panel'
import { ArrowRight } from 'lucide-react'

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
  const [scrollProgress, setScrollProgress] = useState(0)
  const [email, setEmail] = useState('')
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'done'>('idle')
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setGlobeLoaded(true), 800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return
      const total = heroRef.current.offsetHeight - window.innerHeight
      setScrollProgress(Math.min((window.scrollY / total) * 100, 100))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
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

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setEmailStatus('sending')
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'notify',
          name: email,
          email,
          story: 'Hero email capture — wants to be notified at launch.',
        }),
      })
      setEmailStatus('done')
    } catch {
      setEmailStatus('idle')
    }
  }

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
        {/* Background video — cinematic texture behind everything */}
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.15,
            zIndex: 0,
            pointerEvents: 'none',
          }}
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay to blend video into navy atmosphere */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(160deg, rgba(6,15,30,0.7) 0%, rgba(10,22,40,0.5) 50%, rgba(13,31,60,0.7) 100%)',
            zIndex: 1,
          }}
        />

        {/* Globe */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: globeLoaded ? 1 : 0,
            transition: 'opacity 1.8s ease-out',
            zIndex: 2,
          }}
        >
          <GlobeScene onRegionClick={handleRegionClick} onGlobeClick={handleGlobeClick} />
        </div>

        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 20% 80%, rgba(245,158,11,0.05) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(56,189,248,0.04) 0%, transparent 50%)',
            zIndex: 3,
          }}
        />

        {/* Bottom gradient fade */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: 240,
            background: 'linear-gradient(to bottom, transparent, #0a1628)',
            zIndex: 3,
          }}
        />

        {/* ── Scroll progress line — left edge, OceanX style ─── */}
        <div
          className="absolute left-0 top-0 bottom-0 pointer-events-none"
          style={{ width: 2, background: 'rgba(255,255,255,0.06)', zIndex: 10 }}
        >
          <div
            style={{
              width: '100%',
              height: `${scrollProgress}%`,
              background: '#F59E0B',
              transition: 'height 0.08s linear',
            }}
          />
        </div>

        {/* ── Hero text — bottom left, OceanX scale ─────────── */}
        <div
          className="absolute left-0 bottom-0 px-10 md:px-16 pointer-events-none"
          style={{
            paddingBottom: 'clamp(52px, 9vh, 104px)',
            maxWidth: 820,
            opacity: globeLoaded ? 1 : 0,
            transform: globeLoaded ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 1.4s ease-out 0.5s, transform 1.4s ease-out 0.5s',
            zIndex: 10,
          }}
        >
          {/* Eyebrow */}
          <p
            style={{
              fontSize: '11px',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              fontWeight: 500,
              marginBottom: 14,
            }}
          >
            Extraordinary things — sourced from the world&apos;s most special places
          </p>

          {/* Rule */}
          <div
            style={{
              width: '100%',
              height: 1,
              background: 'rgba(255,255,255,0.1)',
              marginBottom: 22,
            }}
          />

          {/* Headline — massive */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(54px, 9vw, 110px)',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 0.94,
              letterSpacing: '-0.025em',
              margin: 0,
            }}
          >
            Coming Soon.
            <br />
            <span style={{ color: '#F59E0B' }}>The world</span>
            <br />
            awaits.
          </h1>
        </div>

        {/* ── Floating email card — bottom right, OceanX JOIN THE MISSION ── */}
        <div
          className="absolute right-6 md:right-10"
          style={{
            bottom: 'clamp(40px, 7vh, 80px)',
            width: 'min(320px, calc(100vw - 40px))',
            background: 'rgba(6, 15, 30, 0.85)',
            backdropFilter: 'blur(28px)',
            border: '1px solid rgba(245,158,11,0.22)',
            borderRadius: 14,
            padding: '22px 24px',
            opacity: globeLoaded ? 1 : 0,
            transform: globeLoaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1.4s ease-out 1.1s, transform 1.4s ease-out 1.1s',
            zIndex: 20,
          }}
        >
          {emailStatus === 'done' ? (
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
              <p style={{ color: '#F59E0B', fontSize: '14px', fontWeight: 700, marginBottom: 6 }}>
                You&apos;re on the list ✓
              </p>
              <p style={{ color: '#64748b', fontSize: '12px', lineHeight: 1.5 }}>
                We&apos;ll reach out the moment we open our doors.
              </p>
            </div>
          ) : (
            <>
              <p
                style={{
                  fontSize: '9px',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#F59E0B',
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                Join the waitlist
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#ffffff',
                  lineHeight: 1.35,
                  marginBottom: 16,
                }}
              >
                Be first to know when we open our doors.
              </p>
              <form onSubmit={handleEmailSubmit} style={{ display: 'flex', gap: 8 }}>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    flex: 1,
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 8,
                    padding: '10px 13px',
                    color: '#fff',
                    fontSize: '13px',
                    outline: 'none',
                    minWidth: 0,
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(245,158,11,0.55)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                />
                <button
                  type="submit"
                  disabled={emailStatus === 'sending'}
                  style={{
                    background: '#F59E0B',
                    border: 'none',
                    borderRadius: 8,
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: emailStatus === 'sending' ? 'not-allowed' : 'pointer',
                    flexShrink: 0,
                    opacity: emailStatus === 'sending' ? 0.55 : 1,
                  }}
                >
                  <ArrowRight size={15} color="#000" />
                </button>
              </form>
            </>
          )}
        </div>

        {/* Loading state */}
        {!globeLoaded && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <div
                style={{
                  width: 46,
                  height: 46,
                  border: '2px solid rgba(245,158,11,0.15)',
                  borderTopColor: '#F59E0B',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  margin: '0 auto 14px',
                }}
              />
              <div
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.22em',
                  color: '#475569',
                  textTransform: 'uppercase',
                }}
              >
                Loading the world…
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Region panel */}
      <RegionPanel
        region={activeRegion}
        locationLabel={activeLabel}
        products={regionProducts}
        onClose={handlePanelClose}
      />

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  )
}
