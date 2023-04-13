import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
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
import { play, resume } from "../redux/actions/audioActions";

export default function PlayingSong({ route }) {
  const song = route?.params.song;
  const soundObj = route?.params.soundObj;
  const { height, width } = useWindowDimensions();
  const [playing, setPlaying] = useState(false);
  const [PauseButton, setPauseButton] = useState(false);
  console.log("SOUND=>", soundObj);

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

          <View>
            <Slider
              minimumValue={0}
              //maximumValue={soundObj?.status.durationMillis}
              minimumTrackTintColor="#CBFB5E"
              thumbTintColor="#CBFB5E"
              maximumTrackTintColor="#CBFB5E"
              /*   value={
                soundObj?.status?.positionMillis /
                  soundObj?.status.durationMillis || 0
              }
              onValueChange={(value) => {
                value * soundObj?.status.durationMillis;
              }} */
              //onSlidingComplete={handleSeek}
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
              {convertToMin(soundObj?.soundObj?.positionMillis || 0)}
            </Text>
            <Text className="text-[#fff]">
              {convertToMin(soundObj?.soundObj?.durationMillis)}
            </Text>
          </View>
        </View>
        <View className="flex-row w-full justify-evenly items-center">
          <TouchableOpacity /* onPress={handlePrev} */>
            <ShuffleIcon />
          </TouchableOpacity>
          <TouchableOpacity /* onPress={handlePrev} */>
            <PreviousIcon />
          </TouchableOpacity>
            
            {PauseButton
            ?
            <TouchableOpacity
            onPress={() => {play(soundObj),setPauseButton(false)}}
            style={{
              width: width * 0.16,
              height: height * 0.08,
            }}
            className="bg-brandGreen rounded-full items-center justify-center"
          >
            <PlayIcon />
          </TouchableOpacity>
          :
          <TouchableOpacity
            onPress={() => {resume(soundObj), setPauseButton(true)}}
            style={{
              width: width * 0.16,
              height: height * 0.08,
            }}
            className="bg-brandGreen rounded-full items-center justify-center"
          >
            <PauseIcon color={"#000"} />
          </TouchableOpacity>
          }
    

          <TouchableOpacity
          /*  onPress={() =>
              song?.soundObj?.isPlaying ? handleStop(() => {}) : () => {}
            }
            disabled={actions?.stop} */
          >
            <NextIcon />
          </TouchableOpacity>
          <TouchableOpacity>
            <LoopIcon />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
