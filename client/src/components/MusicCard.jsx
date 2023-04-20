import { useFonts } from 'expo-font';
import React, { useEffect, useRef } from 'react';
import {View, StyleSheet, Dimensions, Image, Text, TouchableHighlight, TouchableOpacity} from 'react-native';
import {FavouritesIcon,FavouritesIconFill,ShopIcon,ThreePoints } from '../components/Icons';
import { useState } from 'react';
import OptionsModal from '../components/OptionsModal'
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/core';
import axios from 'axios';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const MusicCard = ({id,title,artist,price,artwork,url,duration}) => {

    const [Favourites, setFavourites] = useState(false);
    const [moreOptionsModal, setMoreOptionsModal] = useState(false);

    const navigation = useNavigation();
    const sound = useRef(new Audio.Sound());

    useEffect(() => {

      axios.post(`/api/v1/tracks/addToFavorite`, {userId: "26e98604-9333-43e5-aa59-204e4403bb57" , trackId: id},{headers:{'Authorization':"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI2ZTk4NjA0LTkzMzMtNDNlNS1hYTU5LTIwNGU0NDAzYmI1NyIsImlhdCI6MTY4MTkyNDMzMywiZXhwIjoxNjg0NTE2MzMzfQ.SqNYwVtUddjeyiLTKTYvCHHxK2CryqlMlD7Kn4CSMH0"}})
      .then((response)=>{
        console.log(response.data)
      }).catch((error)=>{
        console.log(error)
      })

    }, [Favourites]);
    
    const [loaded] = useFonts({
        'Roboto-Bold': require('../../assets/fonts/Roboto-Bold.ttf'),
        'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
        'Montserrat-Regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
      });
      if (!loaded) {
        return null;
     }

     async function handlePlay(song) {
        try {
          console.log(`LA DURACION DE ${title} DE ${artist} ES DE ${duration}`)
          navigation.navigate("PlayingSong", {
            song: song,
            soundObj: { soundObj, sound },
          });
          const soundObj = await sound.current.loadAsync(
            { uri: url },
            { shouldPlay: true }
          );
    
          if (soundObj.isLoaded) {
            await sound.current.playAsync();
          }
        } catch (error) {
          // An error occurred!
          console.log(error);
        }
      }
    


    return (
        <>
        <TouchableOpacity onPress={() => handlePlay({id,title,artist,price,artwork,url})}  style={styles.Container}>
            <Image style={styles.Image} source={{uri:artwork}}/>
            <View  style={{width:Width*0.32,marginHorizontal:Width*0.03,gap:Height*0.005}}> 
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
            <View style={{height:'100%',marginTop:Height*0.089,flexDirection:'row'}}>
                <Text style={styles.Price}>US${price}</Text>
                <View style={{marginTop:Height*0.002}}>
                <ShopIcon color={'#CBFB5E'} size={Height*0.02}/>
                </View>
            </View>
            <TouchableHighlight style={{marginLeft:Width*0.05}}  onPress={() => setMoreOptionsModal(true)}>
                <ThreePoints color={'white'} size={Height*0.035}/>
            </TouchableHighlight>
        </TouchableOpacity>

        <OptionsModal
        visible={moreOptionsModal}
        currentItem={{title:title,artist:artist,artwork:artwork}}   
        onClose={() => setMoreOptionsModal(false)}
        />

      </>
    );
}

const styles = StyleSheet.create({
    Container:{height:Height*0.08, flexDirection:'row', alignItems:'center',borderBottomWidth:0.2,borderBottomColor:'#FFFFFF', },
    favArtistContainer:{flexDirection:'row', gap:Width*0.02,},
    Image:{height:Height*0.06, width:Height*0.06},
    Title:{fontFamily:'Roboto-Regular', fontSize:Height*0.015, color:'white'},
    Artist:{fontFamily:'Roboto-Regular', fontSize:Height*0.0145,color:'#817A7A'},
    Price:{fontFamily:'Roboto-Regular', fontSize:Height*0.017, color:'#CBFB5E',width:Width*0.2}
})

export default MusicCard;
