import { Link } from 'react-router-dom'
import FadeSection from '../components/FadeSection'
import Footer from '../components/Footer'
import { posts } from '../data'

export default function CaseStudies() {
    return (
        <main className="pt-24 pb-8">
            <div className="max-w-3xl mx-auto px-6">
                <FadeSection>
                    <span className="text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}>
                        Case Studies
                    </span>
                    <h1 className="text-4xl font-bold mt-2 mb-3" style={{ color: 'var(--color-text)' }}>
                        Case Studies
                    </h1>
                    <p className="mb-12 max-w-xl" style={{ color: 'var(--color-text-muted)' }}>
                        A running log of things I'm learning, bugs I'm chasing, and problems I've solved.
                        Part blog, part deployment journal.
                    </p>
                </FadeSection>

                {posts.length ? (
                    <div className="space-y-1">
                        {posts.map((post) => {
                            const date = new Date(post.created_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                            })
                            return (
                                <FadeSection key={post.id}>
                                    <Link
                                        to={`/casestudies/${post.slug}`}
                                        className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-6 py-4 group"
                                        style={{ borderBottom: '1px solid var(--color-border-subtle)' }}
                                    >
                                        <span className="text-xs shrink-0 w-24" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-faint)' }}>
                                            {date}
                                        </span>
                                        <div className="flex-1 min-w-0">
                                            <h3
                                                className="font-medium text-base mb-1 transition-colors group-hover:text-[var(--color-accent)]"
                                                style={{ color: 'var(--color-text)' }}
                                            >
                                                {post.title}
                                            </h3>
                                            <p className="text-sm line-clamp-1" style={{ color: 'var(--color-text-muted)' }}>
                                                {post.excerpt}
                                            </p>
                                        </div>
                                        <span
                                            className="text-xs uppercase tracking-wider shrink-0"
                                            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}
                                        >
                                            {post.category}
                                        </span>
                                    </Link>
                                </FadeSection>
                            )
                        })}
                    </div>
                ) : (
                    <FadeSection>
                        <div className="card-panel text-center py-12">
                            <p className="text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-faint)' }}>
                                no studies published yet
                            </p>
                        </div>
                    </FadeSection>
                )}
            </div>
            <Footer />
        </main>
    )
}
