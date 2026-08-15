'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import AutoScroll from 'embla-carousel-auto-scroll'
import styles from './carrusel.module.css'

type ResponsiveSPV = number | { default: number; sm?: number; lg?: number }

type CarruselProps = {
  nodes: React.ReactNode[]
  slidesPerView?: ResponsiveSPV
  mode?: 'autoplay' | 'autoscroll'
  loop?: boolean
}

/* Ni autoplay ni autoscroll se pueden frenar con CSS: son transforms en JS.
   Si el sistema pide menos movimiento, el carrusel queda solo manual. */
function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return reduced
}

function useResolvedSPV(def: number, sm?: number, lg?: number): number {
  const [count, setCount] = useState(def)
  useEffect(() => {
    if (sm === undefined && lg === undefined) return
    const update = () => {
      const w = window.innerWidth
      if (lg !== undefined && w >= 1024) setCount(lg)
      else if (sm !== undefined && w >= 640) setCount(sm)
      else setCount(def)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [def, sm, lg])
  return count
}

export default function Carrusel({
  nodes,
  slidesPerView = 1,
  mode = 'autoplay',
  loop = true,
}: CarruselProps) {
  const spvDef = typeof slidesPerView === 'number' ? slidesPerView : slidesPerView.default
  const spvSm  = typeof slidesPerView === 'number' ? undefined : slidesPerView.sm
  const spvLg  = typeof slidesPerView === 'number' ? undefined : slidesPerView.lg
  const resolvedSPV = useResolvedSPV(spvDef, spvSm, spvLg)
  const reducedMotion = usePrefersReducedMotion()

  const isStatic = nodes.length <= resolvedSPV

  const plugins = useMemo(() => {
    if (isStatic || reducedMotion) return []
    if (mode === 'autoscroll') {
      return [
        AutoScroll({
          speed: 2,
          stopOnMouseEnter: true,
          stopOnInteraction: false,
        }),
      ]
    }
    return [
      Autoplay({
        delay: 4000,
        stopOnMouseEnter: true,
        stopOnInteraction: false,
      }),
    ]
  }, [mode, isStatic, reducedMotion])

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop }, plugins)

  useEffect(() => {
    emblaApi?.reInit()
  }, [emblaApi, resolvedSPV])

  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <div className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div
          className={styles.embla__container}
          style={{ '--slides-per-view': resolvedSPV } as React.CSSProperties}
        >
          {nodes.map((node, index) => (
            <div key={index} className={styles.embla__slide}>
              {node}
            </div>
          ))}
        </div>
      </div>

      {/* En autoscroll sin plugin (reduced-motion) hacen falta los controles */}
      {!isStatic && (mode !== 'autoscroll' || reducedMotion) && (
        <div className={styles.embla__controls}>
          <button
            className={styles.embla__button}
            onClick={scrollPrev}
            aria-label="Anterior"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M9 2L4 7l5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className={styles.embla__dots}>
            {nodes.map((_, index) => (
              <button
                key={index}
                className={`${styles.embla__dot}${
                  index === selectedIndex
                    ? ` ${styles['embla__dot--selected']}`
                    : ''
                }`}
                onClick={() => emblaApi?.scrollTo(index)}
                aria-label={`Ir al slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            className={styles.embla__button}
            onClick={scrollNext}
            aria-label="Siguiente"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M5 2l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
