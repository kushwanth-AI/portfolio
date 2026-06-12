import { useEffect, useRef } from 'react'

export const VIZ_THEMES = {
  stripe: {
    label: 'Stripe Blue',
    swatches: ['#635BFF', '#7C3AED', '#EC4899'],
    palette: [[99,91,255],[124,58,237],[236,72,153],[245,158,11],[0,212,255],[56,189,248]],
    halos: [[99,91,255],[0,212,255],[236,72,153]],
    core: [99,91,255],
  },
  ocean: {
    label: 'Cyan / Aqua',
    swatches: ['#00D4FF', '#38BDF8', '#2DD4BF'],
    palette: [[0,212,255],[56,189,248],[45,212,191],[99,91,255],[16,185,129],[125,211,252]],
    halos: [[0,212,255],[45,212,191],[16,185,129]],
    core: [0,212,255],
  },
  sunset: {
    label: 'Pink / Orange',
    swatches: ['#EC4899', '#F97316', '#F59E0B'],
    palette: [[236,72,153],[249,115,22],[245,158,11],[239,68,68],[217,70,239],[251,191,36]],
    halos: [[236,72,153],[249,115,22],[245,158,11]],
    core: [236,72,153],
  },
  enterprise: {
    label: 'Dark Enterprise',
    swatches: ['#94A3B8', '#1E40AF', '#6366F1'],
    palette: [[148,163,184],[100,116,139],[30,64,175],[37,99,235],[99,102,241],[203,213,225]],
    halos: [[30,64,175],[99,102,241],[148,163,184]],
    core: [99,102,241],
  },
  mint: {
    label: 'Minimal Green',
    swatches: ['#34D399', '#6EE7B7', '#38BDF8'],
    palette: [[52,211,153],[110,231,183],[167,243,208],[56,189,248],[99,91,255],[0,212,255]],
    halos: [[52,211,153],[56,189,248],[99,91,255]],
    core: [52,211,153],
  },
}

function paletteAt(palette, t) {
  const n = palette.length
  const s = ((t % 1 + 1) % 1) * n
  const i = Math.floor(s)
  const f = s - i
  const a = palette[i]
  const b = palette[(i + 1) % n]
  return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f]
}

function toRgb(c) {
  return `${Math.round(c[0])},${Math.round(c[1])},${Math.round(c[2])}`
}

function buildScene(w, h) {
  const dim = Math.min(w, h)
  const count = w > 640 ? 480 : 240
  const rays = Array.from({ length: count }, (_, i) => {
    const t = i / count
    const jitter = (Math.random() - 0.5) * (Math.PI * 2 / count) * 2.6
    return {
      baseAngle: t * Math.PI * 2 + jitter,
      length: dim * (0.3 + Math.random() * 1.05),
      speed: 0.22 + Math.random() * 0.7,
      phase: Math.random() * Math.PI * 2,
      waveMag: 0.007 + Math.random() * 0.016,
      dotT: 0.72 + Math.random() * 0.26,
      dotR: 1.0 + Math.random() * 3.2,
      lineW: 0.3 + Math.random() * 0.95,
      alpha: 0.15 + Math.random() * 0.56,
      colorT: t,
    }
  })
  const nodes = Array.from({ length: 14 }, (_, i) => ({
    x: Math.random(),
    y: Math.random(),
    vx: (Math.random() - 0.5) * 0.000042,
    vy: (Math.random() - 0.5) * 0.000042,
    r: 2.5 + Math.random() * 5,
    alpha: 0.34 + Math.random() * 0.44,
    colorT: i / 14,
  }))
  return { rays, nodes }
}

