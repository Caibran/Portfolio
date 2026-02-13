import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

// terminal should feel aware of when you're visiting
function getGreeting(name) {
    const h = new Date().getHours()
    if (h >= 5 && h < 12) return `good morning, ${name}...`
    if (h >= 12 && h < 18) return `good afternoon, ${name}...`
    if (h >= 18 && h < 22) return `good evening, ${name}...`
    return `still up, ${name}?`
}

const sections = {
    home: '/home',
    about: '/about',
    casestudies: '/casestudies',
    devhub: '/devhub',
    gallery: '/gallery',
    contact: '/contact',
    system: '/system',
}

const commands = {
    help: () => [
        'available commands:',
        '',
        '  help        — you\'re looking at it',
        '  whoami      — who is this person?',
        '  stack       — tech I work with',
        '  ls          — list site sections',
        '  cd <page>   — navigate to a section',
        '  clear       — clear the terminal',
        '  secret      — ???',
        '',
        'or just press enter to continue to the site.',
    ],
    whoami: () => [
        'Brandon Gundrum',
        'Developer · Problem solver · Relentless learner',
        '',
        'I build things at the intersection of systems programming',
        'and creative problem solving. From game engines to web apps,',
        'I care about how things work under the hood.',
        '',
        'Currently: building an MMO from scratch, because why not.',
    ],
    stack: () => [
        'languages   C/C++, JavaScript, C#, Python, PHP, SQL',
        'frontend    React, Vite, Tailwind CSS',
        'backend     Node.js, Express, Electron',
        'databases   SQLite, MariaDB',
        'tools       Git, Docker, CMake, Linux',
        'game dev    MonoGame, custom engines',
    ],
    ls: () => [
        ...Object.keys(sections).map(s => `  ${s}/`),
        '',
        'use "cd <name>" to navigate.',
    ],
    secret: () => [
        '¯\\_(ツ)_/¯',
        '',
        'you found it. not much here — just proof',
        'that you\'re the kind of person who types',
        '"secret" into a terminal. I respect that.',
        '',
        'here\'s a mass effect quote for your trouble:',
        '"does this unit have a soul?"',
    ],
}

