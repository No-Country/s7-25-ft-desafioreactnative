import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function HomeScreen() {
  
  const clearOnboarding = async()=>{
    try{
      await AsyncStorage.removeItem('@viewedOnboarding');
    }catch (err){
      console.log('Error @clearOnboarding ', err)
    }
  }

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <TouchableOpacity onPress={clearOnboarding}>
        <Text>Limpiar Onboarding</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'blue',
      justifyContent:'center',
      alignItems:'center'
    }
});