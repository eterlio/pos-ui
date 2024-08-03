import { MoreVertical } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { FC, memo } from "react";
import { ActionButton } from "./type";

interface DataTableRowActionsProps {
  actionButtons: ActionButton[];
  row: any;
}

export const DataTableRowActions: FC<DataTableRowActionsProps> = memo(({ actionButtons, row }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px]">
        {actionButtons &&
          actionButtons.length > 0 &&
          actionButtons.map((actionButton, index) => {
            if (actionButton.show !== undefined && !actionButton.show) {
              return null;
            }
            return (
              <DropdownMenuItem
                key={index + 1}
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  actionButton.action(row.original);
                }}
              >
                {actionButton.label}
              </DropdownMenuItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
