import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
import { format } from "date-fns";
import { StockDataProps, StockProps } from "@/interfaces/stock";
import { SupplierProps } from "@/interfaces/supplier";

const statusMapper: Record<string, string> = {
  pending: "text-orange-500",
  approved: "text-green-500",
  rejected: "text-red-500"
};
export const stockDataSchema: ColumnDef<StockProps>[] = [
  {
    accessorKey: "deliveryId",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Delivery Code" />,
    cell: ({ row }) => <div className="flex space-x-2">{row.getValue("deliveryId")}</div>,
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
    accessorKey: "createdBy",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Recorded by" />,
    cell: ({ row }) => {
      const recordedBy = row.original?.createdByData;
      return <div className="flex space-x-2">{`${recordedBy?.fullName || "N/A"}`}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue<"pending" | "rejected" | "approved">("status");
      return <div className={`flex space-x-2 ${statusMapper[status]}`}>{status}</div>;
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
