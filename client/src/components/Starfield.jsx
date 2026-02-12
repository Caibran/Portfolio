import { useEffect, useRef } from 'react'

export default function Starfield() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')

        let animId
        let stars = []
        const STAR_COUNT = 80

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        const init = () => {
            resize()
            stars = Array.from({ length: STAR_COUNT }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 1.2 + 0.3,
                dx: (Math.random() - 0.5) * 0.15,
                dy: (Math.random() - 0.5) * 0.1,
                opacity: Math.random() * 0.3 + 0.05,
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: Math.random() * 0.008 + 0.003,
            }))
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            for (const s of stars) {
                s.x += s.dx
                s.y += s.dy
                s.pulse += s.pulseSpeed

                // wrap around
                if (s.x < 0) s.x = canvas.width
                if (s.x > canvas.width) s.x = 0
                if (s.y < 0) s.y = canvas.height
                if (s.y > canvas.height) s.y = 0

                const flicker = s.opacity + Math.sin(s.pulse) * 0.08
                ctx.beginPath()
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(200, 210, 230, ${Math.max(0, flicker)})`
                ctx.fill()
            }

            animId = requestAnimationFrame(draw)
        }

        init()
        draw()

        window.addEventListener('resize', resize)
        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener('resize', resize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 0,
                pointerEvents: 'none',
            }}
        />
    )
}
