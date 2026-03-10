import { useMemo } from 'react'
import FadeSection from '../components/FadeSection'
import Footer from '../components/Footer'
import { projects } from '../data'

function ProgressBar({ value }) {
    return (
        <div className="progress-track">
            <div className="progress-fill" style={{ width: `${value}%` }} />
        </div>
    )
}

function daysAgo(dateStr) {
    const diff = Date.now() - new Date(dateStr).getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    if (days === 0) return 'today'
    if (days === 1) return 'yesterday'
    return `${days} days ago`
}

function getStatusInfo(status) {
    if (status.includes('on-hold')) return { dotClass: 'on-hold', label: 'on hold' }
    if (status.includes('active')) return { dotClass: 'active', label: 'active' }
    if (status.includes('hobby')) return { dotClass: 'hobby', label: 'hobby' }
    return { dotClass: 'active', label: 'active' }
}

function DevProjectPanel({ project }) {
    const statusInfo = getStatusInfo(project.status)
    const isOnHold = project.status.includes('on-hold')
    const isHobby = project.status.includes('hobby') && !project.status.includes('active')

    return (
        <div className={`card-panel ${isOnHold ? 'card-panel--dimmed' : ''}`}>
            {/* header row */}
            <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-3">
                    <span className={`status-dot ${statusInfo.dotClass}`} />
                    <h2 className="text-xl font-semibold" style={{ color: isOnHold ? 'var(--color-text-muted)' : 'var(--color-text)' }}>
                        {project.title}
                    </h2>
                </div>
                <div className="flex items-center gap-2">
                    {project.status.includes('hobby') && (
                        <span
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{
                                fontFamily: 'var(--font-mono)',
                                background: 'rgba(251, 191, 36, 0.1)',
                                color: '#fbbf24',
                                border: '1px solid rgba(251, 191, 36, 0.2)',
                            }}
                        >
                            hobby project
                        </span>
                    )}
                    {isOnHold && (
                        <span
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{
                                fontFamily: 'var(--font-mono)',
                                background: 'rgba(251, 146, 60, 0.1)',
                                color: '#fb923c',
                                border: '1px solid rgba(251, 146, 60, 0.2)',
                            }}
                        >
                            on hold
                        </span>
                    )}
                    {!isOnHold && (
                        <span
                            className="text-xs"
                            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-faint)' }}
                        >
                            {statusInfo.label}
                        </span>
                    )}
                </div>
            </div>

            {/* on hold note */}
            {isOnHold && project.statusNote && (
                <p className="text-xs mb-4 flex items-center gap-1.5" style={{ fontFamily: 'var(--font-mono)', color: '#fb923c' }}>
                    ⚠ {project.statusNote}
                </p>
            )}

            {/* last updated */}
            {!isOnHold && project.lastUpdated && (
                <p className="text-xs mb-4 flex items-center gap-1.5" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-faint)' }}>
                    {Math.floor((Date.now() - new Date(project.lastUpdated).getTime()) / 86400000) < 30 && (
                        <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: '#4ade80' }} />
                    )}
                    last updated: {daysAgo(project.lastUpdated)}
                </p>
            )}

            <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--color-text-muted)' }}>
                {project.description}
            </p>

            {/* tech */}
            {project.tech && (
                <p className="text-xs mb-4" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-faint)' }}>
                    {project.tech}
                </p>
            )}

            {/* why this exists */}
            {project.why && (
                <p className="text-sm italic mb-5" style={{ color: 'var(--color-text-muted)', borderLeft: '2px solid var(--color-border)', paddingLeft: '1rem' }}>
                    {project.why}
                </p>
            )}

            {/* progress */}
            {!isOnHold && project.progress != null && (
                <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-faint)' }}>
                            progress
                        </span>
                        <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}>
                            {project.progress}%
                        </span>
                    </div>
                    <ProgressBar value={project.progress} />
                </div>
            )}

            {/* what i'm working on right now */}
            {!isOnHold && project.currentFocus && (
                <p className="text-sm italic mb-5" style={{ color: 'var(--color-text-muted)' }}>
                    Currently working on: {project.currentFocus}
                </p>
            )}

            {/* roadmap as numbered list */}
            {!isOnHold && project.goals?.length > 0 && (
                <div className="mb-5">
                    <span className="text-xs uppercase tracking-wider block mb-3" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-faint)' }}>
                        Roadmap
                    </span>
                    <ol className="space-y-2 list-decimal list-inside">
                        {project.goals.map((goal, i) => (
                            <li key={i} className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                                {goal}
                            </li>
                        ))}
                    </ol>
                </div>
            )}

            {/* github link */}
            {project.url && (
                <div className="pt-4" style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
                    <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm link-reveal"
                        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                        </svg>
                        view on github →
                    </a>
                </div>
            )}
        </div>
    )
}

export default function DevHub() {
    // Show all projects — active first, then hobby-only, then on-hold last
    const sortedProjects = useMemo(() => {
        return [...projects].sort((a, b) => {
            const aOnHold = a.status.includes('on-hold')
            const bOnHold = b.status.includes('on-hold')
            const aActive = a.status.includes('active')
            const bActive = b.status.includes('active')

            if (aOnHold && !bOnHold) return 1
            if (!aOnHold && bOnHold) return -1
            if (aActive && !bActive) return -1
            if (!aActive && bActive) return 1
            return 0
        })
    }, [])

    const activeCount = projects.filter(p => p.status.includes('active')).length
    const hobbyCount = projects.filter(p => p.status.includes('hobby') && !p.status.includes('active')).length
    const onHoldCount = projects.filter(p => p.status.includes('on-hold')).length

    return (
        <main className="pt-24 pb-8">
            <div className="max-w-3xl mx-auto px-6">
                <FadeSection>
                    <span className="text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}>
                        Dev Hub
                    </span>
                    <h1 className="text-4xl font-bold mt-2 mb-2" style={{ color: 'var(--color-text)' }}>
                        Development Hub
                    </h1>
                    <p className="mb-2 max-w-xl" style={{ color: 'var(--color-text-muted)' }}>
                        Active projects and their current state. Progress, roadmaps, and focus areas.
                    </p>
                    <p className="mb-10 text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-faint)' }}>
                        {activeCount} active · {hobbyCount > 0 ? `${hobbyCount} hobby · ` : ''}{onHoldCount > 0 ? `${onHoldCount} on hold` : ''}
                    </p>
                </FadeSection>

                {sortedProjects.length ? (
                    <div className="space-y-6">
                        {sortedProjects.map(p => (
                            <FadeSection key={p.id}>
                                <DevProjectPanel project={p} />
                            </FadeSection>
                        ))}
                    </div>
                ) : (
                    <FadeSection>
                        <div className="card-panel text-center py-12">
                            <p className="text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-faint)' }}>
                                no active projects
                            </p>
                        </div>
                    </FadeSection>
                )}
            </div>
            <Footer />
        </main>
    )
}
