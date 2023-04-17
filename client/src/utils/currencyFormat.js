import React from "react";

const currencyFormat = (num) => {
  const formatter = new Intl.NumberFormat(undefined, {
    currency: "ARS",
    style: "currency",
  });

  return formatter.format(num);
};

export default currencyFormat;
