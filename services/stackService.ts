import { StackType } from "@/components/domain/types";
import { eq } from "drizzle-orm";
import {
  habits,
  habitStatus,
  NewStack,
  Stack,
  stacks,
  stackStatus,
} from "../db/schema";

export async function fetchAllStacksWithHabits(db: any): Promise<StackType[]> {
  const result = await db
    .select({
      stackId: stacks.id,
      stackName: stacks.name,
      stackTrigger: stacks.trigger,
      habitId: habits.id,
      habitName: habits.name,
      habitDescription: habits.description,
      stackStatusCompleted: stackStatus.completed,
      stackStatusCompletedAt: stackStatus.completedAt,
    })
    .from(stacks)
    .leftJoin(habits, eq(stacks.id, habits.stackId))
    .leftJoin(stackStatus, eq(stacks.id, stackStatus.stackId))
    .all();

  // Group habits by stack
  const groupedStacks = result.reduce((acc: StackType[], row: any) => {
    let stack = acc.find((s) => s.id === row.stackId);

    if (!stack) {
      stack = {
        id: row.stackId,
        name: row.stackName,
        trigger: row.stackTrigger,
        habits: [],
        status: [],
      };
      acc.push(stack);
    }

    if (row.habitId) {
      const habitExists = stack.habits.find((h) => h.id === row.habitId);
      if (!habitExists) {
        stack.habits.push({
          id: row.habitId,
          name: row.habitName,
          description: row.habitDescription,
          status: [],
        });
      }
    }

    if (row.stackStatusCompletedAt) {
      const statusExists = stack.status.find(
        (s) => s.completedAt === row.stackStatusCompletedAt,
      );
      if (!statusExists) {
        stack.status.push({
          completed: !!row.stackStatusCompleted,
          completedAt: row.stackStatusCompletedAt,
        });
        stack.status.sort(
          (a, b) =>
            new Date(a.completedAt!).getTime() -
            new Date(b.completedAt!).getTime(),
        );
      }
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

  const filteredRows = result.filter((row: any) => row.stackId === stackId);
  if (filteredRows.length === 0) {
    return null;
  }

  const stack: StackType = {
    id: filteredRows[0].stackId,
    name: filteredRows[0].stackName,
    trigger: filteredRows[0].stackTrigger,
    habits: [],
    status: [],
  };

  filteredRows.forEach((row: any) => {
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

  stack.habits.forEach((habit) => {
    habit.status.sort(
      (a, b) =>
        new Date(a.completedAt!).getTime() - new Date(b.completedAt!).getTime(),
    );
  });

  return stack;
}

export async function setStackCompleted(
  db: any,
  stackId: number,
  completed: boolean,
): Promise<void> {
  const now = new Date().toISOString();
  await db
    .insert(stackStatus)
    .values({ stackId, completed, completedAt: now })
    .run();
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
