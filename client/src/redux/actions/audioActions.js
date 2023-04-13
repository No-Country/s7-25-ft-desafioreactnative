import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Audio } from "expo-av";
import { setDurationMillis, setPositionMillis } from "../reducers/audios";
import songs from "../../database/songs";

let baseAPI = "/api/v1/tracks";

/* export async function play(song) {
  try {
    console.log("PLAY=>", song);
    if (song.isLoaded && !song.isPlaying) {
      await song.playAsync();
    }
    const status = await Audio.Sound.createAsync(
      { uri: song.url },
      { shouldPlay: true }
    );
  } catch (error) {}
  //console.log(status);
} */

export const playSong = createAsyncThunk(
  "musicPlayer/playSong",
  async (song, { dispatch, getState }) => {
    const state = getState();
    const { soundObject } = state.audios;

    if (soundObject) {
      await soundObject.unloadAsync();
    }

    const sound = new Audio.Sound();

    try {
      await sound.loadAsync({ uri: song.url }, { shouldPlay: true });
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        const { isLoaded, isPlaying, positionMillis, durationMillis } = status;

        if (isLoaded && isPlaying) {
          dispatch(setPositionMillis(positionMillis));
          dispatch(setDurationMillis(durationMillis));
        }
      });
      return sound;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const play = async (playbackObj) => {
  console.log("play=>", playbackObj);
  try {
    return await playbackObj.sound.current.playAsync();
  } catch (error) {
    console.log("error inside pause helper method", error.message);
  }
};
export const resume = async (playbackObj) => {
  console.log("resume=>", playbackObj);
  try {
    return await playbackObj.sound.current.pauseAsync();
  } catch (error) {
    console.log("error inside pause helper method", error.message);
  }
};
