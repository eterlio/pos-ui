import SimpleTable from "@/components/table/SimpleTable";
import { SimpleTableColumn } from "@/components/table/type";
import { formatCurrency } from "@/helpers";
import { FC } from "react";

interface SalesAnalysisListViewProps {
  data: { productName: string; totalQuantity: number; totalPrice: number }[];
}

const SalesAnalysisListView: FC<SalesAnalysisListViewProps> = ({ data }) => {
  const columns: SimpleTableColumn[] = [
    { key: "productName", label: "Product Name" },
    { key: "totalQuantity", label: "Quantity Sold", className: "text-center" },
    { key: "totalPrice", label: "Total Amount", className: "text-right" }
  ];

  const calculateTotals = () => {
    return {
      totalQuantity: data.reduce((total, item) => total + item.totalQuantity, 0),
      totalPrice: data.reduce((total, item) => total + item.totalPrice, 0)
    };
  };
  const dataFormatted = data.map((d) => {
    return {
      ...d,
      totalPrice: formatCurrency({ value: d.totalPrice, showCurrencySign: false })
    };
  });

  const footerData = [
    {
      productName: "Total",
      totalQuantity: calculateTotals().totalQuantity,
      totalPrice: formatCurrency({ value: calculateTotals().totalPrice })
    }
  ];

  return <SimpleTable columns={columns} data={dataFormatted} footerData={footerData} />;
};

export default SalesAnalysisListView;
