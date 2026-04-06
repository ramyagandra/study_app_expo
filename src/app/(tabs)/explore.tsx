import { useAppContext } from "@/contexts/AppProvider";
import React from "react";
import { Text, View } from "react-native";

const ExploreScreen = () => {
  const { chanel, thread } = useAppContext();

  return (
    <View>
      <Text>ExploreScreen</Text>
    </View>
  );
};

export default ExploreScreen;
