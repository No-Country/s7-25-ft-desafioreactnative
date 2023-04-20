import { View, Text, Dimensions } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Explore from "../screens/Explore";
import Radio from "../screens/Radio";
import Account from "../screens/Account";
import FavoriteTabs from "../screens/FavoriteTabs";
import Search from "../screens/Search";

import {
  MenuIcon,
  ExploreIcon,
  HomeIcon,
  FavouritesIcon,
} from "../components/Icons";
import MusicPlayer from "../screens/MusicPlayer";

const Tab = createBottomTabNavigator();
const Height = Dimensions.get('window').height;

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "#CBFB5E",
        tabBarInactiveTintColor: "#71737B",
        tabBarLabelStyle: { fontWeight: "bold", },
        headerStyle: {
          backgroundColor: "#0E0B1F",
          borderBottomWidth: 0,
        },
        headerTintColor: "#EEEEEE",
        tabBarStyle: { backgroundColor: "#0E0B1F",borderTopWidth:0,height:Height*0.08 },
        tabBarItemStyle:{marginVertical:Height*0.019}
      }}
    >
      <Tab.Screen
        options={() => ({
          tabBarLabel: "Inicio",
          tabBarIcon: (props) => <HomeIcon color={props.color} />, 
          headerShown:false,
          
        })}
        name="Inicio"
        component={Home}
      />
      <Tab.Screen
        name="Explore"
        component={Search}
        options={({ route }) => ({
          tabBarLabel: "Explorar",
          headerShown: false,
          tabBarIcon: (props) => <ExploreIcon color={props.color} />,
        })}
      />
      <Tab.Screen
        name="Radio"
        component={FavoriteTabs}
        options={({ route }) => ({
          tabBarLabel: "Favoritos",
          headerShown:false,
          tabBarIcon: (props) => <FavouritesIcon color={props.color} />,
        })}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={({ route }) => ({
          tabBarLabel: "Menu",
          tabBarIcon: (props) => <MenuIcon color={props.color} />,
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