export default function Terminal() {
    const [phase, setPhase] = useState('name')
    const [nameInput, setNameInput] = useState('')
    const [cmdInput, setCmdInput] = useState('')
    const [userName, setUserName] = useState('')
    const [history, setHistory] = useState([])
    const [typing, setTyping] = useState(null)
    const inputRef = useRef(null)
    const cmdRef = useRef(null)
    const bodyRef = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (phase === 'name') inputRef.current?.focus()
        if (phase === 'shell') cmdRef.current?.focus()
    }, [phase, typing])

    useEffect(() => {
        if (bodyRef.current) {
            bodyRef.current.scrollTop = bodyRef.current.scrollHeight
        }
    }, [history, typing])

    // down arrow shortcut — escape hatch to enter the site without typing
    useEffect(() => {
        const handler = (e) => {
            if (e.key === 'ArrowDown') {
                if (phase === 'shell' && !typing) {
                    e.preventDefault()
                    setPhase('transition')
                    setTimeout(() => navigate('/home'), 600)
                }
            }
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [phase, typing, navigate])

    const typeLines = useCallback((lines, onDone) => {
        let lineIdx = 0
        let charIdx = 0
        const output = []

        const tick = () => {
            if (lineIdx >= lines.length) {
                setTyping(null)
                setHistory(prev => [...prev, ...output])
                onDone?.()
                return
            }

            const line = lines[lineIdx]
            if (charIdx <= line.length) {
                output[lineIdx] = line.slice(0, charIdx)
                setTyping([...output])
                charIdx++
                setTimeout(tick, 18)
            } else {
                lineIdx++
                charIdx = 0
                setTimeout(tick, 40)
            }
        }
        tick()
    }, [])

    const handleName = (e) => {
        e.preventDefault()
        const trimmed = nameInput.trim() || 'visitor'
        setUserName(trimmed)

        // store name for use elsewhere (footer callback)
        try { sessionStorage.setItem('visitor-name', trimmed) } catch { }

        setPhase('greeting')
        const greeting = getGreeting(trimmed)
        typeLines([greeting, '', 'type "help" for commands · press ↓ to enter site'], () => {
            setPhase('shell')
        })
    }

    const handleCmd = (e) => {
        e.preventDefault()
        if (typing) return

        const raw = cmdInput.trim().toLowerCase()
        setCmdInput('')

        const prompt = `${userName}@portfolio $ ${raw || '(enter)'}`
        setHistory(prev => [...prev, prompt])

        if (!raw) {
            setPhase('transition')
            setTimeout(() => navigate('/home'), 600)
            return
        }

        if (raw.startsWith('cd ')) {
            const target = raw.slice(3).trim().replace('/', '')
            if (sections[target]) {
                const line = `navigating to /${target}...`
                typeLines([line], () => {
                    setPhase('transition')
                    setTimeout(() => navigate(sections[target]), 600)
                })
                return
            } else {
                setHistory(prev => [...prev, `  cd: "${target}" not found. try "ls" to see options.`])
                return
            }
        }

        if (raw === 'clear') {
            setHistory([])
            return
        }

        if (commands[raw]) {
            typeLines(commands[raw](), null)
            return
        }

        setHistory(prev => [...prev, `  command not found: ${raw}. try "help".`])
    }

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center transition-opacity duration-600 ${phase === 'transition' ? 'opacity-0' : 'opacity-100'}`}
            style={{ background: '#0a0a0a' }}
            onClick={() => {
                if (phase === 'name') inputRef.current?.focus()
                if (phase === 'shell') cmdRef.current?.focus()
            }}
        >
            <div className="w-full max-w-lg px-6">
                <div style={{
                    background: '#111',
                    border: '1px solid #222',
                    borderRadius: '6px',
                    overflow: 'hidden',
                }}>
                    {/* title bar */}
                    <div
                        className="px-4 py-2 flex items-center"
                        style={{
                            borderBottom: '1px solid #1a1a1a',
                            background: '#0e0e0e',
                        }}
                    >
                        <span
                            className="text-xs"
                            style={{ fontFamily: 'var(--font-mono)', color: '#444' }}
                        >
                            ~/portfolio
                        </span>
                    </div>

                    {/* body */}
                    <div
                        ref={bodyRef}
                        className="p-5"
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.8rem',
                            minHeight: '220px',
                            maxHeight: '400px',
                            overflowY: 'auto',
                        }}
                    >
                        <p style={{ color: '#444', marginBottom: '4px' }}>system ready</p>
                        <p style={{ color: '#444', marginBottom: '16px' }}>portfolio v2.0</p>

                        {phase === 'name' && (
                            <form onSubmit={handleName}>
                                <p style={{ color: 'var(--color-terminal-green)', marginBottom: '12px' }}>
                                    enter your name:
                                </p>
                                <div className="flex items-center gap-2">
                                    <span style={{ color: 'var(--color-accent)' }}>→</span>
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={nameInput}
                                        onChange={(e) => setNameInput(e.target.value)}
                                        className="flex-1 bg-transparent border-none outline-none"
                                        style={{
                                            color: '#e0e0e0',
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '0.8rem',
                                            caretColor: 'var(--color-terminal-green)',
                                        }}
                                        placeholder="visitor"
                                        autoComplete="off"
                                        spellCheck={false}
                                    />
                                    <span className="cursor-blink" style={{ color: 'var(--color-terminal-green)' }}>▊</span>
                                </div>
                                <p className="mt-4" style={{ color: '#333', fontSize: '0.7rem' }}>press enter to continue</p>
                            </form>
                        )}

                        {(phase === 'greeting' || phase === 'shell' || phase === 'transition') && (
                            <div>
                                {history.map((line, i) => (
                                    <p key={i} style={{
                                        color: line.startsWith(`${userName}@`) ? '#666' : 'var(--color-terminal-green)',
                                        marginBottom: '2px',
                                        whiteSpace: 'pre-wrap',
                                    }}>
                                        {line}
                                    </p>
                                ))}

                                {typing && typing.map((line, i) => (
                                    <p key={`t-${i}`} style={{
                                        color: 'var(--color-terminal-green)',
                                        marginBottom: '2px',
                                        whiteSpace: 'pre-wrap',
                                    }}>
                                        {line}
                                        {i === typing.length - 1 && (
                                            <span className="cursor-blink" style={{ color: 'var(--color-terminal-green)' }}>▊</span>
                                        )}
                                    </p>
                                ))}
                            </div>
                        )}

                        {phase === 'shell' && !typing && (
                            <form onSubmit={handleCmd} className="mt-2">
                                <div className="flex items-center gap-2">
                                    <span style={{ color: '#666' }}>{userName}@portfolio $</span>
                                    <input
                                        ref={cmdRef}
                                        type="text"
                                        value={cmdInput}
                                        onChange={(e) => setCmdInput(e.target.value)}
                                        className="flex-1 bg-transparent border-none outline-none"
                                        style={{
                                            color: '#e0e0e0',
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '0.8rem',
                                            caretColor: 'var(--color-terminal-green)',
                                        }}
                                        autoComplete="off"
                                        spellCheck={false}
                                    />
                                    <span className="cursor-blink" style={{ color: 'var(--color-terminal-green)' }}>▊</span>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
