interface IProductBasic {
  name: string;
  price: number;
}

interface IProductOnSale extends IProductBasic {
  isOnSale: true;
  quantityRequiredForSale: number;
  salePrice: number;
}

interface IProductRegular extends IProductBasic {
  isOnSale?: false;
  quantityRequiredForSale?: never;
  salePrice?: never;
}

export type IProduct = IProductOnSale | IProductRegular;

export interface IAddedProduct {
  product: IProduct;
  quantity: number;
}
