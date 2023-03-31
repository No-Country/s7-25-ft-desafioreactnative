import React from 'react'
import { Image, StyleSheet, Text, TouchableHighlight, SafeAreaView } from 'react-native';
import 'react-native-gesture-handler';
import { styled } from 'nativewind';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';


const TailText = styled(Text);
const TailSafeAreaView = styled(SafeAreaView);
const TailImage = styled(Image);
const TailPressable = styled(TouchableHighlight);

export default function OnBoarding1({}) {

  const navigation = useNavigation();
    const [loaded] = useFonts({
        'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
        'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
        'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
        'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
      });
      if (!loaded) {
        return null;
      }
      return (
        <SafeAreaView style={styles.container}>
          <TailImage style={styles.BlueBg} source={require('../assets/ImgOnBoarding/OnBoarding1.jpg')} className='w-full h-1/2'></TailImage>
          <TailSafeAreaView style={styles.BlueBg} className='w-full h-1/2 items-center'>
            <TailSafeAreaView className='w-5/6 h-full flex-col justify-center items-center'>
            <TailSafeAreaView className='flex-row gap-2 self-start ml-6'>
                <SafeAreaView style={{width:7,height:7,backgroundColor:'#CBFB5E'}}></SafeAreaView>
                <SafeAreaView style={{width:7,height:7,backgroundColor:'#71737B'}}></SafeAreaView>
                <SafeAreaView style={{width:7,height:7,backgroundColor:'#71737B'}}></SafeAreaView>
                <SafeAreaView style={{width:7,height:7,backgroundColor:'#71737B'}}></SafeAreaView>
              </TailSafeAreaView>
              <TailText style={ StyleSheet.compose({fontFamily: 'Roboto-Regular'},styles.GreenColor)} className='self-center text-xl mt-16 mb-24 tracking-wide'>DESCUBRE LO QUE PODEMOS OFRECERTE</TailText>
              <TailText style={{ fontFamily: 'Roboto-Medium' }} className='text-neutral-200 mt-6 leading-tight text-2xl self-center text-center'>¿Te gustaría comprar o vender{'\n'}tus creaciones musicales?</TailText>
              <TailPressable style={styles.GreenBg} underlayColor='#b6e154' onPress={()=>{navigation.navigate('Onboarding2')}} className='justify-center items-center py-5 w-full bg-neutral-300 rounded-full mt-36 mb-1'>
                <TailText style={{ fontFamily: 'Roboto-Bold'}} className='text-xl uppercase text-slate-900'>Continuar</TailText>
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
