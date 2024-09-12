import { Stack } from "expo-router";
import { SessionProvider } from "../contexts/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Root() {
  return (
    <SessionProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      </Stack>
    </SessionProvider>
  );
}
