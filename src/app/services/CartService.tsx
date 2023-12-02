import { axiosClient } from "@/lib/axios-client";

interface cartPayload {
    [x: string]: any
  }
  export const findCartByUserId = async (userId: any) => {
    const response = await axiosClient.get(`http://localhost:8080/api/cart/${userId}`);
    return response;
  }
  export const addCart = async (cartDetail: cartPayload) => {
    const response = await axiosClient.post("http://localhost:8080/api/cart", JSON.stringify(cartDetail));
    return response;
  }
  export const deleteCart = async (cartId: any) => {
    const response = await axiosClient.delete(`http://localhost:8080/api/cart/${cartId}`)
    return response;
  }
  export const updateCart = async (cartId: any, cartDetail: cartPayload) => {
    const response = await axiosClient.put(`http://localhost:8080/api/cart/${cartId}`, JSON.stringify(cartDetail));
    return response;
  } 
  export const checkoutCart = async (userId:any, cartDetail: cartPayload) => {
    const response = await axiosClient.post(`http://localhost:8080/api/cart/checkout/${userId}`, JSON.stringify(cartDetail));
    return response;
  }