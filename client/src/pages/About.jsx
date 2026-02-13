import FadeSection from '../components/FadeSection'
import Footer from '../components/Footer'

const skills = [
    { category: 'Languages', items: ['C', 'C++', 'C#', 'JavaScript', 'TypeScript', 'Python', 'SQL'] },
    { category: 'Frontend', items: ['React', 'Tailwind CSS', 'HTML/CSS', 'Vite', 'Electron'] },
    { category: 'Backend', items: ['Node.js', 'Express', 'SQLite', 'MariaDB', 'PostgreSQL'] },
    { category: 'Tools', items: ['Git', 'Linux', 'Docker', 'CMake', 'Nginx', 'VS Code'] },
    { category: 'Domains', items: ['Multiplayer Systems', 'UI Architecture', 'Build Tooling', 'Open Source'] },
]

export default function About() {
    return (
        <main className="pt-24 pb-8">
            <div className="max-w-3xl mx-auto px-6">
                <FadeSection>
                    <span className="text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}>
                        About
                    </span>
                    <h1 className="text-4xl font-bold mt-2 mb-10" style={{ color: 'var(--color-text)' }}>
                        About Me
                    </h1>
                </FadeSection>

                <FadeSection className="mb-16">
                    <div className="space-y-5 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                        <p>
                            I started building early — first through design, then through code.
                            I taught myself graphic design to create my own interfaces, learned programming
                            to make those interfaces functional, and learned systems programming to control
                            the infrastructure that powered them.
                        </p>
                        <p>
                            My early interest in MMORPG development led me into server architecture, database
                            systems, and client modification. Since then, I've built tools, game systems, web
                            applications, and full-stack projects — often solo — taking ideas from concept
                            to production.
                        </p>
                        <p>
                            I care about understanding systems deeply, not just assembling frameworks.
                            Whether I'm writing C++ packet handlers, building React interfaces, or designing
                            database schemas, the approach is the same: understand the problem, document the
                            decisions, build something that lasts.
                        </p>
                    </div>
                </FadeSection>

                {/* skills — flowing text grouped by category */}
                <FadeSection className="mb-16">
                    <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--color-text)' }}>Technical Breakdown</h2>
                    <div className="space-y-5">
                        {skills.map(group => (
                            <div key={group.category} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                                <span
                                    className="text-sm font-medium shrink-0"
                                    style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', minWidth: '90px' }}
                                >
                                    {group.category}
                                </span>
                                <span style={{ color: 'var(--color-border)' }}>—</span>
                                <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                                    {group.items.join(', ')}
                                </span>
                            </div>
                        ))}
                    </div>
                </FadeSection>

                {/* how i work — pull-quote style with accent border */}
                <FadeSection className="mb-16">
                    <div
                        className="py-6 space-y-4 leading-relaxed"
                        style={{
                            borderLeft: '2px solid var(--color-accent)',
                            paddingLeft: '1.5rem',
                            color: 'var(--color-text-muted)',
                        }}
                    >
                        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>How I Work</h2>
                        <p>
                            I start every project by understanding the problem before writing a line of code.
                            Architecture decisions are documented, tradeoffs are explicit, and every dependency
                            is justified.
                        </p>
                        <p>
                            My development environment is Linux-native. I work in the terminal, manage projects
                            with Git, and build with reproducible pipelines. I value systems that are testable,
                            maintainable, and honest about their constraints.
                        </p>
                    </div>
                </FadeSection>
            </div>
            <Footer />
        </main>
    )
}
