import { useMemo, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import FadeSection from '../components/FadeSection'
import Footer from '../components/Footer'
import { projects } from '../data'

const tabs = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
]

function ProjectDetail({ project, onClose }) {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    const statuses = Array.isArray(project.status) ? project.status : [project.status]

    return (
        <div className="gallery-expand">
            <button
                onClick={onClose}
                className="flex items-center gap-2 text-sm mb-6 transition-colors"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-faint)' }}
            >
                ← back to all
            </button>

            <div className="card-panel">
                <div className="mb-6 pb-5" style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                    <div className="flex items-start justify-between mb-3">
                        <h2 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>{project.title}</h2>
                        <div className="flex items-center gap-3 mt-1">
                            {statuses.map(s => (
                                <div key={s} className="flex items-center gap-1.5">
                                    <span className={`status-dot ${s}`} />
                                    <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-faint)' }}>{s}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{project.description}</p>
                </div>

                {project.tech && (
                    <p className="text-xs mb-5" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-faint)' }}>
                        {project.tech}
                    </p>
                )}

                {project.detail && (
                    <div className="prose-editorial text-sm" dangerouslySetInnerHTML={{
                        __html: project.detail
                            .replace(/^### (.+)$/gm, '<h3>$1</h3>')
                            .replace(/^## (.+)$/gm, '<h2>$1</h2>')
                            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                            .replace(/^- (.+)$/gm, '<li>$1</li>')
                            .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
                            .replace(/```[\s\S]*?```/g, (m) => {
                                const code = m.replace(/```\w*\n?/, '').replace(/```$/, '')
                                return `<pre><code>${code}</code></pre>`
                            })
                            .split('\n\n').map(p => p.startsWith('<') ? p : `<p>${p}</p>`).join('\n')
                    }} />
                )}

                {project.youtube && (
                    <div className="mt-6">
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

                {project.url && (
                    <div className="pt-4 mt-5" style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
                        <a href={project.url} target="_blank" rel="noopener noreferrer"
                            className="text-sm link-reveal" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}>
                            view on github →
                        </a>
                    </div>
                )}
            </div>
        </div>
    )
}

export default function Gallery() {
    const { projectId } = useParams()
    const navigate = useNavigate()

    const activeTab = projectId ? null : 'all'
    const expandedProject = projectId ? projects.find(p => p.id === Number(projectId)) : null

    const filtered = useMemo(() => {
        if (!activeTab || activeTab === 'all') return projects
        return projects.filter(p => p.status.includes(activeTab))
    }, [activeTab])

    const handleExpand = (id) => navigate(`/gallery/${id}`)
    const handleClose = () => navigate('/gallery')

    return (
        <main className="pt-24 pb-8">
            <div className="max-w-5xl mx-auto px-6">
                <FadeSection>
                    <span className="text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}>Gallery</span>
                    <h1 className="text-4xl font-bold mt-2 mb-3" style={{ color: 'var(--color-text)' }}>Project Gallery</h1>
                    <p className="mb-8 max-w-xl" style={{ color: 'var(--color-text-muted)' }}>
                        Completed work, open source contributions, and engineering projects.
                    </p>
                    {!expandedProject && (
                        <div className="flex items-center gap-6 mb-10">
                            {tabs.map(tab => (
                                <button key={tab.key}
                                    className="text-sm pb-1 transition-colors"
                                    style={{
                                        color: activeTab === tab.key ? 'var(--color-text)' : 'var(--color-text-faint)',
                                        borderBottom: activeTab === tab.key ? '2px solid var(--color-accent)' : '2px solid transparent',
                                    }}>
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
                        <div className="card-panel text-center py-12">
                            <p className="text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-faint)' }}>no projects found</p>
                        </div>
                    </FadeSection>
                )}
            </div>
            <Footer />
        </main>
    )
}
