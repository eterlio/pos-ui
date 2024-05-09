import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDown, Eye } from "lucide-react";
import { Column } from "@tanstack/react-table";
import { cn } from "../../lib/utils";
import { useSetQueryParam } from "./hooks/useSetQueryParam";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";
import { pushOrReplaceSortValues } from "./utils";
import { SortType } from "./type";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

type SortTypeProps = {
  name: string;
  value: SortType;
};

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }
  const [sortedType, setSortedType] = useState<SortTypeProps | undefined>(
    undefined
  );
  const { setQueryParam, getQueryParam } = useSetQueryParam();

  const handleSortSelected = (sortField: string) => {
    const fields = getQueryParam("sort")?.split(",") || [];
    return [...new Set(pushOrReplaceSortValues(fields, sortField))].join(",");
  }

  const handleItemColumnSorted = (
    selectedColumn: string,
    sortType: SortType
  ) => {
    const mapper = {
      asc: `${selectedColumn}`,
      desc: `-${selectedColumn}`,
    };
    handleSortSelected(selectedColumn);
    setQueryParam("sort", handleSortSelected(mapper[sortType]));
    setSortedType({
      name: selectedColumn,
      value: sortType,
    });
  };

  return (
    <>
      {/* <div>{count}</div>     */}
      <div className={cn("flex items-center space-x-2", className)}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="-ml-3 h-8 data-[state=open]:bg-accent"
            >
              <span>{title}</span>
              {sortedType?.value === "desc" ? (
                <ArrowDownIcon className="ml-2 h-4 w-4" />
              ) : sortedType?.value === "asc" ? (
                <ArrowUpIcon className="ml-2 h-4 w-4" />
              ) : (
                <ChevronsUpDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem
              onClick={() => handleItemColumnSorted(column.id, "asc")}
            >
              <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Asc
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleItemColumnSorted(column.id, "desc")}
            >
              <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Desc
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
              <Eye className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Hide
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
