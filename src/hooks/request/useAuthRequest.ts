import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useBaseRequestService } from "./useAxiosPrivate";
import { AuthUserResponse } from "@/interfaces/users";
import { toast } from "sonner";
import { getErrorMessageFromApi } from "@/utils";
import { BaseResponse } from "@/helpers/baseResponse";
import { useContext } from "react";
import { StoreContext, StoreContextProps } from "@/utils/store";
import { useNavigate } from "react-router-dom";

export const useGetAuthUser = () => {
  const { getAuth } = useBaseRequestService({ useToken: true, tokenType: "accessToken" });
  const { data, isFetching, isRefetching } = useQuery({
    queryKey: ["auth"],
    retry: 0,
    refetchOnWindowFocus: false,
    queryFn: async () => await getAuth()
  });
  return { data, isFetching, isRefetching };
};

export const useAuthLogin = () => {
  const queryClient = useQueryClient();
  const { saveAuthUser } = useContext(StoreContext) as StoreContextProps;
  const { axiosInstance } = useBaseRequestService({ useToken: true, tokenType: "accessToken" });
  const navigate = useNavigate();

  const { data, isPending, mutateAsync } = useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      return await axiosInstance.post<BaseResponse<AuthUserResponse>>(`/auth/login`, payload);
    },
    mutationKey: ["auth"],

    onError(error) {
      toast.error("Error", { description: getErrorMessageFromApi(error) });
    },
    onSuccess(data) {
      const authData = data.data.response;
      toast.success("Success", {
        description: "Login success.Redirecting User"
      });
      saveAuthUser(authData);
      navigate(`/dashboard/${authData.role}`);
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    }
  });
  return { data, isPending, mutateAsync };
};

