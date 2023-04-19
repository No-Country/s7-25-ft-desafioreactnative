import userInfo from "../redux/utils/userInfo";
import AuthNavigation from "./AuthNavigation";
import StackNavigation from "./StackNavigation";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setAudioFiles } from "../redux/reducers/audios";
import songs from "../database/songs";

export default function MainNavigation() {
  const { loggedInUser } = userInfo();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAudioFiles(songs));
  }, []);
  return loggedInUser ? <AuthNavigation /> : <StackNavigation />;
}
