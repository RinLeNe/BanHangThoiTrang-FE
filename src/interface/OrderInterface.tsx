import { user } from "./AuthInterface";
import { Product } from "./productInterface";
export interface OrderDetail {
    id: number;
    order: Pick<Order, "id">;
    product: Pick<Product, "id">;
    quantity: number;
    totalPrice: number;
    // createdAt: string;
    // updatedAt: string;
    // endTime: string;
  }
  
export interface Order {
  id: any;
  user: Pick<user, "id">;
  orderDetails: OrderDetail[];
//   product: Pick<Product, "id">;
  // orderTime: string;
//   quantity: any;
  // price: number;
}
