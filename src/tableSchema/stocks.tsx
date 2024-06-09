import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
import { format } from "date-fns";
import { StockDataProps, StockProps } from "@/interfaces/stock";
import { SupplierProps } from "@/interfaces/supplier";

export const stockDataSchema: ColumnDef<StockProps>[] = [
  {
    accessorKey: "batchId",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Batch Number" />,
    cell: ({ row }) => <div className="flex space-x-2">{row.getValue("batchId")}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    size: 12
  },
  {
    accessorKey: "truckNumber",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Truck Number" />,
    cell: ({ row }) => {
      return <div className="flex space-x-2">{row.getValue("truckNumber")}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: "supplierId",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Supplier" />,
    cell: ({ row }) => {
      const supplier = row.original?.supplier as SupplierProps;
      return <div className="flex space-x-2">{supplier?.name}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: "stockData",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total Stock Recorded" />,
    cell: ({ row }) => {
      const stockData: StockDataProps[] = row.getValue("stockData") || [];
      return <div className="flex space-x-2">{stockData.length}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: "receivedDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date Received" />,
    cell: ({ row }) => {
      const date: Date = row.getValue("receivedDate");
      return <div className="flex space-x-2">{format(date, "dd-MM-y")}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  }
];
