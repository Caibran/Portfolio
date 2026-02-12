// Static data layer — replaces the Express/SQLite API for GitHub Pages deployment

export const posts = [
    {
        id: 1,
        title: 'Building Anomaly — A Cross-Platform Markdown Editor',
        slug: 'building-anomaly-editor',
        excerpt: 'How I designed and built a sleek, cross-platform markdown editor with live preview, an integrated file explorer, and a dark-first UI — all powered by Electron and React.',
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

## Takeaway

Building Anomaly taught me a lot about bridging web technologies with native OS capabilities. Electron gets a bad reputation for memory usage, but when you keep the scope focused and avoid unnecessary dependencies, you can build something that feels genuinely lightweight.`,
        category: 'development',
        created_at: '2026-02-10',
    },
    {
        id: 2,
        title: 'Contributing to EOEngine — A Modern Endless Online Server Emulator',
        slug: 'eoengine-server-emulator',
        excerpt: 'A deep dive into EOEngine — a community-driven C++ server emulator for Endless Online, built for accessibility, extensibility, and cross-platform support.',
        content: `## What is EOEngine?

EOEngine is a modern, community-focused fork of Etheos — a high-performance emulator for Endless Online servers. The project traces its lineage through years of open-source development: from the original EOServ, through EOSource, to Etheos, and now EOEngine.

The goal is clear: make it easier for players, hobbyists, and developers to create and host their own Endless Online servers.

## Key Objectives

- **Accessibility**: Lower the barrier for hosting private servers
- **Customization**: Extend the emulator with features, config options, and mod support
- **Community-Centric**: Encourage contributions and shared learning
- **Ongoing Maintenance**: Regular updates and modern development practices

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

## Takeaway

Working on EOEngine has been a lesson in maintaining a large, legacy-rooted C++ codebase while pushing it toward modern standards. It's community-driven development at its best — open contributions, shared documentation, and a collective effort to keep an old game's ecosystem alive.`,
        category: 'open-source',
        created_at: '2026-02-08',
    },
]

export const projects = [
    {
        id: 1,
        title: 'Anomaly Editor',
        description: 'A sleek, modern cross-platform Markdown editor with dark theme, live preview, integrated file explorer, and autosave — built with Electron and React.',
        status: 'active',
        tech: 'Electron, React, Node.js, Styled Components',
        url: 'https://github.com/Caibran/Anomaly',
        created_at: '2026-02-10',
    },
    {
        id: 2,
        title: 'EOEngine',
        description: 'A community-driven, modern C++ server emulator for Endless Online — supporting multi-platform builds, Docker deployment, and multiple database backends.',
        status: 'active',
        tech: 'C++, CMake, SQLite, MariaDB, Docker',
        url: 'https://github.com/EO-Resource/EOEngine',
        created_at: '2026-02-08',
    },
]
