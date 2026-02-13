export default function ProjectCard({ project, onClick }) {
    const statuses = Array.isArray(project.status) ? project.status : [project.status]

    return (
        <div className="card-panel cursor-pointer" onClick={onClick}>
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-base" style={{ color: 'var(--color-text)' }}>
                    {project.title}
                </h3>
                <div className="flex items-center gap-2">
                    {statuses.map(s => (
                        <div key={s} className="flex items-center gap-1.5">
                            <span className={`status-dot ${s}`} />
                            <span
                                className="text-xs"
                                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-faint)' }}
                            >
                                {s}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <p className="text-sm leading-relaxed mb-3 line-clamp-2" style={{ color: 'var(--color-text-muted)' }}>
                {project.description}
            </p>

            {/* tech listed as flowing text instead of pills */}
            {project.tech && (
                <p className="text-xs mb-3" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-faint)' }}>
                    {project.tech}
                </p>
            )}

            {project.url && (
                <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs link-reveal"
                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}
                    onClick={e => e.stopPropagation()}
                >
                    view project →
                </a>
            )}
        </div>
    )
}
