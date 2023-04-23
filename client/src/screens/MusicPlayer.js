import { View, FlatList, useWindowDimensions } from "react-native";
import React, { useCallback } from "react";
import AudioList from "../components/AudioList";
import { useDispatch } from "react-redux";
import { playSong } from "../redux/actions/audioActions";
import audioInfo from "../redux/utils/audioInfo";
import MinimizedMusicPlayer from "../components/MinimizedMusicPlayer";

export default function MusicPlayer({ navigation }) {
  const dispatch = useDispatch();
  const { audioFiles, song } = audioInfo();
  const { width, height } = useWindowDimensions();

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
      return navigation.navigate("PlayingSong");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View
      className="flex-1 bg-brandBlue pt-4"
      style={{ paddingBottom: song ? height * 0.06 : 0 }}
    >
      <FlatList
        data={audioFiles}
        renderItem={renderSongs}
        keyExtractor={(item) => item.id}
      />
      <MinimizedMusicPlayer />
    </View>
  );
}
