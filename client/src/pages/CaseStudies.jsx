import PostPreview from '../components/PostPreview'
import FadeSection from '../components/FadeSection'
import Footer from '../components/Footer'
import { posts } from '../data'

export default function CaseStudies() {
    return (
        <main className="pt-24 pb-8">
            <div className="max-w-4xl mx-auto px-6">
                <FadeSection>
                    <span className="font-mono text-xs text-[var(--color-violet-glow)] tracking-widest uppercase">/case-studies</span>
                    <h1 className="text-4xl font-bold text-white mt-3 mb-3">Case Studies</h1>
                    <p className="text-[var(--color-text-dim)] mb-10 max-w-xl">
                        A running log of things I'm learning, bugs I'm chasing, and problems I've solved.
                        Part blog, part deployment journal.
                    </p>
                </FadeSection>

                {posts.length ? (
                    <div className="space-y-4">
                        {posts.map((post) => (
                            <FadeSection key={post.id}>
                                <PostPreview post={post} />
                            </FadeSection>
                        ))}
                    </div>
                ) : (
                    <FadeSection>
                        <div className="bg-[var(--color-surface-card)] border border-white/[0.06] rounded-xl p-12 text-center">
                            <p className="font-mono text-sm text-[var(--color-text-dim)]">no studies published yet</p>
                        </div>
                    </FadeSection>
                )}
            </div>
            <Footer />
        </main>
    )
}
