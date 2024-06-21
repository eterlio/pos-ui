import Preloader from "@/components/Preloader";
import { useBaseRequestService } from "@/hooks/request/useAxiosPrivate";
import { StoreContext, StoreContextProps } from "@/utils/store";
import { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { authUser: auth } = useContext(StoreContext) as StoreContextProps;
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

  useEffect(() => {
    if (!auth || !Object.keys(auth).length) {
      verifyUserIsAuthenticated();
    } else {
      setIsLoading(false);
    }
  }, []);

  return <>{isLoading ? <Preloader /> : <Outlet />}</>;
};

export default PersistLogin;
