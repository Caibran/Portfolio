import { useState } from 'react'
import FadeSection from '../components/FadeSection'
import Footer from '../components/Footer'

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' })

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`)
        const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
        window.location.href = `mailto:brandongundrum@gmail.com?subject=${subject}&body=${body}`
    }

    return (
        <main className="pt-24 pb-8">
            <div className="max-w-3xl mx-auto px-6">
                <FadeSection>
                    <span className="text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}>
                        Contact
                    </span>
                    <h1 className="text-4xl font-bold mt-2 mb-3" style={{ color: 'var(--color-text)' }}>
                        Get in Touch
                    </h1>
                    <p className="mb-12 max-w-xl" style={{ color: 'var(--color-text-muted)' }}>
                        Have a project in mind, want to collaborate, or just want to say hello? Drop me a line.
                    </p>
                </FadeSection>

                <div className="grid md:grid-cols-5 gap-16">
                    {/* form — left side, wider */}
                    <FadeSection className="md:col-span-3">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-xs uppercase tracking-wider mb-2" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-faint)' }}>
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    className="input-line"
                                    placeholder="your name"
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-wider mb-2" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-faint)' }}>
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    className="input-line"
                                    placeholder="you@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-wider mb-2" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-faint)' }}>
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                    className="input-line"
                                    placeholder="what's on your mind?"
                                />
                            </div>
                            <button type="submit" className="btn-primary mt-2">
                                Send Message
                            </button>
                        </form>
                    </FadeSection>

                    {/* links — right side, narrower */}
                    <FadeSection className="md:col-span-2">
                        <div className="space-y-6" style={{ borderLeft: '1px solid var(--color-border)', paddingLeft: '1.5rem' }}>
                            <div>
                                <span className="text-xs uppercase tracking-wider block mb-1" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-faint)' }}>
                                    Email
                                </span>
                                <a href="mailto:brandongundrum@gmail.com" className="text-sm link-reveal" style={{ color: 'var(--color-accent)' }}>
                                    brandongundrum@gmail.com
                                </a>
                            </div>
                            <div>
                                <span className="text-xs uppercase tracking-wider block mb-1" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-faint)' }}>
                                    GitHub
                                </span>
                                <a href="https://github.com/Caibran" target="_blank" rel="noopener noreferrer" className="text-sm link-reveal" style={{ color: 'var(--color-accent)' }}>
                                    github.com/Caibran
                                </a>
                            </div>
                            <div>
                                <span className="text-xs uppercase tracking-wider block mb-1" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-faint)' }}>
                                    LinkedIn
                                </span>
                                <a href="https://ca.linkedin.com/in/brandongundrum" target="_blank" rel="noopener noreferrer" className="text-sm link-reveal" style={{ color: 'var(--color-accent)' }}>
                                    linkedin.com/in/brandongundrum
                                </a>
                            </div>
                        </div>
                    </FadeSection>
                </div>
            </div>
            <Footer />
        </main>
    )
}
