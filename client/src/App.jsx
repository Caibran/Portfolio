import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import Landing from './pages/Landing'
import Home from './pages/Home'
import About from './pages/About'
import CaseStudies from './pages/CaseStudies'
import CaseStudy from './pages/CaseStudy'
import DevHub from './pages/DevHub'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import System from './pages/System'
import Navbar from './components/Navbar'

const navPages = ['/home', '/about', '/casestudies', '/devhub', '/gallery', '/contact']

// each section gets a full atmosphere — not just hue, but feel
// atmospheres: binary tracking (tight/normal), warm/cool tint groups
const WARM_TINT = 'rgba(196, 122, 74, 0.015)'
const COOL_TINT = 'rgba(100, 130, 125, 0.015)'
const TIGHT = '-0.02em'
const NORMAL = '-0.01em'

const pageAtmospheres = {
    '/home': { accent: '#c47a4a', bgTint: WARM_TINT, shadowStrength: '0.12', headingTracking: TIGHT, sectionGap: '5rem' },
    '/about': { accent: '#c4884a', bgTint: WARM_TINT, shadowStrength: '0.10', headingTracking: NORMAL, sectionGap: '4.5rem' },
    '/casestudies': { accent: '#a07858', bgTint: WARM_TINT, shadowStrength: '0.14', headingTracking: TIGHT, sectionGap: '3.5rem' },
    '/devhub': { accent: '#7a9a8a', bgTint: COOL_TINT, shadowStrength: '0.16', headingTracking: TIGHT, sectionGap: '3rem' },
    '/gallery': { accent: '#c4644a', bgTint: COOL_TINT, shadowStrength: '0.18', headingTracking: NORMAL, sectionGap: '5.5rem' },
    '/contact': { accent: '#c47a4a', bgTint: WARM_TINT, shadowStrength: '0.10', headingTracking: NORMAL, sectionGap: '4rem' },
    '/system': { accent: '#7a8a9a', bgTint: COOL_TINT, shadowStrength: '0.08', headingTracking: TIGHT, sectionGap: '4rem' },
}

const defaultAtmosphere = pageAtmospheres['/home']

export default function App() {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const showNav = pathname !== '/'
    const contentRef = useRef(null)
    const [showKbBadge, setShowKbBadge] = useState(false)
    const kbTimeout = useRef(null)

    // always start at the top when switching routes
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    // set full section atmosphere as CSS custom properties
    useEffect(() => {
        const base = pathname.startsWith('/casestudies/') ? '/casestudies'
            : pathname.startsWith('/gallery/') ? '/gallery'
                : pathname
        const atmos = pageAtmospheres[base] || defaultAtmosphere
        const root = document.documentElement.style
        root.setProperty('--page-accent', atmos.accent)
        root.setProperty('--page-bg-tint', atmos.bgTint)
        root.setProperty('--page-shadow-strength', atmos.shadowStrength)
        root.setProperty('--page-heading-tracking', atmos.headingTracking)
        root.setProperty('--page-section-gap', atmos.sectionGap)
    }, [pathname])

    // arrow keys cycle through pages with nudge + keyboard badge
    useEffect(() => {
        const handler = (e) => {
            if (pathname === '/' || e.metaKey || e.ctrlKey || e.altKey) return
            const tag = document.activeElement?.tagName
            if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return

            const idx = navPages.indexOf(pathname)
            if (idx === -1) return

            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                e.preventDefault()

                // show keyboard badge
                setShowKbBadge(true)
                clearTimeout(kbTimeout.current)
                kbTimeout.current = setTimeout(() => setShowKbBadge(false), 2500)

                const next = e.key === 'ArrowRight'
                    ? navPages[(idx + 1) % navPages.length]
                    : navPages[(idx - 1 + navPages.length) % navPages.length]

                navigate(next)
            }
        }

        // hide badge on mouse click (user switched to mouse)
        const clickHandler = () => {
            setShowKbBadge(false)
        }

        window.addEventListener('keydown', handler)
        window.addEventListener('click', clickHandler)
        return () => {
            window.removeEventListener('keydown', handler)
            window.removeEventListener('click', clickHandler)
        }
    }, [pathname, navigate])

    return (
        <div ref={contentRef} className="min-h-screen relative" style={{ zIndex: 1 }}>
            {showNav && <Navbar />}
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/casestudies" element={<CaseStudies />} />
                <Route path="/casestudies/:slug" element={<CaseStudy />} />
                <Route path="/devhub" element={<DevHub />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/gallery/:projectId" element={<Gallery />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/system" element={<System />} />
            </Routes>

            {/* keyboard navigation badge */}
            <div
                className="fixed bottom-6 right-6 px-3 py-1.5 rounded-full text-xs transition-all"
                style={{
                    fontFamily: 'var(--font-mono)',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'var(--color-text-faint)',
                    opacity: showKbBadge ? 1 : 0,
                    transform: showKbBadge ? 'translateY(0)' : 'translateY(8px)',
                    pointerEvents: 'none',
                    transitionDuration: 'var(--duration-base)',
                    transitionTimingFunction: 'var(--ease)',
                    zIndex: 50,
                }}
            >
                ⌨ keyboard navigation
            </div>
        </div>
    )
}
