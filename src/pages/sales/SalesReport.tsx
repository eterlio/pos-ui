import Table from "@/components/table/Table";
import { DataFilterProps } from "@/components/table/type";
import { formatCurrency } from "@/helpers";
import { useBaseRequestService } from "@/hooks/request/useAxiosPrivate";
import { useGeneralQuery } from "@/hooks/request/useGeneralQuery";
import { GetManyProps } from "@/hooks/types";
import { useSetQueryParam } from "@/hooks/useSetQueryParam";
import { SalesProps } from "@/interfaces/sales";
import { salesTableSchema } from "@/tableSchema/sales";
import { printPDF } from "@/utils";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
interface SalesReportProps {
  filters?: DataFilterProps[];
  isTodayReport?: boolean;
  isAdmin?: boolean;
}
const SalesReport: FC<SalesReportProps> = ({ filters, isTodayReport, isAdmin }) => {
  const [printLoading, setPrintLoading] = useState(false);
  const { queryObject } = useSetQueryParam();
  const navigate = useNavigate();

  const { axiosInstance } = useBaseRequestService({ useToken: true, tokenType: "accessToken" });
  const { data, isFetching } = useGeneralQuery<GetManyProps<SalesProps>>({
    queryKey: ["sales", queryObject],
    url: "/sales",
    query: queryObject
  });
  const rowActions = [
    {
      label: "View",
      action: (data: Record<string, any>) => {
        navigate(`/sales/${data._id}`);
      }
    },
    {
      label: "Print",
      action: async (data: Record<string, any>) => {
        try {
          setPrintLoading(true);
          const { data: response } = await axiosInstance.get(`/pdf/print/${data.id}/sales-receipt`);
          printPDF(response.response);
          toast.success("Success", {
            description: "Sales receipt printed"
          });
        } catch (error: any) {
          toast.error("Error", {
            description: error.message
          });
        } finally {
          setPrintLoading(false);
        }
      }
    }
  ];

  return (
    <>
      {isTodayReport && (
        <div className="flex mb-5 justify-end">
          <h1>
            <span>Total Sales: </span>
            <span className="font-bold">{formatCurrency((data as any)?.totalAmount)}</span>
          </h1>
        </div>
      )}
      <Table
        columns={salesTableSchema({ isAdmin })}
        data={data?.data || []}
        paginator={data?.paginator}
        actionButtons={rowActions}
        isLoading={isFetching || printLoading}
        loadingText={isFetching ? "Fetching sales report" : printLoading ? "Printing receipt" : ""}
        filters={filters}
        showSearchSelection={isAdmin}
        searchSelectionOptions={[
          { label: "Customer", value: "customerId" },
          { label: "All", value: "" },
          { label: "Teller", value: "createdBy" }
        ]}
        handleRowClick={(data: Record<string, any>) => navigate(`/sales/${data._id}`)}
      />
    </>
  );
};

export default SalesReport;
