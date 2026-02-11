const Database = require('better-sqlite3')
const path = require('path')

const DB_PATH = path.join(__dirname, 'portfolio.db')
let db

function getDb() {
    if (!db) {
        db = new Database(DB_PATH)
        db.pragma('journal_mode = WAL')
    }
    return db
}

function initDb() {
    const conn = getDb()

    conn.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      excerpt TEXT,
      content TEXT,
      category TEXT DEFAULT 'study',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

    conn.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      status TEXT DEFAULT 'active',
      tech TEXT,
      url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

    console.log('database initialized')
}

module.exports = { getDb, initDb }
