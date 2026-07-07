import { useEffect, useRef } from 'react'

export default function WaveBanner() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = canvas?.parentElement

    if (!canvas || !container) {
      return undefined
    }

    const ctx = canvas.getContext('2d')

    if (!ctx) {
      return undefined
    }

    let width = 0
    let height = 0
    let time = 0
    let frameId = 0

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches // Check if the user prefers reduced motion
    const lineCount = 34 // Number of wave lines to draw
    const strokeColor = '255, 255, 255' // RGB color for the wave lines
    const speed = prefersReducedMotion ? 0 : 0.0065 // Speed of the wave animation (set to 0 if reduced motion is preferred)

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2) // Limit the device pixel ratio to a maximum of 2 for performance
      width = container.clientWidth // Get the width of the container element
      height = container.clientHeight // Get the height of the container element
      canvas.width = width * dpr // Set the canvas width based on the container's width and device pixel ratio
      canvas.height = height * dpr // Set the canvas height based on the container's height and device pixel ratio
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0) // Scale the canvas context to account for the device pixel ratio
    }

    const strandY = (x, index, currentTime) => {
      const centerY = height * 0.52 // Center Y position for the wave lines 
      const spread = height * 0.62 // Spread factor to control the vertical distance between wave lines
      const offset = (index / lineCount - 0.5) * spread // Calculate the vertical offset for each wave line based on its index and the total number of lines
      const nx = x / width

      const wave1 = Math.sin(nx * Math.PI * 2.1 + currentTime + index * 0.07) * height * 0.05 // Calculate the first wave component based on the x position, current time, and index of the wave line
      const wave2 = Math.sin(nx * Math.PI * 4.3 - currentTime * 1.8 + index * 0.12) * height * 0.12 //  Calculate the second wave component based on the x position, current time, and index of the wave line
      const wave3 = Math.sin(nx * Math.PI * 1.1 + currentTime * 0.8 - index * 0.03) * height * 0.03 //  Calculate the third wave component based on the x position, current time, and index of the wave line

      return centerY + offset + wave1 + wave2 + wave3
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height) //  Clear the entire canvas before drawing the new frame

      for (let index = 0; index < lineCount; index += 1) {
        const currentTime = time + index * 0.015 // Calculate the current time for each wave line based on the global time and the index of the wave line
        const edgeFade = 1 - Math.abs(index / lineCount - 0.5) * 0.1 //  Calculate the fade effect for the edges of the wave lines based on the index of the wave line and the total number of lines
        const alpha = Math.max(0.05, .64 * Math.max(0, edgeFade)) // Calculate the alpha value for the wave line based on the edge fade effect, ensuring a minimum alpha value of 0.05

        ctx.beginPath()
        for (let x = 0; x <= width; x += 4) {
          const y = strandY(x, index, currentTime)

          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        ctx.strokeStyle = `rgba(${strokeColor}, ${alpha})` // 
        ctx.lineWidth = 1.5
        ctx.stroke()
      }
    }

    const loop = () => {
      time += speed
      draw()

      if (!prefersReducedMotion) {
        frameId = window.requestAnimationFrame(loop)
      }
    }

    const handleResize = () => {
      resize()
      draw()
    }

    resize()
    loop()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)

      if (frameId) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [])

  return (
    <div className="wave-banner" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  )
}
