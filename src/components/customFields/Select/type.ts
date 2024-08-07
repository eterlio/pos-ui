import { FormIconProps } from "../type";

export interface PromiseSelectProps {
  url: string;
  query?: Record<string, any>;
  value?: any;
  searchKey: string;
  valueKey: string;
  labelKey: string;
  label?: string | { text: string; icon?: FormIconProps; className?: string };
  isRequired?: boolean;
  id?: string;
  isMulti?: boolean;
  minSearchLength?: number;
  fieldKey: string;
}


export interface OptionsProps {
    label: string;
    value: string;
  }
  