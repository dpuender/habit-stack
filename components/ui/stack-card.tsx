import { Colors } from "@/constants/theme";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { StackType } from "../domain/types";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";
import { IconButton } from "./iconbutton";

interface StackCardProps {
  stack: StackType;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  complete: boolean;
  onPress?: () => void;
}

export function StackCard({
  children,
  stack,
  style,
  complete,
  onPress,
}: StackCardProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <ThemedView style={[styles.card, style]}>
        <View style={styles.info_container}>
          <View>
            <ThemedText type="subtitle">{stack.name}</ThemedText>
            <ThemedText type="defaultSemiBold">{stack.trigger}</ThemedText>
          </View>
          <View style={{ paddingRight: 10 }}>
            <IconButton
              icon={complete ? "check" : "circle"}
              style={{ backgroundColor: "transparent", boxShadow: "none" }}
              onPress={() => {}}
            />
          </View>
        </View>
        {children}
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
    backgroundColor: Colors.base.primary,
    marginTop: 20,
    padding: 10,
  },
  info_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
});
