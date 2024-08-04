import { useSetQueryParam } from "@/hooks/useSetQueryParam";
import { addDays } from "date-fns";
import { useEffect } from "react";
import SalesReport from "../SalesReport";

const TodaySales = () => {
  const { setQueryParam } = useSetQueryParam();
  useEffect(() => {
    setQueryParam("createdAt_gte", new Date().toLocaleDateString());
    setQueryParam("createdAt_lt", addDays(new Date(), 1).toLocaleDateString());
  }, []);
  return (
    <div>
      <SalesReport isTodayReport />
    </div>
  );
};

export default TodaySales;
