import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { ArrowBackIcon, ArrowDownIcon } from "../components/Icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import OptionsModalGenresCreate from "../components/OptionsModalGenresCreate";
import userInfo from "../redux/utils/userInfo";

const Height = Dimensions.get("window").height;
const Width = Dimensions.get("window").width;

const CreateTrack = () => {
  const Navigation = useNavigation();

  const [fileData, setFileData] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [InputTitle, setInputTitle] = useState("");
  const [InputPrice, setInputPrice] = useState("");
  const [filtro, setFiltro] = useState("");
  const [Title, setTitle] = useState("Rock");
  const [moreOptionsModalGenres, setMoreOptionsModalGenres] = useState(false);

  const { token, user } = userInfo();
  const userId = user.data.id;

  const pickAudio = async () => {
    try {
      // Solicitar permisos para la libreria al dispositivo si todavia no se los tiene

      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission denied!");
        {
          status;
        }
        return;
      }

      // Abrir galeria de medios para seleccionar un archivo de audio

      const result = await DocumentPicker.getDocumentAsync({
        type: "audio/*",
        copyToCacheDirectory: false,
      });

      if (result.type === "success") {
        const uri = FileSystem.documentDirectory + result.name;

        await FileSystem.copyAsync({
          from: result.uri,
          to: uri,
        });

        setFileData({
          name: result.name,
          uri,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const pickImage = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: "image/*",
        copyToCacheDirectory: false,
      });

      if (result.type === "success") {
        const uri = FileSystem.documentDirectory + result.name;

        await FileSystem.copyAsync({
          from: result.uri,
          to: uri,
        });

        setImageData({
          name: result.name,
          uri,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadTrack = async () => {
    if (fileData.uri) {
      try {
        const formData = new FormData();
        const file = await FileSystem.readAsStringAsync(fileData.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        formData.append("audio", {
          uri: fileData.uri,
          name: `${fileData.name}`,
          type: `audio/${fileData.name.split(".").pop().toLowerCase()}`,
          data: file,
        });

        if (imageData?.uri) {
          const image = await FileSystem.readAsStringAsync(imageData.uri, {
            encoding: FileSystem.EncodingType.Base64,
          });

          formData.append("image", {
            uri: imageData.uri,
            name: `${imageData.name}`,
            type: `image/${imageData.name.split(".").pop().toLowerCase()}`,
            data: image,
          });
        }
        // cambiar los literales user_id, price y genres
        const trackData = {
          user_id: userId /* 
          title: {InputTitle}, */,
          price: { InputPrice },
          genres: [...Title],
        };

        formData.append("trackData", JSON.stringify(trackData));

        const response = await axios.post("/api/v1/tracks/upload", formData, {
          // cambiar literal de token
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: function (progressEvent) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log(percentCompleted);
          },
        });
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

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
          className="flex-row items-center justify-start"
        >
          <TouchableOpacity
            style={{ marginLeft: Width * 0.05 }}
            onPress={() => {
              Navigation.navigate("Home");
            }}
          >
            <ArrowBackIcon color={"white"} size={Width * 0.055} />
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: Height * 0.05 }} className="items-center">
          <View style={styles.InputGroup}>
            {/*  <View style={{borderRadius:Height*0.009,width:Width*0.8}} className='flex-row items-center bg-[#292D39] border border-[#363942]'>       
      <TextInput onChangeText={(e)=>setInputTitle(e)} multiline={false} placeholder='Titulo' placeholderTextColor={'#71737B'} selectionColor={'#CBFB5E'} style={styles.Input}></TextInput>
    </View> */}

            <View
              style={{ borderRadius: Height * 0.009, width: Width * 0.8 }}
              className="flex-row items-center bg-[#292D39] border border-[#363942]"
            >
              <TextInput
                keyboardType="numeric"
                onChangeText={(e) => setInputPrice(e)}
                multiline={false}
                placeholder="Precio"
                placeholderTextColor={"#71737B"}
                selectionColor={"#CBFB5E"}
                style={styles.Input}
              ></TextInput>
              <View
                className=" justify-center"
                style={{
                  marginRight: Width * 0.02,
                  height: Height * 0.045,
                  width: Width * 0.07,
                  justifyContent: "center",
                }}
              >
                <Text className="text-[#979797]">$US</Text>
              </View>
            </View>
          </View>

          <View style={{ width: Width * 0.8 }} className="flex-row">
            <View style={styles.Genero}>
              <Text
                className="text-[#FFF]"
                style={{ fontSize: Height * 0.02, marginLeft: Width * 0.009 }}
              >
                Genero:
              </Text>

              <TouchableOpacity
                style={{
                  borderWidth: 2,
                  borderRadius: Height * 0.008,
                  padding: Width * 0.01,
                }}
                className="flex-row items-center border-brandGreen"
                activeOpacity={0.8}
                onPress={() => setMoreOptionsModalGenres(true)}
              >
                <Text className="capitalize" style={styles.Seleccion}>
                  {Title}
                </Text>

                <View
                  style={{ marginTop: Height * 0.004, padding: Width * 0.015 }}
                >
                  <ArrowDownIcon color={"white"} size={Height * 0.015} />
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.Pista} onPress={pickAudio}>
              <Text className="text-[#FFF] text-center">
                Seleccionar una pista{"\n"}(Wav o Mp3){" "}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.SelectImg} onPress={pickImage}>
            <Text className="text-[#FFF]">Seleccionar una imagen</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-brandGreen"
            style={styles.Upload}
            disabled={!fileData?.uri}
            onPress={uploadTrack}
          >
            <Text className="text-neutralMarineBlue">Subir pista</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <OptionsModalGenresCreate
        onData={handleDataFromChild}
        onTitle={handleTitleFromChild}
        visible={moreOptionsModalGenres}
        currentItem={{}}
        onClose={() => setMoreOptionsModalGenres(false)}
      />
    </>
  );
};

export default CreateTrack;

const styles = StyleSheet.create({
  header: {
    width: Width * 1,
    height: Height * 0.08,
    marginTop: Height * 0.045,
  },
  Input: {
    fontFamily: "Roboto-Regular",
    fontSize: Height * 0.02,
    width: Width * 0.7,
    paddingHorizontal: Width * 0.02,
    height: Height * 0.045,
    color: "white",
    marginLeft: Width * 0.02,
  },
  Seleccion: {
    fontFamily: "Roboto-Bold",
    fontSize: Height * 0.02,
    color: "white",
  },
  InputGroup: { gap: Width * 0.05 },
  Genero: {
    flexDirection: "row",
    width: Width * 0.36,
    gap: Width * 0.02,
    height: Height * 0.07,
    backgroundColor: "#292D39",
    borderRadius: Height * 0.009,
    alignItems: "center",
    marginTop: Width * 0.05,
    marginRight: Width * 0.08,
  },
  Pista: {
    flexDirection: "row",
    width: Width * 0.36,
    gap: Width * 0.02,
    height: Height * 0.07,
    backgroundColor: "#292D39",
    borderRadius: Height * 0.009,
    alignItems: "center",
    marginTop: Width * 0.05,
  },
  SelectImg: {
    flexDirection: "row",
    width: Width * 0.8,
    height: Height * 0.07,
    backgroundColor: "#292D39",
    borderRadius: Height * 0.009,
    alignItems: "center",
    marginTop: Width * 0.05,
    justifyContent: "center",
  },
  Upload: {
    flexDirection: "row",
    width: Width * 0.8,
    height: Height * 0.07,
    borderRadius: Height * 0.009,
    alignItems: "center",
    justifyContent: "center",
  },
});
