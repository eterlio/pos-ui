import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
  value = undefined,
  resetDate,
  onChange,
  disabled,
  label,
  isRequired,
  id,
  fieldKey
}) => {
  const [openPopOver, setOpenPopOver] = useState<boolean>(false);

  const handleOpenPopOver = () => {
    setOpenPopOver(!openPopOver);
  };
  const handleChange = (value: any) => {
    if (onChange && value) {
      onChange({ key: fieldKey, value });
    }
  };
  return (
    <div>
      {label && (
        <div className="my-2">
          <InputLabel id={id} required={isRequired || false} label={label} />
        </div>
      )}
      <Popover open={openPopOver} onOpenChange={handleOpenPopOver}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={`w-full justify-start text-left font-normal h-10 py-2 px-3 rounded-[3px] 
              ${
                !value && "text-muted-foreground "
              } disabled:bg-gray-100 disabled:opacity-75 text-gray-500 disabled:cursor-not-allowed`}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" size={16} />
            {value ? (
              <div className="flex items-center justify-between flex-1">
                <span className="ml-2 text-center">{format(value, "MM/dd/yyy")}</span>
                <span className=" -mr-3">
                  {resetDate && (
                    <X
                      className="mr-2 h-4 w-4"
                      size={10}
                      onClick={() => {
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
            selected={value ? value : undefined}
            onSelect={handleChange}
            fromYear={1960}
            toYear={2050}
            onDayClick={handleOpenPopOver}
            disabled={disabled}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
