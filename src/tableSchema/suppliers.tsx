import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
import { format } from "date-fns";
import { SupplierProps, SupplierStatus } from "@/interfaces/supplier";
import { formatPhoneToString } from "@/helpers";
import TableStatus from "@/components/TableStatus";
import { startCase } from "lodash";

const statusColors: { [key in SupplierStatus]: { bg: string; text: string; circleBg?: string } } = {
  active: {
    bg: "bg-green-50",
    text: "text-green-600",
    circleBg: "bg-green-600"
  },
  inactive: {
    bg: "bg-gray-50",
    text: "text-gray-500",
    circleBg: "bg-gray-500"
  }
};
export const suppliersTableSchema: ColumnDef<SupplierProps>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Supplier Name" />,
    cell: ({ row }) => <div className="flex space-x-2">{row.getValue("name")}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    size: 12
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Supplier Email" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 gap-2 items-center">
          {row.getValue("email")}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: "phone",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Supplier Phone" />,
    cell: ({ row }) => {
      return <div className="flex space-x-2">{formatPhoneToString(row.getValue("phone"))}</div>;
    }
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status: SupplierStatus = row.getValue("status");
      const statusFiltered = ["active", "inactive"].find((stat) => stat === status);
      return (
        <div className="flex items-center justify-center">
          {status && (
            <TableStatus
              bg={statusColors[status]?.bg}
              text={startCase(statusFiltered) || ""}
              textColor={statusColors[status]?.text}
              circleBg={statusColors[status]?.circleBg}
            />
          )}
        </div>
      );
    }
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
    cell: ({ row }) => {
      const date: Date = row.getValue("createdAt");
      return <div className="flex space-x-2">{format(date, "dd-MM-y")}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  }
];
