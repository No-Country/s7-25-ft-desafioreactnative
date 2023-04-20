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
    const { isPlaying, audioFiles } = await getState().audios;

    try {
      //Play audio from the beginning if there is no last position given
      if (!lastPosition) {
        const index = await audioFiles.findIndex(({ id }) => id === song?.id);
        const playbackObj = await playbackObject.createAsync(
          { uri: song?.url },
          { shouldPlay: true }
        );
        //Update the playback object status as it plays by dispatching the playbackStatusUpdate action
        playbackObj?.sound.setOnPlaybackStatusUpdate((status) =>
          dispatch(playbackStatusUpdate(status))
        );
        return { index, song, ...playbackObj };
      }

      //Otherwise, play the audio starting from the given position
      const playbackObj = await playbackObject.createAsync(
        { uri: song?.url },
        {
          shouldPlay: false,
        }
      );

      await playbackObj?.sound.playFromPositionAsync(lastPosition);

      if (!playbackObj?.status.isBuffering) {
        await playbackObj?.sound.setStatusAsync({
          shouldPlay: true,
          lastPosition,
        });
      }

      if (isPlaying) {
        playbackObj?.sound.stopAsync();
        playbackObj?.sound.unloadAsync();
      }

      //Update the playback object status as it plays by dispatching the playbackStatusUpdate action
      playbackObj?.sound.setOnPlaybackStatusUpdate((status) =>
        dispatch(playbackStatusUpdate(status))
      );

      const index = await audioFiles.findIndex(({ id }) => id === song?.id);

      return { index, song, ...playbackObj };
    } catch (error) {
      console.log("error inside play action function =>", error.message);
    }
  }
);

export const resumeSong = createAsyncThunk(
  "audios/resumeSong",
  async (playbackObj) => {
    //console.log("play=>", playbackObj);
    try {
      return await playbackObj?.playAsync();
    } catch (error) {
      console.log("error inside pause action function =>", error.message);
    }
  }
);

export const pauseSong = createAsyncThunk(
  "audios/pauseSong",
  async (playbackObj, { getState }) => {
    const { soundObj } = getState().audios;
    //console.log("resume=>", playbackObj);
    try {
      return await soundObj?.pauseAsync();
    } catch (error) {
      console.log("error inside pause action function =>", error.message);
    }
  }
);

export const nextSong = createAsyncThunk(
  "audios/nextSong",
  async (_, { getState, dispatch }) => {
    try {
      const { audioFiles, isPlaying, soundObj, currentAudioIndex } =
        await getState().audios;
      let playbackObj;
      let index;
      let song;

      console.log("CURRENT INDEX===>", currentAudioIndex);
      const isLastAudio = currentAudioIndex + 1 >= audioFiles.length - 1;
      console.log("IS LAST AUDIO?===>", isLastAudio);

      if (!isLastAudio) {
        if (isPlaying) {
          await soundObj?.stopAsync();
          await soundObj?.unloadAsync();
        }

        let index = currentAudioIndex + 1;
        let song = audioFiles[index];
        console.log("NEXT SONG TO PLAY===>", song);

        playbackObj = await playbackObject.createAsync(
          { uri: song.url },
          { shouldPlay: true }
        );

        playbackObj?.sound.setOnPlaybackStatusUpdate((status) =>
          dispatch(playbackStatusUpdate(status))
        );
        return { index, song, ...playbackObj };
      }

      if (isPlaying) {
        await soundObj?.stopAsync();
        await soundObj?.unloadAsync();
      }

      index = 0;
      song = audioFiles[index];
      console.log("FIRST AUDIO===>", song);
      playbackObj = await playbackObject.createAsync(
        { uri: song.url },
        { shouldPlay: true }
      );
      playbackObj?.sound.setOnPlaybackStatusUpdate((status) =>
        dispatch(playbackStatusUpdate(status))
      );

      return { index, song, ...playbackObj };
    } catch (error) {
      console.log("error inside next song action function =>", error.message);
    }
  }
);

export const previousSong = createAsyncThunk(
  "audios/previousSong",
  async (_, { getState, dispatch }) => {
    try {
      const { audioFiles, isPlaying, soundObj, currentAudioIndex } =
        await getState().audios;
      let playbackObj;
      let index;
      let song;
      console.log(song);
      console.log("CURRENT INDEX===>", currentAudioIndex);
      const isFirstAudio = currentAudioIndex <= 0;
      console.log("IS FIRST AUDIO?===>", isFirstAudio);

      if (!isFirstAudio) {
        if (isPlaying) {
          await soundObj?.stopAsync();
          await soundObj?.unloadAsync();
        }

        let index = currentAudioIndex - 1;
        let song = audioFiles[index];
        playbackObj = await playbackObject.createAsync(
          { uri: song.url },
          { shouldPlay: true }
        );

        playbackObj?.sound.setOnPlaybackStatusUpdate((status) =>
          dispatch(playbackStatusUpdate(status))
        );
        return { index, song, ...playbackObj };
      }

      if (isPlaying) {
        await soundObj?.stopAsync();
        await soundObj?.unloadAsync();
      }
      index = audioFiles.length - 1;
      song = audioFiles[index];
      console.log("LAST AUDIO TO PLAY===>", song);

      playbackObj = await playbackObject.createAsync(
        { uri: song.url },
        { shouldPlay: true }
      );
      playbackObj?.sound.setOnPlaybackStatusUpdate((status) =>
        dispatch(playbackStatusUpdate(status))
      );

      return { index, song, ...playbackObj };
    } catch (error) {
      console.log("error inside next song action function =>", error.message);
    }
  }
);

export const stopSong = createAsyncThunk(
  "audios/stopSong",
  async (soundObj) => {
    try {
      if (soundObj) {
        await soundObj?.stopAsync();
        return await soundObj?.unloadAsync();
      }
    } catch (error) {
      console.log("error inside stop song action function =>", error.message);
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
