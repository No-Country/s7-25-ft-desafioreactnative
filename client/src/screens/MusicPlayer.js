import { View, Text, FlatList } from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import songs from "../database/songs";
import AudioList from "../components/AudioList";
import { useNavigation } from "@react-navigation/native";
import { Audio } from "expo-av";
import { useDispatch, useSelector } from "react-redux";
import { playSong } from "../redux/actions/audioActions";
import audioInfo from "../redux/utils/audioInfo";

export default function MusicPlayer({ navigation }) {
  const [position, setPosition] = useState();
  const { audioFiles } = audioInfo();
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
      {/* <PlayingSong /> */}
      <FlatList
        data={audioFiles}
        renderItem={renderSongs}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
