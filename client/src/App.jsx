import { Routes, Route, useLocation } from 'react-router-dom'
import Landing from './pages/Landing'
import Home from './pages/Home'
import About from './pages/About'
import CaseStudies from './pages/CaseStudies'
import CaseStudy from './pages/CaseStudy'
import DevHub from './pages/DevHub'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Navbar from './components/Navbar'

export default function App() {
    const { pathname } = useLocation()
    const showNav = pathname !== '/'

    return (
        <div className="min-h-screen">
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
