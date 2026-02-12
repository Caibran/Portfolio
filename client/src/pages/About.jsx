import FadeSection from '../components/FadeSection'
import Footer from '../components/Footer'

const skills = [
    { category: 'Languages', items: ['C', 'C++', 'JavaScript', 'TypeScript', 'Python', 'SQL'] },
    { category: 'Frontend', items: ['React', 'Tailwind CSS', 'HTML/CSS', 'Vite'] },
    { category: 'Backend', items: ['Node.js', 'Express', 'SQLite', 'PostgreSQL'] },
    { category: 'Tools', items: ['Git', 'Linux', 'Docker', 'Nginx', 'VS Code'] },
    { category: 'Interests', items: ['Game Dev', 'Systems Programming', 'UI/UX', 'Open Source'] },
]

export default function About() {
    return (
        <main className="pt-24 pb-8">
            <div className="max-w-4xl mx-auto px-6">
                <FadeSection>
                    <span className="font-mono text-xs text-[var(--color-violet-glow)] tracking-widest uppercase">/analysis</span>
                    <h1 className="text-4xl font-bold text-white mt-3 mb-8">Personal Analysis</h1>
                </FadeSection>

                <FadeSection className="mb-16">
                    <div className="bg-[var(--color-surface-card)] border border-white/[0.06] rounded-xl p-8">
                        <h2 className="text-xl font-semibold text-white mb-4">Who I am</h2>
                        <div className="space-y-4 text-[var(--color-text-dim)] leading-relaxed">
                            <p>
                                I'm Brandon — a self-taught web designer and developer who's been building for the web since
                                before I could drive. What started as a kid tinkering with HTML pages and CSS experiments
                                grew into a genuine passion for crafting digital experiences. I never stopped learning,
                                and I never needed a classroom to do it.
                            </p>
                            <p>
                                Over the years that curiosity expanded well beyond the browser. I've dug into game engine internals,
                                picked apart network protocols, and spent more late nights debugging than I'd like to admit.
                                That foundational work taught me how software really works — not just the abstractions on top.
                            </p>
                            <p>
                                Today I split my time between web design and systems-level work. I'm drawn to projects
                                that demand both — where understanding memory layout matters as much as getting the UI right.
                                I believe the best code is the code you can delete, and I document the "why" more than the "what."
                            </p>
                        </div>
                    </div>
                </FadeSection>

                <FadeSection className="mb-16">
                    <h2 className="text-2xl font-bold text-white mb-6">Technical Breakdown</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {skills.map(group => (
                            <div key={group.category} className="bg-[var(--color-surface-card)] border border-white/[0.06] rounded-xl p-5 glow-hover">
                                <h3 className="font-mono text-sm text-[var(--color-cyan-glow)] mb-3">{group.category}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {group.items.map(item => (
                                        <span key={item} className="text-xs px-2.5 py-1 rounded-full bg-[var(--color-surface-light)] text-[var(--color-text-dim)] border border-white/[0.04]">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </FadeSection>

                <FadeSection className="mb-16">
                    <div className="bg-[var(--color-surface-card)] border border-white/[0.06] rounded-xl p-8">
                        <h2 className="text-xl font-semibold text-white mb-4">How I work</h2>
                        <div className="space-y-4 text-[var(--color-text-dim)] leading-relaxed">
                            <p>
                                I start every project by understanding the problem deeply before writing a line of code.
                                Architecture decisions are documented, tradeoffs are explicit, and every commit tells a story.
                            </p>
                            <p>
                                My development environment is Linux-native. I'm comfortable in the terminal, proficient
                                with Git workflows, and experienced with CI/CD pipelines. I value systems that are
                                reproducible, testable, and maintainable over time.
                            </p>
                        </div>
                    </div>
                </FadeSection>
            </div>
            <Footer />
        </main>
    )
}
