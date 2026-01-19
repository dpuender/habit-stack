import { ThemedView } from "@/components/themed-view";
import { Header } from "@/components/ui/header";
import { IconButton } from "@/components/ui/iconbutton";
import { LabeledTextInput } from "@/components/ui/labeledTextInput";
import { Colors } from "@/constants/theme";
import { addHabitToStack } from "@/services/habitService";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { StyleSheet } from "react-native";

export default function CreateHabitScreen() {
  const [habitName, setHabitName] = useState("");
  const [habitDescription, setHabitDescription] = useState("");

  const router = useRouter();
  const params = useLocalSearchParams();
  const stackId = Number(params.stackId);
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db);

  function isHabitDataEmpty() {
    return habitName === "" || habitDescription === "";
  }

  function handleSave() {
    if (habitName === "" || habitDescription === "") {
      router.back();
    } else {
      addHabitToStack(
        drizzleDb,
        {
          name: habitName,
          description: habitDescription,
          stackId: stackId,
        },
        stackId,
      ).then(() => {
        router.back();
      });
    }
  }

  return (
    <ThemedView style={styles.container}>
      <Header />
      <ThemedView style={styles.content_container}>
        <LabeledTextInput
          label="Habit Name"
          placeholder="Habit Name"
          value={habitName}
          onChangeText={setHabitName}
        />

        <LabeledTextInput
          label="Habit Description"
          placeholder="Habit Description"
          value={habitDescription}
          onChangeText={setHabitDescription}
        />

        <IconButton
          style={
            isHabitDataEmpty()
              ? { backgroundColor: Colors.base.secondary }
              : { backgroundColor: Colors.base.primary }
          }
          icon={isHabitDataEmpty() ? "x" : "save"}
          onPress={handleSave}
        />
      </ThemedView>
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
    padding: 5,
    width: "100%",
  },

  input_container: {
    width: "100%",
    gap: 10,
  },
});
