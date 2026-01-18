import { Colors } from "@/constants/theme";
import Feather from "@expo/vector-icons/Feather";
import { PlatformPressable } from "@react-navigation/elements";
import { StyleSheet, ViewProps } from "react-native";

type IconName =
  | "settings"
  | "plus"
  | "arrow-left"
  | "x"
  | "trash-2"
  | "edit"
  | "save"
  | "check"
  | "chevron-right";

export type IconButtonProps = ViewProps & {
  icon: IconName;
  onPress: () => void;
};

export function IconButtonBottom(props: IconButtonProps) {
  return (
    <PlatformPressable style={styles.button} onPress={props.onPress}>
      <Feather name={props.icon} size={24} color="white" />
    </PlatformPressable>
  );
}

// TODO: Button should move up if the keyboard is open
const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.base.primary,
    borderRadius: 200,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
});
