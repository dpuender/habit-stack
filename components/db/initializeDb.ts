import * as SQLite from "expo-sqlite";

const db = await SQLite.openDatabaseAsync("habitStackDatabase");

await db.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS Stack (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        trigger TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Habit (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        stackId INTEGER NOT NULL,
        FOREIGN KEY (stackId) REFERENCES Stack (id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS Status (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        completed BOOLEAN NOT NULL,
        completedAt TEXT,
        habitId INTEGER NOT NULL,
        FOREIGN KEY (habitId) REFERENCES Habit (id) ON DELETE CASCADE
    );
`);
