import { Colors } from "@/constants/theme";
import Feather from "@expo/vector-icons/Feather";
import { PlatformPressable } from "@react-navigation/elements";
import { Image } from "expo-image";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";
import { Options } from "./options";

export function Header() {
  const [showOptions, setShowOptions] = useState(false);

  function handleOnPressOptions() {
    setShowOptions((prev) => !prev);
  }

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
        <PlatformPressable style={styles.button} onPress={handleOnPressOptions}>
          <Feather name="settings" size={20} color="white" />
        </PlatformPressable>
        {showOptions && (
          <ThemedView style={styles.modal}>
            <Options />
          </ThemedView>
        )}
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
    zIndex: 100,
  },
  modal: {
    width: 200,
    right: 10,
    top: 50,
    position: "absolute",
    backgroundColor: Colors.base.primary,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    zIndex: 1000,
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
