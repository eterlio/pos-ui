import Container from "@/components/Container";
import Drawer from "@/components/Drawer";
import DashboardLayout from "@/components/dashboard/Layout";
import Table from "@/components/table/Table";
import { ActionButton } from "@/components/table/type";
import { Button } from "@/components/ui/button";
import { useGeneralQuery } from "@/hooks/request/useGeneralQuery";
import { GetManyProps } from "@/hooks/types";
import { useSetQueryParam } from "@/hooks/useSetQueryParam";
import { StockProps } from "@/interfaces/stock";
import { stockDataSchema } from "@/tableSchema/stocks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StockCard from "./StockCard";

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
        setSelectedStock(data);
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

  const getStockData = (productId: string) => {
    return selectedStock.stockData?.find((stock) => stock.productId === productId);
  };
  return (
    <DashboardLayout
      pageTitle="Stock Data"
      actionButton={{
        createButton: { name: "Record Stock", onClick: () => navigate("/stocks/record"), disabled: isFetching }
      }}
    >
      <Drawer
        description=""
        title={selectedStock?.batchId || ""}
        handleDrawerClose={() => setOpenDrawer(!openDrawer)}
        open={openDrawer}
      >
        <div className="flex justify-between items-center mb-3">
          <div>
            <h1 className="font-medium">Supplier</h1>
            <p>{selectedStock?.supplier?.name}</p>
          </div>
          <div>
            <h1 className="font-medium">Received Data</h1>
            <p>{selectedStock?.truckNumber}</p>
          </div>
          <div>
            <h1 className="font-medium">Truck #</h1>
            <p>{selectedStock?.truckNumber}</p>
          </div>
        </div>
        <div className="h-full flex flex-col mt-5">
          <div className="flex-1 overflow-y-scroll">
            {selectedStock?.products &&
              selectedStock.products.length > 0 &&
              selectedStock.products.map((product, index) => {
                const stock = getStockData(product.id || "");
                return (
                  <StockCard
                    product={{ name: product.name }}
                    stock={{
                      quantityExpected: stock?.quantityExpected,
                      quantityReceived: stock?.quantityReceived,
                      status: stock?.status
                    }}
                    key={index}
                  />
                );
              })}
          </div>
          <div className="button-container flex justify-between items-center gap-4">
            <Button className="w-full">Approve</Button>
            <Button variant={"outline"} className="w-full border-primary">
              Reject
            </Button>
          </div>
        </div>
      </Drawer>
      <Container className="border border-gray-50">
        <Table
          columns={stockDataSchema}
          data={data?.data || []}
          isLoading={false}
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
