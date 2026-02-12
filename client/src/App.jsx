import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Landing from './pages/Landing'
import Home from './pages/Home'
import About from './pages/About'
import CaseStudies from './pages/CaseStudies'
import CaseStudy from './pages/CaseStudy'
import DevHub from './pages/DevHub'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Navbar from './components/Navbar'
import Starfield from './components/Starfield'

const navPages = ['/home', '/about', '/casestudies', '/devhub', '/gallery', '/contact']

export default function App() {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const showNav = pathname !== '/'

    // scroll to top on every route change
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    // left/right arrow keys to change pages
    useEffect(() => {
        const handler = (e) => {
            if (pathname === '/' || e.metaKey || e.ctrlKey || e.altKey) return
            const tag = document.activeElement?.tagName
            if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return

            const idx = navPages.indexOf(pathname)
            if (idx === -1) return

            if (e.key === 'ArrowRight') {
                e.preventDefault()
                navigate(navPages[(idx + 1) % navPages.length])
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault()
                navigate(navPages[(idx - 1 + navPages.length) % navPages.length])
            }
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [pathname, navigate])

    return (
        <div className="min-h-screen relative">
            <Starfield />
            {showNav && <Navbar />}
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/casestudies" element={<CaseStudies />} />
                <Route path="/casestudies/:slug" element={<CaseStudy />} />
                <Route path="/devhub" element={<DevHub />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </div>
    )
}
