import { useFonts } from 'expo-font';
import React from 'react';
import {View, StyleSheet, Dimensions, Image, Text, TouchableHighlight} from 'react-native';
import {FavouritesIcon,ShopIcon,ThreePoints } from '../components/Icons';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const MusicCard = () => {
    const [loaded] = useFonts({
        'Roboto-Bold': require('../../assets/fonts/Roboto-Bold.ttf'),
        'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
        'Montserrat-Regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
      });
      if (!loaded) {
        return null;
      }

    return (
        <View style={styles.Container} className=''>
            <Image style={styles.Image} source={require('../../assets/ImgHome/NPimg1.png')}/>
            <View style={{marginHorizontal:Width*0.04,gap:Height*0.005}}> 
                <Text style={styles.Title}>Run Run Run</Text>
                <View style={styles.favArtistContainer}>
                    <TouchableHighlight>   
                        <FavouritesIcon color={'#CBFB5E'}/>
                    </TouchableHighlight>
                    <Text style={styles.Artist}>
                        Avinci Jenny
                    </Text>
                </View>
            </View>
            <View style={{height:'100%',marginTop:Height*0.089,marginLeft:Width*0.09,flexDirection:'row',gap:Width*0.02}}>
                <Text style={styles.Price}>ARS$3500</Text>
                <View style={{marginTop:Height*0.002}}>
                <ShopIcon color={'#CBFB5E'} size={Height*0.02}/>
                </View>
            </View>
            <View style={{marginLeft:Width*0.08}}>
                <ThreePoints color={'white'} size={Height*0.035}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container:{height:Height*0.08, flexDirection:'row', alignItems:'center',borderBottomWidth:0.2,borderBottomColor:'#FFFFFF', },
    favArtistContainer:{flexDirection:'row', gap:Width*0.02,},
    Image:{height:Height*0.06, width:Height*0.06},
    Title:{fontFamily:'Roboto-Regular', fontSize:Height*0.019, color:'white'},
    Artist:{fontFamily:'Roboto-Regular', fontSize:Height*0.015,color:'#817A7A'},
    Price:{fontFamily:'Roboto-Regular', fontSize:Height*0.018, color:'#CBFB5E'}
})

export default MusicCard;
