import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Audio } from "expo-av";
import { playSong } from "../actions/audioActions";

const initialState = {
  currentAudio: {},
  audioFiles: [],
  playLists: [],
  addToPlayList: null,
  permissionError: false,
  playbackObj: null,
  playbackError: null,
  soundObj: null,
  isPlaying: false,
  isPlayListRunning: false,
  activePlayList: [],
  currentAudioIndex: null,
  playbackPosition: null,
  playbackDuration: null,
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
    setPositionMillis: (state, action) => {
      state.positionMillis = action.payload;
      console.log("POSITION", action.payload);
    },
    setDurationMillis: (state, action) => {
      state.durationMillis = action.payload;
      console.log("DURATION", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(playSong.fulfilled, (state, action) => {
      state.soundObj = action.payload;
      state.isPlaying = true;
      playbackError = null;
      console.log("PLAYING", action.payload);
    });
    builder.addCase(playSong.rejected, (state, action) => {
      //state.soundObject = action.payload;
      state.soundObj = null;
      state.isPlaying = false;
      playbackError = action.error;
      console.log("NOT PLAYING=====>", "ACTION", action);
      console.log("NOT PLAYING=====>", "STATE", state);
    });
  },
});

export const { setIsPlaying, setPositionMillis, setDurationMillis } =
  audiosReducer.actions;

export default audiosReducer.reducer;
