import Preloader from "@/components/Preloader";
import { useBaseRequestService } from "@/hooks/request/useAxiosPrivate";
import useAuthStore from "@/store/auth";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { authUser: auth } = useAuthStore();
  const { getAuth } = useBaseRequestService({
    useToken: true,
    tokenType: "accessToken"
  });

  const verifyUserIsAuthenticated = async () => {
    try {
      await getAuth();
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 403 && !auth) {
        navigate("/auth/login");
      }
    } finally {
      setIsLoading(false);
    }
  };
  const { getInitData } = useBaseRequestService({
    useToken: true,
    tokenType: "accessToken"
  });
  useEffect(() => {
    if (!auth || !Object.keys(auth).length) {
      verifyUserIsAuthenticated();
      getInitData();
    } else {
      setIsLoading(false);
    }
  }, []);

  return <>{isLoading ? <Preloader /> : <Outlet />}</>;
};

export default PersistLogin;
