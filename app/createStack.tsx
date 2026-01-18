import { ThemedView } from "@/components/themed-view";
import { Header } from "@/components/ui/header";
import { IconButtonBottom } from "@/components/ui/iconbutton";
import { LabeledTextInput } from "@/components/ui/labeledTextInput";
import { useState } from "react";
import { StyleSheet } from "react-native";

export default function CreateStackScreen() {
  const [stackName, setStackName] = useState("");
  const [stackTrigger, setStackTrigger] = useState("");

  function handleSave() {
    // Logic to save the new stack
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

        <IconButtonBottom icon="save" onPress={handleSave} />
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
