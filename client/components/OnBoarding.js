import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import OnBoarding1 from './OnBoarding1';
import OnBoarding2 from './OnBoarding2';
import OnBoarding3 from './OnBoarding3';
import OnBoarding4 from './OnBoarding4';
import { View } from 'react-native';



export default function OnBoarding() {
    const Stack = createNativeStackNavigator();
    return (
      
      <NavigationContainer>
      <Stack.Navigator initialRouteName='Onboarding1' screenOptions={{headerShown:false,}}>
        <Stack.Screen name='Onboarding1' component={OnBoarding1}/>
        <Stack.Screen name='Onboarding2' component={OnBoarding2}/>
        <Stack.Screen name='Onboarding3' component={OnBoarding3}/>
        <Stack.Screen name='Onboarding4' component={OnBoarding4}/>
      </Stack.Navigator>
      </NavigationContainer>
      
    );
}
