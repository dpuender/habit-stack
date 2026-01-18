import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Header } from "@/components/ui/header";
import { IconButton } from "@/components/ui/iconbutton";
import { Stack, stacks } from "@/db/schema";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useFocusEffect, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { StyleSheet } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db);
  const [currentStacks, setCurrentStacks] = useState<Stack[]>([]);

  useFocusEffect(() => {
    const fetchStacks = async () => {
      const result = await drizzleDb.select().from(stacks).all();
      setCurrentStacks(result);
    };
    fetchStacks();
  });

  function isStacksEmpty() {
    return currentStacks.length === 0;
  }

  function handleOnPress() {
    router.navigate("/createStack");
  }

  return (
    <ThemedView style={styles.container}>
      <Header />

      {isStacksEmpty() ? (
        <ThemedView style={styles.content_container}>
          <ThemedText type="subtitle">No Habit Stacks yet...</ThemedText>
          <ThemedText type="subtitle">
            Add a Stack and start the process!
          </ThemedText>
        </ThemedView>
      ) : (
        <ThemedView style={styles.content_container}>
          <ThemedText type="subtitle">
            {currentStacks.length} Habit Stacks found.
          </ThemedText>
        </ThemedView>
      )}

      <IconButton icon="plus" onPress={handleOnPress} />
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
    justifyContent: "center",
    padding: 20,
  },
});
