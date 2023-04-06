import {
  Text,
  View,
  Pressable,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { AtIcon, LockIcon, EyeIcon, ProfileIcon } from "../components/Icons";
import InputField from "../components/InputField";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import backgroundImage from "../../assets/signup-bg.png";

const SignUp = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);
  const [passwordReveal, setPasswordReveal] = useState(true);
  const [eyeColor, setEyeColor] = useState("#EEEEEE");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleValidation = async () => {
    Keyboard.dismiss();
    setValid(true);
    setLoading(true);

    if (!formData.name) {
      handleError("Por favor, introduzca su nombre", "name");
      setValid(false);
    }
    if (!formData.email) {
      handleError("Por favor, introduzca su correo electrónico", "email");
      setValid(false);
    }
    if (!formData.password) {
      handleError("Por favor, confirme su contraseña", "password");
      setValid(false);
    }
    setLoading(false);
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const navigation = useNavigation();

  const handlePasswordVisibility = () => {
    setPasswordReveal(!passwordReveal);
    setEyeColor((prevEyeColor) =>
      prevEyeColor === "#EEEEEE" ? "#CBFB5E" : "#EEEEEE"
    );
  };

  return (
    <>
      <ImageBackground
        source={backgroundImage}
        style={{ flex: 1 }}
        className="bg-black opacity-85"
      >
        <View
          className="flex-1 gap-y-2 px-8 pb-8 lg:px-8 lg:py-8 w-full justify-center"
          style={{ paddingTop: StatusBar.currentHeight }}
        >
          <ActivityIndicator
            animating={loading ? true : false}
            color="#CBFB5E"
            className="self-center absolute m-auto z-10"
            size="large"
          />
          <KeyboardAvoidingView keyboardShouldPersistTaps={true}>
            <ScrollView>
              <Text className="text-4xl mb-10 font-bold text-left text-[#FFFFFF]">
                Registrarse
              </Text>

              <View>
                <View className="flex-1 flex-row items-center my-2">
                  <View className="flex-1 flex-row items-center">
                    <ProfileIcon />
                  </View>
                  <InputField
                    className=" text-[#FFFFFF]  placeholder:py-0 placeholder:mb-3 placeholder:pl-10  "
                    placeholder="Nombre"
                    onChangeText={(text) =>
                      setFormData({ ...formData, name: text })
                    }
                    error={errors.name}
                    value={formData.name}
                    underlineColorAndroid="transparent"
                  />
                </View>

                <View className="flex-1 flex-row items-center my-2">
                  <View className="flex-1 flex-row items-center">
                    <AtIcon />
                  </View>
                  <InputField
                    className=" text-[#FFFFFF] placeholder:py-0 placeholder:mb-3 placeholder:pl-10  "
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
                  <Pressable
                    className="absolute right-1 flex-row items-center justify-center w-10 h-10 z-50"
                    onPress={handlePasswordVisibility}
                  >
                    <EyeIcon color={eyeColor} />
                  </Pressable>
                  <InputField
                    className=" text-[#FFFFFF] placeholder:py-0 placeholder:mb-3 placeholder:pl-10  "
                    placeholder="Contraseña"
                    onChangeText={(text) =>
                      setFormData({ ...formData, password: text })
                    }
                    error={errors.password}
                    value={formData.password}
                    underlineColorAndroid="transparent"
                    secureTextEntry={passwordReveal}
                  />
                </View>
                <View className="bg-brandGreen rounded-full mb-6 mt-6 ">
                  <Pressable
                    onPress={handleValidation}
                    className="p-3 rounded-full"
                  >
                    <Text className="text-black text-center font-bold text-lg">
                      Registrarme
                    </Text>
                  </Pressable>
                </View>

                <View>
                  <Pressable
                    onPress={() => navigation.navigate("SignIn")}
                    className=" p-3 rounded-md"
                  >
                    <Text className="text-[#FFFFFF] text-center font-bold text-lg">
                      Iniciar sesión
                    </Text>
                  </Pressable>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    </>
  );
};

export default SignUp;
