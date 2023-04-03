import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import axios from "axios";

const TrackUpButton = () => {
  const [fileData, setFileData] = useState(null);

  const pickAudio = async () => {
    try {
      // Solicitar permisos para la libreria al dispositivo si todavia no se los tiene

      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission denied!");
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
          type: `audio/${fileData.name.split('.').pop().toLowerCase()}`,
          data: file,
        });

        const trackData = {
          user_id: "0e0b4e03-d49a-421b-9d2b-5fe35f361a20",
          title: `${fileData.name}`,
        };

        formData.append("trackData", JSON.stringify(trackData));

        const response = await axios.post(
          "http://192.168.0.207:4000/api/v1/tracks/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: function(progressEvent) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              console.log(percentCompleted);
            }
          }
        );
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View className="flex-1 items-center justify-center">
      <Text>{fileData?.name}</Text>
      <Text>{fileData?.uri}</Text>
      <TouchableOpacity
        className="bg-green-400 rounded-full p-3 mt-3"
        onPress={pickAudio}
      >
        <Text>Seleccionar una pista</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-green-400 rounded-full p-3 mt-3"
        disabled={!fileData?.uri}
        onPress={uploadTrack}
      >
        <Text>cargar pista</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TrackUpButton;

const styles = StyleSheet.create({});
