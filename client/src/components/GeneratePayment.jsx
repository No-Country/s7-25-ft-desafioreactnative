import React, { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import axios from "axios";
import { CardField, CardForm, useStripe } from "@stripe/stripe-react-native";

const GeneratePayment = () => {
  const { confirmPayment } = useStripe();
  const [card, setCard] = useState();

  const handlePayPress = async () => {
    /* const { data } = await axios.post("/api/v1/tracks/generatePayment", {
      amount: 200,
    }); */

    try {
      const { paymentIntent, error } = await confirmPayment("", {
        type: "Card",
        billingDetails: {
          name: "Jenny Rosen",
        },
        card: {
          number: "4242 4242 4242 4242",
          expMonth: "12",
          expYear: "36",
          cvc: "567",
        },
      });

      if (error) {
        console.log("Payment confirmation failed", error);
      } else {
        console.log("Payment confirmed successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{ height: "100%", alignSelf: "center", justifyContent: "center" }}
    >
       <CardForm
        cardStyle={{
          backgroundColor: "white",
          borderColor: "black",
          borderWidth: 3,
          borderRadius: 2,
          cursorColor: "gray",
          placeholderColor: "gray",
          textColor: "black",
          textErrorColor: "red",
          fontFamily: "roboto",
        }}
        placeholders={{
          number: "424242424242",
          expiration: "12/36",
          cvc: "354",
        }}
        style={{ width: 380, height: 200 }}
      />
      <Button onPress={handlePayPress} title="Pay" />
    </View>
  );
};

export default GeneratePayment;
