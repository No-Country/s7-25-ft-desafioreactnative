import { View, Text, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Radio = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-1 justify-center items-center">
      <Text>Radio</Text>
      <Pressable onPress={() => navigation.navigate("MusicPlayer")}>
        <Text>Music Player</Text>
      </Pressable>
    </View>
  );
};

export default Radio;
