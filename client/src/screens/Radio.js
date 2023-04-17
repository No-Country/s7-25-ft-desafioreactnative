import { View, Text, Pressable } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { resetAudioState } from "../redux/actions/audioActions";

const Radio = ({ navigation }) => {
  const dispatch = useDispatch();

  function handleReset() {
    dispatch(resetAudioState());
  }
  return (
    <View className="flex-1 justify-center items-center">
      <Text>Radio</Text>
      <Pressable onPress={() => navigation.navigate("MusicPlayer")}>
        <Text>Music Player</Text>
      </Pressable>
      <Pressable onPress={() => handleReset()}>
        <Text>Clear Audio State</Text>
      </Pressable>
    </View>
  );
};

export default Radio;
