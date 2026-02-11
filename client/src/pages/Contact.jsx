import { useState } from 'react'
import FadeSection from '../components/FadeSection'
import Footer from '../components/Footer'

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
    const [status, setStatus] = useState(null) // null | 'sent'

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const subject = encodeURIComponent(form.subject || 'Portfolio Contact')
        const body = encodeURIComponent(`From: ${form.name} <${form.email}>\n\n${form.message}`)
        window.open(`mailto:contact@example.com?subject=${subject}&body=${body}`, '_self')
        setStatus('sent')
        setForm({ name: '', email: '', subject: '', message: '' })
    }

    return (
        <main className="pt-24 pb-8">
            <div className="max-w-4xl mx-auto px-6">
                <FadeSection>
                    <span className="font-mono text-xs text-[var(--color-violet-glow)] tracking-widest uppercase">/comms</span>
                    <h1 className="text-4xl font-bold text-white mt-3 mb-3">Communication Hub</h1>
                    <p className="text-[var(--color-text-dim)] mb-12 max-w-xl">
                        Let's talk. Whether it's a project idea, a job opportunity, or just tech chat.
                    </p>
                </FadeSection>

                <div className="grid md:grid-cols-5 gap-8">
                    {/* left: contact info */}
                    <FadeSection className="md:col-span-2">
                        <div className="space-y-6">
                            <div className="bg-[var(--color-surface-card)] border border-white/[0.06] rounded-xl p-5 glow-hover">
                                <h3 className="font-mono text-sm text-[var(--color-cyan-glow)] mb-3">Connect</h3>
                                <div className="space-y-3">
                                    <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                                        className="flex items-center gap-3 text-sm text-[var(--color-text-dim)] hover:text-white transition-colors">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                                        GitHub
                                    </a>
                                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                                        className="flex items-center gap-3 text-sm text-[var(--color-text-dim)] hover:text-white transition-colors">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                        LinkedIn
                                    </a>
                                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                                        className="flex items-center gap-3 text-sm text-[var(--color-text-dim)] hover:text-white transition-colors">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                        X / Twitter
                                    </a>
                                </div>
                            </div>

                            <div className="bg-[var(--color-surface-card)] border border-white/[0.06] rounded-xl p-5">
                                <h3 className="font-mono text-sm text-[var(--color-cyan-glow)] mb-3">Availability</h3>
                                <p className="text-sm text-[var(--color-text-dim)] leading-relaxed">
                                    Open to freelance work, full-time positions, and interesting collaborations.
                                    Response time is typically within 24 hours.
                                </p>
                            </div>
                        </div>
                    </FadeSection>

                    {/* right: email form */}
                    <FadeSection className="md:col-span-3">
                        <form onSubmit={handleSubmit} className="bg-[var(--color-surface-card)] border border-white/[0.06] rounded-xl p-6 space-y-5">
                            <h2 className="text-lg font-semibold text-white mb-1">Send a message</h2>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-[var(--color-text-dim)] mb-1.5 font-mono">Name</label>
                                    <input
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-[var(--color-surface-light)] border border-white/[0.06] rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-[var(--color-cyan-glow)]/30 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-[var(--color-text-dim)] mb-1.5 font-mono">Email</label>
                                    <input
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-[var(--color-surface-light)] border border-white/[0.06] rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-[var(--color-cyan-glow)]/30 transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs text-[var(--color-text-dim)] mb-1.5 font-mono">Subject</label>
                                <input
                                    name="subject"
                                    value={form.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-[var(--color-surface-light)] border border-white/[0.06] rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-[var(--color-cyan-glow)]/30 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-xs text-[var(--color-text-dim)] mb-1.5 font-mono">Message</label>
                                <textarea
                                    name="message"
                                    rows={5}
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-[var(--color-surface-light)] border border-white/[0.06] rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-[var(--color-cyan-glow)]/30 transition-colors resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 bg-[var(--color-cyan-glow)]/10 text-[var(--color-cyan-glow)] border border-[var(--color-cyan-glow)]/20 rounded-lg text-sm font-medium hover:bg-[var(--color-cyan-glow)]/20 transition-colors disabled:opacity-50"
                            >
                                Send Message
                            </button>

                            {status === 'sent' && (
                                <p className="text-sm text-emerald-400 font-mono text-center">opening your email client...</p>
                            )}
                        </form>
                    </FadeSection>
                </div>
            </div>
            <Footer />
        </main>
    )
}
