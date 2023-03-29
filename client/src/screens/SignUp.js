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

const SignUp = () => {
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
      setScreen(1);
    }
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const navigation = useNavigation();

  return (
    <>
      <View
        className="flex-1 gap-y-2 px-4 pb-8 lg:px-8 lg:py-8 w-full justify-center bg-black"
        style={{ paddingTop: StatusBar.currentHeight }}
      >
        <KeyboardAvoidingView>
          <ScrollView>
            <Text className="text-4xl mb-10 font-bold text-left text-white">
              Registrarse
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
              <InputField
                className="my-4"
                label="Confirma tu contraseña"
                placeholder="Repite tu contraseña"
                onChangeText={(text) =>
                  setFormData({ ...formData, confirmPassword: text })
                }
                error={errors.confirmPassword}
                password
                value={formData.confirmPassword}
              />
              <View className=" bg-[#EEEEEE] rounded-md mb-4 mt-10">
                <Pressable
                  onPress={handleValidation}
                  className="p-3 rounded-md"
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
                  <Text className="text-white text-center font-bold text-lg">
                    Iniciar sesión
                  </Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

export default SignUp;
