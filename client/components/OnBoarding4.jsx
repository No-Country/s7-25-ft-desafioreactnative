import React from 'react'
import {ImageBackground, StyleSheet, Text, TouchableHighlight, SafeAreaView, Dimensions } from 'react-native';
import { styled } from 'nativewind';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TailText = styled(Text);
const TailSafeAreaView = styled(SafeAreaView);
const TailImage = styled(ImageBackground);
const TailPressable = styled(TouchableHighlight);

export default function OnBoarding4({}) {

  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;

    const [loaded] = useFonts({
        'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
        'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
      });
      if (!loaded) {
        return null;
      }
      const storeData = async () => {
        try {
          await AsyncStorage.setItem('@SafeAreaViewedOnboarding', 'true')
        }
        catch(err){
          console.log('Error @setitem: ',err);
        }
      }

      return (
        <SafeAreaView style={styles.container}>
          <TailImage style={{backgroundColor:'#22242A'}} source={require('../assets/ImgOnBoarding/OnBoarding4.png')} className='w-full h-full justify-end items-center'>
            <TailSafeAreaView className='w-3/4 h-2/4 flex-col justify-center items-center'>
              <TailText style={{ fontFamily: 'Roboto-Bold', fontSize:height*0.035 }} className=' text-neutral-100 antialiased text-center'>VENDÉ</TailText>
              <TailText style={{ fontFamily: 'Montserrat-Bold',fontSize:height*0.018,marginTop:height*0.04,marginBottom:height*0.06,lineHeight:height*0.028 }} className='text-neutral-100 text-center'>OFRECÉ TUS TRABAJO A CLIENTES{'\n'}QUE LO NECESITAN</TailText>
              <TailSafeAreaView className='flex-row gap-2'>
                <SafeAreaView style={{width:width*0.015,height:width*0.015,backgroundColor:'#CBFB5E'}}></SafeAreaView>
                <SafeAreaView style={{width:width*0.015,height:width*0.015,backgroundColor:'#CBFB5E'}}></SafeAreaView>
                <SafeAreaView style={{width:width*0.015,height:width*0.015,backgroundColor:'#CBFB5E'}}></SafeAreaView>
                <SafeAreaView style={{width:width*0.015,height:width*0.015,backgroundColor:'#CBFB5E'}}></SafeAreaView>
              </TailSafeAreaView>
              <TailPressable style={StyleSheet.compose(styles.GreenBg,{marginTop:height*0.174,height:height*0.06})} underlayColor='#b6e154' onPress={storeData} className='justify-center items-center w-full bg-neutral-300 rounded-full'>
                <TailText style={{ fontFamily: 'Roboto-Bold',fontSize:height*0.020}} className=' uppercase text-slate-900'>ÚNETE</TailText>
              </TailPressable>
            </TailSafeAreaView>
        </TailImage>
        </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  GreenBg:{
    backgroundColor:'#CBFB5E',
  },
  GreenColor:{
    color:'#CBFB5E',
  },
  BlueBg:{
    backgroundColor:'#0E0B1F',
  }
});
