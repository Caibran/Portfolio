import { NavLink } from 'react-router-dom'
import { useState } from 'react'

const links = [
    { to: '/home', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/casestudies', label: 'Case Studies' },
    { to: '/devhub', label: 'Dev Hub' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-40" style={{ background: 'var(--color-bg)' }}>
                <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
                    <NavLink
                        to="/home"
                        className="text-base font-semibold tracking-tight"
                        style={{ color: 'var(--color-text)' }}
                    >
                        Brandon Gundrum
                    </NavLink>

                    {/* desktop nav */}
                    <div className="hidden md:flex items-center gap-6">
                        {links.map(({ to, label }) => (
                            <NavLink
                                key={to}
                                to={to}
                                className={({ isActive }) =>
                                    `text-sm transition-colors duration-200 ${isActive
                                        ? 'nav-active'
                                        : ''
                                    }`
                                }
                                style={({ isActive }) => ({
                                    color: isActive ? 'var(--color-text)' : 'var(--color-text-muted)',
                                })}
                            >
                                {label}
                            </NavLink>
                        ))}
                    </div>

                    {/* mobile hamburger */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden"
                        style={{ color: 'var(--color-text-muted)' }}
                        aria-label="Toggle menu"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            {menuOpen
                                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                            }
                        </svg>
                    </button>
                </div>

                {/* thin border — barely there */}
                <div style={{ height: '1px', background: 'var(--color-border-subtle)' }} />
            </nav>

            {/* mobile overlay + slide-in panel */}
            <div
                className={`mobile-overlay ${menuOpen ? 'open' : ''}`}
                onClick={() => setMenuOpen(false)}
            />
            <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
                <div className="flex flex-col gap-4">
                    {links.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            onClick={() => setMenuOpen(false)}
                            className={({ isActive }) =>
                                `text-base transition-colors ${isActive ? '' : ''}`
                            }
                            style={({ isActive }) => ({
                                color: isActive ? 'var(--color-accent)' : 'var(--color-text-muted)',
                            })}
                        >
                            {label}
                        </NavLink>
                    ))}
                </div>
            </div>
        </>
    )
}
