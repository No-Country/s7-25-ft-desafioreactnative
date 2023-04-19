import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";
import { useNavigation } from "@react-navigation/native";
import MusicPlayer from "../screens/MusicPlayer";
import PlayingSong from "../screens/PlayingSong";

const Stack = createNativeStackNavigator();

function StackNavigation() {
  const Navigate = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Stack.Group>
        <Stack.Screen name="Home" component={BottomTabNavigator} />
        <Stack.Screen
          options={{
            headerBackButtonMenuEnabled: true,
            headerShown: true,
            headerMode: "screen",
            headerStyle: { backgroundColor: "#0E0B1F" },
            headerTintColor: "#FFF",
            title: "",
          }}
          name="MusicPlayer"
          component={MusicPlayer}
        />
        <Stack.Screen
          options={{
            headerMode: "modal",
            title: "",
            animation: "slide_from_bottom",
            presentation: "modal",
          }}
          name="PlayingSong"
          component={PlayingSong}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default StackNavigation;
