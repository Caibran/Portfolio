import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Footer() {
    const [name, setName] = useState(null)

    // read name from sessionStorage (set by Terminal)
    useEffect(() => {
        try {
            const stored = sessionStorage.getItem('visitor-name')
            // validate: length > 1, letters/spaces/hyphens/apostrophes only, not "visitor"
            if (stored && stored.length > 1 && /^[a-zA-Z\s'-]+$/.test(stored) && stored.toLowerCase() !== 'visitor') {
                setName(stored)
            }
        } catch { }
    }, [])

    return (
        <footer className="mt-20" style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
            <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <span className="text-xs" style={{ color: 'var(--color-text-faint)' }}>
                        Brandon Gundrum &copy; {new Date().getFullYear()}
                    </span>
                    {name && (
                        <span className="text-xs" style={{
                            color: 'var(--color-text-faint)',
                            opacity: 0.6,
                            fontFamily: 'var(--font-mono)',
                        }}>
                            · built for you, {name}.
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-5">
                    <a
                        href="https://github.com/Caibran"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm link-reveal"
                        style={{ color: 'var(--color-text-muted)' }}
                    >
                        GitHub
                    </a>
                    <a
                        href="https://ca.linkedin.com/in/brandongundrum"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm link-reveal"
                        style={{ color: 'var(--color-text-muted)' }}
                    >
                        LinkedIn
                    </a>
                    <Link
                        to="/system"
                        className="text-sm link-reveal"
                        style={{ color: 'var(--color-text-faint)' }}
                    >
                        /system
                    </Link>
                </div>
            </div>
        </footer>
    )
}
