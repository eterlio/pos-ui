import DashboardLayout from "@/components/dashboard/Layout";
import { useGeneralQuery } from "@/hooks/request/useGeneralQuery";
import { InvoiceProps } from "@/interfaces/invoice";
import { useParams } from "react-router-dom";

const InvoiceDetailsScreen = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const { data, isFetching } = useGeneralQuery<InvoiceProps>({
    queryKey: ["invoices", id],
    url: `/invoices/${id}`,
    enabled: true,
    requireAuth: true
  });

  return (
    <DashboardLayout pageTitle="Invoice Details" isLoading={isFetching}>
      <h1>Hello</h1>
    </DashboardLayout>
  );
};

export default InvoiceDetailsScreen;
