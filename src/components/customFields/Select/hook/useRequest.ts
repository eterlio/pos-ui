import { BaseResponse } from "@/helpers/baseResponse";
import { useBaseRequestService } from "@/hooks/request/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";

export const useSearchRequestQuery = <T>(url: string, query?: Record<string, any>) => {
  const { axiosInstance } = useBaseRequestService({ useToken: true, tokenType: "accessToken" });
  const { isFetching, isLoading, data, refetch } = useQuery({
    queryFn: async () => {
      const { data } = await axiosInstance.get<BaseResponse<T>>(url, query);
      return data;
    },
    queryKey: [`search-${url.split("/")[0]}`],
    refetchOnWindowFocus: false
  });

  return { isFetching, isLoading, data, refetch };
};
