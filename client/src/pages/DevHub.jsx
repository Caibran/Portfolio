import { useMemo } from 'react'
import ProjectCard from '../components/ProjectCard'
import FadeSection from '../components/FadeSection'
import Footer from '../components/Footer'
import { projects } from '../data'

export default function DevHub() {
    const activeProjects = useMemo(() => projects.filter(p => p.status === 'active'), [])

    return (
        <main className="pt-24 pb-8">
            <div className="max-w-5xl mx-auto px-6">
                <FadeSection>
                    <span className="font-mono text-xs text-[var(--color-violet-glow)] tracking-widest uppercase">/dev-hub</span>
                    <h1 className="text-4xl font-bold text-white mt-3 mb-3">Development Hub</h1>
                    <p className="text-[var(--color-text-dim)] mb-10 max-w-xl">
                        What I'm actively building right now. These are works in progress — rough edges included.
                    </p>
                </FadeSection>

                {activeProjects.length ? (
                    <div className="grid md:grid-cols-2 gap-4">
                        {activeProjects.map(p => (
                            <FadeSection key={p.id}>
                                <ProjectCard project={p} />
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
