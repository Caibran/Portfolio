import { useState, useMemo, useRef, useEffect } from 'react'
import ProjectCard from '../components/ProjectCard'
import FadeSection from '../components/FadeSection'
import Footer from '../components/Footer'
import { projects } from '../data'

const tabs = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' },
    { key: 'hobby', label: 'Hobby' },
]

function ProjectDetail({ project, onClose }) {
    const detailRef = useRef(null)

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    const statuses = Array.isArray(project.status) ? project.status : [project.status]
    const statusColor = {
        active: 'text-emerald-400 bg-emerald-400/10',
        completed: 'text-blue-400 bg-blue-400/10',
        hobby: 'text-amber-400 bg-amber-400/10',
    }

    // simple markdown-ish renderer for detail text
    const renderDetail = (text) => {
        if (!text) return null
        const lines = text.split('\n')
        const elements = []
        let i = 0
        let codeBlock = false
        let codeLines = []

        while (i < lines.length) {
            const line = lines[i]

            // code block toggle
            if (line.trim().startsWith('```')) {
                if (codeBlock) {
                    elements.push(
                        <pre key={`code-${i}`} className="bg-[var(--color-surface-light)] rounded-lg p-4 overflow-x-auto mb-4">
                            <code className="text-xs font-mono text-[var(--color-text-dim)]">{codeLines.join('\n')}</code>
                        </pre>
                    )
                    codeLines = []
                    codeBlock = false
                } else {
                    codeBlock = true
                }
                i++
                continue
            }

            if (codeBlock) {
                codeLines.push(line)
                i++
                continue
            }

            // headers
            if (line.startsWith('## ')) {
                elements.push(<h3 key={i} className="text-lg font-semibold text-white mt-6 mb-3">{line.slice(3)}</h3>)
            } else if (line.startsWith('### ')) {
                elements.push(<h4 key={i} className="text-base font-semibold text-white mt-4 mb-2">{line.slice(4)}</h4>)
            }
            // list items
            else if (line.startsWith('- **')) {
                const match = line.match(/^- \*\*(.+?)\*\*\s*[—–-]\s*(.+)$/)
                if (match) {
                    elements.push(
                        <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-text-dim)] mb-1.5 ml-4">
                            <span className="text-white/40 mt-1.5 flex-shrink-0">•</span>
                            <span><strong className="text-white/80">{match[1]}</strong> — {match[2]}</span>
                        </li>
                    )
                } else {
                    const boldMatch = line.match(/^- \*\*(.+?)\*\*(.*)$/)
                    if (boldMatch) {
                        elements.push(
                            <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-text-dim)] mb-1.5 ml-4">
                                <span className="text-white/40 mt-1.5 flex-shrink-0">•</span>
                                <span><strong className="text-white/80">{boldMatch[1]}</strong>{boldMatch[2]}</span>
                            </li>
                        )
                    }
                }
            } else if (line.startsWith('- ')) {
                elements.push(
                    <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-text-dim)] mb-1.5 ml-4">
                        <span className="text-white/40 mt-1.5 flex-shrink-0">•</span>
                        <span>{line.slice(2)}</span>
                    </li>
                )
            }
            // regular paragraph
            else if (line.trim() !== '') {
                // handle inline bold
                const parts = line.split(/\*\*(.+?)\*\*/g)
                const rendered = parts.map((part, j) =>
                    j % 2 === 1 ? <strong key={j} className="text-white/80">{part}</strong> : part
                )
                elements.push(
                    <p key={i} className="text-sm text-[var(--color-text-dim)] leading-relaxed mb-3">{rendered}</p>
                )
            }

            i++
        }

        return elements
    }

    return (
        <div ref={detailRef} className="gallery-detail-enter">
            {/* back button */}
            <button
                onClick={onClose}
                className="flex items-center gap-2 text-sm font-mono text-[var(--color-text-dim)] hover:text-white transition-colors mb-6 group"
            >
                <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                back to all
            </button>

            <div className="bg-[var(--color-surface-card)] border border-white/[0.06] rounded-xl overflow-hidden">
                {/* header */}
                <div className="px-6 py-5 border-b border-white/[0.06]">
                    <div className="flex items-start justify-between mb-3">
                        <h2 className="text-2xl font-bold text-white">{project.title}</h2>
                        <div className="flex gap-1.5 flex-shrink-0 mt-1">
                            {statuses.map(s => (
                                <span key={s} className={`text-xs px-2.5 py-1 rounded-full font-mono ${statusColor[s] || 'text-gray-400 bg-gray-400/10'}`}>
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>
                    <p className="text-[var(--color-text-dim)] text-sm leading-relaxed">{project.description}</p>
                </div>

                <div className="p-6 space-y-2">
                    {/* tech pills */}
                    {project.tech && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                            {project.tech.split(',').map(t => (
                                <span key={t} className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--color-surface-light)] text-[var(--color-text-dim)]">
                                    {t.trim()}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* detail content */}
                    {project.detail && (
                        <div className="mt-4">
                            {renderDetail(project.detail)}
                        </div>
                    )}

                    {/* youtube embed */}
                    {project.youtube && (
                        <div className="mt-6">
                            <span className="text-xs font-mono text-[var(--color-text-dim)] uppercase tracking-wider block mb-3">teaser</span>
                            <div className="relative w-full rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                                <iframe
                                    className="absolute inset-0 w-full h-full"
                                    src={project.youtube.replace('watch?v=', 'embed/')}
                                    title={`${project.title} teaser`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    )}

                    {/* github link */}
                    {project.url && (
                        <div className="pt-4 mt-4 border-t border-white/[0.06]">
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm text-[var(--color-cyan-glow)] hover:underline font-mono"
                            >
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                                </svg>
                                view on github →
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default function Gallery() {
    const [activeTab, setActiveTab] = useState('all')
    const [expandedId, setExpandedId] = useState(null)

    const filtered = useMemo(() => {
        if (activeTab === 'all') return projects
        return projects.filter(p => p.status.includes(activeTab))
    }, [activeTab])

    const expandedProject = expandedId ? projects.find(p => p.id === expandedId) : null

    const handleExpand = (id) => {
        setExpandedId(id)
    }

    const handleClose = () => {
        setExpandedId(null)
    }

    return (
        <main className="pt-24 pb-8">
            <div className="max-w-5xl mx-auto px-6">
                <FadeSection>
                    <span className="font-mono text-xs text-[var(--color-violet-glow)] tracking-widest uppercase">/gallery</span>
                    <h1 className="text-4xl font-bold text-white mt-3 mb-3">Project Gallery</h1>
                    <p className="text-[var(--color-text-dim)] mb-8 max-w-xl">
                        An archive of completed work, open source contributions, and passion projects.
                    </p>

                    {/* tab filters — hidden when expanded */}
                    {!expandedId && (
                        <div className="flex items-center gap-1 mb-10 bg-[var(--color-surface-light)] rounded-lg p-1 w-fit">
                            {tabs.map(tab => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`px-4 py-2 rounded-md text-sm transition-colors ${activeTab === tab.key
                                        ? 'bg-[var(--color-surface-card)] text-white'
                                        : 'text-[var(--color-text-dim)] hover:text-white'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    )}
                </FadeSection>

                {expandedProject ? (
                    <ProjectDetail project={expandedProject} onClose={handleClose} />
                ) : filtered.length ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filtered.map(p => (
                            <FadeSection key={p.id}>
                                <ProjectCard project={p} onClick={() => handleExpand(p.id)} />
                            </FadeSection>
                        ))}
                    </div>
                ) : (
                    <FadeSection>
                        <div className="bg-[var(--color-surface-card)] border border-white/[0.06] rounded-xl p-12 text-center">
                            <p className="font-mono text-sm text-[var(--color-text-dim)]">no projects found</p>
                        </div>
                    </FadeSection>
                )}
            </div>
            <Footer />
        </main>
    )
}
