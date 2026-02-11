import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Terminal() {
    const [phase, setPhase] = useState('input') // input | greeting | transition
    const [name, setName] = useState('')
    const [displayText, setDisplayText] = useState('')
    const [showCursor, setShowCursor] = useState(true)
    const inputRef = useRef(null)
    const navigate = useNavigate()

    // auto-focus the input
    useEffect(() => {
        if (phase === 'input') inputRef.current?.focus()
    }, [phase])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!name.trim()) return

        const trimmed = name.trim()
        setPhase('greeting')

        // type out the greeting character by character
        const greeting = `Welcome, ${trimmed}...`
        let i = 0
        const interval = setInterval(() => {
            setDisplayText(greeting.slice(0, i + 1))
            i++
            if (i >= greeting.length) {
                clearInterval(interval)
                // pause, then transition
                setTimeout(() => {
                    setPhase('transition')
                    setTimeout(() => navigate('/home'), 800)
                }, 1200)
            }
        }, 60)
    }

    return (
        <div className={`
      fixed inset-0 flex items-center justify-center
      bg-[var(--color-surface)] scanlines
      transition-opacity duration-700
      ${phase === 'transition' ? 'opacity-0' : 'opacity-100'}
    `}>
            {/* ambient glow behind terminal */}
            <div className="absolute w-96 h-96 bg-[var(--color-cyan-glow)] opacity-[0.03] rounded-full blur-3xl" />

            <div className="relative z-10 w-full max-w-xl px-6">
                {/* terminal window chrome */}
                <div className="bg-[var(--color-surface-light)] border border-white/[0.06] rounded-xl overflow-hidden shadow-2xl">
                    {/* title bar */}
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
                        <span className="w-3 h-3 rounded-full bg-red-500/70" />
                        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                        <span className="w-3 h-3 rounded-full bg-green-500/70" />
                        <span className="ml-3 text-xs text-[var(--color-text-dim)] font-mono tracking-wider">terminal — portfolio</span>
                    </div>

                    {/* terminal body */}
                    <div className="p-6 font-mono text-sm min-h-[200px]">
                        {/* boot sequence lines */}
                        <p className="text-[var(--color-text-dim)] mb-1">system initialized...</p>
                        <p className="text-[var(--color-text-dim)] mb-4">loading portfolio v1.0</p>

                        {phase === 'input' && (
                            <form onSubmit={handleSubmit}>
                                <p className="text-[var(--color-cyan-glow)] mb-3">
                                    Enter your name to continue:
                                </p>
                                <div className="flex items-center gap-2">
                                    <span className="text-[var(--color-violet-glow)]">→</span>
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="
                      flex-1 bg-transparent border-none outline-none
                      text-white font-mono text-sm caret-[var(--color-cyan-glow)]
                      placeholder-[var(--color-text-dim)]
                    "
                                        placeholder="visitor"
                                        autoComplete="off"
                                        spellCheck={false}
                                    />
                                    {showCursor && <span className="text-[var(--color-cyan-glow)] cursor-blink">▊</span>}
                                </div>
                                <p className="text-[var(--color-text-dim)] text-xs mt-4">press enter to continue</p>
                            </form>
                        )}

                        {phase === 'greeting' && (
                            <div className="mt-2">
                                <span className="text-[var(--color-cyan-glow)]">{displayText}</span>
                                <span className="text-[var(--color-cyan-glow)] cursor-blink">▊</span>
                            </div>
                        )}

                        {phase === 'transition' && (
                            <div className="mt-2">
                                <span className="text-[var(--color-cyan-glow)]">{displayText}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
