import Container from "@/components/Container";
import DashboardLayout from "@/components/dashboard/Layout";
import Table from "@/components/table/Table";
import { useGeneralQuery } from "@/hooks/request/useGeneralQuery";
import { GetManyProps } from "@/hooks/types";
import { useSetQueryParam } from "@/hooks/useSetQueryParam";
import { StockProps } from "@/interfaces/stock";
import { stockDataSchema } from "@/tableSchema/stocks";
import { useNavigate } from "react-router-dom";

const StockListScreen = () => {
  const navigate = useNavigate();
  const { queryObject } = useSetQueryParam();
  const { data, isFetching } = useGeneralQuery<GetManyProps<StockProps>>({
    queryKey: ["stocks", queryObject],
    url: "/stocks",
    query: queryObject,
    enabled: !!Object.keys(queryObject).length
  });
  return (
    <DashboardLayout
      pageTitle="Stock Data"
      actionButton={{
        createButton: { name: "Record Stock", onClick: () => navigate("/stocks/record") }
      }}
    >
      {/* <Modal
    showModal={modalData.showModal}
    modalTitle={modalData.modalTitle(selectedCode.code)}
    modalDescription={modalData.modalDescription}
    actionButtons={modalData.actionButtons}
  /> */}
      <Container className="border border-gray-50">
        <Table
          columns={stockDataSchema}
          data={data?.data || []}
          isLoading={false}
          loadingText="Fetching product code data"
          showExportButton
          paginator={data?.paginator}
          filters={[]}
          actionButtons={[]}
          allowRowSelect
          handleRowClick={() => {}}
          showSelectColumns
        />
      </Container>
    </DashboardLayout>
  );
};

export default StockListScreen;
