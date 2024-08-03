import useAuthStore from "@/store/auth";
import { useNavigate } from "react-router-dom";

export const useRoleRedirect = () => {
  const { authUser } = useAuthStore();
  const navigate = useNavigate();

  const redirectHome = () => {
    navigate(`/dashboard/${authUser?.role}`);
  };
  return {
    redirectHome
  };
};
