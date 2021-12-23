import React, { FC } from "react";
import { truncateNumber } from "../Utils/functions";

interface IProductDetails {
  totalPriceWithoutDiscount: number;
  totalPriceWithDiscount: number;
}

export const ProductsDetails: FC<IProductDetails> = ({
  totalPriceWithDiscount,
  totalPriceWithoutDiscount,
}) => {
  const truncatedTotalPriceWithoutDiscount = parseFloat(
    truncateNumber(totalPriceWithoutDiscount)
  );
  const truncatedTotalPriceWithDiscount = parseFloat(
    truncateNumber(totalPriceWithDiscount)
  );
  const saved = truncateNumber(
    truncatedTotalPriceWithoutDiscount - truncatedTotalPriceWithDiscount
  );
  return (
    <>
      <p>Price without discount: ${truncatedTotalPriceWithoutDiscount}</p>
      <p>Price with discount: ${truncatedTotalPriceWithDiscount}</p>
      <p>Saved: ${saved}</p>
    </>
  );
};
