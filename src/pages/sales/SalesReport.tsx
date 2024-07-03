import Loader from "@/components/Loader";
import Table from "@/components/table/Table";
import { useGeneralQuery } from "@/hooks/request/useGeneralQuery";
import { GetManyProps } from "@/hooks/types";
import { useSetQueryParam } from "@/hooks/useSetQueryParam";
import { SalesProps } from "@/interfaces/sales";
import { salesTableSchema } from "@/tableSchema/sales";
import { addDays } from "date-fns";
import { useEffect } from "react";
const SalesReport = () => {
  const { queryObject, setQueryParam } = useSetQueryParam();
  useEffect(() => {
    setQueryParam("createdAt_gte", new Date().toLocaleDateString());
    setQueryParam("createdAt_lt", addDays(new Date(), 1).toLocaleDateString());
  }, []);
  const { data, isFetching } = useGeneralQuery<GetManyProps<SalesProps>>({
    queryKey: ["sales", queryObject],
    url: "/sales",
    query: queryObject,
    enabled: !!Object.keys(queryObject).length
  });
  return (
    <>
      {isFetching && (
        <div className="loading h-full flex-1 flex items-center justify-center">
          <div className="space-y-4 flex items-center justify-center flex-col">
            <Loader className="!w-10 !h-10" />
            <h1>Fetching sales report</h1>
          </div>
        </div>
      )}

      <Table columns={salesTableSchema} data={data?.data || []} paginator={data?.paginator} />
    </>
  );
};

export default SalesReport;
