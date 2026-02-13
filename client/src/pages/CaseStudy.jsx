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
                    <p className="text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-faint)' }}>
                        post not found
                    </p>
                    <Link to="/casestudies" className="text-sm link-reveal mt-4 inline-block" style={{ color: 'var(--color-accent)' }}>
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
                    <Link
                        to="/casestudies"
                        className="text-xs link-reveal"
                        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-faint)' }}
                    >
                        ← case studies
                    </Link>
                    <div className="mt-8 mb-10">
                        <div className="flex items-center gap-4 mb-4">
                            <span
                                className="text-xs uppercase tracking-wider"
                                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}
                            >
                                {post.category || 'study'}
                            </span>
                            <span className="text-xs" style={{ color: 'var(--color-text-faint)' }}>{date}</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: 'var(--color-text)' }}>
                            {post.title}
                        </h1>
                    </div>
                </FadeSection>

                <FadeSection>
                    <div
                        className="prose-editorial"
                        dangerouslySetInnerHTML={{ __html: post.contentHtml || marked(post.content || '') }}
                    />
                </FadeSection>

                <FadeSection className="mt-16 pt-8" style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
                    <Link to="/casestudies" className="text-sm link-reveal" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}>
                        ← back to all studies
                    </Link>
                </FadeSection>
            </div>
            <Footer />
        </main>
    )
}
