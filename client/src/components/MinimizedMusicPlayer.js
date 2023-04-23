import React, { useEffect, useRef, useState, memo } from "react";
import {
  Image,
  useWindowDimensions,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import Slider from "@react-native-community/slider";
import audioInfo from "../redux/utils/audioInfo";
import { ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";
import {
  nextSong,
  pauseSong,
  previousSong,
  resumeSong,
} from "../redux/actions/audioActions";
import { NextIcon, PauseIcon, PlayIcon, PreviousIcon } from "./Icons";

const MinimizedMusicPlayer = () => {
  const { soundObj, soundObjStatus, isPlaying, song, loading } = audioInfo();
  const { width, height } = useWindowDimensions();
  const [visible, setVisible] = useState("none");
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    setVisible(song === null ? "none" : "flex");
  }, [song]);

  async function playNextSong() {
    return dispatch(nextSong());
  }

  async function playPreviousSong(song) {
    return dispatch(previousSong(song));
  }
  return (
    <>
      <Pressable
        className="absolute bg-brandGreen bottom-0 right-0 left-0 items-center flex-row "
        onPress={() => navigation.navigate("PlayingSong")}
        style={{
          height: height * 0.1,
          paddingVertical: height * 0.01,
          paddingHorizontal: width * 0.04,
          display: visible,
        }}
      >
        <View
          style={{
            position: "absolute",
            bottom: height * 0.09,
            width: width,
            marginHorizontal: "auto",
            padding: 0,
          }}
        >
          <Slider
            minimumValue={0}
            maximumValue={soundObjStatus?.durationMillis}
            minimumTrackTintColor="#CBFB5E"
            thumbTintColor="transparent"
            maximumTrackTintColor="#CBFB5E"
            value={soundObjStatus?.positionMillis}
          />
        </View>
        <Pressable
          className="flex-row items-center"
          onPress={() => navigation.navigate("PlayingSong")}
          style={{
            marginRight: width * 0.12,
          }}
        >
          <Image
            style={{
              width: width * 0.14,
              height: height * 0.07,
              marginRight: width * 0.05,
            }}
            source={{ uri: song?.artwork }}
            resizeMode="cover"
            className="rounded-full"
          />

          <Text className="text-md  text-[#000] " numberOfLines={2}>
            {song?.title}
          </Text>
        </Pressable>

        <View className="flex-row  justify-evenly items-center relative">
          {soundObjStatus?.isBuffering ||
          !soundObjStatus?.isLoaded ||
          loading ? (
            <ActivityIndicator
              animating={
                soundObjStatus?.isBuffering || !soundObjStatus?.isLoaded
                  ? true
                  : false
              }
              color="#71737B"
              className="self-center absolute left-0 right-0 z-10"
              size="large"
            />
          ) : (
            <>
              <TouchableOpacity onPress={async () => await playPreviousSong()}>
                <PreviousIcon color="#000" />
              </TouchableOpacity>

              {isPlaying ? (
                <TouchableOpacity
                  onPress={() => dispatch(pauseSong(soundObj))}
                  style={{
                    width: width * 0.16,
                    height: height * 0.08,
                    marginHorizontal: width * 0.04,
                  }}
                  className="bg-brandGreen rounded-full items-center justify-center"
                >
                  <PauseIcon color={"#000"} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => dispatch(resumeSong(soundObj))}
                  style={{
                    width: width * 0.1,
                    height: height * 0.05,
                    marginHorizontal: width * 0.04,
                  }}
                  className="rounded-full items-center border-[1px] justify-center"
                  disabled={
                    soundObjStatus?.isBuffering ||
                    !soundObjStatus?.isLoaded ||
                    loading
                      ? true
                      : false
                  }
                >
                  <PlayIcon />
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={async () => await playNextSong()}
                disabled={
                  soundObjStatus?.isBuffering ||
                  !soundObjStatus?.isLoaded ||
                  loading
                    ? true
                    : false
                }
              >
                <NextIcon color={"#000"} />
              </TouchableOpacity>
            </>
          )}
        </View>
      </Pressable>
    </>
  );
};

export default MinimizedMusicPlayer;
