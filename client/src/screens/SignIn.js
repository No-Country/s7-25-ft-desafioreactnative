import {
  Text,
  View,
  Pressable,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
} from "react-native";
import InputField from "../components/InputField";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

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
      <View
        className="flex-1 gap-y-2 px-8 pb-8 lg:px-8 lg:py-8 w-full justify-center bg-black"
        style={{ paddingTop: StatusBar.currentHeight }}
      >
        <KeyboardAvoidingView>
          <ScrollView>
            <Text className="text-4xl mb-10 font-bold text-left text-white">
              Iniciar sesión
            </Text>
            <View>
              <InputField
                className="my-4 "
                label="E-Mail"
                placeholder="Tu correo electrónico"
                onChangeText={(text) =>
                  setFormData({ ...formData, email: text })
                }
                error={errors.email}
                value={formData.email}
              />
              <InputField
                className="my-4"
                label="Contraseña"
                placeholder="Tu contraseña"
                onChangeText={(text) =>
                  setFormData({ ...formData, password: text })
                }
                error={errors.password}
                password
                value={formData.password}
              />

              <View>
                <Text className="text-white text-right my-6">
                  ¿Olvidaste tu contraseña?
                </Text>
              </View>
              <View className=" bg-[#EEEEEE] rounded-md mb-4 mt-1 mb-16">
                <Pressable
                  onPress={handleValidation}
                  className="p-3 rounded-md"
                >
                  <Text className="text-black text-center font-bold text-lg">
                    Iniciar sesión
                  </Text>
                </Pressable>
              </View>
              <View className="flex-row justify-center items-center ">
                <View className=" bg-[#EEEEEE] h-[1px] w-4/12"></View>
                <Text className="text-white text-center mx-2">
                  O conectate con
                </Text>

                <View className=" bg-[#EEEEEE] h-[1px] w-4/12"></View>
              </View>

              <View className="flex-row justify-center gap-4 mt-2">
                <View className=" bg-[#EEEEEE] rounded-full mb-4 mt-1 w-10 h-10">
                  <Pressable
                    onPress={handleValidation}
                    className="p-3 rounded-full"
                  ></Pressable>
                </View>
                <View className=" bg-[#EEEEEE] rounded-full mb-4 mt-1 w-10 h-10">
                  <Pressable
                    onPress={handleValidation}
                    className="p-3 rounded-full"
                  ></Pressable>
                </View>
                <View className=" bg-[#EEEEEE] rounded-full mb-4 mt-1 w-10 h-10">
                  <Pressable
                    onPress={handleValidation}
                    className="p-3 rounded-full"
                  ></Pressable>
                </View>
              </View>
              <View className="align-start">
                <Text
                  onPress={() => {
                    navigation.navigate("SignUp");
                  }}
                  className="text-white text-center my-10"
                >
                  ¿Aún no tienes una cuenta? Regístrate aquí
                </Text>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

export default SignIn;
