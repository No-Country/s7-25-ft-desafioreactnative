import React from "react";
import { Image, useWindowDimensions } from "react-native";
import { View, Modal, Text, TouchableWithoutFeedback } from "react-native";
import { CartIcon, HeartIcon, ShareIcon,ExploreIcon } from "./Icons";

const OptionsModalGenres = ({
  onData,
  onTitle,
  visible,
  currentItem,
  onClose,
  options,
  onPlayPress,
  onPlayListPress,
}) => {
  const { title, artist, artwork } = currentItem;
  const { width, height } = useWindowDimensions();
  return (
    <>
      <Modal animationType="slide" transparent visible={visible}>
        <View
          style={{
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            zIndex: 1000,
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0,
          }}
          className="rounded-tl-lg rounded-tr-lg bg-[#27262b] z-10"
        >
          <View
            style={{ marginLeft: width * 0.05 }}
            className="flex-row items-center flex-1"
          >
            <Image
              style={{
                width: width * 0.1,
                height: height * 0.05,
                marginRight: width * 0.05,
              }}
              source={{ uri: artwork }}
              resizeMode="cover"
              borderRadius={6}
            />
            <View
              className="border-b border-[#424242] flex-row items-center flex-1 gap-x-1"
              style={{
                paddingBottom: height * 0.03,
                paddingTop: height * 0.03,
              }}
            >
              <Text
                className="text-md font-bold text-[#FFF] "
                numberOfLines={2}
              >
                {title}
              </Text>
              <Text
                className="text-md font-bold text-[#FFF] "
                numberOfLines={2}
              >
                {" "}
                |{" "}
              </Text>
              <Text className="text-md font-bold text-[#FFF]">{artist}</Text>
            </View>
          </View>

          <View className="bg-[#27262b]" style={{ padding: width * 0.05 }}>
            <TouchableWithoutFeedback onPress={onPlayPress}>
              <View
                className="flex-row items-center"
                style={{ marginBottom: height * 0.02 }}
              >
                <CartIcon
                  style={{ marginRight: width * 0.1 }}
                  width={width * 0.05}
                  height={height * 0.05}
                />
                <Text
                  style={{ marginLeft: width * 0.02 }}
                  className="text-[#FFFFFF] font-bold text-md"
                >
                  Comprar
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={onPlayPress}>
              <View
                className="flex-row items-center"
                style={{ marginBottom: height * 0.02 }}
              >
                <ShareIcon
                  style={{ marginRight: width * 0.1 }}
                  width={width * 0.04}
                  height={height * 0.04}
                />
                <Text
                  style={{ marginLeft: width * 0.02 }}
                  className="text-[#FFFFFF] font-bold text-md"
                >
                  Compartir
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={onPlayPress}>
              <View
                className="flex-row items-center"
                style={{ marginBottom: height * 0.02 }}
              >
                <HeartIcon
                  style={{ marginRight: width * 0.1 }}
                  width={width * 0.05}
                  height={height * 0.05}
                />
                <Text
                  style={{ marginLeft: width * 0.02 }}
                  className="text-[#FFFFFF] font-bold text-md"
                >
                  Agregar a favoritos
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={onPlayPress}>
              <View
                className="flex-row items-center"
                style={{ marginBottom: height * 0.02,marginLeft: width * 0.01  }}
              >
                <ExploreIcon 
                  style={{marginRight: width * 0.1}}
                  width={width * 0.03}
                  height={height * 0.03}
                  color={'white'}
                />
                <Text
                  style={{ marginLeft: width * 0.03 }}
                  className="text-[#FFFFFF] font-bold text-md"
                >
                  Ver Pista
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={onClose}>
          <View
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
            className="bg-[#000] opacity-30"
          />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default OptionsModalGenres;
