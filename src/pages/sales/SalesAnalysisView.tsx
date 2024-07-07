import DashboardLayout from "@/components/dashboard/Layout";
import PageContainer from "@/components/dashboard/PageContainer";
import SalesAnalysis from "./component/SalesAnalysis";

const SalesAnalysisView = () => {
  return (
    <DashboardLayout pageTitle="Sales Analysis">
      <PageContainer>
        <SalesAnalysis />
      </PageContainer>
    </DashboardLayout>
  );
};

export default SalesAnalysisView;
