import {
  Text,
  View,
  Pressable,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  ActivityIndicator,
  Alert,
} from "react-native";
import InputField from "../components/InputField";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AtIcon } from "../components/Icons";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../redux/actions/userActions";
import userInfo from "../redux/utils/userInfo";
import ValidateEmail from "../utils/validateEmail";

export default function ForgotPassword() {
  const [errors, setErrors] = useState("");
  const [valid, setValid] = useState(false);
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const { loading, reqStatus, actionError } = userInfo();

  const passwordEmailSent = () =>
    Alert.alert(
      "¡Super!",
      "Te hemos enviado un correo con instrucciones para el cambio de tu contraseña",
      [{ text: "Vale", onPress: () => navigation.navigate("SignIn") }]
    );

  const passwordEmailError = () =>
    Alert.alert("Algo salió mal", `${actionError}`, [{ text: "OK" }]);

  const handleValidation = async () => {
    Keyboard.dismiss();
    setValid(true);

    if (!email) {
      handleError("Por favor, introduzca su correo electrónico");
      setValid(false);
    }
    if (!ValidateEmail(email)) {
      handleError("Por favor, introduzca un correo electrónico válido");
      setValid(false);
    }
    if (valid) {
      dispatch(forgotPassword(email));
    }

    if (valid && reqStatus === "success") {
      passwordEmailSent();
    }
    if (!errors && reqStatus === "rejected") {
      passwordEmailError();
    }
  };

  const handleError = (error) => {
    setErrors(error);
  };

  const navigation = useNavigation();

  return (
    <>
      <View
        className="flex-1 gap-y-6 px-6 pb-8 lg:px-8 lg:py-8 w-full bg-brandBlue opacity-85"
        style={{ paddingTop: StatusBar.currentHeight }}
      >
        <ActivityIndicator
          animating={loading ? true : false}
          color="#CBFB5E"
          className="self-center absolute m-auto z-10"
          size="large"
        />
        <KeyboardAvoidingView>
          <ScrollView className="gap-4">
            <Text className="text-2xl mb-6 font-bold text-left text-[#FFFFFF]">
              ¿Olvidaste tu contraseña?
            </Text>
            <Text className="text-1xl mb-10 text-left text-[#FFFFFF] w-80 self-center">
              Si necesitas ayuda para restablecer tu contraseña, podemos
              ayudarte enviandote un enlace.
            </Text>
            <View>
              <View className="flex-1 flex-row items-center my-2">
                <View className="flex-1 flex-row items-center">
                  <AtIcon />
                </View>
                <InputField
                  className=" text-[#FFFFFF]  placeholder:py-0 placeholder:mb-3 placeholder:pl-10  "
                  placeholder="E-Mail"
                  onChangeText={(text) => {
                    setEmail(text);
                    if (errors) {
                      setErrors("");
                    }
                  }}
                  error={errors}
                  value={email.toLocaleLowerCase().trim()}
                  underlineColorAndroid="transparent"
                />
              </View>

              <View className="bg-brandGreen rounded-full mt-14 mb-16">
                <Pressable
                  onPress={handleValidation}
                  className="p-3 rounded-full"
                >
                  <Text className="text-black text-center font-bold text-lg">
                    ENVIAR
                  </Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </>
  );
}
