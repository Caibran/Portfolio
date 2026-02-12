import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import FadeSection from '../components/FadeSection'
import PostPreview from '../components/PostPreview'
import ProjectCard from '../components/ProjectCard'
import Footer from '../components/Footer'
import { posts, projects } from '../data'

const sectionIds = ['welcome', 'about', 'casestudy', 'devhub', 'gallery', 'contact']

export default function Home() {
    const latestPost = useMemo(() => posts[0] || null, [])
    const activeProjects = useMemo(() => projects.filter(p => p.status.includes('active')).slice(0, 3), [])
    const completedProjects = useMemo(() => projects.filter(p => p.status.some(s => s === 'completed' || s === 'hobby')).slice(0, 3), [])
    const currentSection = useRef(0)

    // keyboard arrow scrolling
    const scrollToSection = useCallback((index) => {
        const clamped = Math.max(0, Math.min(index, sectionIds.length - 1))
        currentSection.current = clamped
        document.getElementById(sectionIds[clamped])?.scrollIntoView({ behavior: 'smooth' })
    }, [])

    useEffect(() => {
        const handler = (e) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                e.preventDefault()
                scrollToSection(currentSection.current + 1)
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault()
                scrollToSection(currentSection.current - 1)
            }
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [scrollToSection])

    return (
        <main className="pt-16">
            {/* s1: welcome */}
            <FadeSection id="welcome" className="min-h-[85vh] flex items-center">
                <div className="max-w-6xl mx-auto px-6 w-full">
                    <div className="max-w-2xl">
                        <p className="font-mono text-sm text-[var(--color-cyan-glow)] mb-4 tracking-wider">sys.init()</p>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            Building things<br />
                            <span className="text-[var(--color-text-dim)]">that matter.</span>
                        </h1>
                        <p className="text-lg text-[var(--color-text-dim)] leading-relaxed max-w-lg mb-8">
                            Web designer, problem solver, and relentless learner.
                            This is where I document the work, the process, and the lessons.
                        </p>
                        <div className="flex items-center gap-4">
                            <Link
                                to="/about"
                                className="px-5 py-2.5 bg-[var(--color-cyan-glow)]/10 text-[var(--color-cyan-glow)] border border-[var(--color-cyan-glow)]/20 rounded-lg text-sm font-medium hover:bg-[var(--color-cyan-glow)]/20 transition-colors"
                            >
                                About Me
                            </Link>
                            <Link
                                to="/gallery"
                                className="px-5 py-2.5 text-[var(--color-text-dim)] border border-white/[0.08] rounded-lg text-sm hover:text-white hover:border-white/20 transition-colors"
                            >
                                View Work
                            </Link>
                        </div>
                        <p className="font-mono text-xs text-[var(--color-text-dim)] mt-12 tracking-wider">
                            ↓ scroll or use arrow keys to navigate
                        </p>
                    </div>
                </div>
            </FadeSection>

            {/* s2: brief about */}
            <FadeSection id="about" className="py-24">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        <div>
                            <span className="font-mono text-xs text-[var(--color-violet-glow)] tracking-widest uppercase">/about</span>
                            <h2 className="text-3xl font-bold text-white mt-3 mb-6">A brief overview</h2>
                            <p className="text-[var(--color-text-dim)] leading-relaxed mb-4">
                                I'm a developer drawn to the intersection of systems programming and creative problem solving.
                                From game engine internals to full-stack web apps, I care about how things work under the hood.
                            </p>
                            <p className="text-[var(--color-text-dim)] leading-relaxed">
                                Most of my work lives at the boundary between low-level logic and user-facing experience —
                                building tools that are both powerful and intuitive.
                            </p>
                            <Link to="/about" className="inline-block mt-6 text-sm text-[var(--color-cyan-glow)] hover:underline font-mono">
                                full analysis →
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {['C/C++', 'JavaScript', 'React', 'Node.js', 'SQL', 'Python', 'Linux', 'Git'].map(skill => (
                                <div key={skill} className="bg-[var(--color-surface-card)] border border-white/[0.06] rounded-lg px-4 py-3 text-center">
                                    <span className="text-sm text-white font-medium">{skill}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </FadeSection>

            {/* s3: latest case study */}
            <FadeSection id="casestudy" className="py-24">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex items-end justify-between mb-8">
                        <div>
                            <span className="font-mono text-xs text-[var(--color-violet-glow)] tracking-widest uppercase">/case-studies</span>
                            <h2 className="text-3xl font-bold text-white mt-3">Latest Study</h2>
                        </div>
                        <Link to="/casestudies" className="text-sm text-[var(--color-cyan-glow)] hover:underline font-mono hidden md:block">
                            all studies →
                        </Link>
                    </div>
                    {latestPost ? (
                        <PostPreview post={latestPost} />
                    ) : (
                        <div className="bg-[var(--color-surface-card)] border border-white/[0.06] rounded-xl p-8 text-center">
                            <p className="text-[var(--color-text-dim)] text-sm font-mono">no posts yet — check back soon</p>
                        </div>
                    )}
                    <Link to="/casestudies" className="block mt-4 text-sm text-[var(--color-cyan-glow)] hover:underline font-mono md:hidden">
                        all studies →
                    </Link>
                </div>
            </FadeSection>

            {/* s4: in development */}
            <FadeSection id="devhub" className="py-24">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex items-end justify-between mb-8">
                        <div>
                            <span className="font-mono text-xs text-[var(--color-violet-glow)] tracking-widest uppercase">/dev-hub</span>
                            <h2 className="text-3xl font-bold text-white mt-3">In Development</h2>
                        </div>
                        <Link to="/devhub" className="text-sm text-[var(--color-cyan-glow)] hover:underline font-mono hidden md:block">
                            view all →
                        </Link>
                    </div>
                    {activeProjects.length ? (
                        <div className="grid md:grid-cols-3 gap-4">
                            {activeProjects.map(p => <ProjectCard key={p.id} project={p} />)}
                        </div>
                    ) : (
                        <div className="bg-[var(--color-surface-card)] border border-white/[0.06] rounded-xl p-8 text-center">
                            <p className="text-[var(--color-text-dim)] text-sm font-mono">loading projects...</p>
                        </div>
                    )}
                </div>
            </FadeSection>

            {/* s5: project gallery */}
            <FadeSection id="gallery" className="py-24">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex items-end justify-between mb-8">
                        <div>
                            <span className="font-mono text-xs text-[var(--color-violet-glow)] tracking-widest uppercase">/gallery</span>
                            <h2 className="text-3xl font-bold text-white mt-3">Recent Work</h2>
                        </div>
                        <Link to="/gallery" className="text-sm text-[var(--color-cyan-glow)] hover:underline font-mono hidden md:block">
                            full gallery →
                        </Link>
                    </div>
                    {completedProjects.length ? (
                        <div className="grid md:grid-cols-3 gap-4">
                            {completedProjects.map(p => <ProjectCard key={p.id} project={p} />)}
                        </div>
                    ) : (
                        <div className="bg-[var(--color-surface-card)] border border-white/[0.06] rounded-xl p-8 text-center">
                            <p className="text-[var(--color-text-dim)] text-sm font-mono">loading gallery...</p>
                        </div>
                    )}
                </div>
            </FadeSection>

            {/* s6: communication hub */}
            <FadeSection id="contact" className="py-24">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="max-w-2xl mx-auto text-center">
                        <span className="font-mono text-xs text-[var(--color-violet-glow)] tracking-widest uppercase">/comms</span>
                        <h2 className="text-3xl font-bold text-white mt-3 mb-6">Let's Connect</h2>
                        <p className="text-[var(--color-text-dim)] leading-relaxed mb-8">
                            I'm always interested in hearing about new projects, collaborations, or just
                            chatting about tech. Reach out through any of the channels below.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                            <a href="https://github.com/Caibran" target="_blank" rel="noopener noreferrer"
                                className="px-5 py-2.5 bg-[var(--color-surface-card)] border border-white/[0.06] rounded-lg text-sm text-[var(--color-text-dim)] hover:text-white hover:border-white/20 transition-colors glow-hover">
                                GitHub
                            </a>
                            <a href="https://ca.linkedin.com/in/brandongundrum" target="_blank" rel="noopener noreferrer"
                                className="px-5 py-2.5 bg-[var(--color-surface-card)] border border-white/[0.06] rounded-lg text-sm text-[var(--color-text-dim)] hover:text-white hover:border-white/20 transition-colors glow-hover">
                                LinkedIn
                            </a>
                        </div>
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-cyan-glow)]/10 text-[var(--color-cyan-glow)] border border-[var(--color-cyan-glow)]/20 rounded-lg text-sm font-medium hover:bg-[var(--color-cyan-glow)]/20 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.5-9.75-6.5" />
                            </svg>
                            Send a Message
                        </Link>
                    </div>
                </div>
            </FadeSection>

            <Footer />
        </main>
    )
}
