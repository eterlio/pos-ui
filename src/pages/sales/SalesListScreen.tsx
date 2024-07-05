import DashboardLayout from "@/components/dashboard/Layout";
import { useNavigate } from "react-router-dom";
import SalesReport from "./SalesReport";
import PageContainer from "@/components/dashboard/PageContainer";
import { salesTableFilters } from "@/tableSchema/sales";
import { useRoles } from "@/hooks/useRoles";
import { useGeneralQuery } from "@/hooks/request/useGeneralQuery";
import { DataFilterProps } from "@/components/table/type";
import { Users } from "lucide-react";
import { GetManyProps } from "@/hooks/types";
import { UserProps } from "@/interfaces/user";

const SalesListScreen = () => {
  const { isAdmin, isSuperAdmin } = useRoles();

  const { data: users } = useGeneralQuery<GetManyProps<UserProps>>({
    queryKey: ["users"],
    url: "/users",
    enabled: isAdmin,
    query: { deleted: false },
    requireAuth: true,
    staleTime: 20000
  });
  const navigate = useNavigate();

  let filters = salesTableFilters;

  const userOptions =
    users?.data?.map((user) => {
      return {
        label: user?.fullName || "",
        value: user?._id || ""
      };
    }) || [];
  const userFilter: DataFilterProps[] = [
    {
      column: "createdBy",
      options: userOptions,
      title: "Tellers",
      extra: {
        mainIcon: Users
      }
    }
  ];
  if (isAdmin) {
    filters = [...filters, ...userFilter];
  }
  return (
    <DashboardLayout
      pageTitle="Sales Report"
      actionButton={{
        createButton: {
          name: "Record Sale",
          onClick: () => navigate("/pos")
        }
      }}
    >
      <PageContainer>
        <SalesReport filters={filters} isAdmin={isAdmin || isSuperAdmin} />
      </PageContainer>
    </DashboardLayout>
  );
};

export default SalesListScreen;
