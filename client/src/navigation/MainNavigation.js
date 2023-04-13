import { createNativeStackNavigator } from "@react-navigation/native-stack";
import userInfo from "../redux/utils/userInfo";
import AuthNavigation from "./AuthNavigation";
import StackNavigation from "./StackNavigation";

const Stack = createNativeStackNavigator();

export default function MainNavigation() {
  const { loggedInUser } = userInfo();
  return loggedInUser ? <AuthNavigation /> : <StackNavigation />;
  // return loggedInUser ? <AuthNavigation /> : <StackNavigation />;
}