function InteractiveStripeVisualization({ themeKey = 'stripe' }) {
  const canvasRef = useRef(null)
  const themeRef = useRef(VIZ_THEMES[themeKey] || VIZ_THEMES.stripe)

  useEffect(() => {
    themeRef.current = VIZ_THEMES[themeKey] || VIZ_THEMES.stripe
  }, [themeKey])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let w = 0, h = 0
    let rays = [], floatNodes = []
    let rafId = 0
    let visible = !document.hidden
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ptr = { x: 0, y: 0, active: false }
    const sPtr = { x: 0, y: 0 }

    function setup() {
      const rect = canvas.parentElement.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = Math.max(rect.width, 300)
      h = Math.max(rect.height, 200)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ptr.x = w / 2; ptr.y = h / 2
      sPtr.x = ptr.x; sPtr.y = ptr.y
      const scene = buildScene(w, h)
      rays = scene.rays
      floatNodes = scene.nodes
    }

    function drawBackground(ox, oy, t) {
      let g = ctx.createRadialGradient(ox, oy, 0, ox, oy, Math.max(w, h) * 0.86)
      g.addColorStop(0, '#111648')
      g.addColorStop(0.4, '#080c2e')
      g.addColorStop(0.76, '#04061c')
      g.addColorStop(1, '#02030c')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)

      const d = t * 0.000013
      const { halos } = themeRef.current
      const offsets = [
        { rx: 0.22 + Math.sin(d) * 0.1, ry: 0.25 + Math.cos(d * 0.8) * 0.09 },
        { rx: 0.78 + Math.sin(d * 0.72) * 0.09, ry: 0.24 + Math.cos(d) * 0.11 },
        { rx: 0.5 + Math.sin(d * 0.53) * 0.13, ry: 0.76 + Math.cos(d * 0.88) * 0.09 },
      ]
      const alphas = [0.09, 0.07, 0.064]
      halos.forEach((hc, i) => {
        const bx = offsets[i].rx * w
        const by = offsets[i].ry * h
        const br = Math.min(w, h) * 0.46
        g = ctx.createRadialGradient(bx, by, 0, bx, by, br)
        g.addColorStop(0, `rgba(${hc.join(',')},${alphas[i]})`)
        g.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = g
        ctx.beginPath(); ctx.arc(bx, by, br, 0, Math.PI * 2); ctx.fill()
      })
    }

    function drawCore(ox, oy, t) {
      const pulse = 1 + Math.sin(t * 0.00172) * 0.22
      const [cr, cg, cb] = themeRef.current.core

      let g = ctx.createRadialGradient(ox, oy, 0, ox, oy, 30 * pulse)
      g.addColorStop(0, 'rgba(218,214,255,0.97)')
      g.addColorStop(0.42, `rgba(${cr},${cg},${cb},0.64)`)
      g.addColorStop(1, `rgba(${cr},${cg},${cb},0)`)
      ctx.fillStyle = g
      ctx.beginPath(); ctx.arc(ox, oy, 30 * pulse, 0, Math.PI * 2); ctx.fill()

      g = ctx.createRadialGradient(ox, oy, 0, ox, oy, 72 * pulse)
      g.addColorStop(0, `rgba(${cr},${cg},${cb},0.22)`)
      g.addColorStop(0.5, `rgba(${cr},${cg},${cb},0.07)`)
      g.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = g
      ctx.beginPath(); ctx.arc(ox, oy, 72 * pulse, 0, Math.PI * 2); ctx.fill()
    }

    function drawFloatNodes(colorDrift) {
      const { palette } = themeRef.current
      floatNodes.forEach((node) => {
        node.x = ((node.x + node.vx) + 1) % 1
        node.y = ((node.y + node.vy) + 1) % 1
        const nx = node.x * w, ny = node.y * h
        const cs = toRgb(paletteAt(palette, node.colorT + colorDrift * 0.5))
        const g = ctx.createRadialGradient(nx, ny, 0, nx, ny, node.r * 6)
        g.addColorStop(0, `rgba(${cs},${(node.alpha * 0.58).toFixed(3)})`)
        g.addColorStop(0.4, `rgba(${cs},${(node.alpha * 0.16).toFixed(3)})`)
        g.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = g
        ctx.beginPath(); ctx.arc(nx, ny, node.r * 6, 0, Math.PI * 2); ctx.fill()
        ctx.fillStyle = `rgba(${cs},${node.alpha.toFixed(3)})`
        ctx.beginPath(); ctx.arc(nx, ny, node.r, 0, Math.PI * 2); ctx.fill()
      })
    }

    function drawRays(ox, oy, t, colorDrift) {
      const { palette } = themeRef.current
      const mAng = Math.atan2(sPtr.x - ox, -(sPtr.y - oy))
      const mDist = Math.hypot(sPtr.x - ox, sPtr.y - oy)
      const mStr = ptr.active ? Math.min(1, mDist / (Math.min(w, h) * 0.46)) * 0.42 : 0

      rays.forEach((ray) => {
        const wave =
          Math.sin(t * 0.001 * ray.speed + ray.phase) * ray.waveMag +
          Math.sin(t * 0.00046 * ray.speed + ray.phase * 1.38) * ray.waveMag * 0.38

        let dA = mAng - ray.baseAngle
        while (dA > Math.PI) dA -= Math.PI * 2
        while (dA < -Math.PI) dA += Math.PI * 2
        const fall = Math.max(0, 1 - Math.abs(dA) / (Math.PI * 0.38))
        const ang = ray.baseAngle + wave + dA * fall * mStr * 0.25
        const len = ray.length * (1 + fall * mStr * 0.44)

        const ex = ox + Math.sin(ang) * len
        const ey = oy - Math.cos(ang) * len
        const dx = ox + Math.sin(ang) * len * ray.dotT
        const dy = oy - Math.cos(ang) * len * ray.dotT
        const cs = toRgb(paletteAt(palette, ray.colorT + colorDrift))
        const al = ray.alpha

        const lg = ctx.createLinearGradient(ox, oy, ex, ey)
        lg.addColorStop(0, `rgba(${cs},0)`)
        lg.addColorStop(0.28, `rgba(${cs},${(al * 0.26).toFixed(3)})`)
        lg.addColorStop(0.72, `rgba(${cs},${(al * 0.82).toFixed(3)})`)
        lg.addColorStop(1, `rgba(${cs},${al.toFixed(3)})`)
        ctx.strokeStyle = lg
        ctx.lineWidth = ray.lineW
        ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ex, ey); ctx.stroke()

        ctx.fillStyle = `rgba(${cs},${(al * 0.13).toFixed(3)})`
        ctx.beginPath(); ctx.arc(dx, dy, ray.dotR * 5, 0, Math.PI * 2); ctx.fill()
        ctx.fillStyle = `rgba(${cs},${(al * 0.9).toFixed(3)})`
        ctx.beginPath(); ctx.arc(dx, dy, ray.dotR, 0, Math.PI * 2); ctx.fill()
      })
    }

    function drawFrame(t) {
      if (!visible || reduced) { rafId = 0; return }
      sPtr.x += (ptr.x - sPtr.x) * 0.065
      sPtr.y += (ptr.y - sPtr.y) * 0.065
      const ox = w / 2, oy = h / 2
      const colorDrift = t * 0.000024
      ctx.clearRect(0, 0, w, h)
      drawBackground(ox, oy, t)
      drawRays(ox, oy, t, colorDrift)
      drawFloatNodes(colorDrift)
      drawCore(ox, oy, t)
      rafId = requestAnimationFrame(drawFrame)
    }

    function onMove(e) {
      const r = canvas.getBoundingClientRect()
      ptr.x = e.clientX - r.left; ptr.y = e.clientY - r.top
      ptr.active = true
      if (!rafId && visible && !reduced) rafId = requestAnimationFrame(drawFrame)
    }

    function onLeave() { ptr.active = false }

    function onVis() {
      visible = !document.hidden
      if (visible && !rafId && !reduced) rafId = requestAnimationFrame(drawFrame)
      if (!visible && rafId) { cancelAnimationFrame(rafId); rafId = 0 }
    }

    const ro = new ResizeObserver(setup)
    ro.observe(canvas.parentElement)
    setup()
    if (!reduced) rafId = requestAnimationFrame(drawFrame)

    canvas.addEventListener('pointermove', onMove, { passive: true })
    canvas.addEventListener('pointerleave', onLeave)
    document.addEventListener('visibilitychange', onVis)

    return () => {
      ro.disconnect()
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('visibilitychange', onVis)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div className="stripe-viz" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  )
}

export default InteractiveStripeVisualization
