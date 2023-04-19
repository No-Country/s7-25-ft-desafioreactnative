import React, { useEffect, useState } from "react";
import { FlatList, Image, TouchableOpacity, useWindowDimensions } from "react-native";
import { View, Modal, Text, TouchableWithoutFeedback } from "react-native";
import axios from "axios";


const BaseURL = 'http://192.168.0.12:4000';

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
      <TouchableOpacity onPress={()=>{onTitle(name); onData(data)}}>
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
        
    axios.get(`${BaseURL}/api/v1/genres`,{headers:{'Authorization':"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNlMDIyZjE5LTc5Y2UtNDhmMC1hNzY0LWJhZWEzNjRmMjAxNiIsImlhdCI6MTY4MTc2MjkwNSwiZXhwIjoxNjg0MzU0OTA1fQ.I7jKyOGmZ-YD0kvz5YJcL3O0aTC0hv8SN1sAjTfmiPs"}})
    
    .then((response) => {
      const data = response.data.genres;
      const dataMasTodos = [{id:0,name:"Todos",genere:""}].concat(data);
      for (let i = 1; i < data.length; i++) {
        data[i].genere = `&genres[]=${data[i].name}`;
      }
      setgenres(dataMasTodos);
      
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
