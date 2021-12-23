import React, { FC } from "react";
import {
  getDiscountedPriceForSingleProduct,
  truncateNumber
} from "../Utils/functions";
import { IAddedProduct } from "../Utils/types";

interface IProductsTable {
  productsList: IAddedProduct[];
}

export const ProductsTable: FC<IProductsTable> = ({ productsList }) => {
  return (
    <>
      {productsList.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {productsList.map(({ product, quantity }) => {
              return (
                <tr key={product.name}>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{quantity}</td>
                  <td>
                    {truncateNumber(
                      getDiscountedPriceForSingleProduct({ quantity, product })
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
