import React from "react";

const currencyFormat = (num) => {
  const formatter = new Intl.NumberFormat(undefined, {
    currency: "USD",
    style: "currency",
  });

  return formatter.format(num);
};

export default currencyFormat;
