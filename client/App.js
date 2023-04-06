import { View } from "react-native";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import store from "./src/redux/store";
import { NativeWindStyleSheet } from "nativewind";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigation from "./src/navigation/StackNavigation";
import axios from "axios";
import { api } from "@env";

let persistorStore = persistStore(store);

// Habilita Tailwind en React Native Web (para quien vaya a utilizar la web)
NativeWindStyleSheet.setOutput({
  default: "native",
});

// url base a partir de la cual axios va a realizar las llamadas al back
axios.defaults.baseURL = api;

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistorStore}>
        <View className="flex-1 bg-white">
          <NavigationContainer>
            <StackNavigation />
          </NavigationContainer>
        </View>
      </PersistGate>
    </Provider>
  );
}
