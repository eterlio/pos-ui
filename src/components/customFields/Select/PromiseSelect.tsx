import { FC, useState } from "react";

import { GetManyProps } from "@/hooks/types";
import SelectField from "./SelectField";
import { toast } from "sonner";
import { useBaseRequestService } from "@/hooks/request/useAxiosPrivate";
import { BaseResponse } from "@/helpers/baseResponse";
import InputLabel from "../FieldLabel";
import { OptionsProps, PromiseSelectProps } from "./type";
import { useSearchRequestQuery } from "./hook/useRequest";

interface PromiseSelectDataProps extends PromiseSelectProps {
  onChange?: (selectedValues: any) => void;
}
export const PromiseSelect: FC<PromiseSelectDataProps> = ({
  query,
  url,
  value,
  selectFields,
  searchKey,
  valueKey,
  labelKey,
  id,
  isRequired,
  label,
  isMulti,
  minSearchLength = 3,
  onChange,
  fieldKey
}) => {
  const [loading, setLoading] = useState(false);
  const { axiosInstance } = useBaseRequestService({ useToken: true, tokenType: "accessToken" });
  let mappedOptions: OptionsProps[] = [];
  const handleSelectFieldChange = async (value: any) => {
    if (onChange) {
      onChange(value);
    }
  };
  const selectSearchFieldChanged = async (searchValue: string) => {
    if (typeof searchValue === "string" && (searchValue.length >= minSearchLength || searchValue.length === 0)) {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get<BaseResponse<GetManyProps<any>>>(url, {
          [`${searchKey}_eq`]: searchValue,
          ...query
        });
        if (data) {
          const options = data.response.data.map((field) => {
            return {
              label: field[labelKey] || "",
              value: field[valueKey] || ""
            };
          });
          mappedOptions = [...mappedOptions, ...options];
        }
      } catch (error: any) {
        toast.error("Error", { description: error.message });
      } finally {
        setLoading(false);
      }
    }
  };
  const selectFieldMapper = selectFields && selectFields.length ? selectFields.join(",") : null;

  if (selectFieldMapper) {
    query = {
      ...query,
      columns: selectFieldMapper
    };
  }
  const { data, isLoading } = useSearchRequestQuery<GetManyProps<any>>(url, query);

  if (data) {
    const options = data.response.data.map((field) => {
      return {
        label: field[labelKey] || "",
        value: field[valueKey] || ""
      };
    });
    mappedOptions = [...mappedOptions, ...options];
  }

  return (
    <>
      {label && <InputLabel id={id} required={isRequired || false} label={label} />}
      <SelectField
        options={mappedOptions}
        isLoading={isLoading || loading}
        onChange={handleSelectFieldChange}
        selectValue={value}
        closeOnSelect
        isMulti={isMulti}
        isSearchable
        searchFieldChanged={selectSearchFieldChanged}
        key={fieldKey}
      />
    </>
  );
};
