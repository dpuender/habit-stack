import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Header } from "@/components/ui/header";
import { IconButtonBottom } from "@/components/ui/iconbutton";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  function handleOnPress() {
    router.navigate("/createStack");
  }

  return (
    <ThemedView style={styles.container}>
      <Header />
      <ThemedView style={styles.content_container}>
        <ThemedText type="subtitle">No Habit Stacks yet...</ThemedText>
        <ThemedText type="subtitle">
          Add a Stack and start the process!
        </ThemedText>
        <IconButtonBottom icon="plus" onPress={handleOnPress} />
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
    justifyContent: "center",
    padding: 20,
  },
});
