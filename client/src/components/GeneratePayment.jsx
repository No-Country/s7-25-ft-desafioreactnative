import React, { useState } from "react";
import { View, Button } from "react-native";
import axios from "axios";
import {
  CardField,
  useConfirmPayment,
  createPaymentMethod,
  useStripe
} from "@stripe/stripe-react-native";

const GeneratePayment = () => {
  const [card, setCard] = useState();
  const { createPaymentMethod, handleNextAction } = useStripe();
  /* const { confirmPayment, loading } = useConfirmPayment(); */

  const handlePayPress = async () => {
    try {
      const { paymentMethod, error } = await createPaymentMethod({
        /* card, */
        billingDetails: {
          email: "johndoe@example.com",
        },
      });

      /* const { data } = await axios.post("/api/v1/tracks/generatePayment", {
      amount: 200,
    });
 */

    console.log(paymentMethod)

      if (error) {
        console.log("Payment method creation failed", error);
      } else {
        /* console.log("Payment method created successfully", paymentMethod);
        const { paymentIntent, error } = await confirmPayment(
          // data.clientSecret
          "pi_3Mxg2BEKcgSZKCjS0Agry3kb_secret_CFSqkNbGRnMBGrHWIrVIIv3ds",
          {
            paymentMethodId: paymentMethod?.id,
          }
        );

        if (error) {
          console.log("Payment confirmation failed", error);
        } else {
          console.log("Payment confirmed successfully");
        } */
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{ height: "100%", alignSelf: "center", justifyContent: "center" }}
    >
      <CardField
        postalCodeEnabled={false}
        autofocus
        cardStyle={{
          borderWidth: 1,
          backgroundColor: "#FFFFFF",
          borderColor: "#000000",
          borderRadius: 8,
          fontSize: 14,
          fontFamily: "Roboto",
          placeholderColor: "#BBBBBB",
          textColor: "#777777",
        }}
        placeholders={{
          number: "Numero de tarjeta",
          expiration: "Fecha expirar",
          cvc: "CVC",
        }}
        style={{ width: 360, height: 80 }}
        onCardChange={(cardDetails) => {
          setCard(cardDetails);
        }}
      />
      <Button
        onPress={handlePayPress}
        title="Pay"
        disabled={!card?.complete}
      />
    </View>
  );
};

export default GeneratePayment;
