import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Audio } from "expo-av";
import {
  pauseSong,
  playSong,
  playbackStatusUpdate,
  resetAudioState,
  resumeSong,
} from "../actions/audioActions";
import songs from "../../database/songs";

const initialState = {
  currentAudio: null,
  audioFiles: [...songs],
  playLists: [],
  addToPlayList: null,
  permissionError: false,
  playbackObj: null,
  playbackError: null,
  soundObj: null,
  soundObjStatus: null,
  isPlaying: false,
  isPlayListRunning: false,
  activePlayList: [],
  currentAudioIndex: null,
  playbackPosition: 0,
  playbackDuration: 0,
  favorites: [],
  recentActivity: [],
  loading: false,
  positionMillis: 0,
  durationMillis: null,
};

const audiosReducer = createSlice({
  name: "audios",
  initialState,
  reducers: {
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
      console.log("IS PLAYING?", action.payload);
    },
    setPlaybackPosition: (state, action) => {
      state.isPlaying = action.payload;
      console.log("Playback position?", action.payload);
    },
    setPlaybackDuration: (state, action) => {
      state.isPlaying = action.payload;
      console.log("Playback duration?", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(playSong.fulfilled, (state, action) => {
      state.soundObj = action.payload?.sound;
      state.soundObjStatus = action.payload?.status;
      playbackError = null;
      state.isPlaying = true;
      state.currentAudio = action.payload?.sound;
      console.log("PLAYING", action.payload.status?.isPlaying);
      console.log("currentAudio", action.payload.sound);
      console.log("soundObjStatus", action.payload.sound);
    });
    builder.addCase(playSong.rejected, (state, action) => {
      state.isPlaying = false;
      playbackError = action.error.message;
      state.soundObj = null;
      console.log("NOT PLAYING=====>", "ACTION", action.error.message);
    });
    builder.addCase(resumeSong.fulfilled, (state, action) => {
      state.isPlaying = true;
      console.log("RESUMED=====>", state.isPlaying);
    });
    builder.addCase(resumeSong.rejected, (state, action) => {
      state.isPlaying = false;
      playbackError = action.error.message;
      console.log("NOT RESUMED=====>", "ACTION", action.error.message);
    });
    builder.addCase(pauseSong.fulfilled, (state, action) => {
      state.isPlaying = false;
      console.log("PAUSED=====>", (state.isPlaying = false));
    });
    builder.addCase(pauseSong.rejected, (state, action) => {
      state.isPlaying = true;
      playbackError = action.error.message;
      console.log("NOT PAUSED=====>", "ACTION", action.error.message);
    });
    builder.addCase(playbackStatusUpdate.fulfilled, (state, action) => {
      state.playbackPosition = action.payload?.positionMillis;
      state.playbackDuration = action.payload?.durationMillis;
      state.isPlaying = action.payload?.isPlaying;
      //console.log("REDUCER PLAYBACKSTATUS=====>", action.payload);
    });
    builder.addCase(playbackStatusUpdate.rejected, (state, action) => {
      state.isPlaying = false;
      state.playbackDuration = null;
      state.playbackPosition = null;
      playbackError = action.error.message;
      console.log("NOT PLAYING=====>", "ACTION", action.error.message);
    });
    builder.addCase(resetAudioState.fulfilled, (state, action) => {
      console.log("BEFORE STATE RESET", state);
      state = initialState;
      console.log("Audio State Reset from extra reducer");
      console.log("AFTER STATE RESET", state);
    });
    builder.addCase(resetAudioState.rejected, (state, action) => {
      playbackError = action.error.message;
      console.log("NOT RESET", action.error.message);
    });
  },
});

export const { setIsPlaying } = audiosReducer.actions;

export default audiosReducer.reducer;
