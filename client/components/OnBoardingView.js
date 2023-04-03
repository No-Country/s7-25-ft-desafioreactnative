import { ActivityIndicator,StyleSheet, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './HomeScreenPrueba';
import OnBoarding from './OnBoarding';


export default function OnBoardingView() {

    const [loading, setLoading] = useState(true);
    const [viewedOnboarding, setViewedOnboarding] = useState(false);

    const Loading = () =>{
        return(
            <SafeAreaView>
                <ActivityIndicator size={'large'} color={'blue'} animating={true}/>
            </SafeAreaView>
        );
    }

    const checkOnboarding = async()=>{
        try{
          const value = await AsyncStorage.getItem('@viewedOnboarding');
          if(value!== null){
            setViewedOnboarding(true);
          }
        }catch(err){
          console.log('Error @checkOnboarding: ',err);
        }finally{
          setLoading(false);
        }
      };
      useEffect(()=>{
        checkOnboarding();
      },[]);

  return (
    <SafeAreaView style={styles.container}>
    {loading?<Loading/>:viewedOnboarding ? <HomeScreen/>:<OnBoarding/>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container:{
      flex:1,
    }
  })