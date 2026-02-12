// Static data for posts + projects (no backend needed for GH Pages)

export const posts = [
    {
        id: 1,
        title: 'Building Anomaly — A Cross-Platform Markdown Editor',
        slug: 'building-anomaly-editor',
        excerpt: 'The story behind Anomaly — a cross-platform markdown editor I built with Electron and React because every other option was either ugly or bloated.',
        content: `## The Idea

I wanted a markdown editor that felt native, looked modern, and stayed out of the way. Most editors I'd tried were either bloated with features I didn't need or looked like they were designed in 2012. So I built my own.

## The Hard Part: Bridging Main and Renderer

The trickiest commit in the whole project was getting the file system bridge right. Electron's security model means the renderer process (React) can't touch the file system directly — everything has to go through \`preload.js\` using \`contextBridge\`. 

The problem is that file operations are async, error-prone, and the renderer needs to handle states like "file doesn't exist anymore" or "directory was just deleted." I ended up building a channel-based API in \`preload.js\` that exposes a clean interface:

\`\`\`js
contextBridge.exposeInMainWorld('electronAPI', {
    readDir: (dirPath) => ipcRenderer.invoke('read-dir', dirPath),
    readFile: (filePath) => ipcRenderer.invoke('read-file', filePath),
    writeFile: (filePath, content) => ipcRenderer.invoke('write-file', filePath, content),
    // ...
})
\`\`\`

Then the main process registers handlers for each channel. Sounds simple, but the gotcha is error propagation — if the main process throws during a file read, you need to catch it cleanly in the renderer without crashing the whole app. Took a few iterations to get the error boundaries right.

## Autosave

Autosave was another rabbit hole. The naive approach (save on every keystroke) hammers the disk and causes lag on large files. I ended up with a debounced save — waits 800ms after the last keystroke, then writes. But then you have the edge case: what if the user closes the window during the debounce? So there's also a \`beforeunload\` handler that forces a synchronous flush.

## Distribution Pipeline

One of the goals was making distribution painless. The build pipeline (\`npm run build-dist\`) handles the full flow — compiling the React app, packaging it with Electron, and creating a ZIP for portable distribution. Cross-platform was important from day one; the same codebase produces builds for Windows, macOS, and Linux.

## Thoughts

Building Anomaly taught me a lot about making web tech feel native. Electron gets a bad rap for memory usage, but if you keep things focused and don't pull in a million dependencies, it runs fine. The app opens fast and doesn't eat my RAM — that's good enough for me.`,
        category: 'development',
        created_at: '2026-02-10',
    },
    {
        id: 2,
        title: 'Implementing a Quest Rule Engine from Scratch',
        slug: 'eoengine-quest-system',
        excerpt: 'How I added a full quest system to EOEngine — condition checking, INI-driven config, and the joy of debugging state machines in C++.',
        content: `## The Problem

EOEngine inherited a partially-built quest framework, but most of the rule checks were stubbed out. You could define quests in INI files, but the engine couldn't actually verify things like "has the player cleared this instance?" or "is it between 6pm and midnight server time?" The quest actions and conditions existed on paper but not in code.

## How Quests Work

Quests in EOEngine are defined in \`.eqf\` files — a simple INI-like format. Each quest has a chain of states, and each state has rules (conditions to check) and actions (things to do when conditions are met). The engine evaluates rules on certain triggers — talking to an NPC, killing a mob, entering a map — and advances the quest state when everything checks out.

\`\`\`ini
[State 1]
Desc = Find the lost artifact
Rule = HasItem 42 1
Action = GiveExp 500
Action = SetState 2
\`\`\`

## The Commit

The big commit added a dozen missing rule implementations. Each rule is a condition check — simple in isolation, but they compose in complex ways. Some highlights:

**RuleInstanceCleared** — checks if the player has completed a specific dungeon instance. This required hooking into the instancing system to query completion records from the database, which meant touching \`character.hpp\`, \`world.cpp\`, and the SQLite layer.

**RuleTimeRestriction** — gates quests by server time. Sounds trivial, but you have to handle day boundaries (what if the window is 10pm-2am?) and decide whether to use server time or player-local time. Went with server time to prevent timezone exploits.

**RulePartySize** — checks if the player's party meets size requirements. The tricky part was handling edge cases: what if someone leaves the party between the rule check and the action execution? Added a revalidation step in the action handler.

## What Made It Hard

The existing codebase used a pattern where rule checks returned a simple bool, but some rules needed to check against dynamic data (database queries, other player states). I had to extend the rule evaluation to support async-ish lookups without blocking the game loop. Ended up using a two-pass approach: first pass gathers required data, second pass evaluates conditions.

## Thoughts

Quest systems look simple from the player side but they're basically state machines with side effects. Every edge case you don't handle becomes a bug report from someone who found a way to sequence-break your carefully designed dungeon. The INI-driven approach is great for content creators, though — non-programmers can write quests without touching C++.`,
        category: 'open-source',
        created_at: '2026-02-08',
    },
    {
        id: 3,
        title: 'Shards of Eternity — Building an MMO from Scratch',
        slug: 'shards-of-eternity',
        excerpt: 'A hobby MMO project built on top of Endless Online\'s architecture — custom server engine in C, a C# game client, interactive map tooling, and a PHP community site.',
        content: `## How It Started

I grew up playing Endless Online, one of those tiny 2D MMOs that somehow had a massive community. When the official servers went quiet, I wanted to keep that experience alive — but on my own terms. Not just running someone else's server, but actually understanding the full stack and building something new on top of it.

That's how Shards of Eternity started. It's a hobby project, and I'm not pretending otherwise — but it's taught me more about real-world distributed systems than any course ever could.

## The Stack

The project spans four repositories, each handling a different piece of the puzzle:

### Eternity Engine (Server)
A C-based game server forked from Etheos. It handles all the core game logic — player movement, combat, NPCs, item systems, map transitions, the works. I've been extending it with custom features like buff systems, quest engines, shrine discovery, and instancing. It's not glamorous work, but digging through thousands of lines of C to add new packet handlers is genuinely fun.

### Game Client (C#)
Forked from EndlessClient, the client is built in C# with MonoGame. I've been adding things like floating combat text, health bars, buff notification HUDs, and fullscreen support. It's the part players actually see, so I spend a lot of time tweaking animations and making the UI feel responsive.

### Map Editor (JavaScript)
An interactive browser-based map editor forked from eomap-js. It lets me visually build and edit game maps without needing proprietary tools.

### Community Website (PHP)
A simple PHP site that serves as the landing page and news hub for the project.

## The Buff System — A Real Example

One of the more involved features was the buff notification HUD. The server sends buff data as part of custom packet extensions — things like stat multipliers, durations, effect types. But the client had no way to display any of it.

I had to:
1. Parse the buff packets from the server's binary protocol
2. Build a notification panel that renders active buffs as procedurally-generated hexagonal icons
3. Add countdown timers that tick down in real-time and handle expiration
4. Color-code buffs by type (stat boost, regen, damage modifier)
5. Later extend the same system to support spell-cast buffs, not just potion buffs

The hardest part was getting the hex icon rendering right — generating the shapes procedurally instead of using sprite assets — and syncing the client-side timers with the server's authoritative buff duration.

## What I've Learned

This project touches almost every layer of software development:
- **Networking**: Custom binary protocols, packet serialization, client-server state sync
- **Databases**: SQLite and MariaDB for persistent world state
- **Build Systems**: CMake on the server, MSBuild on the client, npm for the map editor
- **DevOps**: Docker containers for test servers, CI scripts for automated builds
- **Game Design**: Balancing systems, writing quest logic, designing progression curves

It's the kind of project where you fix a memory leak at 2am and then spend the next hour adding a particle effect because you can't stop tinkering.

## Current State

Actively in development. The server runs stable with a small group of testers, the client is playable but rough around the edges, and I keep a running list of features that grows faster than I can knock them out. It's a hobby — and I like it that way.`,
        category: 'hobby',
        created_at: '2025-12-15',
    },
]

