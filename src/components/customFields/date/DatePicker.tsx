import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import { FC, useState } from "react";
import { Calendar } from "./CalendarWrapper";
import { FormIconProps, HandlerProps } from "../type";
import InputLabel from "../FieldLabel";

interface DatePickerProps {
  value?: Date;
  resetDate?: boolean;
  onChange?: (data: HandlerProps) => void;
  disabled?: boolean;
  label?: string | { text: string; icon?: FormIconProps; className?: string };
  isRequired?: boolean;
  id?: string;
  fieldKey: string;
}
const DatePicker: FC<DatePickerProps> = ({
  value,
  resetDate,
  onChange,
  disabled,
  label,
  isRequired,
  id,
  fieldKey,
}) => {
  const [date, setDate] = useState<Date | undefined>(value);
  const [openPopOver, setOpenPopOver] = useState<boolean>(false);

  const handleOpenPopOver = () => {
    setOpenPopOver(!openPopOver);
  };
  const handleChange = (value: any) => {
    if (onChange && value) {
      onChange({ key: fieldKey, value });
      setDate(value);
    }
  };
  return (
    <>
      {label && (
        <InputLabel id={id} required={isRequired || false} label={label} />
      )}
      <Popover open={openPopOver} onOpenChange={handleOpenPopOver} >
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal min-h-[41px]",
              !date && "text-muted-foreground disabled:opacity-50"
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" size={16}  />
            {date ? (
              <div className="flex items-center justify-between flex-1">
                <span className="ml-2 text-center">
                  {format(date, "MM/dd/yyy")}
                </span>
                <span className=" -mr-3">
                  {resetDate && (
                    <X
                      className="mr-2 h-4 w-4"
                      size={10}
                      onClick={() => {
                        setDate(undefined);
                        if (openPopOver) {
                          setOpenPopOver(false);
                        }
                      }}
                    />
                  )}
                </span>
              </div>
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className=" w-auto p-0">
          <Calendar
            mode="single"
            captionLayout="dropdown-buttons"
            selected={date}
            onSelect={handleChange}
            fromYear={1960}
            toYear={2050}
            onDayClick={handleOpenPopOver}
            disabled={disabled}
          />
        </PopoverContent>
      </Popover>
    </>
  );
};

export default DatePicker;
