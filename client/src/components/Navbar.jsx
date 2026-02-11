import { NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'

const links = [
    { to: '/home', label: 'Home' },
    { to: '/about', label: 'Analysis' },
    { to: '/casestudies', label: 'Case Studies' },
    { to: '/devhub', label: 'Dev Hub' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <nav className="fixed top-0 left-0 right-0 z-40 bg-[var(--color-surface)]/80 backdrop-blur-md border-b border-white/[0.04]">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <NavLink to="/home" className="font-mono text-sm tracking-widest text-[var(--color-cyan-glow)] hover:opacity-80 transition-opacity">
                    ~/portfolio
                </NavLink>

                {/* desktop links */}
                <div className="hidden md:flex items-center gap-8">
                    {links.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `text-sm transition-colors duration-200 ${isActive
                                    ? 'text-white nav-active'
                                    : 'text-[var(--color-text-dim)] hover:text-white'
                                }`
                            }
                        >
                            {label}
                        </NavLink>
                    ))}
                </div>

                {/* mobile toggle */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-[var(--color-text-dim)] hover:text-white transition-colors"
                    aria-label="Toggle menu"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        {menuOpen
                            ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                        }
                    </svg>
                </button>
            </div>

            {/* mobile menu */}
            {menuOpen && (
                <div className="md:hidden bg-[var(--color-surface-light)] border-t border-white/[0.04] px-6 py-4 space-y-3">
                    {links.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            onClick={() => setMenuOpen(false)}
                            className={({ isActive }) =>
                                `block text-sm ${isActive ? 'text-[var(--color-cyan-glow)]' : 'text-[var(--color-text-dim)]'}`
                            }
                        >
                            {label}
                        </NavLink>
                    ))}
                </div>
            )}
        </nav>
    )
}
