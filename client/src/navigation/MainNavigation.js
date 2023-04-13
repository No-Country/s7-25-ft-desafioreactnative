import { createNativeStackNavigator } from "@react-navigation/native-stack";
import userInfo from "../redux/utils/userInfo";
import BottomTabNavigator from "./BottomTabNavigator";
import StackNavigation from "./StackNavigation";

const Stack = createNativeStackNavigator();

export default function MainNavigation() {
  const { loggedInUser } = userInfo();
  // return loggedInUser ? <BottomTabNavigator /> : <StackNavigation />;
  return(<BottomTabNavigator />)
}
