import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "#090922",
          },
          headerTitleStyle: {
            color: "#ffffff",
            fontWeight: "bold",
          },
          headerTintColor: "#f0a7ff", 
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{
            presentation: "modal",
            title: "Exemplo de modal",
          }}
        />
      </Stack>
    </>
  );
}