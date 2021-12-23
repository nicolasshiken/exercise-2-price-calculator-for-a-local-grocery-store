import { IAddedProduct } from "./types";

export const truncateNumber = (num): string => {
  var re = new RegExp("^-?\\d+(?:.\\d{0," + (2 || -1) + "})?");
  return num.toString().match(re)[0];
};

export const getTotalPrice = (productList: IAddedProduct[]) => {
  let totalPrice = 0;
  productList.forEach(({ product, quantity }) => {
    const productPrice = product.price * quantity;
    totalPrice += productPrice;
  });

  return totalPrice;
};

export const getDiscountedPriceForSingleProduct = ({
  product,
  quantity,
}: IAddedProduct) => {
  if (product.isOnSale && quantity >= product.quantityRequiredForSale) {
    const salesPrice =
      Math.trunc(quantity / product.quantityRequiredForSale) *
      product.salePrice;

    const reminderPrice =
      (quantity % product.quantityRequiredForSale) * product.price;

    const productTotalPrice = salesPrice + reminderPrice;

    return productTotalPrice;
  } else {
    const productPrice = product.price * quantity;
    return productPrice;
  }
};

export const getDiscountedPrice = (productList: IAddedProduct[]) => {
  let totalPrice = 0;
  productList.forEach(({ product, quantity }) => {
    totalPrice += getDiscountedPriceForSingleProduct({ product, quantity });
  });

  return totalPrice;
};
