import { useEffect, useState } from 'react'

type Position = { x: number; y: number }

export function useMousePosition(enabled = true) {
  const [position, setPosition] = useState<Position>({ x: 0.5, y: 0.5 })

  useEffect(() => {
    if (!enabled) return

    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return

    const onMove = (event: MouseEvent) => {
      setPosition({
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight,
      })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [enabled])

  return position
}
