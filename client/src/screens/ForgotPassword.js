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
  Dimensions,
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

  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;

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
        className="flex-1 gap-y-6 px-6 pb-8 lg:px-8 lg:py-8 w-full bg-brandBlue"
        style={{ paddingTop: StatusBar.currentHeight }}
      >
        <ActivityIndicator
          animating={loading ? true : false}
          color="#CBFB5E"
          className="self-center absolute m-auto z-10"
          size="large"
        />
        <KeyboardAvoidingView>
          <ScrollView>
            <Text style={{fontSize:height*0.036,marginVertical:height*0.015}} className=" mb-6 font-bold text-[#FFFFFF] self-start">
              ¿Olvidaste tu contraseña?
            </Text>
            <Text style={{fontSize:height*0.017,lineHeight:height*0.027,marginVertical:height*0.023}} className=" text-[#FFFFFF] self-start">
              Si necesitas ayuda para restablecer tu contraseña,{'\n'}podemos
              ayudarte enviandote un enlace para{'\n'}restablecerla.
            </Text>
            <View>
              <View style={{marginVertical:height*0.015,width:width*0.85}} className="flex-1 flex-row self-center items-center">
                <View className="flex-1 flex-row items-center">
                  <AtIcon />
                </View>
                <InputField 
                  className=" text-[#FFFFFF]  placeholder:py-0 placeholder:mb-2 placeholder:pl-10  "
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

                <Pressable style={{marginVertical:height*0.045,height:height*0.055,width:width*0.8}}
                  onPress={handleValidation}
                  className="bg-brandGreen rounded-full justify-center self-center"
                >
                  <Text style={{fontSize:height*0.020}} className="text-neutralMarineBlue text-center font-bold">
                    ENVIAR
                  </Text>
                </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </>
  );
}
