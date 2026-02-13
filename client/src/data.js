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
        excerpt: 'A multi-repository MMO project spanning C server, C# client, JavaScript tooling, and PHP web — covering networking, persistence, and client-server synchronization.',
        content: `## Overview

Shards of Eternity is a multiplayer online game built across four repositories, each handling a different layer of the system. It started as an interest in understanding how multiplayer architecture works end-to-end, and grew into a long-running project covering networking, persistence, client rendering, and content tooling.

## Architecture

### Server — Eternity Engine (C)
Forked from Etheos. Handles core game logic: player connections, world state, combat resolution, NPC behavior, item systems, map transitions. Extended with custom packet handlers, quest engines, instancing, buff systems, and shrine discovery. All configuration is INI-driven for content separation.

### Client — SOE_Client (C# / MonoGame)
Forked from EndlessClient. Renders the 2D game world and processes player input. Custom additions include floating combat text, health bars, buff notification HUDs with procedurally-generated icons, and fullscreen support with coordinate transformation.

### Map Editor — SOE_MapJS (JavaScript)
Browser-based map editor for visual level design — tiles, walls, NPC spawns, warp zones. Eliminates dependency on proprietary tools.

### Community Site — SOE_Website (PHP)
Player registration, server status, and news distribution.

## Key Systems Built

**Buff System** — Server-side stat modifiers with binary protocol extensions. Client renders active buffs as procedurally-generated hexagonal icons with countdown timers synchronized to server-authoritative durations.

**Quest Engine** — INI-driven state machine with condition checking, reward distribution, and twelve rule types covering instance completion, time restrictions, party validation, and inventory state.

**Instancing** — Party-based dungeon instances with cooldowns, disconnect abuse detection, and security revalidation between state transitions.

**Shrine Discovery** — Per-player exploration tracking with database persistence. Players discover teleport locations through exploration, earning experience rewards.

## Technical Domains Covered

- Custom binary protocol design and packet serialization
- Client-server state synchronization
- SQLite and MariaDB persistence layers
- CMake build systems (server), MSBuild (client), npm (tooling)
- Docker containerization for test deployment

## Current State

Actively maintained. Server runs stable under load testing. Client is functional with ongoing UI improvements. Feature development continues.`,
        category: 'systems',
        created_at: '2025-12-15',
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
        title: 'EOEngine',
        description: 'Community-maintained C++ server emulator for Endless Online. Cross-platform builds, Docker support, SQLite and MariaDB backends.',
        status: ['active'],
        tech: 'C++, CMake, SQLite, MariaDB, Docker',
        url: 'https://github.com/EO-Resource/EOEngine',
        created_at: '2026-02-08',
        lastUpdated: '2026-02-08',
        progress: 45,
        currentFocus: 'Quest system integration testing and guild implementation',
        why: 'Built to provide an accessible, well-documented server platform for the Endless Online community.',
        goals: [
            'Complete quest rule engine with all condition types',
            'Guild system with ranks and permissions',
            'Automated CI/CD pipeline for release builds',
            'Web-based admin dashboard',
        ],
        detail: `A modern fork of Etheos — a high-performance Endless Online server emulator. Focused on accessibility, customization, and ongoing maintenance.

## Purpose

EOEngine emulates the server side of Endless Online, handling player connections, world state, combat, quests, NPCs, and item systems. Supports multiple database backends (SQLite, MariaDB) and runs on both Windows and Linux.

## Design Objectives

- **Accessibility** — Lower the barrier for hobbyists and developers to run private servers
- **Customization** — INI-driven configuration, plugin hooks, features beyond vanilla
- **Community-Centric** — Open contributions, shared tooling, module support
- **Ongoing Maintenance** — Regular updates, modern C++ practices, stable releases

## Building

\`\`\`bash
# Linux
sudo ./scripts/install-deps.sh
./build-linux.sh -i

# Windows (Visual Studio 2017/2019)
.\\scripts\\install-deps.ps1
.\\build-windows.ps1 -SqlServer ON -MariaDB ON -Sqlite ON
\`\`\`

## Tech Profile

93.6% C++, with supporting infrastructure in CMake, Shell, PowerShell, and Python. Docker support for quick deployment and integration testing.`,
    },
    {
        id: 3,
        title: 'Shards of Eternity',
        description: 'Multi-repository multiplayer game — C server engine, C# game client, JavaScript map editor, PHP community site. Custom networking, persistence, and gameplay systems.',
        status: ['active'],
        tech: 'C, C#, MonoGame, JavaScript, PHP, Docker',
        url: 'https://github.com/Shards-Of-Eternity',
        created_at: '2025-12-15',
        lastUpdated: '2026-02-12',
        youtube: 'https://www.youtube.com/watch?v=fuW5jYka7_U',
        why: 'Built to understand multiplayer architecture, client-server synchronization, and long-running system maintenance.',
        detail: `A multiplayer online game spanning four repositories and four languages. Designed and maintained as a full-stack multiplayer system.

## Architecture

### Eternity Engine — Game Server (C)
Core game logic: player movement, combat, NPCs, items, map transitions, quests, instancing, buff systems, shrine discovery. Extended with custom packet handlers and INI-driven configuration.

### Game Client — SOE_Client (C# / MonoGame)
2D game renderer with player input handling. Custom additions: floating combat text, health bars, buff notification HUD with procedurally-generated hex icons, fullscreen with coordinate transformation.

### Interactive Map Editor — SOE_MapJS (JavaScript)
Browser-based level design tool. Visual editing of tiles, walls, NPC spawns, warp zones.

### Community Website — SOE_Website (PHP)
Player registration, server status, news hub.

## Systems Built

- **Buff System** — Server-side stat modifiers with binary protocol extensions, client-side countdown rendering, procedural icon generation
- **Quest Engine** — INI-driven state machine with 12 rule types, database-backed condition checking
- **Instancing** — Party-based dungeon instances with cooldowns, security revalidation, disconnect abuse prevention
- **Shrine Discovery** — Per-player exploration tracking, database persistence, EXP rewards
- **Combat Text** — Floating damage numbers with glow rendering, offset to avoid UI overlap

## Technical Domains

- Custom binary protocol, packet serialization
- Client-server state sync
- SQLite / MariaDB persistence
- CMake, MSBuild, npm build systems
- Docker containerization`,
    },
]
