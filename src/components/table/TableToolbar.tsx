import { ListFilter, X } from "lucide-react";
import { Table } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { DataTableViewOptions } from "../table/DataTableViewOptions";

import { DataTableFacetedFilter } from "./TableFacetedFilter";
import DataFacetedFilterForNumbers from "./DataFacetedFilterForNumbers";
import { useCallback, useState } from "react";
import { useSetQueryParam } from "./hooks/useSetQueryParam";

import Dropdown from "./Dropdown";
import { DataFilterProps } from "./type";
import { OptionsProps } from "./type";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  showExportButton?: boolean;
  filters?: DataFilterProps[];
  showSearchSelection?: boolean;
  searchSelectionOptions?: OptionsProps[];
  showSelectColumns?: boolean;
}

export function DataTableToolbar<TData>({
  table,
  showExportButton = false,
  filters,
  searchSelectionOptions,
  showSearchSelection,
  showSelectColumns = true,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const { setQueryParam, getQueryParam } = useSetQueryParam();
  const [value, setValue] = useState<string>(getQueryParam("search") || "");

  const handleOnChange = useCallback((event: any) => {
    const { target: { value = "" } = {} } = event;
    setValue(event.target.value);

    if (value.length >= 3 || value.length === 0) {
      setQueryParam("search", value);
    }
  }, []);

  const handleSelectedField = (field: string) => {
    setQueryParam("searchSelection", field);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-between mb-5">
        <div className="flex flex-1 items-center">
          {showSearchSelection && (
            <Dropdown
              options={searchSelectionOptions}
              icon={<ListFilter />}
              className="rounded-r-none"
              handleSelectedField={handleSelectedField}
              defaultValue={getQueryParam("searchSelection") || "none"}
            />
          )}
          <Input
            placeholder="Search..."
            value={value}
            onChange={handleOnChange}
            className="h-10 w-full lg:w-[250px] my-2 lg:my-0 rounded-l-none"
          />
        </div>
        {showSelectColumns && (
          <DataTableViewOptions
            table={table}
            showExportButton={showExportButton}
          />
        )}
      </div>
      <div className="flex items-center justify-between my-5  overflow-x-scroll">
        {/* TABLE FILTERS */}
        <div>
          <div className="filters flex gap-2">
            {filters &&
              filters.length > 0 &&
              filters.map((filter) => {
                return !filter.isNumber
                  ? table.getColumn(filter.column) && (
                      <DataTableFacetedFilter
                        column={filter.column}
                        title={filter.title}
                        options={filter.options}
                        extra={filter.extra}
                        key={Math.ceil(Math.random() * 1000000000)}
                      />
                    )
                  : table.getColumn(filter.column) && (
                      <DataFacetedFilterForNumbers
                        key={Math.ceil(Math.random() * 1000000000)}
                        filter={filter}
                      />
                    );
              })}
          </div>
          <div className="reset">
            {isFiltered && (
              <Button
                variant="ghost"
                onClick={() => table.resetColumnFilters()}
                className="h-8 px-2 lg:px-3"
              >
                Reset
                <X className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        {/* BULK ACTION */}
        <div>{/* <BulkAction /> */}</div>
      </div>
    </>
  );
}
