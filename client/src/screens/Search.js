import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  Dimensions,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { ArrowBackIcon, ArrowDownIcon, SearchIcon } from "../components/Icons";
import OptionsModal from "../components/OptionsModal";
import MusicCard from "../components/MusicCard";
import axios from "axios";
import { useEffect } from "react";
import OptionsModalGenres from "../components/OptionsModalGenres";
import userInfo from "../redux/utils/userInfo";
import { useDispatch } from "react-redux";
import { playSong } from "../redux/actions/audioActions";
import MinimizedMusicPlayer from "../components/MinimizedMusicPlayer";
import audioInfo from "../redux/utils/audioInfo";

const Height = Dimensions.get("window").height;
const Width = Dimensions.get("window").width;

const Search = ({ navigation }) => {
  const [moreOptionsModal, setMoreOptionsModal] = useState(false);
  const [moreOptionsModalGenres, setMoreOptionsModalGenres] = useState(false);
  const [songs, setSongs] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [Title, setTitle] = useState("Todos");
  const [input, setinput] = useState("");

  const { token, user } = userInfo();
  const { song } = audioInfo();
  const userId = user.data.id;
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`/api/v1/tracks/${userId}?page=1${filtro}&searchByTitle=${input}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      .then((response) => {
        setSongs(response.data.data.tracks);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [filtro, input]);

  async function handlePlay(song) {
    try {
      dispatch(playSong({ song }));
      return navigation.navigate("PlayingSong");
    } catch (error) {
      // An error occurred!
      console.log(error);
    }
  }

  const [loaded] = useFonts({
    "Roboto-Bold": require("../../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("../../assets/fonts/Roboto-Regular.ttf"),
    "Montserrat-Regular": require("../../assets/fonts/Montserrat-Regular.ttf"),
  });
  if (!loaded) {
    return null;
  }

  const handleDataFromChild = (data) => {
    setFiltro(data);
  };

  const handleTitleFromChild = (title) => {
    setTitle(title);
  };

  return (
    <>
      <SafeAreaView className="flex-1 bg-brandBlue">
        <View
          style={styles.header}
          className="flex-row items-center justify-center"
        >
          <View style={{ gap: Width * 0.03 }} className="flex-row items-center">
            <View
              style={{ borderRadius: Height * 0.009 }}
              className="flex-row items-center bg-[#292D39] border-[#363942] border"
            >
              <View style={{ marginLeft: Width * 0.04 }}>
                <SearchIcon size={Width * 0.055} />
              </View>
              <TextInput
                onChangeText={(e) => setinput(e)}
                multiline={false}
                placeholder="¿Qué estás buscando?"
                placeholderTextColor={"#71737B"}
                selectionColor={"#CBFB5E"}
                style={styles.Input}
              ></TextInput>
            </View>
          </View>
        </View>
        <View
          style={{ height: Height * 0.1 }}
          className="flex-row items-center"
        >
          <Text style={styles.Generos}>Generos :</Text>
          <TouchableOpacity
            className="flex-row items-center"
            activeOpacity={0.8}
            onPress={() => setMoreOptionsModalGenres(true)}
          >
            <Text className="capitalize" style={styles.Seleccion}>
              {Title}
            </Text>
            <View
              style={{ marginTop: Height * 0.005, marginLeft: Width * 0.018 }}
            >
              <ArrowDownIcon color={"white"} size={Height * 0.015} />
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.SearchContainer,
            { paddingBottom: song ? Height * 0.1 : 0 },
          ]}
        >
          <FlatList
            overScrollMode="never"
            data={songs}
            renderItem={({ item }) => (
              <MusicCard
                id={item.id}
                artist={item.artist.userName}
                title={item.title}
                price={item.price}
                artwork={item.artwork}
                url={item.url}
                duration={item.duration}
                favoritedBy={item.favoritedBy}
                purchasedBy={item.purchasedBy}
                song={item}
                handlePlay={handlePlay}
              />
            )}
            keyExtractor={(e) => e.id}
          />
        </View>
        <MinimizedMusicPlayer />
      </SafeAreaView>
      <OptionsModal
        visible={moreOptionsModal}
        currentItem={{}}
        onClose={() => setMoreOptionsModal(false)}
      />
      <OptionsModalGenres
        onData={handleDataFromChild}
        onTitle={handleTitleFromChild}
        visible={moreOptionsModalGenres}
        currentItem={{}}
        onClose={() => setMoreOptionsModalGenres(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    width: Width * 1,
    height: Height * 0.08,
    marginTop: Height * 0.045,
  },
  image: { height: Height * 0.1, width: Height * 0.1 },
  Input: {
    fontFamily: "Roboto-Regular",
    fontSize: Height * 0.02,
    width: Width * 0.7,
    paddingHorizontal: Width * 0.02,
    height: Height * 0.045,
    color: "white",
  },
  Generos: {
    fontFamily: "Roboto-Bold",
    fontSize: Height * 0.02,
    color: "#71737B",
    letterSpacing: Width * 0.001,
    marginLeft: Width * 0.065,
    marginRight: Width * 0.04,
  },
  Seleccion: {
    fontFamily: "Roboto-Bold",
    fontSize: Height * 0.02,
    color: "white",
  },
  SearchContainer: {
    height: Height * 0.68,
    width: Width * 0.9,
    alignSelf: "center",
  },
});

export default Search;
