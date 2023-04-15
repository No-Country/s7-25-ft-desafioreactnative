import React, { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import createPreference from "../utils/createPreference"

const GeneratePayment = () => {
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [preferenceId, setPreferenceId] = useState("");

  const handleCreatePreference = async (preference) => {
    try {
      const res = await createPreference(100, "nico@hotmail.com");
      /* setPreferenceId(res); */
      console.log(res)
    } catch (error) {
      console.error(error);
      alert("Error creating preference");
    }
  };

  return (
    <View
      style={{ height: "100%", alignSelf: "center", justifyContent: "center" }}
    >
      <TextInput
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Create preference" onPress={handleCreatePreference} />
      <Text>Preference ID: {preferenceId}</Text>
    </View>
  );
};

export default GeneratePayment;
