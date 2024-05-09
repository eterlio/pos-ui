import { ChevronDown, X } from "lucide-react";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Loader from "@/components/Loader";
import SingleOption from "./SingleOption";
import { FormIconProps, HandlerProps } from "../type";
import InputLabel from "../FieldLabel";


interface SelectProp<T = any> {
  isMulti?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  isLoading?: boolean;
  options: { label: string; value: T }[];
  closeOnSelect?: boolean;
  selectValue?: T | T[];
  isDisabled?: boolean;
  placeholder?: string;
  onChange?: (data: HandlerProps) => void;
  label?: string | { text: string; icon?: FormIconProps; className?: string };
  isRequired?: boolean;
  id?: string;
  searchFieldChanged?: (data: HandlerProps) => void;
  fieldKey: string;
}
const SelectField: FC<SelectProp> = ({
  isClearable,
  isMulti,
  isSearchable,
  isLoading,
  options,
  closeOnSelect,
  selectValue,
  isDisabled,
  placeholder,
  onChange,
  label,
  isRequired,
  id,
  searchFieldChanged,
  fieldKey,
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [selectedValues, setSelectedValues] = React.useState(new Set<string>());

  const handleSearchFieldChanged = (searchFieldValue: string) => {
    if (searchFieldChanged) {
      searchFieldChanged({ key: fieldKey, value: searchFieldValue });
    }
  };
  const isInitialRender = useRef(true);

  const handleItemDelete = useCallback((value: any) => {
    setSelectedValues((prev) => {
      const next = new Set(prev);
      next.delete(value);
      return next;
    });
  }, []);

  const handleIsClearable = () => {
    setSelectedValues(new Set());
  };

  const handleRemoveOrAddItem = (value: any, isSelected?: boolean) => {
    setSelectedValues((prev) => {
      const next = new Set(prev);
      if (isSelected) {
        next.delete(value);
      } else {
        next.add(value);
      }
      return next;
    });
  };

  const handleAddSingleItem = (value: any) => {
    setSelectedValues(new Set([value]));
  };
  function handleItemSelected<T>(value: T, isSelected: boolean) {
    if (isMulti) {
      handleRemoveOrAddItem(value, isSelected);
    }
    if (!isMulti) {
      handleAddSingleItem(value);
    }
    if (closeOnSelect) {
      setIsPopoverOpen(false);
    }
  }

  useEffect(() => {
    if (selectValue) {
      if (!Array.isArray(selectValue)) {
        setSelectedValues(() => new Set([selectValue]));
      } else {
        setSelectedValues(() => new Set(selectValue));
      }
    }
  }, []);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    // Logic to update selectedValues based on the value prop
    if (onChange) {
      const values = isMulti
        ? Array.from(selectedValues)
        : Array.from(selectedValues)[0];
      onChange({ key: fieldKey, value: values });
    }
  }, [selectedValues]);
  return (
    <div>
      <div>
        {label && (
          <InputLabel id={id} required={isRequired || false} label={label} />
        )}
      </div>
      <Popover
        open={isPopoverOpen}
        onOpenChange={() => setIsPopoverOpen(!isPopoverOpen)}
  
      >
        <PopoverTrigger  disabled={isDisabled} className="w-full">
          <div
            className="cursor-pointer relative flex min-h-[42px] items-center justify-end rounded-[3px] border data-[state=open]:border-ring"
            aria-disabled={isDisabled}
          >
            <div className="relative mr-auto flex flex-grow flex-wrap items-center px-3 py-1">
              {selectedValues?.size > 0 ? (
                isMulti ? (
                  Array.from(selectedValues).map((value) => {
                    const label = options.find(
                      (option) => option.value === value
                    )?.label;
                    return label ? (
                      <SingleOption
                        label={label}
                        key={value}
                        value={value}
                        handleItemDelete={handleItemDelete}
                      />
                    ) : null;
                  })
                ) : (
                  <>
                    <div>
                      {
                        options.find(
                          (opt) => opt.value === Array.from(selectedValues)[0]
                        )?.label
                      }
                    </div>
                  </>
                )
              ) : (
                <span className="mr-auto text-gray-400 text-[12px]">
                  {placeholder ? placeholder : "Select..."}
                </span>
              )}
            </div>
            <div className="flex flex-shrink-0 items-center self-stretch px-1 text-muted-foreground/60">
              {selectedValues?.size > 0 && isClearable && (
                <div>
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      handleIsClearable();
                    }}
                    className="flex items-center p-[0.2rem] hover:bg-gray-100 bg-gray-50 rounded-full border border-gray-300"
                  >
                    <X size={8} />
                  </div>
                </div>
              )}
              <div>{isLoading && <Loader />}</div>
              <span className="mx-0.5 my-2 w-[1px] self-stretch bg-border" />
              <div className="flex items-center self-stretch p-2 hover:text-muted-foreground">
                <ChevronDown size={16} />
              </div>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0"
          align="start"
        >
          <Command>
            {isSearchable && (
              <CommandInput
                placeholder="Search..."
                className="h-9"
                onValueChange={handleSearchFieldChanged}
                disabled={isDisabled}
              />
            )}
            {!options ||
              (options && options.length < 1 && (
                <p className="text-sm text-center p-4">No result found</p>
              ))}
            {!isLoading && (
              <CommandGroup className="overflow-y-auto max-h-[350px] rounded-none" aria-disabled={isDisabled}>
                {options.map((option, index) => {
                  const isSelected = selectedValues.has(option.value);
                  return (
                    <CommandItem
                      key={index}
                      onSelect={() => {
                        handleItemSelected<typeof option.value>(
                          option.value,
                          isSelected
                        );
                      }}
                      className={`${isSelected ? "" : ""} cursor-pointer p-3`}
                      disabled={isDisabled}
                    >
                      <span>{option.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            )}
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SelectField;
