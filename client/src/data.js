// Static data — no backend, no runtime overhead.

export const posts = [
    {
        id: 1,
        title: 'Building Anomaly — A Cross-Platform Markdown Editor',
        slug: 'building-anomaly-editor',
        excerpt: 'Designing a cross-platform markdown editor with Electron and React — file system bridging, autosave architecture, and distribution pipelines.',
        content: `## The Problem

Every markdown editor I tried was either bloated with features or visually outdated. I needed something focused: native feel, modern UI, no unnecessary overhead. So I built one.

## Architecture: Main ↔ Renderer Bridge

The critical challenge was the file system bridge. Electron's security model requires all FS operations to go through \`preload.js\` using \`contextBridge\`. The renderer process (React) never touches the file system directly.

I built a channel-based API that exposes a clean interface:

\`\`\`js
contextBridge.exposeInMainWorld('electronAPI', {
    readDir: (dirPath) => ipcRenderer.invoke('read-dir', dirPath),
    readFile: (filePath) => ipcRenderer.invoke('read-file', filePath),
    writeFile: (filePath, content) => ipcRenderer.invoke('write-file', filePath, content),
})
\`\`\`

The main process registers handlers for each channel. Error propagation was the hardest part — if the main process throws during a file read, it needs to resolve cleanly in the renderer without crashing the application. This required explicit error boundaries at every IPC boundary.

## Autosave Strategy

The naive approach (save on every keystroke) causes disk thrashing and lag on large files. I implemented debounced persistence — 800ms after the last keystroke, then write. Edge case: window close during debounce. Solution: a \`beforeunload\` handler that forces synchronous flush.

## Distribution

The build pipeline (\`npm run build-dist\`) compiles React, packages with Electron, and produces distributable ZIPs for Windows, macOS, and Linux in one step. Cross-platform from day one.

## Takeaway

Building Anomaly reinforced that Electron performs well when you keep dependencies minimal and architecture explicit. The app opens fast because it doesn't load what it doesn't need.`,
        category: 'development',
        created_at: '2026-02-10',
    },
    {
        id: 2,
        title: 'Implementing a Quest Rule Engine in C++',
        slug: 'eoengine-quest-system',
        excerpt: 'Adding a full quest condition system to EOEngine — INI-driven configuration, state machine evaluation, and async data lookups without blocking the game loop.',
        content: `## Context

EOEngine inherited a partially-built quest framework. Quest definitions existed in INI files, but the engine couldn't verify runtime conditions — instance completion, time restrictions, party state. The rule evaluation layer was stubbed out.

## Quest Architecture

Quests are defined in \`.eqf\` files (INI format). Each quest has a chain of states, and each state has rules (conditions) and actions (effects). The engine evaluates rules on triggers — NPC interaction, mob kill, map entry — and advances state when conditions are met.

\`\`\`ini
[State 1]
Desc = Find the lost artifact
Rule = HasItem 42 1
Action = GiveExp 500
Action = SetState 2
\`\`\`

## Implementation

The commit added twelve missing rule implementations. Each is a condition check — simple in isolation, complex when composed:

**RuleInstanceCleared** — Queries the instancing system's completion records from the database. Required changes across \`character.hpp\`, \`world.cpp\`, and the SQLite layer.

**RuleTimeRestriction** — Gates quests by server time. Handles day-boundary windows (10pm–2am spans). Uses server time exclusively to prevent timezone exploits.

**RulePartySize** — Validates party composition. Added revalidation between rule check and action execution to handle mid-evaluation party changes.

## Technical Challenge

The existing codebase returned simple booleans from rule checks, but some rules required database queries and cross-entity state lookups. I implemented a two-pass evaluation: first pass gathers required data, second pass evaluates conditions. This prevents blocking the game loop on async lookups.

## Takeaway

Quest systems are state machines with side effects. The INI-driven approach separates content from code — non-programmers can define quests without touching C++.`,
        category: 'systems',
        created_at: '2026-02-08',
    },
    {
        id: 3,
        title: 'Shards of Eternity — Full-Stack Multiplayer Architecture',
        slug: 'shards-of-eternity',
        excerpt: 'A multi-repository MMO project spanning C server, browser-based WebSocket client, JavaScript tooling, and a game community website — networking, persistence, and client-server synchronization.',
        content: `## Overview

Shards of Eternity is a multiplayer online game built across multiple repositories, each handling a different layer of the system. It started as an interest in understanding how multiplayer architecture works end-to-end, and grew into a long-running personal hobby project covering networking, persistence, client rendering, and content tooling.

While this is a personal hobby project built around the Endless Online ecosystem, the engineering challenges are real — custom networking protocols, database design, client-server state sync, and cross-platform tooling.

## Architecture

### Server — Eternity Engine (C++)
Forked from Etheos. Handles core game logic: player connections, world state, combat resolution, NPC behavior, item systems, map transitions. Extended with custom packet handlers, quest engines, instancing, buff systems, shrine discovery, and WebSocket support for browser clients.

### Web Client — SOE_WebClient (TypeScript / Vite / WebGL)
Forked from EOWeb and extensively rewritten. Browser-based game client with reconnection support, gamepad integration, dark fantasy UI theme, buff indicators, shop dialogs, and full equipment/paperdoll system.

### Desktop Client — SOE_Client (C# / MonoGame) — ON HOLD
Original desktop client, now superseded by the web client. Featured floating combat text, health bars, buff notification HUDs.

### Map Editor — SOE_MapJS (JavaScript)
Browser-based map editor for visual level design — tiles, walls, NPC spawns, warp zones.

### Pub Editor — SOE_PubEditor (TypeScript)
Game data file editor with dark fantasy UI theme, toolbar reorganization, and pub file serialization fixes.

### Community Website — SOE_Website (HTML/CSS/JS)
Modern game website with parallax hero section, class/profession showcase, FAQ, and newsletter.

### Server Documentation — SOE_ServerDocs
Documentation site that maps the backend architecture, packet structures, and database schemas.

## Key Systems Built

**WebSocket Layer** — Added WebSocket support to the C++ server enabling browser-based clients. Required protocol adaptation between the binary game protocol and WebSocket framing.

**Buff System** — Server-side stat modifiers with binary protocol extensions. Client renders active buffs as procedurally-generated hexagonal icons with countdown timers synchronized to server-authoritative durations.

**Quest Engine** — INI-driven state machine with condition checking, reward distribution, and twelve rule types covering instance completion, time restrictions, party validation, and inventory state.

**Instancing** — Party-based dungeon instances with cooldowns, disconnect abuse detection, and security revalidation between state transitions.

## Technical Domains Covered

- Custom binary protocol design and packet serialization
- WebSocket server integration for browser-based gameplay
- Client-server state synchronization
- SQLite and MariaDB persistence layers
- CMake build systems (server), Vite (web client), npm (tooling)
- TypeScript, C++, JavaScript full-stack development

## Current State

Actively maintained. Server runs stable under load testing. Web client is the primary client with ongoing UI improvements and feature development.`,
        category: 'systems',
        created_at: '2025-12-15',
    },
    {
        id: 4,
        title: 'Migrating from Desktop to Browser — SOE_WebClient',
        slug: 'soe-webclient-migration',
        excerpt: 'Forking EOWeb and transforming it into a full-featured browser-based game client with TypeScript, Vite, WebGL rendering, and modern UI systems.',
        content: `## Context

The original desktop client (SOE_Client, C#/MonoGame) worked but limited the audience to Windows users with .NET installed. To make the game accessible from any browser, I forked EOWeb — a minimal browser-based Endless Online client — and rebuilt it into SOE_WebClient.

## What Changed From the Fork

The base EOWeb fork was a functional but minimal client. Over months of development, nearly every system was rewritten or extended:

**UI Overhaul** — Designed a complete dark fantasy UI theme from scratch: glassmorphic panels, gradient borders, custom fonts, and micro-animations. Every dialog (inventory, paperdoll, shop, quest) was redesigned for clarity and visual polish.

**Gamepad Support** — Full gamepad integration with analog stick movement, button mapping for attacks/spells/menus, and automatic detection on mobile and PC.

**Buff & Combat Systems** — Circle timer indicators for active buffs, critical hit visual effects, floating combat text with glow rendering, and health bar overlays.

**Equipment & Paperdoll** — Complete drag-and-drop equipment system with visual paperdoll, stat coloring, and right-click unequip.

**Shop & Market** — NPC shop dialog with buy/sell/craft routing, and a player marketplace with gold total display.

## Technical Highlights

- **TypeScript throughout** — Full type safety across handlers, UI components, and game logic
- **Vite build system** — Hot module replacement for rapid iteration
- **WebGL rendering** — Hardware-accelerated sprite rendering with proper zoom/camera transforms
- **WebSocket networking** — Binary protocol over WebSocket with reconnection handling
- **Cloudflare Tunnels** — Configured for remote play and testing

## Takeaway

Browser-based game clients face unique challenges — no file system access, WebSocket instead of TCP, security sandbox limitations. But the payoff is zero-install access from any device.`,
        category: 'development',
        created_at: '2026-03-01',
    },
    {
        id: 5,
        title: 'Building SOE_Website — A Modern Game Community Site',
        slug: 'soe-website',
        excerpt: 'Designing a dark fantasy game website with parallax effects, particle systems, and responsive design — pure HTML, CSS, and vanilla JavaScript.',
        content: `## Purpose

Every game needs a public face. SOE_Website serves as the landing page for Shards of Eternity — a place for potential players to understand the game, see what's being built, and join the community.

## Design Philosophy

The site needed to feel like the game itself. I drew from the same dark fantasy palette used in the web client: deep blues, teal accents, gold highlights, and glass-panel effects.

**Hero Section** — Full-viewport hero with parallax background, floating particle canvas (teal and gold motes), and a pulsing CTA button. The logo floats with a subtle CSS animation.

**Scroll-Driven Animations** — Every section uses IntersectionObserver-based fade-in animations with staggered timing so cards animate sequentially rather than all at once.

**Particle System** — Custom canvas-based particle emitter generates ambient floating particles in the hero. Each particle has independent hue (teal or gold), velocity, fade timing, and glow rendering.

## Technical Stack

Intentionally minimal: pure HTML, vanilla CSS, and plain JavaScript. No build system, no framework, no npm. The entire site is three files (\`index.html\`, \`index.css\`, \`index.js\`) plus assets.

This was a deliberate choice — game community sites should load fast and work everywhere.

## Key Features Built

- Parallax hero with scroll-responsive background transform
- Canvas particle system with 120 concurrent particles
- Animated stat counters with IntersectionObserver triggers
- FAQ accordion with smooth max-height transitions
- Mobile-responsive hamburger navigation
- Newsletter form with feedback animation

## Takeaway

Not every project needs a framework. For a content-first promotional site, vanilla HTML/CSS/JS produces a faster, lighter, more maintainable result.`,
        category: 'development',
        created_at: '2026-03-05',
    },
]

