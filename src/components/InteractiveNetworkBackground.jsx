import { useEffect, useRef } from 'react'

const COLORS = ['#635BFF', '#7C3AED', '#EC4899', '#00D4FF']

function InteractiveNetworkBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const pointer = { x: -1000, y: -1000, active: false }
    const nodes = []
    let frame = 0
    let width = 0
    let height = 0
    let visible = !document.hidden
    let reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    function resize() {
      const density = Math.min(window.devicePixelRatio || 1, 1.6)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * density)
      canvas.height = Math.floor(height * density)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(density, 0, 0, density, 0, 0)

      const isSmall = width < 680
      const targetCount = reduced ? 0 : isSmall ? 28 : Math.min(78, Math.floor(width / 18))
      nodes.length = 0

      for (let index = 0; index < targetCount; index += 1) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.34,
          vy: (Math.random() - 0.5) * 0.34,
          radius: Math.random() * 1.8 + 0.8,
          color: COLORS[index % COLORS.length],
        })
      }
    }

    function draw() {
      if (!visible || reduced) {
        frame = 0
        return
      }

      context.clearRect(0, 0, width, height)
      context.globalCompositeOperation = 'lighter'

      nodes.forEach((node, index) => {
        const dx = node.x - pointer.x
        const dy = node.y - pointer.y
        const distance = Math.hypot(dx, dy)

        if (pointer.active && distance < 170) {
          const force = (170 - distance) / 170
          node.vx += (dx / Math.max(distance, 1)) * force * 0.025
          node.vy += (dy / Math.max(distance, 1)) * force * 0.025
        }

        node.x += node.vx
        node.y += node.vy
        node.vx *= 0.992
        node.vy *= 0.992

        if (node.x < -20) node.x = width + 20
        if (node.x > width + 20) node.x = -20
        if (node.y < -20) node.y = height + 20
        if (node.y > height + 20) node.y = -20

        for (let nextIndex = index + 1; nextIndex < nodes.length; nextIndex += 1) {
          const next = nodes[nextIndex]
          const lineDistance = Math.hypot(node.x - next.x, node.y - next.y)
          if (lineDistance < 132) {
            const opacity = (1 - lineDistance / 132) * 0.22
            const gradient = context.createLinearGradient(node.x, node.y, next.x, next.y)
            gradient.addColorStop(0, `${node.color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`)
            gradient.addColorStop(1, `${next.color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`)
            context.strokeStyle = gradient
            context.lineWidth = 1
            context.beginPath()
            context.moveTo(node.x, node.y)
            context.lineTo(next.x, next.y)
            context.stroke()
          }
        }

        context.fillStyle = node.color
        context.shadowColor = node.color
        context.shadowBlur = 14
        context.beginPath()
        context.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        context.fill()
      })

      context.shadowBlur = 0
      context.globalCompositeOperation = 'source-over'
      frame = requestAnimationFrame(draw)
    }

    function movePointer(event) {
      pointer.x = event.clientX
      pointer.y = event.clientY
      pointer.active = true
      if (!frame && visible && !reduced) frame = requestAnimationFrame(draw)
    }

    function leavePointer() {
      pointer.active = false
      pointer.x = -1000
      pointer.y = -1000
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
    window.addEventListener('pointermove', movePointer, { passive: true })
    window.addEventListener('pointerleave', leavePointer)
    document.addEventListener('visibilitychange', handleVisibility)
    motionQuery.addEventListener('change', handleMotionPreference)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', movePointer)
      window.removeEventListener('pointerleave', leavePointer)
      document.removeEventListener('visibilitychange', handleVisibility)
      motionQuery.removeEventListener('change', handleMotionPreference)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return <canvas className="interactive-network-bg" ref={canvasRef} aria-hidden="true" />
}

export default InteractiveNetworkBackground
