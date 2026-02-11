const { getDb, initDb } = require('./db')

initDb()
const db = getDb()

// clear existing data
db.exec('DELETE FROM posts')
db.exec('DELETE FROM projects')

// seed case study posts
const insertPost = db.prepare(`
  INSERT INTO posts (title, slug, excerpt, content, category, created_at) VALUES (?, ?, ?, ?, ?, ?)
`)

insertPost.run(
    'Debugging a Race Condition in Multiplayer Sync',
    'race-condition-multiplayer-sync',
    'How I tracked down a desync bug that only appeared under high player counts, and the fix that made it worse before it got better.',
    `## The Problem

We had a desync bug that only showed up when 15+ players were in the same zone. Characters would "teleport" — their positions on one client wouldn't match another. The server logs looked clean.

## Investigation

The first instinct was network latency, but packet captures showed everything arriving in order. The real issue was subtler: two systems were writing to the same position buffer without synchronization.

\`\`\`cpp
// before: unsynchronized write
void Character::UpdatePosition(const Vec3& pos) {
    m_position = pos;  // not thread-safe
    m_dirty = true;
}
\`\`\`

The movement processing thread and the combat knockback system were both calling \`UpdatePosition\` without any locking. Under low load, they never collided. At 15+ players, the timing window opened up.

## The Fix

A mutex was the obvious answer, but it introduced frame hitches. Instead, I moved to a double-buffer pattern — each system writes to its own staging buffer, and a single sync point merges them per tick.

\`\`\`cpp
void Character::CommitPosition() {
    // single writer, called once per tick
    Vec3 final = m_movementStaged;
    if (m_combatDisplacement != Vec3::Zero) {
        final += m_combatDisplacement;
        m_combatDisplacement = Vec3::Zero;
    }
    m_position = final;
}
\`\`\`

## Takeaway

Race conditions in game servers are especially nasty because they're load-dependent. You can't unit test your way out of them — you need stress testing as part of your CI pipeline.`,
    'debugging',
    '2026-02-08'
)

insertPost.run(
    'Building a Custom Quest System from Scratch',
    'custom-quest-system',
    'Designing a data-driven quest engine that supports branching objectives, instance prerequisites, and hot-reloadable definitions.',
    `## Why Custom?

The existing quest system was hardcoded — every quest was a function in a massive switch statement. Adding a new quest meant modifying engine code, recompiling, and restarting the server. Not great when you want designers to iterate quickly.

## Architecture

The new system is data-driven. Quests are defined in \`.ini\` files with a simple DSL:

\`\`\`ini
[Quest_102]
Title=The Lost Shrine
Objectives=kill:goblin:5,collect:crystal:3,talk:elder
Rewards=exp:500,item:iron_sword
Prerequisites=quest:101,level:10
\`\`\`

The engine parses these at startup (and can hot-reload them via an admin command) into a \`QuestDefinition\` struct. The runtime tracks player progress in the database.

## Challenges

The trickiest part was branching objectives — quests where step 2 depends on a choice in step 1. I solved this with a simple state machine per quest instance, where each state has its own set of valid objectives and transitions.

## Result

Designers can now create quests without touching C++. The turnaround went from "wait for next build" to "reload in 2 seconds."`,
    'architecture',
    '2026-02-05'
)

insertPost.run(
    'Lessons from Migrating to WAL Mode in SQLite',
    'sqlite-wal-migration',
    'A quick study on switching a production SQLite database to Write-Ahead Logging and the performance gains (and gotchas) that followed.',
    `## Context

Our game server uses SQLite for player data. With 50+ concurrent players, we were hitting lock contention on writes — \`SQLITE_BUSY\` errors during peak hours.

## What WAL Changes

In the default journal mode, writers block readers. WAL (Write-Ahead Logging) flips this: readers and writers can operate concurrently. Writes go to a separate WAL file, and readers see a consistent snapshot.

\`\`\`javascript
db.pragma('journal_mode = WAL')
\`\`\`

One line. That's it for the basic switch.

## Results

- Write throughput improved ~3x under concurrent load
- Read latency dropped to near-zero for most queries
- \`SQLITE_BUSY\` errors disappeared entirely

## Gotchas

WAL mode creates two extra files (\`.wal\` and \`.shm\`) next to the database. If you back up the \`.db\` file alone, you'll lose uncommitted data. Always checkpoint before backing up, or copy all three files.

Also, WAL doesn't work over network filesystems (NFS, SMB). Keep the database on local storage.`,
    'databases',
    '2026-02-01'
)

// seed projects
const insertProject = db.prepare(`
  INSERT INTO projects (title, description, status, tech, url, created_at) VALUES (?, ?, ?, ?, ?, ?)
`)

// active projects
insertProject.run(
    'Game Server Engine',
    'Custom MMORPG server engine with real-time networking, instancing, and a data-driven quest/buff system.',
    'active',
    'C++, SQLite, TCP/UDP, Custom Protocol',
    'https://github.com',
    '2026-02-10'
)

insertProject.run(
    'Admin Control Panel',
    'Web-based admin dashboard for live game server management — player lookup, server config, real-time monitoring.',
    'active',
    'React, Node.js, WebSocket, SQLite',
    'https://github.com',
    '2026-02-06'
)

insertProject.run(
    'Documentation Wiki',
    'Internal documentation site for the game engine, auto-generated from source comments with manual overrides.',
    'active',
    'HTML, CSS, JavaScript, Markdown',
    'https://github.com',
    '2026-02-02'
)

// completed projects
insertProject.run(
    'Portfolio Website',
    'This site. Sci-fi terminal landing, React frontend, Express/SQLite API backend.',
    'completed',
    'React, Tailwind, Express, SQLite',
    'https://github.com',
    '2026-02-10'
)

insertProject.run(
    'Combat Text System',
    'Floating damage/heal numbers with glow effects, directional offsets, and smooth fade animations.',
    'completed',
    'C#, MonoGame, Custom Renderer',
    'https://github.com',
    '2026-02-08'
)

insertProject.run(
    'Health Bar Renderer',
    'Pixel-accurate health bars above NPCs with smooth interpolation and color-coded thresholds.',
    'completed',
    'C#, MonoGame',
    'https://github.com',
    '2026-02-07'
)

insertProject.run(
    'Server Buff System',
    'Configurable buff/debuff system supporting stat modifiers, rate multipliers, and timed durations.',
    'completed',
    'C++, INI Config, SQLite',
    'https://github.com',
    '2026-02-09'
)

// hobby projects
insertProject.run(
    'Pixel Art Tilemap Editor',
    'A lightweight tilemap editor built for fun — grid snapping, layer support, export to JSON.',
    'hobby',
    'JavaScript, Canvas API',
    'https://github.com',
    '2026-01-20'
)

insertProject.run(
    'CLI Task Tracker',
    'Terminal-based todo app with priority sorting, deadlines, and markdown export.',
    'hobby',
    'Python, SQLite, Rich',
    'https://github.com',
    '2026-01-15'
)

console.log('seed data inserted')
process.exit(0)
