import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dimensions } from "react-native";
import MusicCard from "./MusicCard";
import userInfo from "../redux/utils/userInfo";
import { playSong } from "../redux/actions/audioActions";
import MinimizedMusicPlayer from "./MinimizedMusicPlayer";
import audioInfo from "../redux/utils/audioInfo";
import { useWindowDimensions } from "react-native";
import { useDispatch } from "react-redux";

const Favorite = ({ route, navigation }) => {
  const ruteApi = route.params.type;

  const [favoriteTracks, setFavoriteTracks] = useState([]);
  const [limit, setLimit] = useState(10);
  const [listLoading, setListLoading] = useState(true);
  const [itemsLoading, setItemsLoading] = useState(false);
  const { height } = useWindowDimensions();
  const dispatch = useDispatch();

  async function handlePlay(song) {
    try {
      dispatch(playSong({ song }));
      return navigation.navigate("PlayingSong");
    } catch (error) {
      // An error occurred!
      console.log(error);
    }
  }

  const { token, user } = userInfo();
  const { song } = audioInfo();

  useEffect(() => {
    if (getFavoriteTracks()) {
      setListLoading(false);
      /* setItemsLoading(false); */
    }
  }, [limit]);

  const getFavoriteTracks = async () => {
    try {
      const userId = user.data.id;

      const { data } = await axios.get(
        `/api/v1/tracks/${userId}/getUserTracks?type=${ruteApi}&limit=${limit}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFavoriteTracks(data.tracks);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const convertirMilisegundos = (milisegundos) => {
    const segundos = Math.floor(milisegundos / 1000);
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = String(segundos % 60).padStart(2, "0");
    return `${minutos}:${segundosRestantes}`; // retorna objeto con los valores de minutos y segundosRestantes
  };

  const shortenTitle = (titleString) => {
    let string = titleString.slice(0, 25);

    titleString.length > 25 && (string += " ...");

    return string;
  };

  return (
    <View
      className="items-center justify-around bg-brandBlue py-7 flex-1"
      style={{
        paddingBottom: song ? height * 0.1 : 0,
      }}
    >
      {listLoading ? (
        <ActivityIndicator size={90} />
      ) : (
        <>
          <FlatList
            contentContainerStyle={{
              paddingBottom: 10,
              top: -7,
              width: Dimensions.get("window").width - 30,
            }}
            overScrollMode={"always"}
            decelerationRate={"fast"}
            onEndReached={(a) => {
              if (limit) {
                setLimit(limit + 3); /* 
                setItemsLoading(true); */
              }
            }}
            data={favoriteTracks}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    paddingVertical: 6,
                  }}
                >
                  <MusicCard
                    id={item.id}
                    artist={item.artist.userName}
                    title={shortenTitle(item.title)}
                    price={item.price}
                    artwork={item.artwork}
                    url={item.url}
                    duration={convertirMilisegundos(item.duration)}
                    favoritedBy={item.favoritedBy}
                    purchasedBy={item.purchasedBy}
                    song={item}
                    handlePlay={handlePlay}
                  />
                </View>
              );
            }}
            keyExtractor={(e) => e.id}
          />
          {/* {itemsLoading ? <ActivityIndicator size={20} /> : null} */}
        </>
      )}
      <MinimizedMusicPlayer />
    </View>
  );
};

const styles = StyleSheet.create({
  categoryBox: {
    width: 55,
  },
  text: {
    color: "#CBFB5E",
    fontWeight: "700",
  },
  underlined: {
    height: 2,
    backgroundColor: "#CBFB5E",
  },
});

export default Favorite;
