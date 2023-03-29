import React from 'react'
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { styled } from 'nativewind';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';


const TailText = styled(Text);
const TailView = styled(View);
const TailImage = styled(ImageBackground);
const TailPressable = styled(Pressable);

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
          <TailImage source={require('../assets/ImgOnBoarding/OnBoarding3.png')} className='w-full h-full bg-black flex-col justify-end'>
          <TailView className='w-full h-1/2 items-center'>
            <TailView className='w-3/4 h-full flex-col justify-center items-center'>
              <TailText style={ StyleSheet.compose({fontFamily: 'Montserrat-Regular'},styles.GreenColor)} className='self-start mt-16 mb-3'>LOREM</TailText>
              <TailText style={{ fontFamily: 'Roboto-Bold', lineHeight: 45 }} className='text-4xl text-neutral-100 self-start antialiased'>WELCOME TO{'\n'}SOUNDSCALE APP</TailText>
              <TailText style={{ fontFamily: 'Montserrat-Regular' }} className='text-neutral-200 mt-4 leading-tight text-lg self-start'>Make your design workflow easier and{'\n'}save your time.</TailText>
              <TailPressable style={styles.GreenBg} onPress={()=>{navigation.navigate('Onboarding4')}} className='justify-center items-center py-5 w-full bg-neutral-300 rounded-full mt-44'>
                <TailText style={{ fontFamily: 'Roboto-Bold'}} className='text-xl uppercase text-slate-900'>Continuar</TailText>
              </TailPressable>
            </TailView>
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
