import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { FC, ReactNode, useCallback, useState } from "react";
import { OptionsProps } from "./type";


interface DropdownProps {
  title?: string;
  icon?: ReactNode;
  options?: OptionsProps[];
  className?: string;
  handleSelectedField?: (value: string) => void;
  defaultValue?: string;
}
const Dropdown: FC<DropdownProps> = ({
  options,
  icon,
  title,
  className,
  handleSelectedField,
  defaultValue = "",
}) => {
  const [value, setValue] = useState(defaultValue);
  const selectedLabel =
    options?.find((opt) => opt.value === value)?.label || "";

  const handleValueChange = useCallback((newValue: string) => {
    setValue(newValue);
    if (handleSelectedField) {
      handleSelectedField(newValue);
    }
  }, []);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`flex ${className} outline-none focus-within:outline-none`}
        >
          {selectedLabel || (icon && icon) || (title && title)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={value} onValueChange={handleValueChange}>
          {options &&
            options.length > 0 &&
            options.map((option) => {
              return (
                <DropdownMenuRadioItem
                  value={option.value}
                  key={`${Math.random()}__{value}`}
                  className="cursor-pointer"
                >
                  {option.label}
                </DropdownMenuRadioItem>
              );
            })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
