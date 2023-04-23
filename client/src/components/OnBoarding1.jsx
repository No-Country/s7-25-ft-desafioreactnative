import React from 'react'
import { Image, StyleSheet, Text, TouchableHighlight, SafeAreaView, Dimensions } from 'react-native';
import 'react-native-gesture-handler';
import { styled } from 'nativewind';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';


const TailText = styled(Text);
const TailSafeAreaView = styled(SafeAreaView);
const TailImage = styled(Image);
const TailPressable = styled(TouchableHighlight);

export default function OnBoarding1({}) {
  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;

  const navigation = useNavigation();
    const [loaded] = useFonts({
        'Roboto-Bold': require('../../assets/fonts/Roboto-Bold.ttf'),
        'Roboto-Medium': require('../../assets/fonts/Roboto-Medium.ttf'),
        'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
        'Montserrat-Regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
      });
      if (!loaded) {
        return null;
      }
      
      return (
        <SafeAreaView style={styles.container}>
        <StatusBar style='inverted'/>
          <TailImage style={styles.BlueBg} source={require('../../assets/ImgOnBoarding/OnBoarding1.jpg')} className='w-full h-1/2'></TailImage>
          <TailSafeAreaView style={styles.BlueBg} className='w-full h-1/2 items-center'>
            <TailSafeAreaView className='w-5/6 h-full flex-col justify-center items-center'>
            <TailSafeAreaView className='flex-row gap-2 self-start'>
                <SafeAreaView style={{width:width*0.015,height:width*0.015,backgroundColor:'#CBFB5E'}}></SafeAreaView>
                <SafeAreaView style={{width:width*0.015,height:width*0.015,backgroundColor:'#71737B'}}></SafeAreaView>
                <SafeAreaView style={{width:width*0.015,height:width*0.015,backgroundColor:'#71737B'}}></SafeAreaView>
                <SafeAreaView style={{width:width*0.015,height:width*0.015,backgroundColor:'#71737B'}}></SafeAreaView>
              </TailSafeAreaView>
              <TailText style={ StyleSheet.compose({fontFamily:'Roboto-Regular',marginTop:height*0.05,fontSize:height*0.019,letterSpacing:width*0.001},styles.GreenColor)} className=' self-center'>DESCUBRE LO QUE PODEMOS OFRECERTE</TailText>
              <TailText style={{ fontFamily: 'Roboto-Medium',marginTop:height*0.1,fontSize:height*0.025}} className='text-neutralLightGray leading-tight self-center text-center'>¿Te gustaría comprar o vender{'\n'}tus creaciones musicales?</TailText>
              <TailPressable style={StyleSheet.compose({marginTop:height*0.14,height:height*0.06},styles.GreenBg)} underlayColor='#b6e154' onPress={()=>{navigation.navigate('Onboarding2')}} className='justify-center items-center w-full bg-neutral-300 rounded-full '>
                <TailText style={{ fontFamily: 'Roboto-Bold',fontSize:height*0.020}} className=' uppercase text-slate-900'>Continuar</TailText>
              </TailPressable>
            </TailSafeAreaView>
          </TailSafeAreaView>
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
