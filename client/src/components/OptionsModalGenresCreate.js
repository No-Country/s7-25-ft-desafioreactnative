import React, { useEffect, useState } from "react";
import { FlatList, Image, TouchableOpacity, useWindowDimensions } from "react-native";
import { View, Modal, Text, TouchableWithoutFeedback } from "react-native";
import axios from "axios";


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

  const GenresCards = ({name,data}) =>{
    return(
      <TouchableOpacity onPress={()=>{onTitle(name); onData(data);onClose(onClose);}}>
        <View className="flex-row items-center" style={{ marginBottom: height * 0.02 }}>
          <Text style={{ marginLeft: width * 0.035, fontSize:height*0.018}} className="text-[#FFFFFF] font-bold capitalize">
                 {name}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  const [genres, setgenres] = useState();

  useEffect(() => {
        
    axios.get(`/api/v1/genres`)
    
    .then((response) => {
      const data = response.data.genres;
      for (let i = 1; i < data.length; i++) {
        data[i].genere = `&genres[]=${data[i].name}`;
      }
      setgenres(data);
      
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

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
          <View  className="flex-row items-center flex-1">
            <View className="border-b border-[#424242] flex-row items-center flex-1" style={{ paddingBottom: height * 0.03, paddingTop: height * 0.02,}}>
              <Text style={{fontSize:height*0.03,marginLeft:width*0.08}} className="font-bold text-[#FFF] ">
                Generos
              </Text>
            </View>
          </View>

          <View className="bg-[#27262b]" style={{ padding: width * 0.05 ,height:height*0.3}}>
          <FlatList overScrollMode='never' 
                data={genres} 
                renderItem={({item}) => <GenresCards key={item.id} name={item.name} data={item.genere}/>}
                keyExtractor={(e) => e.id}   
                />
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
