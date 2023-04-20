import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";
import MusicPlayer from "../screens/MusicPlayer";
import PlayingSong from "../screens/PlayingSong";
import CreateTrack from '../screens/CreateTrack';
const Stack = createNativeStackNavigator();

function StackNavigation() {

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
          }}
          name="PlayingSong"
          component={PlayingSong}
        />
        <Stack.Screen options={{
            headerMode: "modal",
            title: "",
          }} 
          name={'CreateTrack'} component={CreateTrack}  
          />
          
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default StackNavigation;
