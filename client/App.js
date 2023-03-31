import { View, StyleSheet } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import store from "./src/redux/store";
import { NativeWindStyleSheet } from "nativewind";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigation from "./src/navigation/StackNavigation";

let persistorStore = persistStore(store);

// Habilita Tailwind en React Native Web (para quien vaya a utilizar la web)
NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistorStore}>
        <View className="flex-1 ">
          <StatusBar style="auto" />
          <NavigationContainer>
            <StackNavigation />
          </NavigationContainer>
        </View>
      </PersistGate>
    </Provider>
  );
}
