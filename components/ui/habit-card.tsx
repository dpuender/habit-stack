import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { HabitType } from "../domain/types";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";
import { IconButton } from "./iconbutton";

interface HabitCardProps {
  habit: HabitType;
  style?: StyleProp<ViewStyle>;
  completed?: boolean;
  onPress?: () => void;
}

export function HabitCard({
  habit,
  completed,
  style,
  onPress,
}: HabitCardProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <ThemedView style={[styles.card, style]}>
        <View style={styles.info_container}>
          <View>
            <ThemedText type="subtitle">{habit.name}</ThemedText>
            <ThemedText type="defaultSemiBold">{habit.description}</ThemedText>
          </View>
          <View>
            <IconButton
              icon={completed ? "check" : "circle"}
              style={{ backgroundColor: "transparent", boxShadow: "none" }}
              onPress={() => {}}
            />
          </View>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#A6C9FC",
    marginTop: 10,
    padding: 10,
  },
  habit_card: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#86b5fcff",
    marginTop: 10,
    padding: 10,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  info_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
});
