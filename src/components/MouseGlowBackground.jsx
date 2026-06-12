import { useEffect, useRef } from 'react'

const BLOB_DEFS = [
  { rx: 0.14, ry: 0.28, speed: 0.00028, phase: 0, color: [99, 91, 255] },
  { rx: 0.86, ry: 0.18, speed: 0.00041, phase: 1.9, color: [0, 212, 255] },
  { rx: 0.58, ry: 0.78, speed: 0.00033, phase: 3.2, color: [168, 85, 247] },
  { rx: 0.22, ry: 0.72, speed: 0.00024, phase: 5.1, color: [236, 72, 153] },
]

function MouseGlowBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let width = 0
    let height = 0
    let frame = 0
    let visible = !document.hidden
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mouse = { x: -9999, y: -9999, active: false }
    const smooth = { x: -9999, y: -9999 }

    const nodes = Array.from({ length: 22 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00009,
      vy: (Math.random() - 0.5) * 0.00009,
      r: 1.4 + Math.random() * 1.6,
    }))

    function resize() {
      const section = canvas.parentElement?.parentElement
      if (!section) return
      const rect = section.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = Math.max(rect.width, 320)
      height = Math.max(rect.height, 200)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function draw(time) {
      if (!visible || reduced) { frame = 0; return }

      ctx.clearRect(0, 0, width, height)

      smooth.x += (mouse.x - smooth.x) * 0.055
      smooth.y += (mouse.y - smooth.y) * 0.055

      BLOB_DEFS.forEach((b) => {
        const t = time * b.speed
        const bx = (b.rx + Math.sin(t + b.phase) * 0.09) * width
        const by = (b.ry + Math.cos(t * 0.74 + b.phase) * 0.07) * height
        const r = Math.min(width, height) * 0.46

        const g = ctx.createRadialGradient(bx, by, 0, bx, by, r)
        g.addColorStop(0, `rgba(${b.color.join(',')}, 0.068)`)
        g.addColorStop(0.52, `rgba(${b.color.join(',')}, 0.024)`)
        g.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(bx, by, r, 0, Math.PI * 2)
        ctx.fill()
      })

      if (mouse.active && smooth.x > 0 && smooth.x < width) {
        const r = Math.min(width, height) * 0.36
        const mg = ctx.createRadialGradient(smooth.x, smooth.y, 0, smooth.x, smooth.y, r)
        mg.addColorStop(0, 'rgba(99, 91, 255, 0.11)')
        mg.addColorStop(0.38, 'rgba(0, 212, 255, 0.048)')
        mg.addColorStop(1, 'rgba(99, 91, 255, 0)')
        ctx.fillStyle = mg
        ctx.beginPath()
        ctx.arc(smooth.x, smooth.y, r, 0, Math.PI * 2)
        ctx.fill()
      }

      nodes.forEach((n) => {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > 1) n.vx *= -1
        if (n.y < 0 || n.y > 1) n.vy *= -1
      })

      const maxDist = Math.min(width, height) * 0.19
      for (let i = 0; i < nodes.length; i++) {
        const ax = nodes[i].x * width
        const ay = nodes[i].y * height
        for (let j = i + 1; j < nodes.length; j++) {
          const bx = nodes[j].x * width
          const by = nodes[j].y * height
          const dist = Math.hypot(ax - bx, ay - by)
          if (dist < maxDist) {
            ctx.globalAlpha = (1 - dist / maxDist) * 0.18
            ctx.strokeStyle = '#635BFF'
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(ax, ay)
            ctx.lineTo(bx, by)
            ctx.stroke()
          }
        }
      }

      ctx.globalAlpha = 0.18
      ctx.fillStyle = '#635BFF'
      nodes.forEach((n) => {
        ctx.beginPath()
        ctx.arc(n.x * width, n.y * height, n.r, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1

      frame = requestAnimationFrame(draw)
    }

    function handleMove(e) {
      const section = canvas.parentElement?.parentElement
      if (!section) return
      const rect = section.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = true
      if (!frame && visible && !reduced) frame = requestAnimationFrame(draw)
    }

    function handleLeave() {
      mouse.active = false
    }

    function handleVisibility() {
      visible = !document.hidden
      if (visible && !frame && !reduced) frame = requestAnimationFrame(draw)
      if (!visible && frame) { cancelAnimationFrame(frame); frame = 0 }
    }

    const section = canvas.parentElement?.parentElement
    resize()
    if (!reduced) frame = requestAnimationFrame(draw)

    window.addEventListener('resize', resize)
    if (section) {
      section.addEventListener('pointermove', handleMove, { passive: true })
      section.addEventListener('pointerleave', handleLeave)
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      window.removeEventListener('resize', resize)
      if (section) {
        section.removeEventListener('pointermove', handleMove)
        section.removeEventListener('pointerleave', handleLeave)
      }
      document.removeEventListener('visibilitychange', handleVisibility)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="mouse-glow-bg" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  )
}

export default MouseGlowBackground
