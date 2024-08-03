import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useBaseRequestService } from "./useAxiosPrivate";
import { AuthUserResponse } from "@/interfaces/user";
import { toast } from "sonner";
import { getErrorMessageFromApi } from "@/utils";
import { BaseResponse } from "@/helpers/baseResponse";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/auth";

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
  const { saveAuthUser } = useAuthStore();
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
        description: "Login success. Redirecting User"
      });
      saveAuthUser(authData);
      if (authData.role) {
        if (authData.role === "admin") {
          navigate(`/dashboard/admin`);
        } else {
          navigate(`/dashboard/${authData.role}`);
        }
      }
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    }
  });
  return { data, isPending, mutateAsync };
};
export const useAuthResetPassword = () => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useBaseRequestService();
  const key = ["password reset"];
  const { data, isPending, mutate } = useMutation({
    mutationFn: async (payload: { token: string; password: string; confirmPassword: string }) => {
      return await axiosInstance.put<BaseResponse<{}>>(`/auth/reset-password`, payload);
    },
    mutationKey: key,

    onError(error) {
      toast.error("Error", { description: getErrorMessageFromApi(error) });
    },
    onSuccess() {
      toast.success("Success", {
        description: "Password reset success"
      });
      queryClient.invalidateQueries({ queryKey: key });
    }
  });
  return { data, isPending, mutate };
};
export const useAuthForgotPasswordPassword = () => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useBaseRequestService();
  const key = ["forgot password"];
  const { data, isPending, mutate } = useMutation({
    mutationFn: async (payload: { email: string }) => {
      return await axiosInstance.patch<BaseResponse<{ message: string }>>(`/auth/forgot-password`, payload);
    },
    mutationKey: key,

    onError(error) {
      toast.error("Error", { description: getErrorMessageFromApi(error) });
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: key });
      toast.success("Success", {
        description: data.data.response.message
      });
    }
  });
  return { data, isPending, mutate };
};
