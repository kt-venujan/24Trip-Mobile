import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { DemoProvider } from "@/hooks/use-demo";
import { theme } from "@/constants/brand";
export default function RootLayout() {
  return (
    <DemoProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.canvas },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="(tabs)" />
      </Stack>
    </DemoProvider>
  );
}

