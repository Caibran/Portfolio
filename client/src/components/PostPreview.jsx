import { Link } from 'react-router-dom'

export default function PostPreview({ post }) {
    const date = new Date(post.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    })

    return (
        <Link
            to={`/casestudies/${post.slug}`}
            className="block bg-[var(--color-surface-card)] border border-white/[0.06] rounded-xl p-5 glow-hover card-shimmer group"
        >
            <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-mono text-[var(--color-violet-glow)] bg-[var(--color-violet-glow)]/10 px-2 py-0.5 rounded-full">
                    {post.category || 'study'}
                </span>
                <span className="text-xs text-[var(--color-text-dim)]">{date}</span>
            </div>
            <h3 className="font-semibold text-white text-base mb-2 group-hover:text-[var(--color-cyan-glow)] transition-colors">
                {post.title}
            </h3>
            <p className="text-[var(--color-text-dim)] text-sm leading-relaxed line-clamp-2">
                {post.excerpt}
            </p>
        </Link>
    )
}
