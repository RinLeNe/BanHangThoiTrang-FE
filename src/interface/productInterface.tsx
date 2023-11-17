export interface Product {
    id: number;
    name: string;
    hourly: boolean;
    image: string;
    price: number;
    productCategory: DataTypeCategory;
    productImage: DateTypeProductImage;
  }
  export interface DataTypeCategory {
    id: string;
    name: string;
  }
  export interface DateTypeProductImage{
    id: number;
    path: string;

  }
  export interface ProductDetail {
    name: string;
    image: string;
    price: number;
    productCategory: Pick<DataTypeCategory, "id">;
    productImage: Pick<DateTypeProductImage, "id">;
  }