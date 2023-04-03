import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreenPrueba";
import Explore from "../screens/Explore";
import Radio from "../screens/Radio";
import Account from "../screens/Account";
import {
  AccountIcon,
  ExploreIcon,
  HomeIcon,
  RadioIcon,
} from "../components/Icons";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#CBFB5E",
        tabBarInactiveTintColor: "#EEEEEE",
        tabBarLabelStyle: { fontWeight: "bold" },
        headerStyle: {
          backgroundColor: "#0E0B1F",
          borderBottomWidth: 0,
        },
        headerTintColor: "#EEEEEE",
        tabBarStyle: { backgroundColor: "#0E0B1F" },
      }}
    >
      <Tab.Screen
        options={() => ({
          tabBarIcon: (props) => <HomeIcon color={props.color} />,
        })}
        name="Inicio"
        component={HomeScreen}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={({ route }) => ({
          tabBarLabel: "Explorar",
          tabBarIcon: (props) => <ExploreIcon color={props.color} />,
        })}
      />
      <Tab.Screen
        name="Radio"
        component={Radio}
        options={({ route }) => ({
          tabBarLabel: "Radio",
          tabBarIcon: (props) => <RadioIcon color={props.color} />,
        })}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={({ route }) => ({
          tabBarLabel: "Perfil",
          tabBarIcon: (props) => <AccountIcon color={props.color} />,
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
