import { Paginator } from "@/components/table/type";
import { SalesProps } from "@/interfaces/sales";
import { create } from "zustand";

type SalesStoreState = {
  sales: SalesProps[] | null;
  paginator: Paginator | null;
  setSales: (sales: SalesProps[]) => void;
  setPaginator: (paginator: Paginator) => void;
};

const useSalesStore = create<SalesStoreState>((set) => ({
  sales: null,
  paginator: null,

  setSales: (sales?: SalesProps[]) => {
    if (sales) {
      set(() => ({
        sales: sales
      }));
    }
  },

  setPaginator: (paginator) => {
    if (paginator) {
      set(() => ({
        paginator
      }));
    }
  }

}));

export default useSalesStore;
