import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUp from "../screens/SignUp";
import SignIn from "../screens/SignIn";
import OnBoardingNavigation from "./OnBoardingNavigation";
import BottomTabNavigator from "./BottomTabNavigator";
import OnBoardingView from "../components/OnBoardingView";

const Stack = createNativeStackNavigator();

function StackNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="OnBoardingNavigation"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Group>
        <Stack.Screen name="OnBoardingNavigation" component={OnBoardingView}/>
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Home" component={BottomTabNavigator} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default StackNavigation;
