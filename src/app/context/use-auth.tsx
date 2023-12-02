import { axiosClient } from "@/lib/axios-client";
import useSWR from "swr";

export const useAuth = () => {
  const { data, error, ...otherResult } = useSWR('/auth/me', (url) => axiosClient.get(url));
  const isLoading = !data && !error;
  return {
    ...otherResult,
    data,
    error,
    isLoading,
  };
};
