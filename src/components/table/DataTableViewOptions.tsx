import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Columns, DownloadIcon } from "lucide-react";
import { Table } from "@tanstack/react-table";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  showExportButton?: boolean;
}

export function DataTableViewOptions<TData>({
  table,
  showExportButton = false,
}: DataTableViewOptionsProps<TData>) {
  return (
    <div className="flex gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto hidden lg:flex"
          >
            <Columns className="mr-2 min-h-4 min-w-4" />
            Columns
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== "undefined" && column.getCanHide()
            )
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
      {showExportButton && (
        <div className="export-button">
          <Button variant="outline" size="sm" className="bg-primary text-white">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      )}
    </div>
  );
}
