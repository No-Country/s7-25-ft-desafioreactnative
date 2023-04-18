import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import axios from "axios";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Favorite from "../components/Favorite.jsx";

const Tab = createMaterialTopTabNavigator();

const FavoriteTabs = () => {

  return (
    <View className="flex-1 bg-brandBlue pt-4">
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#CBFB5E",
          tabBarLabelStyle: {
            fontSize: 18,
            fontWeight: "700",
            fontFamily: "Roboto",
            textTransform: "capitalize",
          },
          tabBarInactiveTintColor: "#ffffff",
          tabBarStyle: { backgroundColor: "transparent" },
          tabBarIndicatorStyle: {
            backgroundColor: "#CBFB5E",
            height: 5,
          },
        }}
      >
        <Tab.Screen name="Pistas" component={Favorite} />
        <Tab.Screen name="Música" component={Favorite} />
        <Tab.Screen name="Álbumes" component={Favorite} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryBox: {
    width: 55,
  },
  text: {
    color: "#CBFB5E",
    fontWeight: "700",
  },
  underlined: {
    height: 2,
    backgroundColor: "#CBFB5E",
  },
});

export default FavoriteTabs;
