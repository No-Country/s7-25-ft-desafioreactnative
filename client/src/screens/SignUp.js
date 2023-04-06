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
  Alert,
} from "react-native";
import { AtIcon, LockIcon, EyeIcon, ProfileIcon } from "../components/Icons";
import InputField from "../components/InputField";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import backgroundImage from "../../assets/signup-bg.png";
import { registerUser } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const SignUp = () => {
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(false);
  const [passwordReveal, setPasswordReveal] = useState(true);
  const [eyeColor, setEyeColor] = useState("#EEEEEE");
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigation = useNavigation();

  const createTwoButtonAlert = () =>
    Alert.alert("Felicidades", "¡Tu cuenta ha sido registrada!", [
      { text: "Iniciar sesión", onPress: () => navigation.navigate("SignIn") },
    ]);

  const dispatch = useDispatch();
  const userState = useSelector((state) => state.users);

  const loading = userState.loading,
    user = userState.users.data;

  useEffect(() => {
    console.log("LOADING STATE", loading);
    console.log("USER DATA", user);
  }, [loading]);

  const handleValidation = async () => {
    Keyboard.dismiss();
    setValid(true);

    if (!formData.userName) {
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
    if (!formData.confirmPassword) {
      handleError("Por favor, confirme su contraseña", "confirmPassword");
      setValid(false);
    } else if (formData.password !== formData.confirmPassword) {
      handleError(
        "Las contraseñas no coninciden, por favor inténtelo de nuevo",
        "confirmPassword"
      );
      setValid(false);
    }

    if (valid) {
      dispatch(registerUser(formData));
    }
    if (valid && loading === false) {
      formData.email = "";
      formData.userName = "";
      formData.password = "";
      formData.confirmPassword = "";
      createTwoButtonAlert();
    }
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

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
                    placeholder="Nombre de Usuario"
                    onChangeText={(text) =>
                      setFormData({ ...formData, userName: text })
                    }
                    error={errors.userName}
                    value={formData.userName}
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
                      setFormData({ ...formData, confirmPassword: text })
                    }
                    error={errors.confirmPassword}
                    value={formData.confirmPassword}
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