export const projects = [
    {
        id: 1,
        title: 'Anomaly Editor',
        description: 'Cross-platform Markdown editor with dark theme, live preview, integrated file explorer, and debounced autosave. Built with Electron and React.',
        status: ['active'],
        tech: 'Electron, React, Node.js, Styled Components',
        url: 'https://github.com/Caibran/Anomaly',
        created_at: '2026-02-10',
        lastUpdated: '2026-02-10',
        progress: 72,
        currentFocus: 'Tab support and syntax-highlighted code fences',
        why: 'Built to explore cross-platform UI architecture, IPC bridging, and markdown rendering workflows.',
        goals: [
            'Multi-tab editing with drag-and-drop reorder',
            'Syntax-highlighted code fences in preview',
            'Export to PDF and HTML',
            'Plugin system for custom markdown extensions',
        ],
        detail: `A focused Markdown editor designed for speed and simplicity. No IDE overhead — just writing.

## Key Features

- **Dark Theme** — Designed from scratch, not a bolt-on dark mode
- **Integrated File Explorer** — Sidebar file tree, VS Code-style
- **Live Preview** — Write markdown, see rendered output in real-time
- **Autosave** — Debounced persistence with beforeunload safety flush
- **Cross-Platform** — Single codebase produces Windows, macOS, and Linux builds
- **Portable** — Windows version runs from a ZIP, no install required

## Architecture

Frontend: **React 19** with **Styled Components** for scoped styling. **React Markdown** handles live preview rendering. Electron main process handles all file system operations through a \`preload.js\` bridge using \`contextBridge\` and IPC channels.

\`\`\`
anomaly/
├── src/              # React components & styles
├── main.js           # Electron dev entry point
├── standalone-main.js # Production entry
├── preload.js        # FS bridge (main ↔ renderer)
└── scripts/          # Build & packaging scripts
\`\`\`

Build pipeline (\`npm run build-dist\`) compiles React, packages with Electron, and creates distributable ZIPs in one step.`,
    },
    {
        id: 2,
        title: 'SOE_Server',
        description: 'C++ game server powering Shards of Eternity. Handles player connections, world state, combat, quests, NPC behavior, and WebSocket support for browser clients. Forked from Etheos and extensively extended.',
        status: ['active', 'hobby'],
        tech: 'C++, CMake, SQLite, MariaDB, Docker, WebSocket',
        url: 'https://github.com/Caibran/SOE_Server',
        created_at: '2025-12-15',
        lastUpdated: '2026-03-10',
        progress: 55,
        currentFocus: 'WebSocket stability and NPC AI improvements',
        why: 'Personal hobby project that provides deep experience with systems programming, networking protocols, and database design.',
        goals: [
            'Complete quest rule engine with all condition types',
            'Guild system with ranks and permissions',
            'Instance system hardening',
            'WebSocket protocol optimization',
        ],
        detail: `The core game server for Shards of Eternity. Originally forked from the Etheos project, this server has been extensively modified and expanded with custom gameplay systems.

## Key Systems

- **Custom binary protocol** with packet serialization for game communication
- **WebSocket support** bridging browser clients to the game protocol
- **Quest engine** with INI-driven state machines and 12 rule types
- **Buff system** with server-authoritative timers and stat modifiers
- **Instance system** with party-based dungeons and abuse prevention
- **Shrine discovery** with per-player exploration tracking

## Technical Stack

93.6% C++, with CMake build system, Docker support, and multiple database backends (SQLite, MariaDB). Cross-platform — runs on both Windows and Linux.`,
    },
    {
        id: 3,
        title: 'SOE_Client',
        description: 'C#/MonoGame desktop game client for Shards of Eternity. Features floating combat text, health bars, buff HUD, and fullscreen support. Development moved to SOE_WebClient.',
        status: ['on-hold'],
        statusNote: 'Development moved to SOE_WebClient (browser-based)',
        tech: 'C#, MonoGame, .NET',
        url: 'https://github.com/Caibran/SOE_Client',
        created_at: '2025-12-15',
        lastUpdated: '2026-02-12',
        why: 'Original desktop client; provided experience with C#, MonoGame rendering, and full game client architecture. Now superseded by the browser client.',
        detail: `Desktop game client forked from EndlessClient. Rendered the 2D game world and processed player input. Custom additions included floating combat text, health bars, buff notification HUDs with procedurally-generated icons, and fullscreen support with coordinate transformation.

Development has been moved to SOE_WebClient to provide browser-based access to the game without requiring desktop installation.`,
    },
    {
        id: 4,
        title: 'SOE_WebClient',
        description: 'Browser-based game client forked from EOWeb and heavily rewritten. TypeScript, Vite, WebGL rendering with dark fantasy UI, gamepad support, buff timers, shop dialogs, and full equipment systems.',
        status: ['active', 'hobby'],
        tech: 'TypeScript, Vite, WebGL, WebSocket, HTML/CSS',
        url: 'https://github.com/Caibran/SOE_WebClient',
        created_at: '2026-01-15',
        lastUpdated: '2026-03-10',
        progress: 60,
        currentFocus: 'Gamepad integration and UI polish',
        why: 'Personal hobby project that replaced the desktop client. Provides experience with TypeScript, browser-based rendering, WebSocket networking, and modern frontend architecture.',
        goals: [
            'Complete gamepad control mapping',
            'Mobile touch controls',
            'Audio system with ambient and effect sounds',
            'Performance optimization for low-end devices',
        ],
        detail: `Forked from EOWeb and extensively rewritten as the primary game client for Shards of Eternity.

## Major Changes from Fork

- **Dark Fantasy UI** — Complete visual overhaul with glassmorphic panels, gradient borders, and micro-animations
- **Gamepad Support** — Full controller integration for PC and mobile
- **Buff System** — Circle timer indicators with countdown and warning states
- **Shop & Market UI** — NPC dialog routing, buy/sell/craft panels, gold display
- **Equipment System** — Drag-and-drop paperdoll with stat coloring
- **Combat Text** — Floating damage numbers with glow, critical hit effects
- **Cloudflare Tunnels** — Remote play configuration

## Technical Stack

TypeScript throughout with Vite hot-reload. WebGL for sprite rendering. WebSocket for server communication. Pure CSS for all UI styling.`,
    },
    {
        id: 5,
        title: 'SOE_WebServer',
        description: 'WebSocket server component enabling browser-based clients to connect to the game. Bridges the web protocol layer with the core game server.',
        status: ['active', 'hobby'],
        tech: 'C++, WebSocket, CMake',
        url: 'https://github.com/Caibran/SOE_Server',
        created_at: '2026-01-20',
        lastUpdated: '2026-03-10',
        why: 'Personal hobby project providing experience with WebSocket protocol implementation, binary protocol bridging, and network programming.',
        detail: `WebSocket server layer integrated into the game server. Handles the protocol translation between browser WebSocket connections and the game's native binary protocol. Enables SOE_WebClient to communicate with the game server seamlessly.`,
    },
    {
        id: 6,
        title: 'SOE_PubEditor',
        description: 'Game data file editor for Shards of Eternity. Edit item, spell, class, and NPC data with a dark fantasy UI. Fixed critical pub file corruption issues.',
        status: ['active', 'hobby'],
        tech: 'TypeScript, HTML, CSS',
        url: 'https://github.com/Caibran/SOE_PubEditor',
        created_at: '2026-02-20',
        lastUpdated: '2026-03-07',
        currentFocus: 'Data validation and batch editing',
        why: 'Personal hobby project providing experience with file format serialization, data editing tools, and UI/UX design for developer tools.',
        goals: [
            'Batch editing for bulk item modifications',
            'Data validation with error highlighting',
            'Export/import for version control friendly formats',
        ],
        detail: `Pub file editor for the game's data files (.eif, .ecf, .enf, .esf). These binary files define all items, spells, NPCs, and classes in the game.

## Key Contributions

- **Dark Fantasy UI Overhaul** — Redesigned the entire interface with the SOE dark fantasy theme
- **Pub File Corruption Fix** — Fixed missing header fields (TotalCount, Version) and Weight truncation during serialization
- **Toolbar Reorganization** — Made all tools visible and accessible`,
    },
    {
        id: 7,
        title: 'SOE_ServerDocs',
        description: 'Documentation site mapping the backend architecture of the SOE game server — packet structures, database schemas, and system design.',
        status: ['hobby'],
        tech: 'HTML, CSS, JavaScript',
        url: 'https://github.com/Caibran/SOE_ServerDocs',
        created_at: '2026-02-15',
        lastUpdated: '2026-03-01',
        why: 'Personal hobby project providing experience with technical documentation, system design communication, and infrastructure mapping.',
        detail: `Reference documentation for the SOE_Server backend. Maps packet structures, database schemas, server systems, and configuration options. Serves as both personal reference and contributor onboarding material.`,
    },
    {
        id: 8,
        title: 'SOE_Website',
        description: 'Modern dark fantasy game community website for Shards of Eternity. Parallax hero, particle effects, scroll animations, and responsive design — built with pure HTML/CSS/JS.',
        status: ['active', 'hobby'],
        tech: 'HTML, CSS, JavaScript',
        url: 'https://github.com/Caibran/SOE_Website',
        created_at: '2026-03-01',
        lastUpdated: '2026-03-10',
        why: 'Personal hobby project providing experience with modern web design, CSS animations, canvas rendering, and responsive layouts.',
        detail: `The public-facing website for Shards of Eternity. Features a full-viewport hero with parallax scrolling and a custom canvas particle system.

## Highlights

- **Canvas Particle System** — 120 concurrent floating particles with independent velocities and glow
- **Scroll Animations** — IntersectionObserver-based fade-ins with staggered timing
- **Animated Counters** — Stats that count up when scrolled into view
- **No Build System** — Pure HTML/CSS/JS, three files total
- **Responsive** — Full mobile support with hamburger navigation`,
    },
]

