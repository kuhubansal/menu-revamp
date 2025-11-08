import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const dataDir = path.join(__dirname, "..", "..", "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, "menus.db");
const db = new Database(dbPath);

// Initialize table if not exists
db.prepare(`
CREATE TABLE IF NOT EXISTS menus (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  menu_name TEXT NOT NULL,
  menu_code TEXT,
  parent_id INTEGER,
  owner_id TEXT,
  metadata TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY(parent_id) REFERENCES menus(id)
);
`).run();

export default db;
