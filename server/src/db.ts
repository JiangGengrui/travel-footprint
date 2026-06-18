import Database, { Database as DatabaseType } from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_PATH = path.join(DATA_DIR, 'travel.db');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const db: DatabaseType = new Database(DB_PATH);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    nickname TEXT NOT NULL,
    password TEXT NOT NULL,
    avatar TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS footprints (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL REFERENCES users(id),
    province_id TEXT NOT NULL,
    city_id TEXT NOT NULL,
    city_name TEXT NOT NULL,
    visited_at TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE INDEX IF NOT EXISTS idx_footprints_user_id ON footprints(user_id);

  CREATE TABLE IF NOT EXISTS diaries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL REFERENCES users(id),
    province_id TEXT NOT NULL,
    city_id TEXT NOT NULL,
    title TEXT,
    content TEXT NOT NULL,
    date TEXT NOT NULL,
    weather TEXT,
    rating INTEGER DEFAULT 0,
    tags TEXT,
    image TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );

  CREATE INDEX IF NOT EXISTS idx_diaries_user_id ON diaries(user_id);
  CREATE INDEX IF NOT EXISTS idx_diaries_user_city ON diaries(user_id, city_id);
`);

export function getDb(): DatabaseType {
  return db;
}

export { db };
export default db;