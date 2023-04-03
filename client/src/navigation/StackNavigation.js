import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUp from "../screens/SignUp";
import SignIn from "../screens/SignIn";
import OnBoardingNavigation from "./OnBoardingNavigation";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createNativeStackNavigator();

function StackNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="OnBoarding"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Group>
        <Stack.Screen
          name="OnBoardingNavigation"
          component={OnBoardingNavigation}
        />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Home" component={BottomTabNavigator} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default StackNavigation;
