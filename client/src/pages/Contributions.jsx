import { useMemo } from 'react'
import FadeSection from '../components/FadeSection'
import Footer from '../components/Footer'
import { contributions } from '../data'

const typeBadgeColors = {
    feature: { bg: 'rgba(74, 222, 128, 0.12)', color: '#4ade80', label: 'Feature' },
    bugfix: { bg: 'rgba(251, 191, 36, 0.12)', color: '#fbbf24', label: 'Bug Fix' },
    refactor: { bg: 'rgba(96, 165, 250, 0.12)', color: '#60a5fa', label: 'Refactor' },
}

function ContributionCard({ contribution }) {
    const badge = typeBadgeColors[contribution.type] || typeBadgeColors.feature

    return (
        <div className="card-panel">
            {/* header */}
            <div className="flex items-start justify-between gap-4 mb-1">
                <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{
                                fontFamily: 'var(--font-mono)',
                                background: badge.bg,
                                color: badge.color,
                            }}
                        >
                            {badge.label}
                        </span>
                        <span
                            className="text-xs"
                            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-faint)' }}
                        >
                            {contribution.project}
                        </span>
                    </div>
                    <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text)' }}>
                        {contribution.title}
                    </h3>
                </div>
            </div>

            {/* description */}
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-text-muted)' }}>
                {contribution.description}
            </p>

            {/* impact */}
            {contribution.impact && (
                <p
                    className="text-sm italic mb-4"
                    style={{
                        color: 'var(--color-text-muted)',
                        borderLeft: '2px solid var(--color-border)',
                        paddingLeft: '1rem',
                    }}
                >
                    <span style={{ color: 'var(--color-accent)', fontStyle: 'normal', fontWeight: 500 }}>Impact: </span>
                    {contribution.impact}
                </p>
            )}

            {/* tags */}
            {contribution.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {contribution.tags.map(tag => (
                        <span
                            key={tag}
                            className="text-xs px-2 py-0.5"
                            style={{
                                fontFamily: 'var(--font-mono)',
                                color: 'var(--color-text-faint)',
                                border: '1px solid var(--color-border)',
                                borderRadius: '4px',
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {/* github link */}
            {contribution.githubUrl && (
                <div className="pt-3" style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
                    <a
                        href={contribution.githubUrl}
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

export default function Contributions() {
    // Group contributions by project
    const grouped = useMemo(() => {
        const map = {}
        contributions.forEach(c => {
            if (!map[c.project]) map[c.project] = []
            map[c.project].push(c)
        })
        return Object.entries(map)
    }, [])

    return (
        <main className="pt-24 pb-8">
            <div className="max-w-3xl mx-auto px-6">
                <FadeSection>
                    <span className="text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}>
                        Contributions
                    </span>
                    <h1 className="text-4xl font-bold mt-2 mb-2" style={{ color: 'var(--color-text)' }}>
                        Open Source & Project Contributions
                    </h1>
                    <p className="mb-2 max-w-xl" style={{ color: 'var(--color-text-muted)' }}>
                        Pull requests, bug fixes, and feature work contributed across open-source and personal projects.
                        These contributions span the Shards of Eternity ecosystem — a personal hobby project — as well
                        as upstream open-source repositories.
                    </p>
                    <p className="mb-10 text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-faint)' }}>
                        {contributions.length} {contributions.length === 1 ? 'contribution' : 'contributions'} across {grouped.length} {grouped.length === 1 ? 'project' : 'projects'}
                    </p>
                </FadeSection>

                {grouped.map(([project, items]) => (
                    <FadeSection key={project} className="mb-10">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-3" style={{ color: 'var(--color-text)' }}>
                            <span className="status-dot active" />
                            {project}
                        </h2>
                        <div className="space-y-4">
                            {items.map(c => (
                                <ContributionCard key={c.id} contribution={c} />
                            ))}
                        </div>
                    </FadeSection>
                ))}
            </div>
            <Footer />
        </main>
    )
}
