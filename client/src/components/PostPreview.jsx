import { Link } from 'react-router-dom'

export default function PostPreview({ post }) {
    const date = new Date(post.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    })

    return (
        <Link to={`/casestudies/${post.slug}`} className="card-accent block group">
            <div className="flex items-center gap-3 mb-2">
                <span
                    className="text-xs uppercase tracking-wider"
                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}
                >
                    {post.category || 'study'}
                </span>
                <span className="text-xs" style={{ color: 'var(--color-text-faint)' }}>{date}</span>
            </div>
            <h3
                className="font-semibold text-base mb-1 transition-colors group-hover:text-[var(--color-accent)]"
                style={{ color: 'var(--color-text)' }}
            >
                {post.title}
            </h3>
            <p className="text-sm leading-relaxed line-clamp-2" style={{ color: 'var(--color-text-muted)' }}>
                {post.excerpt}
            </p>
        </Link>
    )
}
