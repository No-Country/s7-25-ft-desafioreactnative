import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUp from "../screens/SignUp";
import SignIn from "../screens/SignIn";
import BottomTabNavigator from "./BottomTabNavigator";
import { useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import OnBoardingNavigation from "./OnBoardingNavigation";

const Stack = createNativeStackNavigator();

function StackNavigation() {
  const Navigate = useNavigation();

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem("@viewedOnboarding");
      if (value !== null) {
        Navigate.navigate('SignIn');
        console.log(value)
      } else if (value == null) {
        console.log(value)
        Navigate.navigate('OnBoardingNavigation');
      }
    } catch (err) {
      console.log("Error @checkOnboarding: ", err);
    }
  };
  useEffect(() => {
    checkOnboarding();
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen name="OnBoardingNavigation" component={OnBoardingNavigation} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Home" component={BottomTabNavigator} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default StackNavigation;
