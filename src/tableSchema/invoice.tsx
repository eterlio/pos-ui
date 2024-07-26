import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
import { InvoiceProps, InvoiceStatus } from "@/interfaces/invoice";
import { format } from "date-fns";
import { startCase } from "lodash";
import TableStatus from "@/components/TableStatus";
import { formatCurrency } from "@/helpers";

const invoiceStatusColors: { [key in InvoiceStatus]: { bg: string; text: string; circleBg?: string } } = {
  paid: {
    bg: "bg-green-50",
    text: "text-green-600",
    circleBg: "bg-green-600"
  },
  "not paid": {
    bg: "bg-red-50",
    text: "text-red-500",
    circleBg: "bg-red-500"
  },
  expired: {
    bg: "bg-gray-50",
    text: "text-gray-500",
    circleBg: "bg-gray-500"
  },
  "partly paid": {
    bg: "bg-orange-50",
    text: "text-orange-500",
    circleBg: "bg-orange-500"
  }
};

export const invoiceSchema: ColumnDef<InvoiceProps>[] = [
  {
    accessorKey: "invoiceNumber",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Invoice Number" />,
    cell: ({ row }) => <div className="flex space-x-2">INV-{row.getValue("invoiceNumber")}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: "customerId",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Customer ID" />,
    cell: ({ row }) => <div className=" w-[200px]">{row.getValue("customerId")}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total Amount" />,
    cell: ({ row }) => (
      <div className="flex space-x-2">{formatCurrency({ value: row.getValue("totalAmount") as number })}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Due Date" />,
    cell: ({ row }) => {
      const date: Date = row.getValue("dueDate");
      return <div className="flex space-x-2">{date ? format(date, "dd-MM-yyyy") : ""}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status: InvoiceStatus = row.getValue("status");
      const statusLabel = startCase(status);
      return (
        <div className="flex items-center justify-center">
          <TableStatus
            bg={invoiceStatusColors[status]?.bg}
            text={statusLabel || ""}
            textColor={invoiceStatusColors[status]?.text}
            circleBg={invoiceStatusColors[status]?.circleBg}
          />
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  }
];
