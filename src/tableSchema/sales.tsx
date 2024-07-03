import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
import { SalesProps } from "@/interfaces/sales";
import { formatCurrency } from "@/helpers";
import { startCase } from "lodash";

export const salesTableSchema: ColumnDef<SalesProps>[] = [
  {
    accessorKey: "receiptNumber",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Receipt #" />,
    cell: ({ row }) => {
      return <div className="flex space-x-2">{row.getValue("receiptNumber")}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: "customerId",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">{`${row.original?.customerData?.firstName || ""} ${
          row.original?.customerData?.lastName || ""
        }`}</div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: "amountPaid",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Amount Paid" />,
    cell: ({ row }) => <div className="flex space-x-2">{formatCurrency(row.getValue("amountPaid"))}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    size: 12
  },
  {
    accessorKey: "modeOfPayment",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Mode of Payment" />,
    cell: ({ row }) => <div className="flex space-x-2">{startCase(row.getValue("modeOfPayment"))}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    size: 12
  },
  {
    accessorKey: "changeGiven",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Change Given" />,
    cell: ({ row }) => {
      return <div className="flex space-x-2">{formatCurrency(row.getValue("changeGiven"))}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: "arrears",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Arrears" />,
    cell: ({ row }) => {
      return <div className="flex space-x-2">{formatCurrency(row.getValue("arrears"))}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  }
];
