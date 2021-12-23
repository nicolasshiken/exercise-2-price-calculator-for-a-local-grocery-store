import React, { FC, useState } from "react";
import { ProductsDetails } from "./ProductsDetails";
import { ProductsTable } from "./ProductsTable";
import { PRODUCTS } from "../Constants/Products";
import { getDiscountedPrice, getTotalPrice } from "../Utils/functions";
import { IAddedProduct } from "../Utils/types";

export const PriceCalculator: FC = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [addedProducts, setAddedProducts] = useState<IAddedProduct[]>([]);
  const [totalPriceWithoutDiscount, setTotalPriceWithoutDiscount] =
    useState<number>(0);
  const [totalPriceWithDiscount, setTotalPriceWithDiscount] =
    useState<number>(0);

  const handleProductAdd = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (inputValue.length > 0) {
      const product = PRODUCTS.find((product) => product.name === inputValue);
      if (!product) {
        return window.alert(`Product ${inputValue} doesn't exist`);
      }
      const productName = inputValue.toLowerCase();
      const productIndex = addedProducts.findIndex(
        ({ product }) => product.name === productName
      );
      if (productIndex !== -1) {
        const newAddedProducts = addedProducts.slice();
        newAddedProducts[productIndex] = {
          ...newAddedProducts[productIndex],
          quantity: newAddedProducts[productIndex].quantity + 1,
        };
        setAddedProducts(newAddedProducts);
      } else {
        const newAddedProducts = addedProducts.slice();
        newAddedProducts.push({ product, quantity: 1 });
        setAddedProducts(newAddedProducts);
      }
      setSubmitted(false);
    }
  };

  const handleFinishShopping = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setSubmitted(true);
    setTotalPriceWithDiscount(getDiscountedPrice(addedProducts));
    setTotalPriceWithoutDiscount(getTotalPrice(addedProducts));
  };

  const handleReset = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setSubmitted(false);
    setInputValue("");
    setAddedProducts([]);
    setTotalPriceWithDiscount(0);
    setTotalPriceWithoutDiscount(0);
  };

  return (
    <>
      <p>Add products one by one!</p>
      <input
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
      <button onClick={handleProductAdd}>Add to cart</button>
      <ProductsTable productsList={addedProducts} />
      <button onClick={handleFinishShopping}>Finish Shopping</button>
      {submitted && (
        <ProductsDetails
          totalPriceWithDiscount={totalPriceWithDiscount}
          totalPriceWithoutDiscount={totalPriceWithoutDiscount}
        />
      )}
      <button onClick={handleReset}>Reset</button>
    </>
  );
};
