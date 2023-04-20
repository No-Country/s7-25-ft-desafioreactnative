import { View, Text, Pressable } from "react-native";
import React from "react";
import userInfo from "../redux/utils/userInfo";
import { logOutUser } from "../redux/actions/userActions";
import { useDispatch } from "react-redux";
import audioInfo from "../redux/utils/audioInfo";
import { stopSong } from "../redux/actions/audioActions";

const Account = () => {
  const { user } = userInfo();
  const dispatch = useDispatch();
  const { soundObj } = audioInfo();

  const handleLogOut = async () => {
    dispatch(stopSong(soundObj));
    dispatch(logOutUser());
  };
  return (
    <View className="flex-1 bg-brandBlue justify-center items-center">
      <Text className="text-lg font-bold text-[#FFF]">
        {user.data.userName}
      </Text>
      <Text className="text-lg font-bold text-[#FFF]">{user.data.email}</Text>
      <Pressable onPress={handleLogOut}>
        <Text className="text-lg font-bold text-[#FFF]">Log Out</Text>
      </Pressable>
    </View>
  );
};

export default Account;
