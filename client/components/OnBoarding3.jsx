import React from 'react'
import { ImageBackground, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import 'react-native-gesture-handler';
import { styled } from 'nativewind';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';


const TailText = styled(Text);
const TailView = styled(View);
const TailImage = styled(ImageBackground);
const TailPressable = styled(TouchableHighlight);

export default function OnBoarding3({}) {

  const navigation = useNavigation();
    const [loaded] = useFonts({
        'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
        'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
      });
      if (!loaded) {
        return null;
      }
      return (
        <View style={styles.container}>
        <TailImage style={{backgroundColor:'#22242A'}} source={require('../assets/ImgOnBoarding/OnBoarding3.png')} className='w-full h-full justify-end items-center'>
          <TailView className='w-3/4 h-2/4 flex-col justify-center items-center'>
            <TailText style={{ fontFamily: 'Roboto-Bold', lineHeight: 45 }} className='text-4xl  text-neutral-100 antialiased text-center'>COMPRÁ</TailText>
            <TailText style={{ fontFamily: 'Montserrat-Bold' }} className='text-neutral-100 mt-4 mb-20 leading-tight text-lg text-center'>ENCUENTRA LICENCIAS MUSICALES{'\n'}PARA TODOS TUS PROYECTOS</TailText>
            <TailView className='flex-row gap-2'>
              <View style={{width:7,height:7,backgroundColor:'#CBFB5E'}}></View>
              <View style={{width:7,height:7,backgroundColor:'#CBFB5E'}}></View>
              <View style={{width:7,height:7,backgroundColor:'#CBFB5E'}}></View>
              <View style={{width:7,height:7,backgroundColor:'#71737B'}}></View>
            </TailView>
            <TailPressable style={StyleSheet.compose(styles.GreenBg,{marginTop:'52.5%'})} underlayColor='#b6e154' onPress={()=>navigation.navigate('Onboarding4')} className='justify-center items-center py-5 w-full bg-neutral-300 rounded-full'>
              <TailText style={{ fontFamily: 'Roboto-Bold'}} className='text-xl uppercase text-slate-900'>Continuar</TailText>
            </TailPressable>
          </TailView>
      </TailImage>
      </View>
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
