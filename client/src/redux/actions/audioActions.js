import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Audio } from "expo-av";
import songs from "../../database/songs";
import { playController } from "../../helpers/audioControllers";
import { setPlaybackPosition } from "../reducers/audios";
import { useRef } from "react";
const playbackObject = Audio.Sound;

let baseAPI = "/api/v1/tracks";

export const playbackStatusUpdate = createAsyncThunk(
  "audios/playbackStatusUpdate",
  async (playbackStatus) => {
    if (playbackStatus.isLoaded && playbackStatus.isPlaying) {
      return playbackStatus;
    }
  }
);

export const playSong = createAsyncThunk(
  "audios/playSong",
  async ({ song, lastPosition = 2000 }, { getState, dispatch }) => {
    const { isPlaying } = await getState().audios;

    try {
      if (!lastPosition) {
        const playbackObj = await playbackObject.createAsync(
          { uri: song.url },
          { shouldPlay: true, progressUpdateIntervalMillis: 1000 }
        );
        playbackObj?.sound.setOnPlaybackStatusUpdate((status) =>
          dispatch(playbackStatusUpdate(status))
        );
        return playbackObj;
      }

      const playbackObj = await playbackObject.createAsync(
        { uri: song.url },
        { shouldPlay: true, progressUpdateIntervalMillis: 1000 }
      );

      if (isPlaying) {
        playbackObj?.sound.stopAsync();
        playbackObj?.sound.unloadAsync();
      }

      if (!playbackObj?.status.isBuffering) {
        await playbackObj?.sound.playFromPositionAsync(lastPosition);
      }

      playbackObj?.sound.setOnPlaybackStatusUpdate((status) =>
        dispatch(playbackStatusUpdate(status))
      );

      return playbackObj;
    } catch (error) {
      console.log("error inside play action function =>", error.message);
    }
  }
);

export const resumeSong = createAsyncThunk(
  "audios/resumeSong",
  async (playbackObj) => {
    console.log("play=>", playbackObj);
    try {
      return await playbackObj?.playAsync();
    } catch (error) {
      console.log("error inside pause helper method", error.message);
    }
  }
);

export const pauseSong = createAsyncThunk(
  "audios/pauseSong",
  async (playbackObj, { getState }) => {
    const { soundObj } = getState().audios;
    console.log("resume=>", playbackObj);
    try {
      return await soundObj?.pauseAsync();
    } catch (error) {
      console.log("error inside pause helper method", error.message);
    }
  }
);

export const nextSong = createAsyncThunk(
  "audios/nextSong",
  async (playbackObj, { getState }) => {
    const { currentAudioIndex } = getState().audios;
    console.log("resume=>", playbackObj);
    try {
      return await soundObj?.pauseAsync();
    } catch (error) {
      console.log("error inside pause helper method", error.message);
    }
  }
);

export const resetAudioState = createAsyncThunk(
  "audios/resetAudioState",
  async () => {
    try {
      return true;
    } catch (error) {
      console.log("error inside audio state  method", error.message);
    }
  }
);
