import DashboardLayout from "@/components/dashboard/Layout";
import { useNavigate } from "react-router-dom";
import SalesReport from "./SalesReport";
import PageContainer from "@/components/dashboard/PageContainer";
import { salesTableFilters } from "@/tableSchema/sales";

const SalesListScreen = () => {
  const navigate = useNavigate();
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
        <SalesReport filters={salesTableFilters}/>
      </PageContainer>
    </DashboardLayout>
  );
};

export default SalesListScreen;
