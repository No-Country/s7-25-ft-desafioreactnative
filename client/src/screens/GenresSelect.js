import { View, Text, Dimensions, FlatList, TouchableHighlight, } from 'react-native'
import React, { useState } from 'react'
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';

export default function ForgotPasword() {
    const height = Dimensions.get('window').height;
    const width = Dimensions.get('window').width;

    const [loaded] = useFonts({
        'Roboto-Bold': require('../../assets/fonts/Roboto-Bold.ttf'),
        'Roboto-Medium': require('../../assets/fonts/Roboto-Medium.ttf'),
        'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
      });
      if (!loaded) {
        return null;
    }

    const DATA = [
        {
          
          title: 'Ambiental',
        },
        {
          
          title: 'Pop',
        },
        {
          
          title: 'Jazz',
        },
        {
          
          title: 'Hip-Hop',
        },
        {
          
          title: 'Clasica',
        },
        {
          
          title: 'Electronica',
        },
        {
          
          title: 'Flamenca',
        },
        {
          
          title: 'Orquestal',
        },{
          
          title: 'Tango',
        },{
          
          title: 'Bossa',
        },
        {
          
          title: 'Rkt',
        },
        {
          
          title: 'Eurobeat',
        },
    ];

    const Item = ({title}) => (
        <TouchableHighlight style={{backgroundColor:'#363942',height:height*0.080,width:height*0.19,margin:width*0.05}} className='flex justify-self-center justify-center items-center rounded-xl'>
            <Text className='text-neutralLightGray'>{title}</Text>
        </TouchableHighlight>
      );


  return (
    <View className='flex-1 flex-col items-center bg-brandBlue'>
    <StatusBar style='inverted'/>
    <View>
      <Text style={{fontSize:height*0.025,fontFamily:'Roboto-Bold',marginTop:height*0.13}} className='text-[#FFFFFF]'>Selecciona al menos 3 generos que{'\n'}te gusten</Text>
      <Text style={{fontSize:height*0.017,fontFamily:'Roboto-Regular',lineHeight:height*0.025,marginTop:height*0.03}} className='text-[#FFFFFF]'>Así podremos recomendarte los géneros según tus{'\n'}preferencias, y podrás tener una mejor experiencia.</Text>
    </View>
    <FlatList contentContainerStyle={{alignItems:'center',}} style={{marginTop:height*0.02}} data={DATA} renderItem={({item}) => <Item title={item.title} />} keyExtractor={item => item.title} numColumns={2} />
    <TouchableHighlight style={{width:width*0.70,height:height*0.06,marginBottom:height*0.05,marginTop:height*0.055}} className='bg-brandGreen text-neutralMarineBlue justify-center items-center rounded-full' underlayColor='#b6e154'><Text style={{fontFamily:'Roboto-Bold',fontSize:height*0.020}} className='uppercase'>Continuar</Text></TouchableHighlight>
    </View>
  )
}