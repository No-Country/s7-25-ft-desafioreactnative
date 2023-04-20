import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import songs from "../database/songs";
import Slider from "@react-native-community/slider";
import { useWindowDimensions } from "react-native";
import {
  CartIcon,
  HeartIcon,
  LoopIcon,
  NextIcon,
  PauseIcon,
  PlayIcon,
  PlaylistAddIcon,
  PreviousIcon,
  ShareIcon,
  ShuffleIcon,
} from "../components/Icons";
import currencyFormat from "../utils/currencyFormat";
import convertToMin from "../utils/minutesFormat";
import {
  nextSong,
  pauseSong,
  play,
  playSong,
  previousSong,
  resume,
  resumeSong,
} from "../redux/actions/audioActions";
import audioInfo from "../redux/utils/audioInfo";
import { setPlaybackPosition } from "../redux/reducers/audios";
import { useDispatch } from "react-redux";

export default function PlayingSong({ route, navigation }) {
  // const song = route?.params.song;
  /* let soundObjStatus = JSON.parse(route?.params.soundObjStatus);
  let soundObjSound = JSON.parse(route?.params.soundObjSound); */
  const { height, width } = useWindowDimensions();
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isBuffering, setIsBuffering] = useState(0);
  const [isLoaded, setIsLoaded] = useState(0);
  const {
    soundObj,
    soundObjStatus,
    isPlaying,
    playbackObj,
    song,
    currentAudioIndex,
    loading,
  } = audioInfo();
  const dispatch = useDispatch();

  async function playNextSong() {
    dispatch(nextSong());
    return navigation.navigate("PlayingSong");
  }

  async function playPreviousSong(song) {
    dispatch(previousSong(song));
    return navigation.navigate("PlayingSong");
  }
  async function playInSequence() {
    return dispatch(playNextSong());
  }

  /*   useLayoutEffect(() => {
    soundObjSound = JSON.parse(route?.params.soundObjSound);
  }, [route]); */

  useEffect(() => {
    if (
      soundObjStatus?.durationMillis - soundObjStatus?.positionMillis <=
      500
    ) {
      playInSequence();
    }
  }, [soundObjStatus]);

  return (
    <View className="flex-1 bg-brandBlue">
      <View />
      <View className="flex-1 justify-evenly items-center">
        <View>
          <Image
            style={{ width: width * 0.8, height: height * 0.4 }}
            className="rounded-full"
            source={{ uri: song?.artwork }}
            resizeMode="cover"
          />
        </View>

        <View style={{ width: width * 0.85, marginTop: 0 }}>
          <View
            style={{ marginBottom: height * 0.05 }}
            className="justify-evenly "
          >
            <Text className="text-[#FFF] text-3xl font-bold text-center">
              {song?.title}
            </Text>
            <View className="justify-center items-center gap-x-2">
              <Text className="text-[#FFF] text-md text-center mr-2">
                {song?.artist?.userName}
              </Text>
              <Pressable
                className="flex-row justify-center items-center bg-brandGreen rounded-full"
                style={{
                  height: height * 0.06,
                  width: width * 0.7,
                  marginTop: width * 0.05,
                }}
              >
                <CartIcon color="#000" width="16" height="16" />
                <Text
                  className="text-[#000] font-bold text-md text-center"
                  style={{
                    marginLeft: width * 0.02,
                  }}
                >
                  Comprar a US{currencyFormat(song?.price)}
                </Text>
              </Pressable>
            </View>
          </View>

          <View
            className="flex-row justify-evenly"
            style={{ marginBottom: height * 0.04 }}
          >
            <ShareIcon />
            <PlaylistAddIcon />
            <HeartIcon />
            <CartIcon />
          </View>
          <View className="relative">
            <Slider
              minimumValue={0}
              maximumValue={soundObjStatus?.durationMillis}
              minimumTrackTintColor="#CBFB5E"
              thumbTintColor="#CBFB5E"
              maximumTrackTintColor="#CBFB5E"
              value={soundObjStatus?.positionMillis}
              onValueChange={(value) => {
                console.log("Track progress==>", value);
              }}
            />
          </View>
          <View
            style={{
              marginTop: height * 0.005,
              width: width * 0.8,
            }}
            className="flex-row justify-between self-center"
          >
            <Text className="text-[#fff]">
              {soundObjStatus?.isBuffering ||
              !soundObjStatus?.isLoaded ||
              loading
                ? "- : -"
                : convertToMin(soundObjStatus?.positionMillis || 0)}
            </Text>
            <Text className="text-[#fff]">
              {soundObjStatus?.isBuffering ||
              !soundObjStatus?.isLoaded ||
              loading
                ? "- : -"
                : convertToMin(
                    soundObjStatus?.durationMillis -
                      soundObjStatus?.positionMillis
                  )}
            </Text>
          </View>
        </View>
        <View className="flex-row w-full justify-evenly items-center relative">
          {soundObjStatus?.isBuffering ||
          !soundObjStatus?.isLoaded ||
          loading ? (
            <ActivityIndicator
              animating={
                soundObjStatus?.isBuffering || !soundObjStatus?.isLoaded
                  ? true
                  : false
              }
              color="#CBFB5E"
              className="self-center absolute left-0 right-0 z-10"
              size="large"
            />
          ) : (
            <>
              <TouchableOpacity>
                <ShuffleIcon />
              </TouchableOpacity>
              <TouchableOpacity onPress={async () => await playPreviousSong()}>
                <PreviousIcon />
              </TouchableOpacity>

              {isPlaying ? (
                <TouchableOpacity
                  onPress={() => dispatch(pauseSong(soundObj))}
                  style={{
                    width: width * 0.16,
                    height: height * 0.08,
                  }}
                  className="bg-brandGreen rounded-full items-center justify-center"
                >
                  <PauseIcon color={"#000"} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => dispatch(resumeSong(soundObj))}
                  style={{
                    width: width * 0.16,
                    height: height * 0.08,
                  }}
                  className="bg-brandGreen rounded-full items-center justify-center"
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
                <NextIcon />
              </TouchableOpacity>
              <TouchableOpacity
                disabled={
                  soundObjStatus?.isBuffering || !soundObjStatus?.isLoaded
                    ? true
                    : false
                }
              >
                <LoopIcon />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
}
