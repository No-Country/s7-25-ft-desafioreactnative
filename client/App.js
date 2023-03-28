import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import store from "./redux/store";
import { NativeWindStyleSheet } from "nativewind";

let persistorStore = persistStore(store);

// Habilita Tailwind en React Native Web (para quoen vaya a utilizar la web)
NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistorStore}>
        <View className="flex flex-1 bg-white justify-center	items-center">
          <Text className="text-red-500">
            Open up App.js to start working on your app!
          </Text>
          <StatusBar style="auto" />
        </View>
      </PersistGate>
    </Provider>
  );
}
