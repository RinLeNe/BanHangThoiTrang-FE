import { user } from "./AuthInterface";
import { Product } from "./productInterface";

export interface CartDetail {
  id: any;
  user: Pick<user, "id">;
  product: Pick<Product, "id">;
  // orderTime: string;
  quantity: any;
  size: any;
  // price: number;
}
