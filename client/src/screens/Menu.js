import {
  View,
  Text,
  Pressable,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import userInfo from "../redux/utils/userInfo";
import { logOutUser } from "../redux/actions/userActions";
import { useDispatch } from "react-redux";
import audioInfo from "../redux/utils/audioInfo";
import { resetAudioState, stopSong } from "../redux/actions/audioActions";
import { LogoutIcon, ShopIcon, ArrowRightIcon } from "../components/Icons";

const Menu = ({ navigation }) => {
  const { user } = userInfo();
  const dispatch = useDispatch();
  const { width, height } = useWindowDimensions();
  const { soundObj } = audioInfo();

  function handleReset() {
    dispatch(resetAudioState());
  }

  const handleLogOut = async () => {
    dispatch(stopSong(soundObj));
    dispatch(logOutUser());
  };
  return (
    <View className="flex-1 bg-brandBlue justify-center items-center">
      <View className="flex-1 bg-brandBlue flex-column">
        <View
          style={{
            width: width * 1,
            height: height * 0.08,
            marginTop: height * 0.045,
            marginBottom: height * 0.04,
          }}
          className="flex-row items-center justify-between"
        >
          <View className="flex-row items-center">
            <Image
              style={{ height: height * 0.1, width: height * 0.1 }}
              source={require("../../assets/adaptive-icon.png")}
            />
            <Text
              style={{
                fontFamily: "Roboto-Bold",
                fontSize: height * 0.025,
                letterSpacing: height * 0.0001,
              }}
              className="text-brandGreen w-fit"
            >
              SoundScale
            </Text>
          </View>
          <View className="flex-row gap-x-5 mr-5 items-center">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("CreateTrack");
              }}
            >
              <Text style={{ fontSize: height * 0.05, color: "white" }}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <ShopIcon size={height * 0.03} color={"white"} />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            height: height * 0.43,
            width: width * 0.9,
            alignSelf: "center",
            gap: height * 0.04,
          }}
        >
          <TouchableOpacity
            className="flex-row justify-between items-center"
            onPress={() => {
              navigation.navigate("Profile");
            }}
          >
            <Text
              style={{ fontSize: height * 0.025 }}
              className="text-[#FFF] font-bold"
            >
              Mi cuenta
            </Text>
            <View style={{ paddingTop: height * 0.005 }}>
              <ArrowRightIcon />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row justify-between items-center"
            onPress={() => navigation.navigate("Compradas")}
          >
            <Text
              style={{ fontSize: height * 0.025 }}
              className="text-[#FFF] font-bold"
            >
              Mis compras
            </Text>
            <View style={{ paddingTop: height * 0.005 }}>
              <ArrowRightIcon />
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row justify-between items-center">
            <Text
              style={{ fontSize: height * 0.025 }}
              className="text-[#FFF] font-bold"
            >
              Descargas
            </Text>
            <View style={{ paddingTop: height * 0.005 }}>
              <ArrowRightIcon />
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row justify-between items-center">
            <Text
              style={{ fontSize: height * 0.025 }}
              className="text-[#FFF] font-bold"
            >
              Quiero vender
            </Text>
            <View style={{ paddingTop: height * 0.005 }}>
              <ArrowRightIcon />
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row justify-between items-center">
            <Text
              style={{ fontSize: height * 0.025 }}
              className="text-[#FFF] font-bold"
            >
              Ayuda
            </Text>
            <View style={{ paddingTop: height * 0.005 }}>
              <ArrowRightIcon />
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row justify-between items-center">
            <Text
              style={{ fontSize: height * 0.025 }}
              className="text-[#FFF] font-bold"
            >
              Ajustes de la aplicación
            </Text>
            <View style={{ paddingTop: height * 0.005 }}>
              <ArrowRightIcon />
            </View>
          </TouchableOpacity>
        </View>
        <View
          className="border-b border-[gray] w-80 self-center"
          style={{ marginVertical: height * 0.02 }}
        ></View>
        <View
          className="flex-row items-center justify-between "
          style={{ paddingHorizontal: height * 0.02 }}
        >
          <View>
            <Text
              className="text-[#FFF]"
              style={{
                fontSize: height * 0.018,
              }}
            >
              {user.data.userName}
            </Text>
            <Text
              className=" text-[#FFF]"
              style={{
                fontSize: height * 0.018,
              }}
            >
              {user.data.email}
            </Text>
          </View>

          <Pressable onPress={handleLogOut}>
            <Text className="text-lg font-bold text-[#FFF]">
              <LogoutIcon color="#FFF" />
            </Text>
          </Pressable>
        </View>
        <Pressable onPress={() => handleReset()}>
          <Text className="text-lg font-bold text-[#FFF]">
            Clear Audio State
          </Text>
        </Pressable>
      </View>
      {/*      <Text className="text-lg font-bold text-[#FFF]">{user.data.email}</Text>
      <Pressable onPress={handleLogOut}>
        <Text className="text-lg font-bold text-[#FFF]">
          <LogoutIcon color="#FFF" /> Log Out
        </Text>
      </Pressable>
      <Pressable onPress={() => handleReset()}>
        <Text className="text-lg font-bold text-[#FFF]">Clear Audio State</Text>
      </Pressable> */}
    </View>
  );
};

export default Menu;
