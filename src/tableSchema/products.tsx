import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
import { format } from "date-fns";
import { ProductProps } from "@/interfaces/products";

export const productTableSchema: ColumnDef<ProductProps>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Product Name" />,
    cell: ({ row }) => <div className="flex space-x-2">{row.getValue("")}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableHiding: true
  },
  {
    accessorKey: "code",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Product Code" />,
    cell: ({ row }) => <div className="flex space-x-2">{row.getValue("")}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: "brand",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Product Brand" />,
    cell: ({ row }) => <div className="flex space-x-2">{row.getValue("")}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: "category",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
    cell: ({ row }) => <div className="flex space-x-2">{row.getValue("")}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Quantity" />,
    cell: ({ row }) => <div className="flex space-x-2">{row.getValue("")}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: "sellingPrice",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Selling Price" />,
    cell: ({ row }) => <div className="flex space-x-2">{row.getValue("")}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: "unitPrice",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Unit Price" />,
    cell: ({ row }) => <div className="flex space-x-2">{row.getValue("")}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
    cell: ({ row }) => {
      const date: Date = row.getValue("createdAt");
      return <div className="flex space-x-2">{format(date, "d-m-y")}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  }
];
