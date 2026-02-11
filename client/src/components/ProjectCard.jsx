import { Link } from 'react-router-dom'

export default function ProjectCard({ project, compact = false }) {
    const statusColor = {
        active: 'text-emerald-400 bg-emerald-400/10',
        completed: 'text-blue-400 bg-blue-400/10',
        hobby: 'text-amber-400 bg-amber-400/10',
    }

    return (
        <div className="bg-[var(--color-surface-card)] border border-white/[0.06] rounded-xl p-5 glow-hover card-shimmer">
            <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-white text-base">{project.title}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full font-mono ${statusColor[project.status] || 'text-gray-400 bg-gray-400/10'}`}>
                    {project.status}
                </span>
            </div>
            <p className="text-[var(--color-text-dim)] text-sm leading-relaxed mb-4 line-clamp-2">{project.description}</p>
            {project.tech && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.split(',').map(t => (
                        <span key={t} className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--color-surface-light)] text-[var(--color-text-dim)]">
                            {t.trim()}
                        </span>
                    ))}
                </div>
            )}
            {!compact && project.url && (
                <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[var(--color-cyan-glow)] hover:underline font-mono"
                >
                    view project →
                </a>
            )}
        </div>
    )
}
