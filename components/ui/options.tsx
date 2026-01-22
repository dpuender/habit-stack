import { PlatformPressable } from "@react-navigation/elements";
import { useState } from "react";
import { StyleSheet, Switch, View } from "react-native";
import { ThemedText } from "../themed-text";

export function Options() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <View>
      <PlatformPressable style={styles.labeled_switch} onPress={toggleSwitch}>
        <ThemedText>Options 1</ThemedText>
        <View pointerEvents="none">
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </PlatformPressable>
    </View>
  );
}

const styles = StyleSheet.create({
  labeled_switch: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  switch: {
    zIndex: 10,
  },
});
