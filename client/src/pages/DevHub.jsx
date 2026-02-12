import { useMemo } from 'react'
import FadeSection from '../components/FadeSection'
import Footer from '../components/Footer'
import { projects } from '../data'

function daysInDev(startedAt) {
    const start = new Date(startedAt)
    const now = new Date()
    return Math.floor((now - start) / (1000 * 60 * 60 * 24))
}

function ProgressBar({ value }) {
    return (
        <div className="w-full h-2 bg-[var(--color-surface-light)] rounded-full overflow-hidden">
            <div
                className="h-full rounded-full progress-bar-fill"
                style={{ width: `${value}%` }}
            />
        </div>
    )
}

function DevProjectPanel({ project }) {
    const days = project.startedAt ? daysInDev(project.startedAt) : null

    return (
        <div className="devhub-panel bg-[var(--color-surface-card)] border border-white/[0.06] rounded-xl overflow-hidden glow-hover">
            {/* header strip */}
            <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="pulse-dot" />
                    <h2 className="text-xl font-semibold text-white">{project.title}</h2>
                </div>
                <div className="flex items-center gap-3">
                    {days !== null && (
                        <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-[var(--color-surface-light)] text-[var(--color-text-dim)]">
                            {days}d in dev
                        </span>
                    )}
                    <span className="text-xs px-2.5 py-1 rounded-full font-mono text-emerald-400 bg-emerald-400/10">
                        active
                    </span>
                </div>
            </div>

            {/* body */}
            <div className="p-6 space-y-6">
                {/* description */}
                <p className="text-[var(--color-text-dim)] text-sm leading-relaxed">{project.description}</p>

                {/* tech stack */}
                {project.tech && (
                    <div className="flex flex-wrap gap-1.5">
                        {project.tech.split(',').map(t => (
                            <span key={t} className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--color-surface-light)] text-[var(--color-text-dim)]">
                                {t.trim()}
                            </span>
                        ))}
                    </div>
                )}

                {/* progress section */}
                {project.progress !== undefined && (
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-mono text-[var(--color-text-dim)] uppercase tracking-wider">progress</span>
                            <span className="text-xs font-mono text-[var(--color-cyan-glow)]">{project.progress}%</span>
                        </div>
                        <ProgressBar value={project.progress} />
                    </div>
                )}

                {/* current focus callout */}
                {project.currentFocus && (
                    <div className="bg-[var(--color-surface-light)] border-l-2 border-[var(--color-cyan-glow)] rounded-r-lg px-4 py-3">
                        <span className="text-xs font-mono text-[var(--color-cyan-glow)] uppercase tracking-wider block mb-1">currently working on</span>
                        <p className="text-sm text-white/90">{project.currentFocus}</p>
                    </div>
                )}

                {/* goals */}
                {project.goals && project.goals.length > 0 && (
                    <div>
                        <span className="text-xs font-mono text-[var(--color-text-dim)] uppercase tracking-wider block mb-3">roadmap</span>
                        <ul className="space-y-2">
                            {project.goals.map((goal, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-sm">
                                    <span className="mt-0.5 w-4 h-4 rounded border border-white/10 bg-[var(--color-surface-light)] flex items-center justify-center flex-shrink-0">
                                        <span className="w-1.5 h-1.5 rounded-sm bg-[var(--color-violet-glow)]/40" />
                                    </span>
                                    <span className="text-[var(--color-text-dim)]">{goal}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* actions */}
                {project.url && (
                    <div className="pt-2 border-t border-white/[0.06]">
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
    )
}

export default function DevHub() {
    const activeProjects = useMemo(() => projects.filter(p => p.status === 'active'), [])

    return (
        <main className="pt-24 pb-8">
            <div className="max-w-3xl mx-auto px-6">
                <FadeSection>
                    <span className="font-mono text-xs text-[var(--color-violet-glow)] tracking-widest uppercase">/dev-hub</span>
                    <h1 className="text-4xl font-bold text-white mt-3 mb-2">Development Hub</h1>
                    <p className="text-[var(--color-text-dim)] mb-2 max-w-xl">
                        What I'm actively building right now. These are works in progress — rough edges included.
                    </p>
                    <p className="font-mono text-xs text-[var(--color-text-dim)]/60 mb-10">
                        {'>'} active_projects.log — {activeProjects.length} {activeProjects.length === 1 ? 'entry' : 'entries'}
                    </p>
                </FadeSection>

                {activeProjects.length ? (
                    <div className="space-y-6">
                        {activeProjects.map(p => (
                            <FadeSection key={p.id}>
                                <DevProjectPanel project={p} />
                            </FadeSection>
                        ))}
                    </div>
                ) : (
                    <FadeSection>
                        <div className="bg-[var(--color-surface-card)] border border-white/[0.06] rounded-xl p-12 text-center">
                            <p className="font-mono text-sm text-[var(--color-text-dim)]">no active projects</p>
                        </div>
                    </FadeSection>
                )}
            </div>
            <Footer />
        </main>
    )
}
