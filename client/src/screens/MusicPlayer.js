import { View, FlatList } from "react-native";
import React, { useCallback } from "react";
import AudioList from "../components/AudioList";
import { useDispatch, useSelector } from "react-redux";
import { playSong } from "../redux/actions/audioActions";

export default function MusicPlayer({ navigation }) {
  const dispatch = useDispatch();

  const renderSongs = useCallback(({ item }) => {
    return (
      <View>
        <AudioList song={item} handlePlay={handlePlay} />
      </View>
    );
  }, []);

  async function handlePlay(song) {
    try {
      dispatch(playSong({ song }));
      return navigation.navigate("PlayingSong", {
        song: song,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View className="flex-1 bg-brandBlue pt-4">
      <FlatList
        data={audioFiles}
        renderItem={renderSongs}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
