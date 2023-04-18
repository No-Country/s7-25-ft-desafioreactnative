import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Audio } from "expo-av";
import {
  nextSong,
  pauseSong,
  playSong,
  playbackStatusUpdate,
  previousSong,
  resetAudioState,
  resumeSong,
} from "../actions/audioActions";

const initialState = {
  currentAudio: null,
  audioFiles: null,
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
    setAudioFiles: (state, action) => {
      state.audioFiles = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(playSong.fulfilled, (state, action) => {
      /*
      state.currentAudio = action.payload?.sound; */
      state.playbackError = null;
      state.soundObj = action.payload.sound;
      state.soundObjStatus = action.payload.status;
      state.currentAudioIndex = action.payload.index;
      //state.currentAudio = action.payload.song;
      /*  console.log("soundObjStatus===>", action.payload.status);
      console.log("currentAudio===>", action.payload.sound);
      console.log("PLAYING===>", action.payload.song); */

      /*  console.log("PLAYING===>", action.payload);
      console.log("currentAudio===>", action.payload.sound);
      console.log("soundObjStatus===>", action.payload.status); */
    });
    builder.addCase(playSong.rejected, (state, action) => {
      state.isPlaying = false;
      playbackError = action.error.message;
      state.soundObj = null;
      state.currentAudioIndex = null;
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
      if (action.payload?.positionMillis && action.payload?.durationMillis) {
        state.soundObjStatus = action.payload;
        state.playbackPosition = action.payload?.positionMillis;
        state.playbackDuration = action.payload?.durationMillis;
        //console.log(action.payload?.isPlaying);
      }
      state.isPlaying = action.payload?.isPlaying;
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
    builder.addCase(nextSong.fulfilled, (state, action) => {
      state.soundObj = action.payload.sound;
      state.soundObjStatus = action.payload.status;
      state.currentAudioIndex = action.payload.index;
      state.playbackError = null;
      console.log("NEXT SONG PLAYING===>", action.payload);
    });
    builder.addCase(nextSong.rejected, (state, action) => {
      state.isPlaying = false;
      playbackError = action.error.message;
      state.soundObj = null;
      state.currentAudio = null;
      state.currentAudioIndex = null;
      console.log("NEXT SONG NOT PLAYING===>", action.error.message);
    });
    builder.addCase(previousSong.fulfilled, (state, action) => {
      state.soundObj = action.payload.sound;
      state.soundObjStatus = action.payload.status;
      state.currentAudioIndex = action.payload.index;
      state.playbackError = null;
      console.log("PREVIOUS SONG PLAYING===>", action.payload);
    });
    builder.addCase(previousSong.rejected, (state, action) => {
      state.isPlaying = false;
      playbackError = action.error.message;
      state.soundObj = null;
      state.currentAudio = null;
      state.currentAudioIndex = null;
      console.log("PREVIOUS SONG NOT PLAYING===>", action.error.message);
    });
    /*     builder.addCase(fetchTracks.fulfilled, (state, action) => {
  
      console.log("TRACKS==>", action);
    });
    builder.addCase(fetchTracks.rejected, (state, action) => {
      console.log("ERROR==>", action.error.message);
    }); */
  },
});

export const { setAudioFiles } = audiosReducer.actions;

export default audiosReducer.reducer;
