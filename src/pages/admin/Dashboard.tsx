import DashboardLayout from '@/components/dashboard/Layout';
import DashboardCard from '@/components/dashboard/shared/DashboardCard';

const Dashboard = () => {
  return (
    <DashboardLayout pageTitle="Dashboard" pageDescription="Here is the analysis for your store">
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
        <DashboardCard amount={20} percentageDifference={10} title="Total Sales" />
        <DashboardCard amount={20} percentageDifference={10} title="Total Orders" />
        <DashboardCard amount={20} percentageDifference={10} title="Total Sales" />
        <DashboardCard amount={20} percentageDifference={10} title="Total Sales" />
        
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
