import { useState, useMemo } from 'react'
import ProjectCard from '../components/ProjectCard'
import FadeSection from '../components/FadeSection'
import Footer from '../components/Footer'
import { projects } from '../data'

const tabs = [
    { key: 'all', label: 'All' },
    { key: 'completed', label: 'Completed' },
    { key: 'hobby', label: 'Hobby' },
]

export default function Gallery() {
    const [activeTab, setActiveTab] = useState('all')

    const filtered = useMemo(() => {
        if (activeTab === 'all') return projects
        return projects.filter(p => p.status === activeTab)
    }, [activeTab])

    return (
        <main className="pt-24 pb-8">
            <div className="max-w-5xl mx-auto px-6">
                <FadeSection>
                    <span className="font-mono text-xs text-[var(--color-violet-glow)] tracking-widest uppercase">/gallery</span>
                    <h1 className="text-4xl font-bold text-white mt-3 mb-3">Project Gallery</h1>
                    <p className="text-[var(--color-text-dim)] mb-8 max-w-xl">
                        An archive of completed work, open source contributions, and passion projects.
                    </p>

                    {/* tab filters */}
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
                </FadeSection>

                {filtered.length ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filtered.map(p => (
                            <FadeSection key={p.id}>
                                <ProjectCard project={p} />
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
