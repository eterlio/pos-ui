import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
import { ProductBrandProps } from "@/interfaces/productBrands";
import { format } from "date-fns";

export const productBrandSchema: ColumnDef<ProductBrandProps>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Product Brand Name" />,
    cell: ({ row }) => <div className="flex space-x-2">{row.getValue("name")}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    size: 12
  },
  {
    accessorKey: "slug",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Product Category Slug" />,
    cell: ({ row }) => {
      return <div className="flex space-x-2">{row.getValue("slug")}</div>;
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
      return <div className="flex space-x-2">{format(date, "dd-MM-y")}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  }
];
