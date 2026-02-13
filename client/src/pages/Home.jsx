import { useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import FadeSection from '../components/FadeSection'
import Footer from '../components/Footer'
import { projects } from '../data'

const sectionIds = ['identity', 'philosophy', 'flagship', 'secondary', 'explore']

export default function Home() {
    const currentSection = useRef(0)
    const shards = projects.find(p => p.title === 'Shards of Eternity')
    const anomaly = projects.find(p => p.title === 'Anomaly Editor')

    const scrollToSection = useCallback((index) => {
        const clamped = Math.max(0, Math.min(index, sectionIds.length - 1))
        currentSection.current = clamped
        document.getElementById(sectionIds[clamped])?.scrollIntoView({ behavior: 'smooth' })
    }, [])

    useEffect(() => {
        const handler = (e) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault()
                scrollToSection(currentSection.current + 1)
            } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                scrollToSection(currentSection.current - 1)
            }
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [scrollToSection])

    return (
        <main className="pt-14">
            {/* identity — clear positioning, no fluff */}
            <FadeSection id="identity" className="min-h-[85vh] flex items-center">
                <div className="max-w-3xl mx-auto px-6 w-full">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight heading-live" style={{ color: 'var(--color-text)' }}>
                        Brandon Gundrum
                    </h1>
                    <p className="text-lg mb-6" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}>
                        Systems-oriented Frontend & Full-Stack Engineer
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                        {['React', 'C++', 'C#', 'UI Architecture', 'Performance'].map(tag => (
                            <span
                                key={tag}
                                className="px-3 py-1 text-xs"
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                    color: 'var(--color-text-muted)',
                                    border: '1px solid var(--color-border)',
                                    borderRadius: '4px',
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <p className="leading-relaxed max-w-xl mb-10" style={{ color: 'var(--color-text-muted)' }}>
                        I build interactive systems from the ground up — from low-level C++ servers to polished
                        frontend interfaces. Self-taught across design, programming, and systems architecture,
                        I focus on clarity, performance, and long-term maintainability.
                    </p>
                    <div className="flex items-center gap-3">
                        <a href="#flagship" className="btn-primary" onClick={e => { e.preventDefault(); scrollToSection(2) }}>
                            View Selected Work
                        </a>
                        {/* Resume button — uncomment when PDF is ready:
                        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-ghost">
                            Download Resume
                        </a> */}
                        <Link to="/about" className="btn-ghost">About Me</Link>
                    </div>
                    <p className="text-xs mt-16" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-faint)' }}>
                        ↓ scroll or use arrow keys
                    </p>
                </div>
            </FadeSection>

            {/* engineering philosophy — bullet principles */}
            <FadeSection id="philosophy" className="py-24">
                <div className="max-w-3xl mx-auto px-6">
                    <span className="text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}>
                        Philosophy
                    </span>
                    <h2 className="text-3xl font-bold mt-2 mb-10 heading-live" style={{ color: 'var(--color-text)' }}>
                        How I Build
                    </h2>
                    <div style={{ borderLeft: '2px solid var(--color-accent)', paddingLeft: '1.5rem' }}>
                        <ul className="space-y-4">
                            {[
                                'Understand the system before abstracting it.',
                                'Prefer build-time solutions over runtime overhead.',
                                'Optimize for maintainability, not cleverness.',
                                'Document decisions, not just outcomes.',
                                'Ship small iterations, improve continuously.',
                            ].map((principle, i) => (
                                <li key={i} className="leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                                    {principle}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </FadeSection>

            {/* flagship project — Shards of Eternity */}
            <FadeSection id="flagship" className="py-24">
                <div className="max-w-3xl mx-auto px-6">
                    <span className="text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}>
                        Selected Work
                    </span>
                    <h2 className="text-3xl font-bold mt-2 mb-2 heading-live" style={{ color: 'var(--color-text)' }}>
                        {shards?.title || 'Shards of Eternity'}
                    </h2>
                    <p className="text-sm mb-8" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-faint)' }}>
                        Multiplayer MMO — C server · C# client · SQL backend
                    </p>
                    <p className="leading-relaxed mb-8" style={{ color: 'var(--color-text-muted)' }}>
                        A long-running multiplayer game built on a forked server/client foundation and extensively
                        expanded with custom systems, database features, and gameplay mechanics. Designed and
                        maintained as a full-stack multiplayer system across four repositories.
                    </p>
                    <ul className="space-y-3 mb-8">
                        {[
                            'Custom server-side gameplay systems in C++',
                            'Database schema design, migration, and persistence layers',
                            'Client modifications and UI rendering in C#',
                            'Custom binary protocol and packet serialization',
                            'Multi-repository architecture across four languages',
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                                <span style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '2px' }}>▸</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                    <div className="flex items-center gap-4">
                        <Link
                            to="/gallery/3"
                            className="text-sm link-reveal"
                            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}
                        >
                            deep dive →
                        </Link>
                        {shards?.url && (
                            <a
                                href={shards.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm link-reveal"
                                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-faint)' }}
                            >
                                github →
                            </a>
                        )}
                    </div>
                </div>
            </FadeSection>

            {/* secondary project — Anomaly Editor */}
            <FadeSection id="secondary" className="py-24">
                <div className="max-w-3xl mx-auto px-6">
                    <span className="text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}>
                        Selected Work
                    </span>
                    <h2 className="text-3xl font-bold mt-2 mb-2 heading-live" style={{ color: 'var(--color-text)' }}>
                        {anomaly?.title || 'Anomaly Editor'}
                    </h2>
                    <p className="text-sm mb-8" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-faint)' }}>
                        Electron · React · Cross-Platform Desktop App
                    </p>
                    <p className="leading-relaxed mb-8" style={{ color: 'var(--color-text-muted)' }}>
                        A cross-platform markdown editor built to explore Electron's IPC architecture, file system
                        bridging, and desktop distribution pipelines. Focused on speed and minimal dependency footprint.
                    </p>
                    <ul className="space-y-3 mb-8">
                        {[
                            'IPC-based file system bridge through preload security boundary',
                            'Debounced autosave with beforeunload safety flush',
                            'Live markdown preview with syntax highlighting',
                            'Single-command build pipeline for 3 platforms',
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                                <span style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '2px' }}>▸</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                    <div className="flex items-center gap-4">
                        <Link
                            to="/gallery/1"
                            className="text-sm link-reveal"
                            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}
                        >
                            deep dive →
                        </Link>
                        {anomaly?.url && (
                            <a
                                href={anomaly.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm link-reveal"
                                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-faint)' }}
                            >
                                github →
                            </a>
                        )}
                    </div>
                </div>
            </FadeSection>

            {/* explore the system */}
            <FadeSection id="explore" className="py-24">
                <div className="max-w-3xl mx-auto px-6">
                    <div className="max-w-lg mx-auto text-center">
                        <span className="text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}>
                            Under the Hood
                        </span>
                        <h2 className="text-3xl font-bold mt-2 mb-6 heading-live" style={{ color: 'var(--color-text)' }}>
                            Explore the System
                        </h2>
                        <p className="leading-relaxed mb-8" style={{ color: 'var(--color-text-muted)' }}>
                            This portfolio is itself a case study — explicit architecture, minimal dependencies,
                            measurable performance, and documented tradeoffs. See how it's built.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <Link to="/system" className="btn-primary">View Architecture</Link>
                            <Link to="/" className="btn-ghost">Open Terminal</Link>
                        </div>
                        <p className="text-xs mt-6" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-faint)' }}>
                            More work available in{' '}
                            <Link to="/gallery" className="link-reveal" style={{ color: 'var(--color-text-faint)' }}>Gallery</Link>
                            {' '}and{' '}
                            <Link to="/casestudies" className="link-reveal" style={{ color: 'var(--color-text-faint)' }}>Case Studies</Link>
                        </p>
                    </div>
                </div>
            </FadeSection>

            <Footer />
        </main>
    )
}
