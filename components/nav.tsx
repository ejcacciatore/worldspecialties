'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingBag, Globe, Menu, X } from 'lucide-react'
import { useCartStore } from '@/lib/cart-store'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { count, openCart } = useCartStore()
  const cartCount = count()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-30 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(8, 18, 38, 0.97)' : 'transparent',
          borderBottom: `1px solid ${scrolled ? 'rgba(245,158,11,0.12)' : 'transparent'}`,
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
        }}
      >
        <div className="flex items-center justify-between px-6 md:px-12" style={{ height: 68 }}>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5" style={{ textDecoration: 'none' }}>
            <Globe size={20} style={{ color: '#F59E0B' }} />
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '16px',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '0.02em',
              }}
            >
              World Specialties
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { href: '/shop', label: 'Shop' },
              { href: '/stories', label: 'Stories' },
              { href: '/become-a-vendor', label: 'Vendors' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  textDecoration: 'none',
                  fontSize: '12px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color = '#F59E0B')}
                onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.7)')}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            <button
              onClick={openCart}
              className="relative transition-opacity hover:opacity-75"
              aria-label="Open cart"
            >
              <ShoppingBag size={20} color="#ffffff" />
              {cartCount > 0 && (
                <span
                  className="absolute flex items-center justify-center rounded-full"
                  style={{
                    top: -6, right: -6, width: 17, height: 17,
                    background: '#F59E0B', color: '#000',
                    fontSize: '9px', fontWeight: 700,
                  }}
                >
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>

            <button
              className="md:hidden p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} color="#fff" /> : <Menu size={20} color="#fff" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-20 flex flex-col pt-20 px-8 pb-8 md:hidden"
          style={{ background: 'rgba(8, 18, 38, 0.98)', backdropFilter: 'blur(20px)' }}
        >
          <div className="flex flex-col gap-7 mt-10">
            {[
              { href: '/', label: 'Home' },
              { href: '/shop', label: 'Shop the World' },
              { href: '/stories', label: 'Stories' },
              { href: '/become-a-vendor', label: 'Become a Vendor' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '32px',
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
