import { StoreContext, StoreContextProps } from "@/utils/store";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export const useRoleRedirect = () => {
  const { authUser } = useContext(StoreContext) as StoreContextProps;
  const navigate = useNavigate();

  const redirectHome = () => {
    navigate(`/dashboard/${authUser?.role}`);
  };
  return {
    redirectHome
  };
};
