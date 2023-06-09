import { useSelector } from "react-redux";

export default audioInfo = () => {
  const audioState = useSelector((state) => state?.audios);

  const loading = audioState?.loading,
    audio = audioState?.currentAudio,
    audioFiles = audioState?.audioFiles,
    playLists = audioState?.playLists,
    permissionError = audioState?.permissionError,
    playbackObj = audioState?.playbackObj,
    currentAudio = audioState?.currentAudio,
    isPlaying = audioState?.isPlaying,
    isPlayListRunning = audioState?.isPlayListRunning,
    activePlayList = audioState?.activePlayList,
    currentAudioIndex = audioState?.currentAudioIndex,
    playbackPosition = audioState?.playbackPosition,
    playbackDuration = audioState?.playbackDuration,
    favorites = audioState?.favorites,
    recentActivity = audioState?.recentActivity,
    soundObj = audioState?.soundObj,
    song = audioState?.song,
    soundObjStatus = audioState?.soundObjStatus;

  return {
    audio,
    loading,
    audioFiles,
    playLists,
    permissionError,
    playbackObj,
    currentAudio,
    isPlaying,
    soundObjStatus,
    soundObj,
    song,
    isPlayListRunning,
    activePlayList,
    currentAudioIndex,
    playbackPosition,
    playbackDuration,
    favorites,
    recentActivity,
  };
};
