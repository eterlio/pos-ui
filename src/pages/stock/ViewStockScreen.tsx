import ViewElement from "@/components/ViewElement";
import DashboardLayout from "@/components/dashboard/Layout";
import PageContainer from "@/components/dashboard/PageContainer";
import { Button } from "@/components/ui/button";
import { useGeneralQuery } from "@/hooks/request/useGeneralQuery";
import { StockDataProps, StockProps } from "@/interfaces/stock";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import InspectStock from "./InspectStock";
import { useState } from "react";

const ViewStockScreen = () => {
  const params = useParams<{ id: string }>();
  const stockId = params.id;
  const { data, isFetching } = useGeneralQuery<StockProps>({
    queryKey: ["stock", stockId],
    url: `/stocks/${stockId}`
  });
  const statusMapper: Record<string, string> = {
    pending: "text-orange-500",
    approved: "text-green-500",
    rejected: "text-red-500"
  };
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(!openDrawer);
  };
  return (
    <DashboardLayout pageTitle="Stock Data" pageDescription="Summary of the stock" isLoading={isFetching}>
      <PageContainer>
        {data && data._id && (
          <InspectStock handleDrawerOpen={handleDrawerOpen} type="view" selectedStock={data} openDrawer={openDrawer} />
        )}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-light mb-2">Stock Information</h1>
          <Button className="h-8" variant={"outline"} onClick={handleDrawerOpen}>
            Inspect Stock
          </Button>
        </div>
        {data?.status && <h1 className={`${statusMapper[data.status]}`}>{data.status.toUpperCase()}</h1>}
        <div className="my-5 grid md:grid-cols-3 gap-5">
          <ViewElement title="Delivery Code" description={data?.deliveryId} />
          <ViewElement title="Supplier" description={data?.supplier?.name} />
          <ViewElement
            title="Received Date"
            description={data?.receivedDate ? format(data.receivedDate, "dd-MM-y") : ""}
          />
          <ViewElement title="Truck Number" description={data?.truckNumber} />
        </div>
        <div className="mb-2">
          {((data?.stockData as StockDataProps[]) || []).map((item, index) => {
            const product = data?.products?.find((product) => product.id === item.productId);
            return (
              <div className="mb-4" key={index}>
                <h1>Stock Item #{index + 1}</h1>
                <div className="grid md:grid-cols-3 gap-5">
                  <ViewElement title="Product" description={product?.name} />
                  <ViewElement title="Batch Code" description={item?.batchId} />
                  <ViewElement title="Quantity Expected" description={item?.quantityExpected.toString()} />
                  <ViewElement
                    title="Discrepancy"
                    description={(item?.quantityExpected - item?.quantityReceived).toString()}
                  />
                  <ViewElement title="Section" description={item?.section} />
                </div>
                <ViewElement title="Remark" description={item?.remarks} />
              </div>
            );
          })}
        </div>
      </PageContainer>
    </DashboardLayout>
  );
};

export default ViewStockScreen;
