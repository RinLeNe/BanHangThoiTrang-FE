import { CartDetail } from "@/interface/CartInterface";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  addCart,
  deleteCart,
  findCartByUserId,
  updateCart,
} from "../services/CartService";
import { message } from "antd";
import { useAuth } from "./use-auth";
import { Product } from "@/interface/productInterface";

interface CartContextProps {
  cartItems: CartDetail[];
  onAddProductToCart: (cartDetail: CartDetail) => void;
  onDelete: (cartId: any) => void;
  onUpdate: (cartId: any, cartDetail: CartDetail) => void;
  selectedProductss: Product[];
  setSelectedProductss: React.Dispatch<React.SetStateAction<Product[]>>;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}
message.config({
  maxCount: 1,
});
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartDetail[]>([]); // Initialize as an empty array
  const [selectedProductss, setSelectedProductss] = useState<Product[]>([]);
  const { data } = useAuth();
  //@ts-ignore
  const userId = data?.id;
  //   console.log(cartItems);
  const onAddProductToCart = async (cart: CartDetail) => {
    try {
      const res = await addCart(cart);
      if (res) {
        message.success("Thêm vào giỏ hàng thành công!");
        
        findCartByUser();
      }
    } catch (error) {
      message.error("Bạn không thể thêm quá số lượng cho phép!"); 
    }
  };
  const onDelete = async (cartId: any) => {
    const res = await deleteCart(cartId);
    if (res) {
      message.success("Xóa khỏi giỏ hàng thành công");
      findCartByUser();
    }
  };
  const onUpdate = async (cartId: any, cartDetail: CartDetail) => {
    const res = await updateCart(cartId, cartDetail);
    if (res) {
      findCartByUser();
    }
  };
  useEffect(() => {
    if (userId) {
      findCartByUser();
    }
  }, [userId]);
  const findCartByUser = async () => {
    const res = await findCartByUserId(userId);
    //@ts-ignore
    setCartItems(res || []);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        onAddProductToCart,
        onDelete,
        onUpdate,
        selectedProductss,
        setSelectedProductss,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
