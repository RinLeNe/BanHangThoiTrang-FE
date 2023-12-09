// export interface Product {
//   id: number;
//   title: string;
//   image: string;
//   price: number;
//   importPrice: number;
//   discount: number;
//   description: string;
//   productCategory: DataTypeCategory;
//   productImage: DateTypeProductImage;
// }
// export interface DataTypeCategory {
//   id: string;
//   name: string;
// }
// export interface DateTypeProductImage {
//   id: number;
//   path: string;

import { ProductSize } from "./ProductSizeEnum";
import { ProductType } from "./ProductTypeEnum";

// }
export interface ProductDetail {
  title: string;
  price: number;
  importPrice: number;
  discount: number;
  description: string;
  quantity: number;
  productType: ProductType;
  productSize: ProductSize;
  productCategory: Pick<DataTypeCategory, "id">;
  image_id: Array<{ path: string }>;
}
export interface Product {
  id: number;
  title: string;
  price: number;
  importPrice: number;
  discount: string;
  description: string;
  quantity: number;
  quantitySold: number;
  productType: ProductType;
  category: Pick<DataTypeCategory, "id">;
  image_id: DateTypeProductImage[];
}

export interface DataTypeCategory {
  id: number | string;
  name: string;
}

export interface DateTypeProductImage {
  id: number;
  path: string;
}
