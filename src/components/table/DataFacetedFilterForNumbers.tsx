import { CheckIcon, ChevronsUpDownIcon, CornerDownRight } from "lucide-react";
import React, { ChangeEvent, useCallback, useState } from "react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import IsBetweenFilter from "./IsBetweenFilter";
import { useSetQueryParam } from "./hooks/useSetQueryParam";
import { DataFilterProps } from "./type";
import { toast } from "sonner";

interface DataFacetedFilterForNumbersProps {
  filter: DataFilterProps;
}
interface FilterGroup {
  label: string;
  value: FilterGroupValues;
}
[];

type FilterGroupValues = "isBetween" | "isGreater" | "isEql" | "isLess";
const filterGroups: FilterGroup[] = [
  {
    label: "is between",
    value: "isBetween"
  },
  {
    label: "is greater than",
    value: "isGreater"
  },
  {
    label: "is equal to",
    value: "isEql"
  },
  {
    label: "is less than",
    value: "isLess"
  }
];
const DataFacetedFilterForNumbers: React.FC<DataFacetedFilterForNumbersProps> = ({ filter }) => {
  const { removeQueryParam, setQueryParam, getQueryParam } = useSetQueryParam();
  const queryKeyMapper = {
    isEql: "eq",
    isLess: "lt",
    isGreater: "gt",
    isBetween: "between"
  };
  const less = getQueryParam(`${filter.column}_gte`);
  const high = getQueryParam(`${filter.column}_lte`);
  const [open, setOpen] = useState(false);

  const [parentOpen, setParentOpen] = useState(false);
  const [value, setValue] = useState<FilterGroupValues | null>(null);
  const [label, setLabel] = useState("");
  const [inputValue, setInputValue] = useState("");

  const [isBetweenValues, setIsBetweenValues] = useState<{
    lesserValue?: string;
    higherValue?: string;
  }>({
    lesserValue: less || "",
    higherValue: high || ""
  });
  const [facetData, setFacetData] = useState<string>("");

  const handleItemSelect = useCallback((data: string) => {
    setLabel(data);
    setOpen((open) => !open);
    const labelValue = filterGroups.find((group) => group.label === data);
    if (labelValue) {
      setValue(labelValue?.value);
    }
    const queryKey = getQueryKeyMapper(labelValue!.value);
    // Auto set values if it's in query string
    const selectValue = getQueryParam(`${filter.column}_${queryKey}`);
    setInputValue(selectValue || "");
  }, []);
  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }, []);
  const formatFilterDisplay = (value: FilterGroupValues) => {
    if (!value) return "";
    const mapper = {
      isEql: "=",
      isLess: "<",
      isGreater: ">",
      isBetween: ">="
    };
    return mapper[value];
  };

  const getQueryKeyMapper = (key: FilterGroupValues) => {
    return queryKeyMapper[key];
  };
  const closeFilter = () => {
    setParentOpen(false);
    let queryKey = "";
    let symbol = "";
    if (value) {
      symbol = formatFilterDisplay(value);

      removeQueryParam(`${filter.column}_lte`);
      removeQueryParam(`${filter.column}_gte`);
      queryKey = getQueryKeyMapper(value)
      const objectMapperValues = Object.values(queryKeyMapper);
      objectMapperValues.forEach((key) => {
        removeQueryParam(`${filter.column}_${key}`);
      });
    }

    if (value === "isBetween" && isBetweenValues && isBetweenValues.higherValue && isBetweenValues.lesserValue) {
      const { higherValue, lesserValue } = isBetweenValues;
      if (lesserValue > higherValue) {
        return toast.warning("Warning", {
          description: "lesser value shouldn't be greater than higher number"
        });
      }
      setQueryParam(`${filter.column}_gte`, `${lesserValue}`);
      setQueryParam(`${filter.column}_lte`, `${higherValue}`);
      setFacetData(`${lesserValue} ${symbol} ${higherValue}`);
    } else if (value && inputValue) {
      console.log({ queryKey, inputValue });

      setQueryParam(`${filter.column}_${queryKey}`, inputValue);
    }
  };
  const resetFilter = () => {
    if (value) {
      const queryKey = getQueryKeyMapper(value);
      if (queryKey === "between") {
        removeQueryParam(`${filter.column}_gte`);
        removeQueryParam(`${filter.column}_lte`);
      } else {
        if (getQueryParam(`${filter.column}_${queryKey}`)) {
          removeQueryParam(`${filter.column}_${queryKey}`);
        }
      }
    }
    setValue(null);
    setInputValue("");
    setLabel("");
    setFacetData("");
  };

  const handleIsBetweenValues = ({ name, value }: any) => {
    setIsBetweenValues((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  const disableApplyFilterButton = () => {
    if (value && value === "isBetween") {
      return !!(isBetweenValues && isBetweenValues.higherValue && isBetweenValues.lesserValue);
    }
    return !!inputValue;
  };
  return (
    <Popover open={parentOpen} onOpenChange={setParentOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          {filter && filter.extra && filter.extra.mainIcon && <filter.extra.mainIcon className="mr-2 h-4 w-4" />}
          {filter.title} {facetData && facetData}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className=" flex items-center gap-5">
            <p className="text-sm text-muted-foreground">Set filter</p>
            <h4 className="font-medium leading-none">{filter.title} Filter</h4>
          </div>
          <div className="mt-1">
            <div className="mb-[0.3rem] flex cursor-pointer items-center justify-end text-primary/90">
              <span className="text-sm text-black" onClick={resetFilter}>
                Clear filter
              </span>
            </div>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                  {label || "Select filter"}
                  <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandGroup>
                    <CommandList>
                      {filterGroups &&
                        filterGroups.length > 0 &&
                        filterGroups.map((framework: FilterGroup) => (
                          <CommandItem key={framework.value} onSelect={handleItemSelect} className="cursor-pointer">
                            {framework.label}
                            <CheckIcon
                              className={cn("ml-auto h-4 w-4", label === framework.value ? "opacity-100" : "opacity-0")}
                            />
                          </CommandItem>
                        ))}
                    </CommandList>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>

            {value && (
              <div className="mt-3">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <CornerDownRight size={22} />
                    {value === "isBetween" ? (
                      <IsBetweenFilter column={filter.column} handleIsBetweenValues={handleIsBetweenValues} />
                    ) : (
                      <Input className="h-10" value={inputValue} onChange={handleInputChange} type="number" />
                    )}
                  </div>
                  <Button onClick={closeFilter} disabled={!disableApplyFilterButton()}>
                    Apply filter criteria
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DataFacetedFilterForNumbers;
