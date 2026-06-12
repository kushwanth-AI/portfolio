import { useEffect, useRef } from 'react'

const BURST_COLORS = ['#635BFF', '#7C3AED', '#EC4899', '#F59E0B', '#00D4FF']

function ParticleBurstCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const rays = []
    const pointer = { x: 0, y: 0, active: false }
    let width = 0
    let height = 0
    let frame = 0
    let visible = !document.hidden
    let reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let cursorFrame = 0

    function setMouseVariables(x, y) {
      const xPercent = Math.max(0, Math.min(100, (x / Math.max(width, 1)) * 100))
      const yPercent = Math.max(0, Math.min(100, (y / Math.max(height, 1)) * 100))
      const shiftX = ((xPercent - 50) * 0.12).toFixed(2)
      const shiftY = ((yPercent - 50) * 0.12).toFixed(2)

      canvas.parentElement.style.setProperty('--mouse-x', `${xPercent.toFixed(2)}%`)
      canvas.parentElement.style.setProperty('--mouse-y', `${yPercent.toFixed(2)}%`)
      canvas.parentElement.style.setProperty('--burst-shift-x', `${shiftX}px`)
      canvas.parentElement.style.setProperty('--burst-shift-y', `${shiftY}px`)
    }

    function buildRays() {
      rays.length = 0
      const isSmall = width < 680
      const count = reduced ? 0 : isSmall ? 96 : 240
      const spread = isSmall ? 156 : 168

      for (let index = 0; index < count; index += 1) {
        const normalized = index / Math.max(count - 1, 1)
        const fanBias = Math.sin(normalized * Math.PI)
        const angle = (-spread / 2 + normalized * spread + (Math.random() - 0.5) * 7) * (Math.PI / 180)
        const length = (height * (0.44 + Math.random() * 0.74)) * (0.72 + fanBias * 0.62)

        rays.push({
          angle,
          baseAngle: angle,
          length,
          speed: 0.35 + Math.random() * 0.85,
          phase: Math.random() * Math.PI * 2,
          dot: 0.58 + Math.random() * 0.42,
          width: Math.random() > 0.78 ? 1.35 : 0.78,
          dotSize: Math.random() > 0.82 ? 3.6 : 2.1 + Math.random() * 1.4,
          color: BURST_COLORS[index % BURST_COLORS.length],
          alpha: 0.24 + Math.random() * 0.48,
        })
      }
    }

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect()
      const density = Math.min(window.devicePixelRatio || 1, 1.8)
      width = Math.max(320, rect.width)
      height = Math.max(300, rect.height)
      canvas.width = Math.floor(width * density)
      canvas.height = Math.floor(height * density)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(density, 0, 0, density, 0, 0)
      pointer.x = width / 2
      pointer.y = height * 0.62
      setMouseVariables(pointer.x, pointer.y)
      buildRays()
    }

    function hexToRgba(hex, alpha) {
      const value = hex.replace('#', '')
      const red = parseInt(value.slice(0, 2), 16)
      const green = parseInt(value.slice(2, 4), 16)
      const blue = parseInt(value.slice(4, 6), 16)
      return `rgba(${red}, ${green}, ${blue}, ${alpha})`
    }

    function drawBackground(originX, originY) {
      const warm = context.createLinearGradient(0, 0, 0, height)
      warm.addColorStop(0, 'rgba(255, 252, 246, 0.94)')
      warm.addColorStop(0.44, 'rgba(255, 238, 204, 0.9)')
      warm.addColorStop(1, 'rgba(255, 200, 123, 0.92)')
      context.fillStyle = warm
      context.fillRect(0, 0, width, height)

      const halo = context.createRadialGradient(originX, originY, 0, originX, originY, Math.max(width, height) * 0.72)
      halo.addColorStop(0, 'rgba(236, 72, 153, 0.34)')
      halo.addColorStop(0.22, 'rgba(124, 58, 237, 0.24)')
      halo.addColorStop(0.56, 'rgba(245, 158, 11, 0.18)')
      halo.addColorStop(1, 'rgba(255, 255, 255, 0)')
      context.fillStyle = halo
      context.fillRect(0, 0, width, height)

      context.beginPath()
      context.arc(originX, originY + height * 0.2, width * 0.45, Math.PI, Math.PI * 2)
      const arcGradient = context.createLinearGradient(originX - width * 0.45, originY, originX + width * 0.45, originY)
      arcGradient.addColorStop(0, 'rgba(0, 212, 255, 0.12)')
      arcGradient.addColorStop(0.5, 'rgba(236, 72, 153, 0.18)')
      arcGradient.addColorStop(1, 'rgba(245, 158, 11, 0.12)')
      context.fillStyle = arcGradient
      context.fill()
    }

    function draw(time = 0) {
      if (!visible || reduced) {
        frame = 0
        return
      }

      const t = time * 0.001
      const originX = width / 2
      const originY = height + 6
      const mouseX = pointer.active ? (pointer.x - originX) / width : 0
      const mouseY = pointer.active ? (pointer.y - height * 0.5) / height : 0

      context.clearRect(0, 0, width, height)
      drawBackground(originX, originY)
      context.globalCompositeOperation = 'multiply'

      rays.forEach((ray, index) => {
        const wave = Math.sin(t * ray.speed + ray.phase)
        const angle = ray.baseAngle + wave * 0.015 + mouseX * 0.09
        const length = ray.length * (0.92 + wave * 0.05 - mouseY * 0.06)
        const endX = originX + Math.sin(angle) * length
        const endY = originY - Math.cos(angle) * length
        const dotX = originX + Math.sin(angle) * length * ray.dot
        const dotY = originY - Math.cos(angle) * length * ray.dot

        const gradient = context.createLinearGradient(originX, originY, endX, endY)
        gradient.addColorStop(0, hexToRgba(ray.color, 0))
        gradient.addColorStop(0.38, hexToRgba(ray.color, ray.alpha * 0.5))
        gradient.addColorStop(1, hexToRgba(ray.color, ray.alpha))

        context.strokeStyle = gradient
        context.lineWidth = ray.width
        context.beginPath()
        context.moveTo(originX, originY)
        context.lineTo(endX, endY)
        context.stroke()

        if (index % 3 !== 0) {
          context.fillStyle = hexToRgba(ray.color, 0.82)
          context.beginPath()
          context.arc(dotX, dotY, ray.dotSize * (0.82 + Math.abs(wave) * 0.32), 0, Math.PI * 2)
          context.fill()
        }
      })

      context.globalCompositeOperation = 'source-over'
      context.fillStyle = 'rgba(236, 72, 153, 0.26)'
      context.beginPath()
      context.arc(originX, originY, 18 + Math.sin(t * 1.8) * 4, 0, Math.PI * 2)
      context.fill()
      frame = requestAnimationFrame(draw)
    }

    function updatePointer(clientX, clientY) {
      const rect = canvas.getBoundingClientRect()
      pointer.x = clientX - rect.left
      pointer.y = clientY - rect.top
      pointer.active = true

      if (!cursorFrame) {
        cursorFrame = requestAnimationFrame(() => {
          setMouseVariables(pointer.x, pointer.y)
          cursorFrame = 0
        })
      }

      if (!frame && visible && !reduced) frame = requestAnimationFrame(draw)
    }

    function movePointer(event) {
      updatePointer(event.clientX, event.clientY)
    }

    function moveTouch(event) {
      const touch = event.touches[0]
      if (touch) updatePointer(touch.clientX, touch.clientY)
    }

    function leavePointer() {
      pointer.active = false
    }

    function handleVisibility() {
      visible = !document.hidden
      if (visible && !frame && !reduced) frame = requestAnimationFrame(draw)
      if (!visible && frame) {
        cancelAnimationFrame(frame)
        frame = 0
      }
    }

    function handleMotionPreference(event) {
      reduced = event.matches
      if (frame) cancelAnimationFrame(frame)
      frame = 0
      resize()
      if (!reduced && visible) frame = requestAnimationFrame(draw)
    }

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    resize()
    if (!reduced) frame = requestAnimationFrame(draw)

    window.addEventListener('resize', resize)
    canvas.addEventListener('pointermove', movePointer, { passive: true })
    canvas.addEventListener('touchmove', moveTouch, { passive: true })
    canvas.addEventListener('pointerleave', leavePointer)
    document.addEventListener('visibilitychange', handleVisibility)
    motionQuery.addEventListener('change', handleMotionPreference)

    return () => {
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('pointermove', movePointer)
      canvas.removeEventListener('touchmove', moveTouch)
      canvas.removeEventListener('pointerleave', leavePointer)
      document.removeEventListener('visibilitychange', handleVisibility)
      motionQuery.removeEventListener('change', handleMotionPreference)
      if (frame) cancelAnimationFrame(frame)
      if (cursorFrame) cancelAnimationFrame(cursorFrame)
    }
  }, [])

  return (
    <div className="particle-burst reveal">
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  )
}

export default ParticleBurstCanvas
