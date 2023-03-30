import { Text,View,StyleSheet } from 'react-native';
import React from 'react';
import OnBoarding from './components/OnBoarding';
import OnBoardingView from './components/OnBoardingView';


import { StatusBar } from "expo-status-bar";
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
        <View className="flex-1 bg-white">
          <OnBoardingView/>
          <StatusBar style="auto" />
        </View>
      </PersistGate>
    </Provider>
    

  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'blue',
  }
})
  
