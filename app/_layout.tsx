import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import migrations from "@/drizzle/migrations";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { SQLiteProvider, openDatabaseSync } from "expo-sqlite";
import { Suspense } from "react";
import { ActivityIndicator } from "react-native";

export const unstable_settings = {
  anchor: "(tabs)",
};

export const DATABASE_NAME = "habitstackdb";

export default function RootLayout() {
  const expoDb = openDatabaseSync(DATABASE_NAME, {
    enableChangeListener: true,
  });
  const db = drizzle(expoDb);
  const { success, error } = useMigrations(db, migrations);

  const colorScheme = useColorScheme();

  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <SQLiteProvider
        databaseName={DATABASE_NAME}
        options={{ enableChangeListener: true }}
        useSuspense
      >
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="welcome" options={{ headerShown: false }} />
            <Stack.Screen name="home" options={{ headerShown: false }} />
            <Stack.Screen
              name="createStack"
              options={{ headerShown: false, presentation: "modal" }}
            />
            <Stack.Screen
              name="createHabit"
              options={{ headerShown: false, presentation: "modal" }}
            />
            <Stack.Screen
              name="detailStack"
              options={{ headerShown: false, presentation: "modal" }}
            />
            <Stack.Screen
              name="detailHabit"
              options={{ headerShown: false, presentation: "modal" }}
            />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </SQLiteProvider>
    </Suspense>
  );
}
