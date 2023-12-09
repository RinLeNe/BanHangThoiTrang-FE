import { axiosClient } from "@/lib/axios-client";

export const findAllByOrder = async (orderId: any) => {
  const response = await axiosClient.get(
    `http://localhost:8080/api/orderdetails?order=${orderId}`
  );
  return response;
};
export const DoanhThuByCategory = async (categoryId: any) => {
  const response = await axiosClient.get(
    `http://localhost:8080/api/orderdetails/sumBycategory?categoryId=${categoryId}`
  );
  return response;
};
export const findAllOrderDetail = async () => {
  const response = await axiosClient.get(
    "http://localhost:8080/api/orderdetails/findall"
  );
  return response;
};
