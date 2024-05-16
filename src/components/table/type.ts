import { ColumnDef, Row } from "@tanstack/react-table";
import { MouseEventHandler } from "react";

export interface OptionsProps {
  label: string;
  value: any;
}
type IconType = React.ComponentType<{ className?: string }>;
export interface DataFilterProps {
  column: string;
  title: string;
  options: {
    label: string;
    value: string | boolean;
    icon?: IconType;
  }[];
  isNumber?: boolean;
  extra?: {
    mainIcon?: IconType;
  };
}
export type SortType = "asc" | "desc";

export interface ActionButton {
  label: string;
  action: MouseEventHandler;
}
export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  showExportButton?: boolean;
  actionButtons?: ActionButton[];
  filters?: DataFilterProps[];
  fetchQuery?: any;
  selectedDocuments?: TData[];
  allowRowSelect?: boolean;
  data: TData[];
  paginator?: Paginator;
  showSearchSelection?: boolean;
  searchSelectionOptions?: OptionsProps[];
  showSelectColumns?: boolean;
  handleRowClick?: (ata: Row<TData>["original"]) => void;
  title?: string;
  description?: string;
  isLoading?: boolean;
  loadingText?: string;
}

export interface Paginator {
  page: number;
  perPage: number;
  totalDocuments: number;
  totalPages: number;
}

export interface OptionsProps {
  value: any;
  label: string;
}
