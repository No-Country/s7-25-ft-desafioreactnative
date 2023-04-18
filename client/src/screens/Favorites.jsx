import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Favorites = () => {
  const [favoriteTracks, setFavoriteTracks] = useState(null);

  useEffect(() => {}, []);

  return (
    <View className="flex-1 bg-brandBlue pt-4">
      <View className="flex-row items-center justify-around my-4">
        <View>
          <Text style={styles.text}>Pistas</Text>
          <View />
        </View>
        <View>
          <Text style={styles.text}>Musicos</Text>
          <View />
        </View>
        <View>
          <Text style={styles.text}>Albunes</Text>
          <View />
        </View>
      </View>
      <View>
        <FlatList
          /* data={[]}
        renderItem={} */
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    text: {
        color: "#CBFB5E",
        fontWeight: "700"
    }
})

export default Favorites;
