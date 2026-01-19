import { ThemedView } from "@/components/themed-view";
import { Header } from "@/components/ui/header";
import { IconButton } from "@/components/ui/iconbutton";
import { LabeledTextInput } from "@/components/ui/labeledTextInput";
import { Colors } from "@/constants/theme";
import { addStack } from "@/services/stackService";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { StyleSheet } from "react-native";

export default function CreateStackScreen() {
  const [stackName, setStackName] = useState("");
  const [stackTrigger, setStackTrigger] = useState("");

  const router = useRouter();
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db);

  function isStackDataEmpty() {
    return stackName === "" || stackTrigger === "";
  }

  function handleSave() {
    if (stackName === "" || stackTrigger === "") {
      router.back();
    } else {
      addStack(drizzleDb, {
        name: stackName,
        trigger: stackTrigger,
      }).then(() => {
        router.back();
      });
    }
  }

  return (
    <ThemedView style={styles.container}>
      <Header />
      <ThemedView style={styles.content_container}>
        <LabeledTextInput
          label="Stack Name"
          placeholder="Stack Name"
          value={stackName}
          onChangeText={setStackName}
        />

        <LabeledTextInput
          label="Stack Trigger"
          placeholder="Stack Trigger"
          value={stackTrigger}
          onChangeText={setStackTrigger}
        />

        <IconButton
          style={
            isStackDataEmpty()
              ? { backgroundColor: Colors.base.secondary }
              : { backgroundColor: Colors.base.primary }
          }
          icon={isStackDataEmpty() ? "x" : "save"}
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
