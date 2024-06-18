import Container from "@/components/Container";
import Drawer from "@/components/Drawer";
import DashboardLayout from "@/components/dashboard/Layout";
import Table from "@/components/table/Table";
import { ActionButton } from "@/components/table/type";
import { useGeneralQuery } from "@/hooks/request/useGeneralQuery";
import { GetManyProps } from "@/hooks/types";
import { useSetQueryParam } from "@/hooks/useSetQueryParam";
import { StockProps, StockStatus } from "@/interfaces/stock";
import { stockDataSchema } from "@/tableSchema/stocks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StockCard from "./StockCard";
import PrimaryButton from "@/components/PrimaryButton";
import { useGeneralMutation } from "@/hooks/request/useGeneralMutation";
import { Button } from "@/components/ui/button";
import { useOptimisticUpdates } from "@/hooks/request/useOptimisticUpdates";
import { format } from "date-fns";

const StockListScreen = () => {
  const navigate = useNavigate();
  const { addToOrUpdateList } = useOptimisticUpdates();
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

  const getStockData = (productId: string) => {
    return selectedStock.stockData?.find((stock) => stock.productId === productId);
  };
  const { isPending, mutate } = useGeneralMutation({
    httpMethod: "put",
    mutationKey: ["updateStock", selectedStock._id as string],
    url: `/stocks/${selectedStock._id}/change-status`
  });

  const handleStockStatusChange = (status: StockStatus) => {
    mutate(
      { payload: { status } },
      {
        onSuccess(data) {
          const stock = data.data.response as StockProps;
          addToOrUpdateList<StockProps>(["stocks", queryObject], stock);
          setOpenDrawer(() => false);
        }
      }
    );
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
        title={selectedStock?.deliveryId || ""}
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
            <p>{selectedStock.receivedDate ? format(selectedStock?.receivedDate, "dd-MM-y") : "N/A"}</p>
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
                      status: stock?.status,
                      batchId: stock?.batchId,
                      remark: stock?.remarks
                    }}
                    key={index}
                  />
                );
              })}
          </div>
          {selectedStock && selectedStock?.status === "pending" && (
            <div className="button-container flex justify-between items-center gap-4">
              <PrimaryButton
                text="Approve"
                onClick={() => handleStockStatusChange("approved")}
                loading={isPending}
                disabled={isPending}
              />
              <PrimaryButton
                text="Reject"
                variant={"outline"}
                className="w-full border-primary"
                onClick={() => handleStockStatusChange("rejected")}
                loading={isPending}
                disabled={isPending}
              />
            </div>
          )}
          <div className="my-5 text-center">
            <Button
              className="bg-transparent text-primary space-x-2 hover:bg-transparent"
              onClick={() => {
                selectedStock.status === "pending"
                  ? navigate(`/stocks/${selectedStock._id}`)
                  : navigate(`/stocks/${selectedStock._id}/view`);
              }}
            >
              {selectedStock.status === "pending" ? "Edit Stock" : "View Stock"}
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
