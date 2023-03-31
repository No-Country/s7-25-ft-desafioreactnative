import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-gesture-handler";
import OnBoarding1 from "../components/OnBoarding1";
import OnBoarding2 from "../components/OnBoarding2";
import OnBoarding3 from "../components/OnBoarding3";
import OnBoarding4 from "../components/OnBoarding4";

export default function OnBoardingNavigation() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding1" component={OnBoarding1} />
      <Stack.Screen name="Onboarding2" component={OnBoarding2} />
      <Stack.Screen name="Onboarding3" component={OnBoarding3} />
      <Stack.Screen name="Onboarding4" component={OnBoarding4} />
    </Stack.Navigator>
  );
}