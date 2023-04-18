import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import React, { useState } from 'react';
import {View, StyleSheet, SafeAreaView, Image, Text, Dimensions, ScrollView, ImageBackground, TouchableOpacity, TextInput, FlatList} from 'react-native';
import { ArrowBackIcon, ArrowDownIcon, SearchIcon } from '../components/Icons';
import OptionsModal from '../components/OptionsModal';
import songs from '../database/songs';
import MusicCard from '../components/MusicCard';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const Search = () => {

    const navigation = useNavigation();
    const [moreOptionsModal, setMoreOptionsModal] = useState(false);
    
    const [loaded] = useFonts({
        'Roboto-Bold': require('../../assets/fonts/Roboto-Bold.ttf'),
        'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
        'Montserrat-Regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
      });
      if (!loaded) {
        return null;
      };

    return (
        <>
        <SafeAreaView className='flex-1 bg-brandBlue'>
             <View style={styles.header} className='flex-row items-center justify-center'>
             <View style={{gap:Width*0.035,marginLeft:Width*0.05}} className='flex-row items-center'>
                <TouchableOpacity onPress={()=>{navigation.navigate('Home')}}>
                    <ArrowBackIcon color={'white'} size={Height*0.020}/>
                </TouchableOpacity>
                <View style={{borderRadius:Height*0.009,marginRight:Width*0.06}} className='flex-row items-center bg-[#292D39] border-[#363942] border'> 
                    <View style={{marginLeft:Width*0.04}}>
                    <SearchIcon size={Width*0.055}/>
                    </View>
                    <TextInput multiline={false} placeholder='¿Qué estás buscando?' placeholderTextColor={'#71737B'} selectionColor={'#CBFB5E'} style={styles.Input}></TextInput>
                </View>
             </View>
             </View>
             <View style={{height:Height*0.10}} className='flex-row items-center'>
                <Text style={styles.Generos}>Generos :</Text>
                <TouchableOpacity className='flex-row items-center' activeOpacity={0.8} onPress={() => setMoreOptionsModal(true)}>
                    <Text style={styles.Seleccion}>Todos</Text>
                    <View style={{marginTop:Height*0.005,marginLeft:Width*0.018}}>
                        <ArrowDownIcon color={'white'} size={Height*0.015}/>
                    </View>
                </TouchableOpacity>
             </View>
             
             <View style={styles.SearchContainer}>
                <FlatList overScrollMode='never' 
                data={songs} 
                renderItem={({item}) => <MusicCard id={item.id} artist={item.artist} title={item.title} price={3000} artwork={item.artwork} url={item.url} duration={item.duration} />}
                keyExtractor={(e) => e.id}   
                />
             </View>
        </SafeAreaView>
        <OptionsModal
        visible={moreOptionsModal}
        currentItem={{}}   
        onClose={() => setMoreOptionsModal(false)}
        />
        </>
    );
}

const styles = StyleSheet.create({
    header:{width:Width*1, height:Height*0.08, marginTop:Height*0.045},
    image:{height:Height*0.1,width:Height*0.1},
    Input:{fontFamily:'Roboto-Regular',fontSize:Height*0.02,width:Width*0.70,paddingHorizontal:Width*0.02,height:Height*0.045,color:'white'},
    Generos:{fontFamily:'Roboto-Bold',fontSize:Height*0.02,color:'#71737B',letterSpacing:Width*0.001,marginLeft:Width*0.065,marginRight:Width*0.04},
    Seleccion:{fontFamily:'Roboto-Bold', fontSize:Height*0.02, color:'white'},
    SearchContainer:{height:Height*0.75,width:Width*0.9,alignSelf:'center',},
})

export default Search;
