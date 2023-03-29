import React from 'react'
import {ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { styled } from 'nativewind';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';

const TailText = styled(Text);
const TailView = styled(View);
const TailImage = styled(ImageBackground);
const TailPressable = styled(Pressable);

export default function OnBoarding4({}) {

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
          <TailImage style={{backgroundColor:'#22242A'}} source={require('../assets/ImgOnBoarding/OnBoarding4.png')} className='w-full h-full items-center '>
            <TailView className='w-3/4 h-full flex-col justify-center items-center'>
              <TailText style={{ fontFamily: 'Roboto-Bold', lineHeight: 45 }} className='text-4xl text-neutral-100 antialiased text-center mt-96 mb-96'>SOUNDSCALE</TailText>
              <TailPressable style={styles.GreenBg} className='justify-center items-center py-5 w-full mt-48 bg-neutral-300 rounded-full'>
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
