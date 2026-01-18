import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { TextButton } from "@/components/ui/textbutton";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

export default function WelcomeScreen() {
  const router = useRouter();

  function handleOnPress() {
    router.navigate("/home");
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome to</ThemedText>
        <ThemedText type="title">Habit Stack</ThemedText>
      </ThemedView>

      <Image
        source={require("@/assets/images/habit_stack_stairs.svg")}
        style={styles.image}
      />
      <ThemedText type="subtitle">
        Start your journey to a better you! 🙌
      </ThemedText>

      <TextButton text="Let's go!" onPress={handleOnPress} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 20,
  },
  titleContainer: {
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  subtitle: {
    textAlign: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
});
