import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  Dimensions,
  ScrollView,
  ImageBackground,
} from "react-native";
import { SearchIcon, ShopIcon } from "../components/Icons";
import MusicCard from "../components/MusicCard";
import songs from "../database/songs";
import MinimizedMusicPlayer from "../components/MinimizedMusicPlayer";
import audioInfo from "../redux/utils/audioInfo";

const Height = Dimensions.get("window").height;
const Width = Dimensions.get("window").width;

const Home = () => {
  const { song } = audioInfo();
  const [loaded] = useFonts({
    "Roboto-Bold": require("../../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("../../assets/fonts/Roboto-Regular.ttf"),
    "Montserrat-Regular": require("../../assets/fonts/Montserrat-Regular.ttf"),
  });
  if (!loaded) {
    return null;
  }

  const convertirMilisegundos = (milisegundos) => {
    const segundos = Math.floor(milisegundos / 1000);
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = String(segundos % 60).padStart(2, "0");
    return `${minutos}:${segundosRestantes}`; // retornar objeto con los valores de minutos y segundosRestantes
  };

  return (
    <SafeAreaView className="flex-1 bg-brandBlue">
      <View
        style={styles.header}
        className="flex-row items-center justify-between"
      >
        <View className="flex-row items-center">
          <Image
            style={styles.image}
            source={require("../../assets/adaptive-icon.png")}
          />
          <Text
            style={styles.soundScaleTitle}
            className="text-brandGreen w-fit"
          >
            SoundScale
          </Text>
        </View>
        <View className="flex-row gap-x-5 mr-5">
          <View>
            <SearchIcon size={Height * 0.035} />
          </View>
          <View>
            <ShopIcon size={Height * 0.03} color={"white"} />
          </View>
        </View>
      </View>
      <View style={styles.nuevasPistasContainer}>
        <Text style={styles.nuevasPistasTitle}>Nuevas Pistas</Text>
        <ScrollView
          contentContainerStyle={{ gap: Width * 0.04 }}
          overScrollMode="never"
          horizontal={true}
        >
          <ImageBackground
            style={styles.nuevasPistasImg}
            source={require("../../assets/ImgHome/NPimg1.png")}
          >
            <View
              style={{
                marginVertical: Height * 0.015,
                marginLeft: Width * 0.035,
              }}
            >
              <Text
                style={{
                  fontFamily: "Roboto-Bold",
                  fontSize: Height * 0.02,
                  color: "white",
                }}
              >
                Rock' n Child
              </Text>
              <Text
                style={{
                  fontFamily: "Roboto-Regular",
                  fontSize: Height * 0.015,
                  color: "white",
                }}
              >
                Momma Theore
              </Text>
            </View>
          </ImageBackground>
          <ImageBackground
            style={styles.nuevasPistasImg}
            source={require("../../assets/ImgHome/NPimg2.png")}
          >
            <View
              style={{
                marginVertical: Height * 0.015,
                marginLeft: Width * 0.035,
              }}
            >
              <Text
                style={{
                  fontFamily: "Roboto-Bold",
                  fontSize: Height * 0.02,
                  color: "white",
                }}
              >
                Back Temp0
              </Text>
              <Text
                style={{
                  fontFamily: "Roboto-Regular",
                  fontSize: Height * 0.015,
                  color: "white",
                }}
              >
                DJ_Lucius
              </Text>
            </View>
          </ImageBackground>
        </ScrollView>
      </View>
      <View
        style={[
          [styles.RecomendadosContainer],
          { paddingBottom: song ? Height * 0.05 : 0 },
        ]}
      >
        <Text style={styles.RecomendadosTitle}>Recomendados para ti</Text>
        <ScrollView overScrollMode="never">
          {songs.map((e) => {
            return (
              <MusicCard
                key={e.id}
                id={e.id}
                artist={e.artist}
                title={e.title}
                price={3000}
                artwork={e.artwork}
                url={e.url}
                duration={convertirMilisegundos(e.duration)}
              />
            );
          })}
        </ScrollView>
      </View>
      <MinimizedMusicPlayer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    width: Width * 1,
    height: Height * 0.08,
    marginTop: Height * 0.045,
  },
  image: { height: Height * 0.1, width: Height * 0.1 },
  soundScaleTitle: {
    fontFamily: "Roboto-Bold",
    fontSize: Height * 0.025,
    letterSpacing: Height * 0.0001,
  },
  nuevasPistasContainer: {
    height: Height * 0.34,
    width: Width * 0.9,
    alignSelf: "center",
  },
  nuevasPistasTitle: {
    fontSize: Height * 0.03,
    fontFamily: "Roboto-Bold",
    marginVertical: Height * 0.015,
    color: "white",
  },
  nuevasPistasImg: {
    height: Height * 0.25,
    width: Height * 0.25,
    justifyContent: "flex-end",
  },
  RecomendadosContainer: {
    height: Height * 0.43,
    width: Width * 0.9,
    alignSelf: "center",
  },
  RecomendadosTitle: {
    fontFamily: "Roboto-Bold",
    fontSize: Height * 0.024,
    color: "white",
    marginBottom: Height * 0.02,
  },
});

export default Home;
