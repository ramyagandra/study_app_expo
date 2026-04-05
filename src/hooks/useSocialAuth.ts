//  .ts = TypeScript logic
// .tsx = TypeScript + React UI

import { useSSO } from "@clerk/expo";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useState } from "react";
import { Alert } from "react-native";

const useSocialAuth = () => {
  WebBrowser.maybeCompleteAuthSession();

  const redirectUrl = Linking.createURL("/");
  const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null);
  const { startSSOFlow } = useSSO(); // this hook is from clerk. and SSO stands for single sign out;
  const handleSocialAuth = async (
    strategy: "oauth_google" | "oauth_apple" | "oauth_github",
  ) => {
    if (loadingStrategy) return; //guard against concurrent flows

    setLoadingStrategy(strategy);
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy,
        redirectUrl,
      });
      if (!createdSessionId || !setActive) {
        const provider =
          strategy === "oauth_google"
            ? "Google"
            : strategy === "oauth_apple"
              ? "Apple"
              : "GitHub";
        Alert.alert(
          "Sign-in incomplete",
          `${provider} sign-in did not complete. Please try again`,
        );
        return;
      }
      await setActive({ session: createdSessionId });
      const router = useRouter();
      router.replace("/");
    } catch (error) {
      console.log("Error in social auth:", error);
      const provider =
        strategy === "oauth_apple"
          ? "Apple"
          : strategy === "oauth_google"
            ? "Google"
            : "GitHub";
      Alert.alert(
        "Error",
        `Failed to sign in with ${provider}. Please try again`,
      );
    } finally {
      setLoadingStrategy(null);
    }
  };
  return { handleSocialAuth, loadingStrategy };
};

export default useSocialAuth;
