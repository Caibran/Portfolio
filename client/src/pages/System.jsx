import FadeSection from '../components/FadeSection'
import Footer from '../components/Footer'

const colorTokens = [
    { name: '--color-bg', hex: '#0d0d0d', label: 'Background' },
    { name: '--color-bg-raised', hex: '#161616', label: 'Raised Surface' },
    { name: '--color-accent', hex: '#c47a4a', label: 'Accent (Copper)' },
    { name: '--color-text', hex: '#e8e0d8', label: 'Primary Text' },
    { name: '--color-text-muted', hex: '#8a8178', label: 'Muted Text' },
    { name: '--color-text-faint', hex: '#5a544e', label: 'Faint Text' },
    { name: '--color-terminal-green', hex: '#4ade80', label: 'Terminal Green' },
]

const techStack = [
    { category: 'Frontend', items: 'React 19, Vite 7, Tailwind CSS 4' },
    { category: 'Language', items: 'JavaScript (ES2025)' },
    { category: 'Fonts', items: 'Space Grotesk, IBM Plex Mono (Google Fonts)' },
    { category: 'Routing', items: 'React Router v7, HashRouter' },
    { category: 'Hosting', items: 'GitHub Pages (gh-pages branch)' },
    { category: 'Build', items: 'Vite → static bundle → gh-pages deploy' },
]

const bundleInfo = [
    { file: 'index.html', size: '0.84 KB', gzip: '0.48 KB' },
    { file: 'index.css', size: '~21 KB', gzip: '~5 KB' },
    { file: 'index.js', size: '~333 KB', gzip: '~104 KB' },
]

// things I intentionally removed and why
const killList = [
    { name: 'DaisyUI', why: 'Every DaisyUI site looks the same. Full control > convenience.' },
    { name: 'Starfield background', why: 'Sci-fi gimmick. A subtle radial gradient does more with less.' },
    { name: 'Animation libraries', why: 'No Framer Motion, no GSAP. CSS handles everything here. Zero runtime cost.' },
    { name: 'Three.js / WebGL', why: '3D on a portfolio = "look at me." The content should speak, not the chrome.' },
    { name: 'Backend API', why: 'No Express, no SQLite in production. Static data.js = instant, cacheable, zero-server.' },
    { name: 'Card shimmer / glow effects', why: 'Obvious AI-generated patterns. Removed on principle.' },
    { name: 'macOS traffic light dots', why: 'Terminal cosplay. Real terminals don\'t look like that.' },
]

const philosophy = [
    {
        q: 'Why 333 KB JS?',
        a: 'React + React Router + React DOM is the bulk. No additional libraries. Every KB is accounted for. The tradeoff: rich client-side navigation and interactivity vs. a lighter static page. For a portfolio with the terminal and atmosphere system, React earns its weight.',
    },
    {
        q: 'Why no backend?',
        a: 'A portfolio doesn\'t need one. Static data.js = zero cold starts, zero server costs, instant TTFB from CDN. The original version had Express + SQLite for 12 rows of data. That\'s overengineering.',
    },
    {
        q: 'Why no animation libraries?',
        a: 'CSS transitions handle everything here: reveals, hover effects, the terminal cursor. Adding Framer Motion would be 30KB+ for effects achievable in 20 lines of CSS. The constraint makes the motion language tighter.',
    },
    {
        q: 'Why section-aware hues?',
        a: 'Subtle color shifts per page — binary grouping (warm vs cool) with per-route accents. DevHub gets cooler tones (sage = technical). Gallery gets warmer (red-copper = expressive). Perceptible as intentionality, not inconsistency.',
    },
    {
        q: 'Why show this page?',
        a: 'Transparency builds trust. Most developers show what they built. Fewer show how they think about what they built.',
    },
]

const tradeoffs = [
    'Chose HashRouter for GitHub Pages deployment simplicity over server-side routing.',
    'Binary heading tracking (tight/normal) instead of per-page values — control over experimentation.',
    'Warm/cool tint grouping instead of 7 unique tints — cohesion over variety.',
    'No animation libraries — CSS handles all motion with zero runtime cost.',
    'Static data file instead of API — instant, cacheable, zero-server.',
]

const improvements = [
    'Migrate to static pre-rendering for SEO support.',
    'Implement automated Lighthouse CI checks on each deploy.',
    'Add dark/light theme toggle with system preference detection.',
    'Explore RSS feed generation for case studies.',
]

