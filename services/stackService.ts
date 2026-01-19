import { HabitType, StackType } from "@/components/domain/types";
import { eq } from "drizzle-orm";
import { habits, habitStatus, NewStack, Stack, stacks } from "../db/schema";

export async function fetchAllStacksWithHabits(db: any): Promise<StackType[]> {
  const result = await db
    .select({
      stackId: stacks.id,
      stackName: stacks.name,
      stackTrigger: stacks.trigger,
      habitId: habits.id,
      habitName: habits.name,
      habitDescription: habits.description,
    })
    .from(stacks)
    .leftJoin(habits, eq(stacks.id, habits.stackId))
    .all();

  // Group habits by stack
  const groupedStacks = result.reduce((acc: StackType[], row) => {
    const stack = acc.find((s) => s.id === row.stackId);
    const habit: HabitType | null = row.habitId
      ? {
          id: row.habitId,
          name: row.habitName,
          description: row.habitDescription,
          status: [],
        }
      : null;

    if (stack) {
      if (habit) stack.habits.push(habit);
    } else {
      acc.push({
        id: row.stackId,
        name: row.stackName,
        trigger: row.stackTrigger,
        habits: habit ? [habit] : [],
      });
    }

    return acc;
  }, []);

  return groupedStacks;
}

export async function fetchStackByIdWithHabits(
  db: any,
  stackId: number,
): Promise<StackType | null> {
  const result = await db
    .select({
      stackId: stacks.id,
      stackName: stacks.name,
      stackTrigger: stacks.trigger,
      habitId: habits.id,
      habitName: habits.name,
      habitDescription: habits.description,
      statusCompleted: habitStatus.completed,
      statusCompletedAt: habitStatus.completedAt,
    })
    .from(stacks)
    .where(eq(stacks.id, stackId))
    .leftJoin(habits, eq(stacks.id, habits.stackId))
    .leftJoin(habitStatus, eq(habits.id, habitStatus.habitId))
    .all();

  const filteredRows = result.filter((row) => row.stackId === stackId);
  if (filteredRows.length === 0) {
    return null;
  }

  const stack: StackType = {
    id: filteredRows[0].stackId,
    name: filteredRows[0].stackName,
    trigger: filteredRows[0].stackTrigger,
    habits: [],
  };

  filteredRows.forEach((row) => {
    if (row.habitId) {
      let habit = stack.habits.find((h) => h.id === row.habitId);
      const status = row.statusCompletedAt
        ? {
            completed: !!row.statusCompleted,
            completedAt: row.statusCompletedAt,
          }
        : null;

      if (habit) {
        if (status) habit.status.push(status);
      } else {
        stack.habits.push({
          id: row.habitId,
          name: row.habitName,
          description: row.habitDescription,
          status: status ? [status] : [],
        });
      }
    }
  });

  return stack;
}

export async function addStack(db: any, stack: NewStack): Promise<void> {
  await db.insert(stacks).values(stack).run();
}

export async function updateStack(db: any, stack: Stack): Promise<void> {
  await db.update(stacks).set(stack).where(eq(stacks.id, stack.id)).run();
}

export async function deleteStack(db: any, stackId: number): Promise<void> {
  await db.delete(stacks).where(eq(stacks.id, stackId)).run();
}
