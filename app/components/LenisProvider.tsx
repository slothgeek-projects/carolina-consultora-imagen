'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

/* La instancia se guarda a nivel de módulo para que cualquier componente pueda
   pausar el scroll suave (getLenis()?.stop()) mientras hay un overlay abierto.
   Sin esto, la rueda del mouse sigue moviendo la página detrás del modal. */
let instance: Lenis | null = null

export function getLenis() {
  return instance
}

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    instance = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      instance = null
    }
  }, [])

  return <>{children}</>
}