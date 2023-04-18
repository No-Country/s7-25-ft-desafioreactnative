import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";

const Favorite = () => {
  const [favoriteTracks, setFavoriteTracks] = useState(null);

  useEffect(() => {

  }, []);

  const getFavoriteTracks = async () => {
    
    // pedir pistas
    
  }

  return (
    <View className="flex-row items-center justify-around bg-brandBlue py-7 flex-1">
      <Text style={styles.text}>FavoriteTracks</Text>
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
