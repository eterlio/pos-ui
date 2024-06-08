import { FC, useState, useEffect } from "react";
import { GetManyProps } from "@/hooks/types";
import SelectField from "./SelectField";
import { toast } from "sonner";
import { useBaseRequestService } from "@/hooks/request/useAxiosPrivate";
import { BaseResponse } from "@/helpers/baseResponse";
import InputLabel from "../FieldLabel";
import { OptionsProps, PromiseSelectProps } from "./type";
import { HandlerProps } from "../type";

interface PromiseSelectDataProps extends PromiseSelectProps {
  onChange?: (data: HandlerProps) => void;
}
export const PromiseSelect: FC<PromiseSelectDataProps> = ({
  query,
  url,
  value,
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
  const [mappedOptions, setMappedOptions] = useState<OptionsProps[]>([]);
  const { axiosInstance } = useBaseRequestService({ useToken: true, tokenType: "accessToken" });

  const handleSelectFieldChange = async (data: HandlerProps) => {
    if (onChange) {
      onChange(data);
    }
  };

  const fetchData = async (params: Record<string, any>) => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get<BaseResponse<GetManyProps<any>>>(url, { params });
      if (data) {
        const options = data.response.data.map((field) => ({
          label: field[labelKey] || "",
          value: field[valueKey] || ""
        }));
        setMappedOptions(options);
      }
    } catch (error: any) {
      toast.error("Error", { description: error.message });
    } finally {
      setLoading(false);
    }
  };

  const selectSearchFieldChanged = (searchValue: string) => {
    if (typeof searchValue === "string" && (searchValue.length >= minSearchLength || searchValue.length === 0)) {
      fetchData({
        ...query,
        [`${searchKey}_eq`]: searchValue
      });
    }
  };

  useEffect(() => {
    if (value && value.length) {
      fetchData({
        [`${valueKey}_in`]: value
      });
    }
  }, []);

  return (
    <div>
      {label && (
        <div className="my-2">
          <InputLabel id={id} required={isRequired || false} label={label} />
        </div>
      )}
      <SelectField
        options={mappedOptions}
        isLoading={loading}
        onChange={handleSelectFieldChange}
        selectValue={value}
        closeOnSelect
        isMulti={isMulti}
        isSearchable
        searchFieldChanged={selectSearchFieldChanged}
        key={fieldKey}
        fieldKey={fieldKey}
      />
    </div>
  );
};
