import { axiosClient } from "@/lib/axios-client";

export const findAllByOrder = async (orderId: any) => {
  const response = await axiosClient.get(
    `http://localhost:8080/api/orderdetails?order=${orderId}`
  );
  return response;
};
