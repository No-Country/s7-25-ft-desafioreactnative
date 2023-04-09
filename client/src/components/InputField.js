import { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const COLORS = {
  white: "#fff",
  black: "#1A1A1A",
  blue: "#5D5FEE",
  grey: "rgb(75 85 99)",
  light: "#d8d8d8",
  darkBlue: "#7978B5",
  red: "#ff0000",
};
const InputField = ({
  label,
  error,
  password,
  placeholder,
  onFocus = () => {},
  ...props
}) => {
  const [hidePassword, setHidePassword] = useState(password);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="mb-3">
      <Text className="text-sm font-bold mb-1">{label}</Text>
      <View
        className="w-full overflow-hidden"
        style={[
          style.inputContainer,
          {
            borderBottomColor: error
              ? COLORS.red
              : isFocused
              ? COLORS.white
              : COLORS.grey,
            alignItems: "center",
            borderTopColor: "transparent",
            borderLeftColor: "transparent",
            borderRightColor: "transparent",
          },
        ]}
      >
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          className={
            "flex w-full justify-center  px-3 h-full rounded-md text-white relative"
          }
          placeholder={placeholder}
          placeholderTextColor="white"
          {...props}
        />
      </View>

      {error && (
        <Text className="absolute bottom-[-20] text-xs color-[#ff0000]">
          {error}
        </Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    borderWidth: 0.5,
  },
});

export default InputField;
