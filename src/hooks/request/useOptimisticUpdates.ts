import { useQueryClient } from "@tanstack/react-query";
import { GetManyProps } from "../types";

interface Entity {
  id?: string;
}
export function useOptimisticUpdates() {
  const queryClient = useQueryClient();

  const addToOrUpdateList = <T extends Entity>(key: any[], item: T) => {
    //@ts-ignore
    queryClient.setQueryData<GetManyProps<T>>(key, (data) => {
      if (!data) return { data: [item] };
      const index = data.data.findIndex((i) => i.id === item.id);

      if (index !== -1) {
        const newData = [...data.data];
        newData[index] = { ...newData[index], ...item };
        return { data: newData, paginator: data.paginator };
      }

      return { data: [...data.data, item], paginator: data.paginator };
    });
  };

  const removeItemFromList = <T extends Entity>(key: any[], id: string) => {
    queryClient.setQueryData<GetManyProps<T>>(key, (data) => {
      if (!data) return undefined;
      return {
        ...data,
        data: data.data.filter((item) => {
          if ("id" in item) return item.id !== id;
        })
      };
    });
  };
  const updateSingleItem = <T extends Entity>(key: any[], item: T) => {
    //@ts-ignore
    queryClient.setQueryData<T>(key, (data) => {
      return { ...data, ...item };
    });
  };

  return { addToOrUpdateList, removeItemFromList, updateSingleItem };
}
