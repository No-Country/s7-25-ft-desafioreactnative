import { Audio, InterruptionModeAndroid } from "expo-av";

const playbackObj = new Audio.Sound();

export const init = async (defaultConfigs = {}) => {
  try {
    const configs = {
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
      shouldDuckAndroid: true,
      staysActiveInBackground: true,
      playThroughEarpieceAndroid: false,
      ...defaultConfigs,
    };

    await Audio.setAudioModeAsync(configs);
  } catch (error) {
    console.log(`[Audio Error][init]: ${error?.message}`);
  }
};

export const playbackStatusUpdate = (playbackStatus) => {
  if (playbackStatus.isLoaded && playbackStatus.isPlaying) {
    console.log(playbackStatus.positionMillis);
  }
};

export const playController = async (url, isPlaying, lastPosition) => {
  try {
    if (isPlaying) {
      console.log("is it Playing?", isPlaying);
      playbackObj.stopAsync();
      playbackObj.unloadAsync();
    }

    if (!lastPosition) {
      await playbackObj.loadAsync(
        { uri: url },
        { shouldPlay: true, progressUpdateIntervalMillis: 1000 }
      );
      return playbackObj.setOnPlaybackStatusUpdate(playbackStatusUpdate);
    }

    // but if there is lastPosition then we will play audio from the lastPosition
    await playbackObj.loadAsync(
      { uri: url },
      { progressUpdateIntervalMillis: 1000 }
    );

    return playbackObj.setOnPlaybackStatusUpdate(playbackStatusUpdate);
  } catch (error) {
    console.log("error inside play controller function", error.message);
  }
};

export const pauseController = async (playbackObj) => {
  try {
    return await playbackObj.setStatusAsync({
      shouldPlay: false,
    });
  } catch (error) {
    console.log("error inside pause controller function", error.message);
  }
};

export const resumeController = async (playbackObj) => {
  try {
    return await playbackObj.playAsync();
  } catch (error) {
    console.log("error inside resume controller function", error.message);
  }
};
