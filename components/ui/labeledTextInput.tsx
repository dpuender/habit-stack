import { Colors } from "@/constants/theme";
import { StyleSheet, TextInput } from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

interface LabeledTextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function LabeledTextInput(props: LabeledTextInputProps) {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="default">{props.label}</ThemedText>
      <TextInput
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.onChangeText}
        style={styles.input}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 20,
    width: "100%",
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "500",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: Colors.base.primaryShade2,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    width: "100%",
  },
});
