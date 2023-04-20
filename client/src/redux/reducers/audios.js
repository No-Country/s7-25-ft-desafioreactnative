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
  stopSong,
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
  song: null,
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
    /* Play */
    builder.addCase(playSong.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(playSong.fulfilled, (state, action) => {
      /*
      state.currentAudio = action.payload?.sound; */
      state.loading = false;
      state.playbackError = null;
      state.soundObj = action.payload.sound;
      state.soundObjStatus = action.payload.status;
      state.currentAudioIndex = action.payload.index;
      state.song = action.payload.song;
      state.recentActivity = [action.payload.song, ...state.recentActivity];
      state.loading = false;
      console.log("SONG FROM REDUCER===>", action.payload.song);
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
      state.loading = false;
      state.song = null;
      console.log("NOT PLAYING=====>", "ACTION", action.error.message);
    });
    /* Resume */
    builder.addCase(resumeSong.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resumeSong.fulfilled, (state, action) => {
      state.isPlaying = true;
      state.loading = false;
      console.log("RESUMED=====>", state.isPlaying);
    });
    builder.addCase(resumeSong.rejected, (state, action) => {
      state.isPlaying = false;
      playbackError = action.error.message;
      state.loading = false;
      console.log("NOT RESUMED=====>", "ACTION", action.error.message);
    });
    /* Pause */
    builder.addCase(pauseSong.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(pauseSong.fulfilled, (state, action) => {
      state.isPlaying = false;
      state.loading = false;
      console.log("PAUSED=====>", (state.isPlaying = false));
    });
    builder.addCase(pauseSong.rejected, (state, action) => {
      state.isPlaying = true;
      playbackError = action.error.message;
      state.loading = false;
      console.log("NOT PAUSED=====>", "ACTION", action.error.message);
    });
    /* Next song */
    builder.addCase(nextSong.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(nextSong.fulfilled, (state, action) => {
      state.soundObj = action.payload.sound;
      state.soundObjStatus = action.payload.status;
      state.currentAudioIndex = action.payload.index;
      state.playbackError = null;
      state.song = action.payload.song;
      state.recentActivity = [action.payload.song, ...state.recentActivity];
      state.loading = false;
      console.log("NEXT SONG PLAYING===>", action.payload);
    });
    builder.addCase(nextSong.rejected, (state, action) => {
      state.isPlaying = false;
      playbackError = action.error.message;
      state.soundObj = null;
      state.currentAudio = null;
      state.currentAudioIndex = null;
      state.song = null;
      state.loading = false;
      console.log("NEXT SONG NOT PLAYING===>", action.error.message);
    });
    /* Previous Song*/
    builder.addCase(previousSong.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(previousSong.fulfilled, (state, action) => {
      state.soundObj = action.payload.sound;
      state.soundObjStatus = action.payload.status;
      state.currentAudioIndex = action.payload.index;
      state.playbackError = null;
      state.song = action.payload.song;
      state.recentActivity = [action.payload.song, ...state.recentActivity];
      state.loading = false;
      console.log("PREVIOUS SONG PLAYING===>", action.payload);
    });
    builder.addCase(previousSong.rejected, (state, action) => {
      state.isPlaying = false;
      playbackError = action.error.message;
      state.soundObj = null;
      state.currentAudio = null;
      state.currentAudioIndex = null;
      state.song = null;
      state.loading = false;
      console.log("PREVIOUS SONG NOT PLAYING===>", action.error.message);
    });

    /* Playback status update */
    builder.addCase(playbackStatusUpdate.fulfilled, (state, action) => {
      if (action.payload?.positionMillis && action.payload?.durationMillis) {
        state.soundObjStatus = action.payload;
        state.playbackPosition = action.payload?.positionMillis;
        state.playbackDuration = action.payload?.durationMillis;
        console.log(action.payload);
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
    /* Reset audios state */
    builder.addCase(resetAudioState.fulfilled, (state, action) => {
      console.log("BEFORE STATE RESET", state);
      state = initialState;
      console.log("Audio State Reset from extra reducer");
      console.log("AFTER STATE RESET", state);
    });
    builder.addCase(resetAudioState.rejected, (state, action) => {
      state.playbackError = action.error.message;
      console.log("NOT RESET", action.error.message);
    });
    builder.addCase(stopSong.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(stopSong.fulfilled, (state, action) => {
      state.isPlaying = false;
      playbackError = null;
      state.soundObj = null;
      state.soundObjStatus = null;
      state.currentAudioIndex = null;
      state.loading = false;
      state.song = null;
      console.log("SONG STOPPED");
    });
    builder.addCase(stopSong.rejected, (state, action) => {
      state.isPlaying = false;
      state.playbackError = action.error.message;
      console.log(
        "SONG COULD NOT BE STOPPED=====>",
        "ACTION",
        action.error.message
      );
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
