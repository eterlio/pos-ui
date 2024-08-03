import DashboardLayout from "@/components/dashboard/Layout";
import useAuthStore from "@/store/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OtherRoleDashboard = () => {
  const { authUser } = useAuthStore();
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
  return (
    <DashboardLayout>
      <h1 className="text-medium">Welcome, {authUser?.fullName}</h1>
    </DashboardLayout>
  );
};

export default OtherRoleDashboard;
