import React, { useState } from "react";
import { View, Button } from "react-native";
import axios from "axios";
import {
  CardForm,
  confirmPayment,
  useStripe,
  createPaymentMethod,
} from "@stripe/stripe-react-native";

const GeneratePayment = () => {
  const [card, setCard] = useState();
  const { createPaymentMethod, handleNextAction } = useStripe();

  const handlePayPress = async () => {
    try {
      const { paymentMethod, error } = await createPaymentMethod({
        paymentMethodType: "Card",
        paymentMethodData: {
          card,
          billingDetails: {
            email: "prueba@gmail.com",
          },
        },
      });

      if (error) {
        console.log("Payment method creation failed", error);
      } else {
        const { data } = await axios.post("/api/v1/tracks/makePayment", {
          amount: 200,
          paymentMethodId: paymentMethod.id,
        });

        if (data.status === "success") {
          console.log("Payment made successfully");
          const res = await axios.post("/api/v1/tracks/completePurchase", {
            userId : "8422f820-b70a-4937-8642-141f25a42856",
            trackId: "1f26cdf8-ff78-4be1-a75b-adf14eb29289"
          })
          console.log(res.data)
        } else {
          console.log("Payment declined");
        }
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
        postalCodeEnabled={false}
        autofocus
        cardStyle={{
          borderWidth: 1,
          backgroundColor: "#FFFFFF",
          borderColor: "#000000",
          borderRadius: 8,
          fontSize: 16,
          fontFamily: "Roboto",
          placeholderColor: "#BBBBBB",
          textColor: "#777777",
        }}
        placeholders={{
          number: "Numero de tarjeta",
          expiration: "Fecha expirar",
          cvc: "CVC",
        }}
        style={{ width: 360, height: 300 }}
        onFormComplete={(cardDetails) => setCard(cardDetails)}
      />
      <Button onPress={handlePayPress} title="Pay" disabled={!card?.complete} />
    </View>
  );
};

export default GeneratePayment;
