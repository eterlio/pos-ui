import { useQuery } from "@tanstack/react-query";
import { useBaseRequestService } from "./useAxiosPrivate";
import { BaseResponse } from "@/helpers/baseResponse";
import axios from "axios";

export const useGeneralQuery = <T>(mutationData: {
  queryKey: any[];
  url: string;
  requireAuth?: boolean;
  query?: Record<string, string | number | boolean>;
  enabled?: boolean;
}) => {
  const { queryKey, url, requireAuth = true, query, enabled } = mutationData;

  // Conditionally call useBaseRequestService based on requireAuth
  const { axiosInstance } = requireAuth
    ? useBaseRequestService({ useToken: true, tokenType: "accessToken" })
    : useBaseRequestService();

  const { data, isFetching, isRefetching, error } = useQuery({
    queryKey,
    staleTime: 10000,
    refetchOnMount: true,
    enabled,
    retry: 0,
    refetchOnWindowFocus: false,
    gcTime: 100000,
    queryFn: async () => {
      const {
        data: { response }
      } = await axiosInstance.get<BaseResponse<T>>(url, { params: query });
      return response;
    }
  });

  return { data, isFetching, isRefetching, error };
};
