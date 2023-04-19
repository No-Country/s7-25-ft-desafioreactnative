import React from "react";
import { View, StyleSheet } from "react-native";
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
            marginTop:30
          },
          tabBarInactiveTintColor: "#ffffff",
          tabBarStyle: { backgroundColor: "transparent" },
          tabBarIndicatorStyle: {
            backgroundColor: "#CBFB5E",
            height: 5,
          },
        }}
      >
        <Tab.Screen name="Publicadas" component={Favorite} initialParams={{ type: "owner"}}/>
        <Tab.Screen name="Compradas" component={Favorite} initialParams={{ type: "buy"}}/>
        <Tab.Screen name="Favoritas" component={Favorite} initialParams={{ type: "favorite"}} />
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