// SVG architecture diagram — components as nodes, routes as connections
function ArchitectureDiagram() {
    const nodes = [
        { id: 'terminal', label: 'Terminal', x: 300, y: 30, w: 80, color: '#4ade80' },
        { id: 'app', label: 'App.jsx', x: 300, y: 110, w: 80, color: '#c47a4a' },
        { id: 'navbar', label: 'Navbar', x: 120, y: 110, w: 70, color: '#8a8178' },
        { id: 'home', label: 'Home', x: 80, y: 210, w: 60 },
        { id: 'about', label: 'About', x: 170, y: 210, w: 60 },
        { id: 'cases', label: 'Cases', x: 260, y: 210, w: 60 },
        { id: 'devhub', label: 'DevHub', x: 350, y: 210, w: 64 },
        { id: 'gallery', label: 'Gallery', x: 440, y: 210, w: 64 },
        { id: 'contact', label: 'Contact', x: 530, y: 210, w: 64 },
        { id: 'system', label: 'System', x: 490, y: 110, w: 68, color: '#7a8a9a' },
        { id: 'data', label: 'data.js', x: 210, y: 300, w: 68, color: '#fbbf24' },
        { id: 'css', label: 'index.css', x: 390, y: 300, w: 78, color: '#c47a4a' },
    ]

    const edges = [
        ['terminal', 'app'],
        ['app', 'navbar'],
        ['app', 'home'], ['app', 'about'], ['app', 'cases'],
        ['app', 'devhub'], ['app', 'gallery'], ['app', 'contact'],
        ['app', 'system'],
        ['data', 'home'], ['data', 'cases'], ['data', 'devhub'], ['data', 'gallery'],
        ['css', 'app'],
    ]

    const nodeMap = {}
    nodes.forEach(n => { nodeMap[n.id] = n })

    return (
        <svg viewBox="0 0 620 350" style={{ width: '100%', height: 'auto' }}>
            {/* edges */}
            {edges.map(([from, to], i) => {
                const a = nodeMap[from]
                const b = nodeMap[to]
                return (
                    <line key={i}
                        x1={a.x + (a.w / 2)} y1={a.y + 16}
                        x2={b.x + (b.w / 2)} y2={b.y}
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth="1"
                    />
                )
            })}
            {/* nodes */}
            {nodes.map(n => (
                <g key={n.id}>
                    <rect
                        x={n.x} y={n.y}
                        width={n.w} height={28}
                        rx={4}
                        fill="rgba(22,22,22,0.9)"
                        stroke={n.color || 'rgba(255,255,255,0.1)'}
                        strokeWidth="1"
                    />
                    <text
                        x={n.x + n.w / 2} y={n.y + 17}
                        textAnchor="middle"
                        fill={n.color || '#8a8178'}
                        fontSize="10"
                        fontFamily="'IBM Plex Mono', monospace"
                    >
                        {n.label}
                    </text>
                </g>
            ))}
            {/* legend */}
            <text x="8" y="342" fill="#5a544e" fontSize="9" fontFamily="'IBM Plex Mono', monospace">
                nodes = components · edges = data/routing flow · accent color = --page-accent flowing through
            </text>
        </svg>
    )
}

