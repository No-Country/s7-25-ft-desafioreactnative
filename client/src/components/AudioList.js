import React, { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { MoreOptionsIcon } from "./Icons";
import OptionsModal from "./OptionsModal";

const AudioList = ({ style = {}, handlePlay, song }) => {
  const [moreOptionsModal, setMoreOptionsModal] = useState(false);
  const { width, height } = useWindowDimensions();

  return (
    <>
      <TouchableOpacity
        style={[
          { marginBottom: height * 0.04, paddingLeft: width * 0.05 },
          style,
        ]}
        className="flex-row justify-between items-center"
        onLongPress={() => setMoreOptionsModal(true)}
        activeOpacity={0.8}
        onPress={() => handlePlay(song)}
      >
        <View>
          <Image
            style={{ width: width * 0.1, height: height * 0.05 }}
            source={{ uri: song.artwork }}
            resizeMode="cover"
            borderRadius={6}
          />
        </View>

        <View
          style={{
            height: height * 0.06,
            marginLeft: width * 0.04,
            marginRight: width * 0.02,
          }}
          className="flex-1 justify-between"
        >
          <View
            className="border-b border-[#1f2937] flex-row justify-between"
            style={{ paddingBottom: height * 0.03 }}
          >
            <View>
              <Text className="text-md font-bold text-[#FFF]" numberOfLines={2}>
                {song.title}
              </Text>
              <Text style={styles.author} className="text-xs text-[#888]">
                {song.artist}
              </Text>
            </View>
            <Pressable
              className="mt-0 pt-m0 self-center"
              onPress={() => setMoreOptionsModal(true)}
            >
              <MoreOptionsIcon />
            </Pressable>
          </View>
        </View>
      </TouchableOpacity>
      <OptionsModal
        visible={moreOptionsModal}
        currentItem={song}
        onClose={() => setMoreOptionsModal(false)}
      />
    </>
  );
};

export default AudioList;

const styles = StyleSheet.create({
  middle: {
    flex: 1,
    height: 80,
    marginLeft: 10,
    marginRight: 20,
    justifyContent: "space-between",
  },
  right: {},
  title: {
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  author: {
    color: "#888",
  },
  duration: {
    color: "#A4A4A4",
  },
  playBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    paddingLeft: 4,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: "#FFF",
  },
});
