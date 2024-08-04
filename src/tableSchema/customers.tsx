import { Users } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
import { DataFilterProps } from "@/components/table/type";
import { startCase } from "lodash";
import { GENDER_OPTIONS } from "@/utils";
import { CustomerProps } from "@/interfaces/customer";
import { format } from "date-fns";

export const customerTableFilters: DataFilterProps[] = [
  {
    column: "gender",
    options: GENDER_OPTIONS,
    title: "Gender",
    extra: {
      mainIcon: Users
    }
  }
];

export const customerTableSchema: ColumnDef<CustomerProps>[] = [
  {
    accessorKey: "firstName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="First name" />,
    cell: ({ row }) => <div className="flex space-x-2">{row.getValue("firstName")}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Last name" />,
    cell: ({ row }) => {
      return <div className="flex space-x-2">{row.getValue("lastName")}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => {
      return <div className="flex space-x-2">{row.getValue("email") || "N/A"}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: "gender",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Gender" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate font-medium">{startCase(row.getValue("gender") || "N/A")}</span>
        </div>
      );
    }
  },
  {
    accessorKey: "dateOfBirth",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date of Birth" />,
    cell: ({ row }) => {
      const dateOfBirth: Date = row.getValue("dateOfBirth");
      return (
        <div className="flex space-x-2">
          <span className="truncate font-medium">{dateOfBirth ? dateOfBirth.toLocaleDateString() : "N/A"}</span>
        </div>
      );
    }
  },
  {
    accessorKey: "createdBy",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created By" />,
    cell: ({ row: { original } }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate font-medium">
            {`${original?.createdByData?.firstName} ${original?.createdByData?.lastName}`}
          </span>
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
    }
  }
];