export default function System() {
    return (
        <main className="pt-24 pb-8">
            <div className="max-w-3xl mx-auto px-6">
                <FadeSection>
                    <span className="text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)', color: 'var(--page-accent)' }}>
                        /system
                    </span>
                    <h1 className="text-4xl font-bold mt-2 mb-3 heading-live" style={{ color: 'var(--color-text)' }}>
                        Under the Hood
                    </h1>
                    <p className="mb-12 max-w-xl" style={{ color: 'var(--color-text-muted)' }}>
                        This portfolio reflects how I build software — explicit structure, minimal dependencies,
                        measurable performance, and documented tradeoffs.
                    </p>
                </FadeSection>

                {/* tech stack */}
                <FadeSection className="section-gap">
                    <h2 className="text-xl font-semibold mb-6 heading-live" style={{ color: 'var(--color-text)' }}>Tech Stack</h2>
                    <div className="space-y-3">
                        {techStack.map(({ category, items }) => (
                            <div key={category} className="flex gap-4" style={{ borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '0.75rem' }}>
                                <span className="text-xs uppercase tracking-wider w-24 shrink-0 pt-0.5" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-faint)' }}>
                                    {category}
                                </span>
                                <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{items}</span>
                            </div>
                        ))}
                    </div>
                </FadeSection>

                {/* bundle info */}
                <FadeSection className="section-gap">
                    <h2 className="text-xl font-semibold mb-6 heading-live" style={{ color: 'var(--color-text)' }}>Bundle Size</h2>
                    <div className="card-panel">
                        <table style={{ width: '100%', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                            <thead>
                                <tr style={{ color: 'var(--color-text-faint)', borderBottom: '1px solid var(--color-border)' }}>
                                    <th className="text-left pb-2 font-normal">File</th>
                                    <th className="text-right pb-2 font-normal">Size</th>
                                    <th className="text-right pb-2 font-normal">Gzip</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bundleInfo.map(({ file, size, gzip }) => (
                                    <tr key={file} style={{ color: 'var(--color-text-muted)' }}>
                                        <td className="py-1.5">{file}</td>
                                        <td className="text-right py-1.5">{size}</td>
                                        <td className="text-right py-1.5" style={{ color: 'var(--page-accent)' }}>{gzip}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </FadeSection>

                {/* architecture diagram */}
                <FadeSection className="section-gap">
                    <h2 className="text-xl font-semibold mb-6 heading-live" style={{ color: 'var(--color-text)' }}>Architecture</h2>
                    <div className="card-panel" style={{ padding: '1.5rem 1rem' }}>
                        <ArchitectureDiagram />
                    </div>
                </FadeSection>

                {/* kill list */}
                <FadeSection className="section-gap">
                    <h2 className="text-xl font-semibold mb-2 heading-live" style={{ color: 'var(--color-text)' }}>Kill List</h2>
                    <p className="text-sm mb-6" style={{ color: 'var(--color-text-faint)' }}>
                        Things I intentionally removed. Discipline is knowing what to cut.
                    </p>
                    <div className="space-y-3">
                        {killList.map(({ name, why }) => (
                            <div key={name} className="flex gap-4 items-start" style={{ borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '0.75rem' }}>
                                <span className="text-sm w-44 shrink-0 kill-item" style={{ fontFamily: 'var(--font-mono)' }}>
                                    {name}
                                </span>
                                <span className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                                    {why}
                                </span>
                            </div>
                        ))}
                    </div>
                </FadeSection>

                {/* design tokens */}
                <FadeSection className="section-gap">
                    <h2 className="text-xl font-semibold mb-6 heading-live" style={{ color: 'var(--color-text)' }}>Design Tokens</h2>
                    <div className="space-y-3">
                        {colorTokens.map(({ name, hex, label }) => (
                            <div key={name} className="flex items-center gap-3" style={{ borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '0.75rem' }}>
                                <span className="token-swatch" style={{ background: hex }} />
                                <span className="text-sm flex-1" style={{ color: 'var(--color-text-muted)' }}>{label}</span>
                                <code className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-faint)' }}>{hex}</code>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 space-y-4">
                        <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>Typography</h3>
                        <div className="flex gap-4">
                            <div className="flex-1 card-panel">
                                <p className="text-lg font-semibold mb-1" style={{ fontFamily: 'var(--font-heading)' }}>Space Grotesk</p>
                                <p className="text-xs" style={{ color: 'var(--color-text-faint)', fontFamily: 'var(--font-mono)' }}>headings + body</p>
                            </div>
                            <div className="flex-1 card-panel">
                                <p className="text-lg font-semibold mb-1" style={{ fontFamily: 'var(--font-mono)' }}>IBM Plex Mono</p>
                                <p className="text-xs" style={{ color: 'var(--color-text-faint)', fontFamily: 'var(--font-mono)' }}>code + labels</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 space-y-4">
                        <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>Motion</h3>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="card-panel text-center">
                                <p className="text-lg font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--page-accent)' }}>150ms</p>
                                <p className="text-xs" style={{ color: 'var(--color-text-faint)' }}>fast</p>
                            </div>
                            <div className="card-panel text-center">
                                <p className="text-lg font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--page-accent)' }}>200ms</p>
                                <p className="text-xs" style={{ color: 'var(--color-text-faint)' }}>base</p>
                            </div>
                            <div className="card-panel text-center">
                                <p className="text-lg font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--page-accent)' }}>400ms</p>
                                <p className="text-xs" style={{ color: 'var(--color-text-faint)' }}>slow</p>
                            </div>
                        </div>
                    </div>
                </FadeSection>

                {/* performance philosophy */}
                <FadeSection className="section-gap">
                    <h2 className="text-xl font-semibold mb-6 heading-live" style={{ color: 'var(--color-text)' }}>Performance Philosophy</h2>
                    <div className="space-y-4">
                        {philosophy.map(({ q, a }) => (
                            <div key={q} className="card-accent">
                                <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>{q}</p>
                                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{a}</p>
                            </div>
                        ))}
                    </div>
                </FadeSection>

                {/* explicit tradeoffs */}
                <FadeSection className="section-gap">
                    <h2 className="text-xl font-semibold mb-6 heading-live" style={{ color: 'var(--color-text)' }}>Explicit Tradeoffs</h2>
                    <div className="space-y-3">
                        {tradeoffs.map((item, i) => (
                            <div key={i} className="flex items-start gap-3" style={{ borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '0.75rem' }}>
                                <span className="text-sm" style={{ color: 'var(--color-accent)', marginTop: '1px' }}>▸</span>
                                <span className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{item}</span>
                            </div>
                        ))}
                    </div>
                </FadeSection>

                {/* what I would improve */}
                <FadeSection className="section-gap">
                    <h2 className="text-xl font-semibold mb-6 heading-live" style={{ color: 'var(--color-text)' }}>What I Would Improve</h2>
                    <div className="space-y-3">
                        {improvements.map((item, i) => (
                            <div key={i} className="flex items-start gap-3" style={{ borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '0.75rem' }}>
                                <span className="text-sm" style={{ color: 'var(--color-text-faint)', marginTop: '1px' }}>○</span>
                                <span className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{item}</span>
                            </div>
                        ))}
                    </div>
                </FadeSection>

                {/* terminal reference */}
                <FadeSection className="section-gap mb-8">
                    <div className="card-panel text-center py-6">
                        <p className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-faint)' }}>
                            Terminal still available at <span style={{ color: 'var(--color-terminal-green)' }}>/</span>. Try typing <code style={{ color: 'var(--color-terminal-green)' }}>cd system</code>.
                        </p>
                    </div>
                </FadeSection>
            </div>
            <Footer />
        </main>
    )
}
