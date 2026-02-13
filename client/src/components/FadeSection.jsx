import { useEffect, useRef, useState } from 'react'

// wraps any section in a scroll-triggered fade-in.
// uses IntersectionObserver — fires once and sticks.
export default function FadeSection({ children, className = '', id }) {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setVisible(true)
            },
            { threshold: 0.12 }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return (
        <section
            id={id}
            ref={ref}
            className={`reveal ${visible ? 'visible' : ''} ${className}`}
        >
            {children}
        </section>
    )
}
