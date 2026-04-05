import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import * as Sentry from "@sentry/react-native";
import { Stack } from "expo-router";
import { ScrollView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../../global.css";
Sentry.init({
  dsn: "https://8247eba68b52e373d9482e9699ba660b@o4511165814210560.ingest.us.sentry.io/4511165838000129",

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
export default function RootLayout() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <GestureHandlerRootView className="flex-1">
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
          </Stack>
        </GestureHandlerRootView>
      </ClerkProvider>
    </ScrollView>
  );
}
