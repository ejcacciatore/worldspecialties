'use client'

import { useEffect, useRef, useCallback } from 'react'

export const GLOBE_POINTS = [
  { lat: 40.7, lng: 13.9, label: 'Ischia, Italy', region: 'europe', color: '#F59E0B', size: 0.65 },
  { lat: 37.9, lng: 23.7, label: 'Athens, Greece', region: 'europe', color: '#F59E0B', size: 0.5 },
  { lat: 17.1, lng: -61.8, label: 'Antigua', region: 'caribbean', color: '#F97316', size: 0.65 },
  { lat: 31.7, lng: -5.0, label: 'Marrakech, Morocco', region: 'africa', color: '#10B981', size: 0.65 },
  { lat: 35.7, lng: 139.7, label: 'Tokyo, Japan', region: 'asia', color: '#A78BFA', size: 0.55 },
  { lat: 27.9, lng: 84.1, label: 'Himalayan Region', region: 'asia', color: '#A78BFA', size: 0.45 },
  { lat: 10.8, lng: 106.7, label: 'Vietnam', region: 'asia', color: '#A78BFA', size: 0.45 },
  { lat: 4.7, lng: -74.1, label: 'Colombia', region: 'americas', color: '#FB7185', size: 0.6 },
  { lat: 17.1, lng: -96.7, label: 'Oaxaca, Mexico', region: 'americas', color: '#FB7185', size: 0.55 },
  { lat: 39.0, lng: 35.2, label: 'Turkey', region: 'middle-east', color: '#38BDF8', size: 0.55 },
]

interface Props {
  onRegionClick: (region: string, label: string) => void
  onGlobeClick: () => void
}

export default function GlobeScene({ onRegionClick, onGlobeClick }: Props) {
  const mountRef = useRef<HTMLDivElement>(null)
  const globeRef = useRef<any>(null)

  const handlePointClick = useCallback((point: any) => {
    onRegionClick(point.region, point.label)
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = false
      globeRef.current.pointOfView(
        { lat: point.lat, lng: point.lng, altitude: 1.7 },
        1200
      )
    }
  }, [onRegionClick])

  const handleGlobeClick = useCallback(() => {
    onGlobeClick()
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true
    }
  }, [onGlobeClick])

  useEffect(() => {
    if (!mountRef.current) return

    let cancelled = false

    import('globe.gl').then((mod) => {
      if (cancelled || !mountRef.current) return

      const Globe = mod.default as any
      const el = mountRef.current
      const { width, height } = el.getBoundingClientRect()

      const globe = Globe()
        .width(width || window.innerWidth)
        .height(height || window.innerHeight)
        .backgroundColor('rgba(0,0,0,0)')
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
        .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
        .showAtmosphere(true)
        .atmosphereColor('#93C5FD')
        .atmosphereAltitude(0.14)
        .pointsData(GLOBE_POINTS)
        .pointLat('lat')
        .pointLng('lng')
        .pointColor('color')
        .pointAltitude(0.025)
        .pointRadius('size')
        .pointResolution(20)
        .pointLabel((d: any) =>
          `<div style="background:rgba(10,22,40,0.9);color:#F59E0B;padding:6px 14px;border-radius:8px;font-family:Georgia,serif;font-size:13px;font-weight:500;white-space:nowrap;border:1px solid rgba(245,158,11,0.3);">${d.label}</div>`
        )
        .onPointClick(handlePointClick)
        .onGlobeClick(handleGlobeClick)
        .onPointHover((pt: any) => {
          el.style.cursor = pt ? 'pointer' : 'grab'
        })

      globe(el)

      globe.controls().autoRotate = true
      globe.controls().autoRotateSpeed = 0.45
      globe.controls().enableZoom = false
      globe.controls().enablePan = false
      globe.controls().minPolarAngle = Math.PI * 0.15
      globe.controls().maxPolarAngle = Math.PI * 0.85

      globe.pointOfView({ lat: 22, lng: 18, altitude: 2.4 }, 0)

      globeRef.current = globe

      const handleResize = () => {
        const { width, height } = el.getBoundingClientRect()
        globe.width(width).height(height)
      }
      window.addEventListener('resize', handleResize)

      return () => window.removeEventListener('resize', handleResize)
    })

    return () => {
      cancelled = true
      if (mountRef.current) mountRef.current.innerHTML = ''
    }
  }, [handlePointClick, handleGlobeClick])

  return <div ref={mountRef} style={{ position: 'absolute', inset: 0 }} />
}
