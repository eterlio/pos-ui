import useAuthStore from "@/store/auth";

export const useRoles = () => {
  const { authUser } = useAuthStore()
  const isAdmin = authUser?.role === "admin";
  const isManager = authUser?.role === "manager";
  const isSuperAdmin = authUser?.role === "super-admin";
  const isSalesPersonnel = authUser?.role === "sales-personnel";

  return {
    isAdmin,
    isManager,
    isSuperAdmin,
    isSalesPersonnel
  };
};
