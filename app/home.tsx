import { StackType } from "@/components/domain/types";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Header } from "@/components/ui/header";
import { IconButton } from "@/components/ui/iconbutton";
import { StackCard } from "@/components/ui/stack-card";
import { fetchAllStacksWithHabits } from "@/services/stackService";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useFocusEffect, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { StyleSheet } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db);
  const [currentStacks, setCurrentStacks] = useState<StackType[]>([]);

  useFocusEffect(() => {
    fetchAllStacksWithHabits(drizzleDb).then((stacks) => {
      setCurrentStacks(stacks);
    });
  });

  function isStacksEmpty() {
    return currentStacks.length === 0;
  }

  function handleNewStack() {
    router.navigate("/createStack");
  }

  function handleStackPress(stackId: number) {
    router.push({
      pathname: "/detailStack",
      params: { stackId: stackId },
    });
  }

  return (
    <ThemedView style={styles.container}>
      <Header />

      {isStacksEmpty() ? (
        <ThemedView
          style={[
            styles.content_container,
            isStacksEmpty()
              ? { justifyContent: "center" }
              : { justifyContent: "flex-start" },
          ]}
        >
          <ThemedText type="subtitle">No Habit Stacks yet...</ThemedText>
          <ThemedText type="subtitle">
            Add a Stack and start the process!
          </ThemedText>
        </ThemedView>
      ) : (
        <ThemedView style={styles.content_container}>
          {currentStacks.map((stack) => (
            <StackCard
              key={stack.id}
              stack={stack}
              style={styles.stack_card}
              complete={
                stack.status.length === 0
                  ? false
                  : stack.status[stack.status.length - 1].completed
              }
              onPress={() => handleStackPress(stack.id)}
            />
          ))}
        </ThemedView>
      )}

      <IconButton style={styles.button} icon="plus" onPress={handleNewStack} />
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
  content_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
  stack_card: {
    width: "115%",
  },
  button: {
    position: "absolute",
    bottom: 30,
  },
});
