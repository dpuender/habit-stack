import { Colors } from "@/constants/theme";
import Feather from "@expo/vector-icons/Feather";
import { PlatformPressable } from "@react-navigation/elements";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

export function Header() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.logo_container}>
        <Image
          style={styles.icon}
          source={require("@/assets/images/habit_stack_stairs.svg")}
        />
        <ThemedText type="defaultSemiBold" style={{ fontSize: 20 }}>
          Habit Stack
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.options}>
        <PlatformPressable style={styles.button}>
          <Feather name="settings" size={20} color="white" />
        </PlatformPressable>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 50,
  },
  logo_container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    left: 0,
    position: "absolute",
  },
  icon: {
    width: 40,
    height: 40,
  },
  options: {
    right: 0,
    position: "absolute",
  },
  button: {
    backgroundColor: Colors.base.primary,
    borderRadius: 200,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
});
