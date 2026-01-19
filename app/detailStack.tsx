import { StackType, StatusType } from "@/components/domain/types";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { HabitCard } from "@/components/ui/habit-card";
import { Header } from "@/components/ui/header";
import { IconButton } from "@/components/ui/iconbutton";
import { StackCard } from "@/components/ui/stack-card";
import { addStatusToHabit } from "@/services/habitService";
import { fetchStackByIdWithHabits } from "@/services/stackService";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { StyleSheet } from "react-native";

export default function StackDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const stackId = Number(params.stackId);
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db);
  const [stack, setStack] = useState<StackType | null>(null);

  useFocusEffect(() => {
    const fetchData = async () => {
      const fetchedStack = await fetchStackByIdWithHabits(drizzleDb, stackId);
      if (!fetchedStack) {
        router.back();
      } else {
        setStack(fetchedStack);
      }
    };

    fetchData();
  });

  function handleNewHabit() {
    router.push({
      pathname: "/createHabit",
      params: { stackId: stackId },
    });
  }

  function isHabitCompleted(habitId: number): boolean {
    if (!stack) return false;
    const habit = stack.habits.find((h) => h.id === habitId);
    if (!habit) return false;
    const latestStatus = habit.status[habit.status.length - 1];
    return latestStatus ? latestStatus.completed : false;
  }

  function handleCompleteHabit(habitId: number) {
    const status: StatusType = {
      completedAt: new Date().toISOString(),
      completed: !isHabitCompleted(habitId), // Toggle the completed status
    };

    // Update the database
    addStatusToHabit(drizzleDb, habitId, status).then(() => {
      // Update the local state to reflect the change
      setStack((prevStack) => {
        if (!prevStack) return prevStack;

        // Create a new stack object with updated habits
        const updatedHabits = prevStack.habits.map((habit) => {
          if (habit.id === habitId) {
            // Add the new status to the habit's status array
            const updatedStatus = [...habit.status, status];
            return { ...habit, status: updatedStatus };
          }
          return habit;
        });

        return { ...prevStack, habits: updatedHabits };
      });
    });
  }

  if (!stack) {
    return (
      <ThemedView style={styles.container}>
        <Header />
        <ThemedView style={styles.content_container}>
          <ThemedText type="subtitle">Loading...</ThemedText>
        </ThemedView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <Header />
      <StackCard stack={stack} style={styles.card}>
        {stack.habits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            completed={isHabitCompleted(habit.id)}
            onPress={() => handleCompleteHabit(habit.id)}
          />
        ))}
      </StackCard>
      <IconButton style={styles.button} icon="plus" onPress={handleNewHabit} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
  card: {
    width: "105%",
  },

  content_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  button: {
    position: "absolute",
    bottom: 30,
  },
});
