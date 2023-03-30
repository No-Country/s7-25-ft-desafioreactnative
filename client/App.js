import { View,StyleSheet } from 'react-native';
import React from 'react';
import OnBoarding from './components/OnBoarding';
import OnBoardingView from './components/OnBoardingView';



export default function App() {

  return (
    <OnBoardingView/>

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
