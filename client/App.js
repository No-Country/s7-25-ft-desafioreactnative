import { View } from "react-native";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import store from "./src/redux/store";
import { NativeWindStyleSheet } from "nativewind";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigation from "./src/navigation/StackNavigation";
import GenresSelect from "./src/screens/GenresSelect";
import axios from "axios";
import MainNavigation from "./src/navigation/MainNavigation";
import { StatusBar } from "expo-status-bar";
import { init } from "./src/helpers/audioControllers";
import Constants from "expo-constants";
import { StripeProvider } from "@stripe/stripe-react-native";

let persistorStore = persistStore(store);

// Habilita Tailwind en React Native Web (para quien vaya a utilizar la web)
NativeWindStyleSheet.setOutput({
  default: "native",
});

// url base a partir de la cual axios va a realizar las llamadas al back
axios.defaults.baseURL = Constants.expoConfig.extra.api;
const STRIPE_KEY = Constants.expoConfig.extra.STRIPE_KEY;

export default function App() {
  useEffect(() => {
    init();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistorStore}>
        <StripeProvider publishableKey={STRIPE_KEY} urlScheme="soundScale">
          <StatusBar style="light" />
          <View className="flex-1 bg-white">
            <NavigationContainer>
              <MainNavigation />
            </NavigationContainer>
          </View>
        </StripeProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
