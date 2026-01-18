import { Colors } from "@/constants/theme";
import { PlatformPressable } from "@react-navigation/elements";
import { StyleSheet } from "react-native";
import { ThemedText } from "../themed-text";

interface TextButtonProps {
  text: string;
  onPress: () => void;
}

export function TextButton(props: TextButtonProps) {
  return (
    <PlatformPressable style={styles.button} onPress={props.onPress}>
      <ThemedText style={styles.text}>{props.text}</ThemedText>
    </PlatformPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.base.primary,
    borderRadius: 200,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
