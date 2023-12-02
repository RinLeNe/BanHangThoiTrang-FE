import { axiosClient } from "@/lib/axios-client";

interface orderPayload {
    [x: string]: any
  }
  export const findAllOrder = async () => {
    const response = await axiosClient.get("http://localhost:8080/api/orders")
    return response;
  }
  export const findAllOrderByUser = async () => {
    const response = await axiosClient.get(`http://localhost:8080/api/orders/user/`)
    return response;
  }
  export const orderById = async (editId: any) => {
    const response = await axiosClient.get(`http://localhost:8080/api/orders/${editId}`);
    return response;
  }
  export const addOrder = async (orderDetail: orderPayload) => {
    const response = await axiosClient.post("http://localhost:8080/api/orders", JSON.stringify(orderDetail));
    return response;
  }
  export const deleteOrder = async (deleteId: any) => {
    const response = await axiosClient.delete(`http://localhost:8080/api/orders/${deleteId}`)
    return response;
  }
  export const updateOrder = async (updId:any, orderDetail: orderPayload) => {
    const response = await axiosClient.put(`http://localhost:8080/api/orders/${updId}`, JSON.stringify(orderDetail));
    return response;
}