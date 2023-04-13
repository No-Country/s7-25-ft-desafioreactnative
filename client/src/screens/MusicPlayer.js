import { View, Text, FlatList } from "react-native";
import React, { useCallback, useRef, useState } from "react";
import songs from "../database/songs";
import AudioList from "../components/AudioList";
import { useNavigation } from "@react-navigation/native";
import { Audio } from "expo-av";
import { playSong } from "../redux/actions/audioActions";
import { useSelector } from "react-redux";

export default function MusicPlayer({ currentUser }) {
  const navigation = useNavigation();
  const [position, setPosition] = useState();
  const sound = useRef(new Audio.Sound());

  const renderSongs = useCallback(({ item }) => {
    return (
      <View>
        <AudioList song={item} handlePlay={handlePlay} />
      </View>
    );
  }, []);

  const soundObj = useSelector((state) => state.audios);
  async function handlePlay(song) {
    try {
      /* const soundObj = await sound.current.loadAsync(
        { uri: song.url },
        { shouldPlay: true }
      ); */
      await playSong(song);

      navigation.navigate("PlayingSong", {
        song: song,
        soundObj: { soundObj, sound },
      });
    } catch (error) {
      // An error occurred!
      console.log(error);
    }
  }

  return (
    <View className="flex-1 bg-brandBlue pt-4">
      {/* <PlayingSong /> */}
      <FlatList
        data={songs}
        renderItem={renderSongs}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
