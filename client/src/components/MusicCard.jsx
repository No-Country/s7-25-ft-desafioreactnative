import { useFonts } from 'expo-font';
import React from 'react';
import {View, StyleSheet, Dimensions, Image, Text, TouchableHighlight} from 'react-native';
import {FavouritesIcon,FavouritesIconFill,ShopIcon,ThreePoints } from '../components/Icons';
import { useState } from 'react';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const MusicCard = ({id,title,artist,price,artwork}) => {
    const [Favourites, setFavourites] = useState(false);
    const [loaded] = useFonts({
        'Roboto-Bold': require('../../assets/fonts/Roboto-Bold.ttf'),
        'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
        'Montserrat-Regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
      });
      if (!loaded) {
        return null;
      }

    return (
        <View style={styles.Container}>
            <Image style={styles.Image} source={{uri:artwork}}/>
            <View style={{width:Width*0.32,marginHorizontal:Width*0.03,gap:Height*0.005}}> 
                <Text style={styles.Title}>{title}</Text>
                <View style={styles.favArtistContainer}>
                    {Favourites
                    ?
                    <TouchableHighlight key={id} onPress={()=>setFavourites(false)}>   
                        <FavouritesIconFill color={'#CBFB5E'}/>
                    </TouchableHighlight>
                    :
                    <TouchableHighlight key={id} onPress={()=>setFavourites(true)}>   
                        <FavouritesIcon color={'#CBFB5E'}/>
                    </TouchableHighlight>
                    
                    }
                    <Text style={styles.Artist}>
                        {artist}
                    </Text>
                </View>
            </View>
            <View style={{height:'100%',marginTop:Height*0.089,flexDirection:'row',gap:Width*0.02}}>
                <Text style={styles.Price}>ARS${price}</Text>
                <View style={{marginTop:Height*0.002}}>
                <ShopIcon color={'#CBFB5E'} size={Height*0.02}/>
                </View>
            </View>
            <View style={{marginLeft:Width*0.05}}>
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
    Price:{fontFamily:'Roboto-Regular', fontSize:Height*0.018, color:'#CBFB5E',width:Width*0.2}
})

export default MusicCard;
