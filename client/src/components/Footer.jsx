export default function Footer() {
    return (
        <footer className="border-t border-white/[0.04] mt-20">
            <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <span className="font-mono text-xs text-[var(--color-text-dim)] tracking-wider">
                    ~/Gundrum.dev © 2026
                </span>
                <div className="flex items-center gap-5">
                    <a href="https://github.com/Caibran" target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-dim)] hover:text-white transition-colors text-sm">
                        GitHub
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-dim)] hover:text-white transition-colors text-sm">
                        LinkedIn
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-dim)] hover:text-white transition-colors text-sm">
                        Twitter
                    </a>
                </div>
            </div>
        </footer>
    )
}
