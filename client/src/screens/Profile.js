import { View, Text, Image, useWindowDimensions } from "react-native";
import React from "react";
import userInfo from "../redux/utils/userInfo";
import { ArrowRightIcon } from "../components/Icons";
import { TouchableOpacity } from "react-native";

const Profile = ({ navigation }) => {
  const { user } = userInfo();
  const { width, height } = useWindowDimensions();
  return (
    <View className="flex-1 bg-brandBlue items-center">
      <View
        className="bg-neutralDarkGray rounded-lg justify-center"
        style={{ height: height * 0.25, width: width * 0.9 }}
      >
        <View className="items-center">
          <Image
            source={{
              uri: "https://res.cloudinary.com/jsxclan/image/upload/v1623895064/GitHub/Projects/Musicont/mock/images/luxuria_kr7c1r.png",
            }}
            style={{ height: height * 0.1, width: width * 0.2 }}
            borderRadius={8}
          />
          <Text className="text-[#FFF]">{user.data.userName}</Text>
        </View>

        <View
          className="flex-row justify-center"
          style={{ columnGap: width * 0.08, marginTop: height * 0.02 }}
        >
          <View>
            <Text className="text-[#FFF] font-bold text-center">22</Text>
            <Text className="text-[#EEEEEE]">Pistas</Text>
          </View>
          <View>
            <Text className="text-[#FFF] font-bold text-center">2</Text>
            <Text className="text-[#FFF]">Albumes</Text>
          </View>
          <View>
            <Text className="text-[#FFF] font-bold text-center">499k</Text>
            <Text className="text-[#FFF]">Me gusta</Text>
          </View>
        </View>
      </View>

      <View
        className="bg-neutralDarkGray rounded-lg justify-center"
        style={{
          height: height * 0.35,
          width: width * 0.9,
          padding: height * 0.04,
          rowGap: width * 0.05,
          marginTop: height * 0.02,
        }}
      >
        <TouchableOpacity
          className="flex-row justify-between items-center"
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          <Text
            style={{ fontSize: height * 0.018 }}
            className="text-[#FFF] font-bold"
          >
            Mis pistas subidas
          </Text>
          <View style={{ paddingTop: height * 0.005 }}>
            <ArrowRightIcon />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row justify-between items-center"
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          <Text
            style={{ fontSize: height * 0.018 }}
            className="text-[#FFF] font-bold"
          >
            Mis álbumes subidos
          </Text>
          <View style={{ paddingTop: height * 0.005 }}>
            <ArrowRightIcon />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row justify-between items-center"
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          <Text
            style={{ fontSize: height * 0.018 }}
            className="text-[#FFF] font-bold"
          >
            Mis fotos
          </Text>
          <View style={{ paddingTop: height * 0.005 }}>
            <ArrowRightIcon />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row justify-between items-center"
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          <Text
            style={{ fontSize: height * 0.018 }}
            className="text-[#FFF] font-bold"
          >
            Mis ventas
          </Text>
          <View style={{ paddingTop: height * 0.005 }}>
            <ArrowRightIcon />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row justify-between items-center"
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          <Text
            style={{ fontSize: height * 0.018 }}
            className="text-[#FFF] font-bold"
          >
            Mis estadísticas
          </Text>
          <View style={{ paddingTop: height * 0.005 }}>
            <ArrowRightIcon />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row justify-between items-center"
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          <Text
            style={{ fontSize: height * 0.018 }}
            className="text-[#FFF] font-bold"
          >
            Mis ganancias
          </Text>
          <View style={{ paddingTop: height * 0.005 }}>
            <ArrowRightIcon />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
