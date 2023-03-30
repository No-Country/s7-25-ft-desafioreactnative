import {
  Text,
  View,
  Pressable,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  ImageBackground,
} from "react-native";
import InputField from "../components/InputField";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import backgroundImage from "../../assets/signin-bg.png";
import {
  AtIcon,
  LockIcon,
  EyeIcon,
  FacebookIcon,
  GoogleIcon,
  TwitterIcon,
} from "../components/Icons";

const SignIn = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);
  const [screen, setScreen] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    city: "",
  });

  const handleValidation = async () => {
    Keyboard.dismiss();
    setValid(true);

    if (!formData.email) {
      handleError("Por favor, introduzca su correo electrónico", "email");
      setValid(false);
    }
    if (!formData.password) {
      handleError("Por favor, introduzca su contraseña", "password");
      setValid(false);
    }
    if (valid) {
      console.log("Formulario validado");
    }
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const navigation = useNavigation();

  return (
    <>
      <ImageBackground
        source={backgroundImage}
        style={{ flex: 1 }}
        className="bg-black opacity-85"
      >
        <View
          className="flex-1 gap-y-2 px-8 pb-8 lg:px-8 lg:py-8 w-full justify-center "
          style={{ paddingTop: StatusBar.currentHeight }}
        >
          <KeyboardAvoidingView>
            <ScrollView>
              <Text className="text-4xl mb-10 font-bold text-left text-white">
                Iniciar sesión
              </Text>
              <View>
                <View className="flex-1 flex-row items-center my-2">
                  <View className="flex-1 flex-row items-center">
                    <AtIcon />
                  </View>
                  <InputField
                    className=" text-white placeholder:font-bold placeholder:py-0 placeholder:mb-3 placeholder:pl-10  "
                    placeholder="E-Mail"
                    onChangeText={(text) =>
                      setFormData({ ...formData, email: text })
                    }
                    error={errors.email}
                    value={formData.email}
                    underlineColorAndroid="transparent"
                  />
                </View>

                <View className="flex-1 flex-row items-center my-2 ">
                  <View className="flex-1 flex-row items-center">
                    <LockIcon />
                  </View>
                  <View className="absolute right-1 flex-row items-center">
                    <EyeIcon />
                  </View>
                  <InputField
                    className=" text-white placeholder:font-bold placeholder:py-0 placeholder:mb-3 placeholder:pl-10  "
                    placeholder="Contraseña"
                    onChangeText={(text) =>
                      setFormData({ ...formData, password: text })
                    }
                    error={errors.password}
                    password
                    value={formData.password}
                    underlineColorAndroid="transparent"
                  />
                </View>

                <View>
                  <Text className="text-white text-right my-6">
                    ¿Olvidaste tu contraseña?
                  </Text>
                </View>
                <View className="bg-brandGreen rounded-full mb-4 mt-1 mb-16">
                  <Pressable
                    onPress={handleValidation}
                    className="p-3 rounded-full"
                  >
                    <Text className="text-black text-center font-bold text-lg">
                      INICIAR SESIÓN
                    </Text>
                  </Pressable>
                </View>
                <View className="flex-row justify-center items-center ">
                  <View className=" bg-[#EEEEEE] h-[1px] w-4/12"></View>
                  <Text className="text-white text-center mx-2">
                    O registrate con
                  </Text>

                  <View className=" bg-[#EEEEEE] h-[1px] w-4/12"></View>
                </View>

                <View className="flex-row justify-center gap-4 mt-2">
                  <View className=" bg-[#3B5998] justify-center items-center rounded-full mb-4 mt-1 w-10 h-10">
                    <Pressable
                      onPress={handleValidation}
                      className="p-3 rounded-full"
                    >
                      <FacebookIcon />
                    </Pressable>
                  </View>
                  <View className=" bg-[#DC4E41] justify-center items-center rounded-full mb-4 mt-1 w-10 h-10">
                    <Pressable
                      onPress={handleValidation}
                      className="p-3 rounded-full"
                    >
                      <GoogleIcon />
                    </Pressable>
                  </View>
                  <View className=" bg-[#55ACEE] justify-center items-center rounded-full mb-4 mt-1 w-10 h-10">
                    <Pressable
                      onPress={handleValidation}
                      className="p-3 rounded-full"
                    >
                      <TwitterIcon />
                    </Pressable>
                  </View>
                </View>
                <View className="justify-center flex-row">
                  <Text className="text-white text-center my-10">
                    ¿Aún no tienes una cuenta?
                  </Text>
                  <Text
                    onPress={() => {
                      navigation.navigate("SignUp");
                    }}
                    className="text-brandGreen text-center my-10"
                  >
                    {" "}
                    Regístrate
                  </Text>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    </>
  );
};

export default SignIn;
