import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
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
    currentAudio,
    playbackPosition,
    playbackDuration,
    isPlaying,
    playbackObj,
    song,
    audioFiles,
    currentAudioIndex,
    loading,
  } = audioInfo();
  const dispatch = useDispatch();

  let nextSongToPlay =
    audioFiles[currentAudioIndex + 1] >= audioFiles.length - 1
      ? audioFiles[0]
      : audioFiles[currentAudioIndex + 1];

  let previousSongToPlay =
    audioFiles[audioFiles.length - 1] <= 0
      ? audioFiles[audioFiles.length - 1]
      : audioFiles[audioFiles.length - 1];
  // console.log(audioFiles.length);

  function handlePosition() {
    setPosition(soundObjStatus.positionMillis);
    setDuration(soundObjStatus.durationMillis);
    setIsBuffering(soundObjStatus.isBuffering);
    setIsLoaded(soundObjStatus.isLoaded);
  }

  async function playNextSong() {
    dispatch(nextSong());
    return navigation.navigate("PlayingSong");
  }

  async function playPreviousSong(song) {
    dispatch(previousSong(song));
    console.log("INSIDE PLAY PREVIOUS SONG===>", song);
    return navigation.navigate("PlayingSong");
  }
  /*   useLayoutEffect(() => {
    soundObjSound = JSON.parse(route?.params.soundObjSound);
  }, [route]); */

  /*   useEffect(() => {
    handlePosition();
    console.log("HERE=>", playbackPosition);
    console.log("PLAYBACK DURATION=>", playbackDuration);
    console.log("is it Playing=>", isPlaying); 
    console.log("SEEKBAR POSITION?=>", playbackDuration / playbackPosition);
  }, [soundObjStatus]); */

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
            <View className="flex-row justify-center items-center gap-x-2">
              <Text className="text-[#FFF] text-md text-center mr-2">
                {song?.artist}
              </Text>
              <CartIcon color="#CBFB5E" width="16" height="16" />
              <Text className="text-brandGreen text-xs text-center">
                {currencyFormat(39)}
              </Text>
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
              maximumValue={duration}
              minimumTrackTintColor="#CBFB5E"
              thumbTintColor="#CBFB5E"
              maximumTrackTintColor="#CBFB5E"
              value={position}
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
              <TouchableOpacity /* onPress={handlePrev} */>
                <ShuffleIcon />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => await playPreviousSong(previousSongToPlay)}
              >
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
