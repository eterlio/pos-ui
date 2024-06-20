import Container from "@/components/Container";
import DashboardLayout from "@/components/dashboard/Layout";
import Table from "@/components/table/Table";
import { ActionButton } from "@/components/table/type";
import { useGeneralQuery } from "@/hooks/request/useGeneralQuery";
import { GetManyProps } from "@/hooks/types";
import { useSetQueryParam } from "@/hooks/useSetQueryParam";
import { StockProps } from "@/interfaces/stock";
import { stockDataSchema } from "@/tableSchema/stocks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InspectStock from "./InspectStock";

const StockListScreen = () => {
  const navigate = useNavigate();
  const [selectedStock, setSelectedStock] = useState<Partial<StockProps>>({});
  const [openDrawer, setOpenDrawer] = useState(false);
  const { queryObject } = useSetQueryParam();
  const { data, isFetching } = useGeneralQuery<GetManyProps<StockProps>>({
    queryKey: ["stocks", queryObject],
    url: "/stocks",
    query: queryObject,
    enabled: !!Object.keys(queryObject).length
  });
  function handleEditRowActionClick(data: Record<string, any>) {
    navigate(`/stocks/${data.id}`);
  }
  const rowActions: ActionButton[] = [
    {
      label: "Edit",
      action: handleEditRowActionClick
    },
    {
      label: "View",
      action: (data: Record<string, any>) => {
        navigate(`/stocks/${data.id}/view`);
      }
    },
    {
      label: "Inspect",
      action: (data: Record<string, any>) => {
        setSelectedStock(data);
        setOpenDrawer(true);
      }
    }
  ];
  return (
    <DashboardLayout
      pageTitle="Stock Data"
      actionButton={{
        createButton: { name: "Record Stock", onClick: () => navigate("/stocks/record"), disabled: isFetching }
      }}
    >
      <InspectStock
        handleDrawerOpen={() => setOpenDrawer(!openDrawer)}
        type="listView"
        selectedStock={selectedStock}
        openDrawer={openDrawer}
        queryObject={queryObject}
      />
      <Container className="border border-gray-50">
        <Table
          columns={stockDataSchema}
          data={data?.data || []}
          isLoading={isFetching}
          loadingText="Fetching product code data"
          showExportButton
          paginator={data?.paginator}
          allowRowSelect
          handleRowClick={handleEditRowActionClick}
          showSelectColumns
          actionButtons={rowActions}
        />
      </Container>
    </DashboardLayout>
  );
};

export default StockListScreen;
