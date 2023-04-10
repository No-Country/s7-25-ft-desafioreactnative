import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import axios from "axios";

const TrackUpButton = () => {
  const [fileData, setFileData] = useState(null);
  const [imageData, setImageData] = useState(null);

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

  const pickImage = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: "image/*",
        copyToCacheDirectory: false
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
      console.log(error)
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
          user_id: "3c6a47a4-7c7f-47c3-aa45-0f387b078b97",
          price: 20,
          genres: ["rock", "folk", "soul"]
        };

        formData.append("trackData", JSON.stringify(trackData));
        
        const response = await axios.post(
          "http://192.168.1.4:4000/api/v1/tracks/upload",
          formData,
          { // cambiar literal de token
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMjM1MjBjLTQ2YWItNDExOS1hNjhlLTRmNmM3YjQ5YzRmYyIsImlhdCI6MTY4MDY2NDEzOCwiZXhwIjoxNjgzMjU2MTM4fQ.IXG55h9tM5pGWREK37RsbMxILexZ2AxAa87PLUtTXeI"}`
            },
            onUploadProgress: function (progressEvent) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              console.log(percentCompleted)
            },
          }
        )
          console.log(response.data)
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View className="flex-1 items-center justify-center">
      <Text>{fileData?.name}</Text>
      <Text>{fileData?.uri}</Text>
      <Text>{imageData?.name}</Text>
      <Text>{imageData?.uri}</Text>
      <TouchableOpacity
        className="bg-green-400 rounded-full p-3 mt-3"
        onPress={pickAudio}
      >
        <Text>Seleccionar una pista</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-green-400 rounded-full p-3 mt-3"
        onPress={pickImage}
      >
        <Text>Seleccionar una imagen</Text>
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