export const contributions = [
    {
        id: 1,
        title: 'UI Overhaul: Dark Fantasy Theme + Layout Reorganization',
        project: 'SOE_PubEditor',
        type: 'feature',
        description: 'Complete visual redesign of the Pub Editor interface, applying the dark fantasy theme from SOE_WebClient. Reorganized the toolbar for full visibility, restructured the information panel with improved organization, and applied consistent styling across all UI elements including color palettes, panel layouts, and interactive components.',
        impact: 'Transformed a functional but visually dated tool into a polished, cohesive developer experience consistent with the rest of the SOE ecosystem.',
        githubUrl: 'https://github.com/Caibran/SOE_PubEditor',
        tags: ['UI/UX', 'CSS', 'TypeScript'],
    },
    {
        id: 2,
        title: 'Fix Pub File Corruption: Missing Header Fields & Weight Truncation',
        project: 'SOE_PubEditor',
        type: 'bugfix',
        description: 'Investigated and resolved data corruption when saving pub files (.eif, .ecf, etc.). The root cause was missing header fields — TotalCount and Version were not being serialized during save operations. Also fixed a Weight property truncation issue where values were being silently clipped during serialization.',
        impact: 'Fixed a critical data integrity issue that was corrupting game data files, preventing items and NPCs from loading correctly in the game server.',
        githubUrl: 'https://github.com/Caibran/SOE_PubEditor',
        tags: ['Bugfix', 'Serialization', 'Data Integrity'],
    },
    {
        id: 3,
        title: 'Add WebSocket Support for Browser-Based Clients',
        project: 'SOE_Server',
        type: 'feature',
        description: 'Extended the C++ game server with a WebSocket layer, enabling browser-based clients to connect without requiring desktop installation. This required bridging the game\'s native binary protocol with WebSocket framing, handling connection lifecycle differences, and ensuring the same game logic worked seamlessly for both TCP and WebSocket clients.',
        impact: 'Unlocked browser-based gameplay, making the game accessible from any device with a modern web browser — a fundamental shift in the project\'s accessibility.',
        githubUrl: 'https://github.com/Caibran/SOE_Server',
        tags: ['Networking', 'WebSocket', 'C++'],
    },
    {
        id: 4,
        title: 'Fix Character Flicker During Equipment Changes',
        project: 'EOWeb (upstream)',
        type: 'bugfix',
        description: 'When equipment changes occurred, refreshCharacters() immediately replaced the character\'s renderable frames with empty stubs (atlasIndex: -1). The renderer skips these frames, making the character invisible for a brief moment before the atlas loaded the new sprites. The fix ensures characters maintain their current visual state during the transition period.',
        impact: 'Eliminated a visually disruptive flicker that occurred every time a player or nearby character changed equipment, improving the visual polish of the game client.',
        githubUrl: 'https://github.com/sorokya/eoweb/commit/070b929d86d355f91382901e8da178dc19c606f0',
        tags: ['Bugfix', 'Rendering', 'TypeScript'],
    },
]
