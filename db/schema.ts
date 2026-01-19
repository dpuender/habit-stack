import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const stacks = sqliteTable("stacks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  trigger: text("trigger"),
});

export const habits = sqliteTable("habits", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  stackId: integer("stack_id")
    .notNull()
    .references(() => stacks.id),
  name: text("name").notNull(),
  description: text("description"),
});

export const habitStatus = sqliteTable("habit_status", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  habitId: integer("habit_id")
    .notNull()
    .references(() => habits.id),
  completed: integer("status").notNull(),
  completedAt: text("date").notNull(),
});

export type Stack = typeof stacks.$inferSelect;
export type Habit = typeof habits.$inferSelect;
export type HabitStatus = typeof habitStatus.$inferSelect;

export type NewStack = typeof stacks.$inferInsert;
export type NewHabit = typeof habits.$inferInsert;
export type NewHabitStatus = typeof habitStatus.$inferInsert;
