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

const Favorite = () => {
  const [favoriteTracks, setFavoriteTracks] = useState([]);
  const [limit, setLimit] = useState(10);
  const [listLoading, setListLoading] = useState(true);
  const [itemsLoading, setItemsLoading] = useState(false);

  useEffect(() => {
    if (getFavoriteTracks()) {
      setListLoading(false);
      /* setItemsLoading(false); */
    }
  }, [limit]);

  const getFavoriteTracks = async () => {
    try {
      const userId = "de89dec0-6228-41e6-8218-0beb27bd6c0b";
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRlODlkZWMwLTYyMjgtNDFlNi04MjE4LTBiZWIyN2JkNmMwYiIsImlhdCI6MTY4MTg1MjI0MSwiZXhwIjoxNjg0NDQ0MjQxfQ.ICVAcgjnGdo_Dc_fdHaDfwPfnBpqtpwcm0Hf_c2endU";
      const { data } = await axios.get(
        `/api/v1/tracks/${userId}/favorites?limit=${limit}`,
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
    <View className="items-center justify-around bg-brandBlue py-7 flex-1">
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
                setLimit(limit + 3);/* 
                setItemsLoading(true); */
              }
            }}
            data={favoriteTracks}
            renderItem={({ item }) => {
              return (
                <View style={{ paddingVertical: 6 }}>
                  <MusicCard
                    id={item.id}
                    artist={item.artist.userName}
                    title={shortenTitle(item.title)}
                    price={item.price}
                    artwork={item.artwork}
                    url={item.url}
                    duration={convertirMilisegundos(item.duration)}
                  />
                </View>
              );
            }}
            keyExtractor={(e) => e.id}
          />
          {/* {itemsLoading ? <ActivityIndicator size={20} /> : null} */}
        </>
      )}
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
