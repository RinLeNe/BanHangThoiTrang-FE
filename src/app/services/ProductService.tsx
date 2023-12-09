import { axiosClient } from "@/lib/axios-client";

interface productPayload {
  [x: string]: any;
}
export const findAllProduct = async (pageNumber: any, pageSize: any) => {
  try {
    const response = await axiosClient.get(
      "http://localhost:8080/api/products",
      {
        params: {
          page: pageNumber, // adjust the parameter name based on your backend API
          size: pageSize,
        },
      }
    );
    return response; // Assuming your API returns the data in a 'data' field
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};
export const findProductByCategory = async (
  categoryId: any,
  pageNumber: any,
  pageSize: any
) => {
  const response = await axiosClient.get(
    `http://localhost:8080/api/products/category/${categoryId}`,
    {
      params: {
        page: pageNumber, // adjust the parameter name based on your backend API
        size: pageSize,
      },
    }
  );
  return response;
};
export const findProductById = async (productId: any) => {
  const response = await axiosClient.get(
    `http://localhost:8080/api/products/${productId}`
  );
  return response;
};
export const addProduct = async (productDetail: productPayload) => {
  const response = await axiosClient.post(
    "http://localhost:8080/api/products",
    JSON.stringify(productDetail)
  );
  return response;
};
export const deleteProduct = async (productId: any) => {
  const response = await axiosClient.delete(
    `http://localhost:8080/api/products/${productId}`
  );
  return response;
};
export const updateProduct = async (
  productId: any,
  productDetail: productPayload
) => {
  const response = await axiosClient.put(
    `http://localhost:8080/api/products/${productId}`,
    JSON.stringify(productDetail)
  );
  return response;
};
export const searchNamOrNu = async (type: any) => {
  const response = await axiosClient.get(`localhost:8080/api/products/search?type=${type}`)
  return response;
}