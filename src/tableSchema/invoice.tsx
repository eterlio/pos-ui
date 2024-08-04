import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
import { INVOICE_STATUSES, InvoiceProps, InvoiceStatus } from "@/interfaces/invoice";
import { format } from "date-fns";
import { startCase } from "lodash";
import TableStatus from "@/components/TableStatus";
import { formatCurrency } from "@/helpers";
import { DataFilterProps } from "@/components/table/type";
import { Banknote, CalendarHeart, Settings2 } from "lucide-react";

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

export const invoiceTableFilters: DataFilterProps[] = [
  {
    column: "createdAt",
    options: [],
    title: "Created At",
    extra: {
      mainIcon: CalendarHeart
    },
    isDate: true
  },
  {
    column: "totalAmount",
    options: [],
    title: "Total Amount",
    extra: {
      mainIcon: Banknote
    },
    isNumber: true
  },
  {
    column: "status",
    options: INVOICE_STATUSES.map((st) => ({ label: startCase(st), value: st })),
    title: "Status",
    extra: {
      mainIcon: Settings2
    }
  }
];
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
    header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
    cell: ({ row: { original } }) => {
      const fullName = `${original.customerData?.firstName} ${original.customerData?.lastName}`;
      return <div className="w-[100px]">{fullName}</div>;
    },
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
    accessorKey: "createdBy",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created By" />,
    cell: ({ row: { original } }) => {
      const fullName = `${original.createdByData?.fullName}`;
      return <div className="w-[200px]">{fullName}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
    cell: ({ row }) => {
      const date: Date = row.getValue("createdAt");
      return <div className="flex space-x-2 w-[200px]">{date ? format(date, "dd-MM-yyyy H:mm:ss") : ""}</div>;
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
