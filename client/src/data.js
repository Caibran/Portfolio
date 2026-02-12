// Static data for posts + projects (no backend needed for GH Pages)

export const posts = [
    {
        id: 1,
        title: 'Building Anomaly — A Cross-Platform Markdown Editor',
        slug: 'building-anomaly-editor',
        excerpt: 'The story behind Anomaly — a cross-platform markdown editor I built with Electron and React because every other option was either ugly or bloated.',
        content: `## The Idea

I wanted a markdown editor that felt native, looked modern, and stayed out of the way. Most editors I'd tried were either bloated with features I didn't need or looked like they were designed in 2012. So I built my own.

## Architecture

Anomaly is an Electron app with a React 19 frontend. The main process handles file system operations through Node.js APIs, while the renderer handles the editing experience with live markdown preview.

\`\`\`
anomaly/
├── src/              # React components & styles
├── main.js           # Electron dev entry point
├── standalone-main.js # Electron production entry
├── preload.js        # Bridge between main & renderer
└── scripts/          # Build & packaging scripts
\`\`\`

The key design decision was keeping the file explorer integrated into the sidebar rather than relying on system dialogs. This gives a VS Code-like feel without the weight of a full IDE.

## Key Features

- **Dark Theme**: Built from the ground up — not a bolt-on dark mode. Every color is intentional.
- **Live Preview**: Write markdown on one side, see rendered output instantly on the other.
- **Autosave**: Changes are persisted automatically so you never lose work.
- **Cross-Platform**: Builds for Windows, macOS, and Linux from a single codebase.
- **Portable**: The Windows version runs directly from an extracted ZIP — no install required.

## Tech Stack

The frontend uses **React 19** with **Styled Components** for scoped, themeable styling. **React Markdown** handles the live preview rendering, and **React Icons** provides a consistent icon set. The build pipeline uses **Electron Packager** and **Electron Builder** for creating distributable packages across platforms.

## Distribution

One of the goals was making distribution painless. The build pipeline (\`npm run build-dist\`) handles the full flow — compiling the React app, packaging it with Electron, and creating a ZIP for portable distribution. Windows users get both a portable version and a full installer.

## Thoughts

Building Anomaly taught me a lot about making web tech feel native. Electron gets a bad rap for memory usage, but honestly, if you keep things focused and don't pull in a million dependencies, it's fine. The app opens fast and doesn't eat my RAM — that's good enough for me.`,
        category: 'development',
        created_at: '2026-02-10',
    },
    {
        id: 2,
        title: 'Contributing to EOEngine — A Modern Endless Online Server Emulator',
        slug: 'eoengine-server-emulator',
        excerpt: 'My contributions to EOEngine, a community-maintained C++ server emulator for Endless Online. Mostly quest systems, instancing, and build tooling.',
        content: `## What is EOEngine?

EOEngine is a modern, community-focused fork of Etheos — a high-performance emulator for Endless Online servers. The project traces its lineage through years of open-source development: from the original EOServ, through EOSource, to Etheos, and now EOEngine.

The goal is clear: make it easier for players, hobbyists, and developers to create and host their own Endless Online servers.

## Goals

- Make it easier for people to spin up their own servers
- Add features and config hooks that the original didn't have
- Keep the codebase approachable for new contributors
- Actually maintain the thing (regular updates, modern C++ practices)

## Building the Project

EOEngine supports both Windows (Visual Studio) and Linux builds. The project uses CMake as its build system and supports multiple database backends:

\`\`\`bash
# Linux build
sudo ./scripts/install-deps.sh
./build-linux.sh -i
\`\`\`

\`\`\`powershell
# Windows build
.\\scripts\\install-deps.ps1
.\\build-windows.ps1 -SqlServer ON -MariaDB ON -Sqlite ON
\`\`\`

Dependencies include CMake, SQLite, MariaDB, and Git (for bcrypt and googletest submodules). The project also uses Git LFS for asset management.

## Docker Support

For quick deployment, EOEngine supports Docker containers with full configuration via environment variables — making it straightforward to spin up test servers or run integration tests in isolated environments.

## Integration Testing

Testing uses EOBot from the EndlessClient project. These tests simulate actual gameplay interactions — connecting, logging in, and performing in-game actions — all running inside Docker containers for reproducibility.

## Tech Stack

The codebase is **93.6% C++**, with supporting infrastructure in CMake, Shell, PowerShell, and Python. It targets modern C++ standards and is compatible with Visual Studio 2017/2019 on Windows and g++ on Linux.

## Looking Back

Working on a codebase this old forces you to be pragmatic. You can't just rewrite everything — you have to understand why things were done a certain way before you change them. It's been a good exercise in reading other people's code and making incremental improvements without breaking the stuff that already works.`,
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
        status: 'active',
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
    },
    {
        id: 2,
        title: 'EOEngine',
        description: 'Modern C++ server emulator for Endless Online. Cross-platform builds, Docker support, SQLite/MariaDB backends.',
        status: 'active',
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
    },
    {
        id: 3,
        title: 'Shards of Eternity',
        description: 'A hobby MMO built on Endless Online\'s bones — custom C server engine, C# game client, browser-based map editor, and a PHP community site.',
        status: 'hobby',
        tech: 'C, C#, MonoGame, JavaScript, PHP, Docker',
        url: 'https://github.com/Shards-Of-Eternity',
        created_at: '2025-12-15',
    },
]
