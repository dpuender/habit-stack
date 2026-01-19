import { StatusType } from "@/components/domain/types";
import { Habit, habits, habitStatus, NewHabit } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function fetchHabitsByStackId(
  db: any,
  stackId: number,
): Promise<Habit[]> {
  const result = await db
    .select()
    .from(habits)
    .where(eq(habits.stackId, stackId))
    .all();
  return result;
}

export async function addHabitToStack(
  db: any,
  habit: NewHabit,
  stackId: number,
): Promise<void> {
  await db
    .insert(habits)
    .values({ ...habit, stackId })
    .run();
}

export async function deleteHabitById(db: any, habitId: number): Promise<void> {
  await db.delete(habits).where(eq(habits.id, habitId)).run();
}

export async function addStatusToHabit(
  db: any,
  habitId: number,
  status: StatusType,
): Promise<void> {
  console.log("Adding status to habit:", { habitId, status });

  await db
    .insert(habitStatus)
    .values({
      habitId,
      completed: status.completed,
      completedAt: status.completedAt,
    })
    .run();
}
