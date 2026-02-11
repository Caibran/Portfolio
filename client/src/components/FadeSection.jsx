import { useEffect, useRef, useState } from 'react'

export default function FadeSection({ children, className = '', id }) {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => setVisible(entry.isIntersecting),
            { threshold: 0.15 }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return (
        <section
            id={id}
            ref={ref}
            className={`fade-section ${visible ? 'visible' : ''} ${className}`}
        >
            {children}
        </section>
    )
}