export const projects = [
    {
        id: 1,
        title: 'Anomaly Editor',
        description: 'Cross-platform Markdown editor with dark theme, live preview, file explorer sidebar, and autosave. Electron + React.',
        status: ['active'],
        tech: 'Electron, React, Node.js, Styled Components',
        url: 'https://github.com/Caibran/Anomaly',
        created_at: '2026-02-10',
        progress: 72,
        currentFocus: 'Implementing tab support and syntax highlighting for code blocks',
        goals: [
            'Multi-tab editing with drag-and-drop reorder',
            'Syntax-highlighted code fences in preview',
            'Export to PDF and HTML',
            'Plugin system for custom markdown extensions',
        ],
        detail: `A modern, dark-themed Markdown editor designed to feel native without the weight of a full IDE.

## Key Features

- **Dark Theme** — Built from the ground up, not a bolt-on dark mode. Every color is intentional.
- **Integrated File Explorer** — Browse and manage your file structure in a sidebar, VS Code-style.
- **Live Preview** — Write markdown on one side, see rendered output on the other in real-time.
- **Autosave** — Changes are debounced and persisted automatically. Never lose work.
- **Cross-Platform** — Single codebase produces builds for Windows, macOS, and Linux.
- **Portable** — Windows version runs from a ZIP — no install required.

## How It's Built

The frontend uses **React 19** with **Styled Components** for scoped styling. **React Markdown** handles live preview rendering. The Electron main process handles all file system operations through a \`preload.js\` bridge using \`contextBridge\` and IPC channels.

\`\`\`
anomaly/
├── src/              # React components & styles
├── main.js           # Electron dev entry point
├── standalone-main.js # Production entry
├── preload.js        # FS bridge (main ↔ renderer)
└── scripts/          # Build & packaging scripts
\`\`\`

The build pipeline (\`npm run build-dist\`) compiles React, packages with Electron, and creates distributable ZIPs in one step.`,
    },
    {
        id: 2,
        title: 'EOEngine',
        description: 'Modern C++ server emulator for Endless Online. Cross-platform builds, Docker support, SQLite/MariaDB backends.',
        status: ['active', 'hobby'],
        tech: 'C++, CMake, SQLite, MariaDB, Docker',
        url: 'https://github.com/EO-Resource/EOEngine',
        created_at: '2026-02-08',
        progress: 45,
        currentFocus: 'Quest system implementation and integration testing',
        goals: [
            'Complete quest rule engine with all condition types',
            'Guild system with ranks and permissions',
            'Automated CI/CD pipeline for release builds',
            'Web-based admin dashboard',
        ],
        detail: `A community-maintained, modern fork of Etheos — a high-performance Endless Online server emulator. Built for accessibility, customization, and ongoing maintenance.

## What It Does

EOEngine emulates the server side of Endless Online, handling everything from player connections and world state to combat, quests, NPCs, and item systems. It supports multiple database backends (SQLite, MariaDB) and runs on both Windows and Linux.

## Key Objectives

- **Accessibility** — Make it easier for hobbyists and developers to host their own EO servers
- **Customization** — Extensive INI-driven configuration, plugin hooks, new features beyond vanilla
- **Community-Centric** — Open contributions, shared learning, module support
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

## Tech Stack

93.6% C++, with supporting infrastructure in CMake, Shell, PowerShell, and Python. Includes Docker support for quick deployment and integration testing via EOBot.

## Heritage

EOEngine traces its lineage through years of open-source work: EOServ → EOSource → Etheos → EOEngine. Each generation built on the last, and this fork continues that tradition with a focus on community involvement.`,
    },
    {
        id: 3,
        title: 'Shards of Eternity',
        description: 'A hobby MMO built on Endless Online\'s bones — custom C server engine, C# game client, browser-based map editor, and a PHP community site.',
        status: ['hobby'],
        tech: 'C, C#, MonoGame, JavaScript, PHP, Docker',
        url: 'https://github.com/Shards-Of-Eternity',
        created_at: '2025-12-15',
        youtube: 'https://www.youtube.com/watch?v=fuW5jYka7_U',
        detail: `A hobby MMO project built on top of Endless Online's architecture. Four repositories spanning four languages — because why not.

## The Stack

### Eternity Engine — Game Server (C)
Forked from Etheos. Handles all core game logic: player movement, combat, NPCs, items, map transitions, quests, instancing, buff systems, and shrine discovery. Extended with custom packet handlers and INI-driven configuration for content.

### Game Client — SOE_Client (C# / MonoGame)
Forked from EndlessClient. Renders the 2D game world and handles player input. Custom additions include floating combat text, health bars, buff notification HUDs with procedurally-generated hex icons, and fullscreen support.

### Interactive Map Editor — SOE_MapJS (JavaScript)
A browser-based map editor forked from eomap-js. Used to visually build and edit game maps — tiles, walls, NPC spawns, warp zones — without proprietary tools.

### Community Website — SOE_Website (PHP)
Landing page and news hub for the project. Handles player registration and server status.

## What I've Built

- **Buff System** — Server-side stat modifiers with client HUD rendering, countdown timers, and procedural hex icons
- **Quest Engine** — INI-driven quest system with state machines, condition checking, and reward distribution
- **Instancing** — Party-based dungeon instances with cooldowns, security checks, and disconnect abuse prevention
- **Shrine Discovery** — Exploration-based teleport system with per-player discovery tracking and EXP rewards
- **Combat Text** — Floating damage numbers with glow effects and right-offset rendering to avoid overlapping health bars

## Current State

Actively in development with a small group of testers. The server runs stable, the client is playable, and the feature list grows faster than I can knock it out.`,
    },
]
