import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { marked } from 'marked'
import FadeSection from '../components/FadeSection'
import Footer from '../components/Footer'
import { posts } from '../data'

export default function CaseStudy() {
    const { slug } = useParams()
    const post = useMemo(() => posts.find(p => p.slug === slug) || null, [slug])

    if (!post) {
        return (
            <main className="pt-24 pb-8 min-h-screen">
                <div className="max-w-3xl mx-auto px-6 text-center py-20">
                    <p className="font-mono text-sm text-[var(--color-text-dim)]">post not found</p>
                    <Link to="/casestudies" className="text-sm text-[var(--color-cyan-glow)] hover:underline mt-4 inline-block">
                        ← back to studies
                    </Link>
                </div>
            </main>
        )
    }

    const date = new Date(post.created_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    })

    return (
        <main className="pt-24 pb-8">
            <div className="max-w-3xl mx-auto px-6">
                <FadeSection>
                    <Link to="/casestudies" className="font-mono text-xs text-[var(--color-text-dim)] hover:text-[var(--color-cyan-glow)] transition-colors">
                        ← case studies
                    </Link>
                    <div className="mt-6 mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-xs font-mono text-[var(--color-violet-glow)] bg-[var(--color-violet-glow)]/10 px-2 py-0.5 rounded-full">
                                {post.category || 'study'}
                            </span>
                            <span className="text-xs text-[var(--color-text-dim)]">{date}</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">{post.title}</h1>
                    </div>
                </FadeSection>

                <FadeSection>
                    <div
                        className="prose-custom"
                        dangerouslySetInnerHTML={{ __html: marked(post.content || '') }}
                    />
                </FadeSection>

                <FadeSection className="mt-16 pt-8 border-t border-white/[0.06]">
                    <Link to="/casestudies" className="text-sm text-[var(--color-cyan-glow)] hover:underline font-mono">
                        ← back to all studies
                    </Link>
                </FadeSection>
            </div>
            <Footer />
        </main>
    )
}
