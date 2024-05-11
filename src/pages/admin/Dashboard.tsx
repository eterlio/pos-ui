import DashboardLayout from '@/components/dashboard/Layout';
import DashboardCard from '@/components/dashboard/shared/DashboardCard';

const Dashboard = () => {
  return (
    <DashboardLayout pageTitle="Dashboard" pageDescription="Here is the analysis for your store">
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
        <DashboardCard amount={20} percentageDifference={10} title="Total Sales" isAmount/>
        <DashboardCard amount={280} percentageDifference={18} title="Total Invoice" />
        <DashboardCard amount={200} percentageDifference={0.8} title="Total Profit" isAmount/>
        <DashboardCard amount={270} percentageDifference={17} title="New Customers" />
        
      </div>

      <div className="grid grid-cols-3">
      <div className="p-2 bg-red-200 col-span-2">SIDE 1</div>
      <div className="p-3 bg-green-200">SIDE 2</div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
