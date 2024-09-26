import { Stack } from "expo-router";
import { SessionProvider } from "../contexts/AuthContext";

export default function Root() {
  return (
    <SessionProvider>
      <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="sign-in" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
        </Stack>
    </SessionProvider>
  );
}
