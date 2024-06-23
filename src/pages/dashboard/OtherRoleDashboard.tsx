import DashboardLayout from "@/components/dashboard/Layout";
import { StoreContext, StoreContextProps } from "@/utils/store";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OtherRoleDashboard = () => {
  const { authUser } = useContext(StoreContext) as StoreContextProps;
  const navigate = useNavigate();
  useEffect(() => {
    if (
      authUser &&
      authUser.role &&
      !["manager", "sales-personnel", "support", "super-admin"].includes(authUser.role)
    ) {
      navigate("/unauthorized");
    }
  }, []);
  return <DashboardLayout>Welcome, {authUser?.fullName}</DashboardLayout>;
};

export default OtherRoleDashboard;
