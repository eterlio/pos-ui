import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "../ui/button";
import { Settings2 } from "lucide-react";
import { TableActionProps } from "./type";

export function TableActions({ tableActions }: { tableActions: TableActionProps[] }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="flex items-center gap-x-5 h-8 bg-secondary" variant="outline" size="sm">
          <div className="flex items-center gap-x-1">
            <Settings2 />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-50 h-10 p-2">
        {tableActions.map((tableAction, index) => {
          const { action, label, show = true } = tableAction;
          return (
            show && (
              <div key={index} onClick={action}>
                <span className="cursor-pointer">{label}</span>
              </div>
            )
          );
        })}
      </PopoverContent>
    </Popover>
  );
}
