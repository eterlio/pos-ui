import { useQueryClient } from "@tanstack/react-query";
import { GetManyProps } from "../types";

type Entity = { id: string };

export function useOptimisticUpdates() {
  const queryClient = useQueryClient();

  const addToOrUpdateList = <T extends Entity>(key: string[], item: T) => {
    queryClient.setQueryData<T[]>(key, (data) => {
      if (!data) return [item];
      const index = data.findIndex((i) => i.id === item.id);
      if (index !== -1) {
        const newData = [...data];
        newData[index] = item;
        return newData;
      }
      return [...data, item];
    });
  };

  const removeItemFromList = <T extends Entity>(key: any[], id: string) => {
    queryClient.setQueryData<GetManyProps<T[]>>(key, (data) => {
      if (!data) return undefined;
      return {
        ...data,
        data: data.data.filter((item) => {
          if ("id" in item) return item.id !== id;
        })
      };
    });
  };

  return { addToOrUpdateList, removeItemFromList };
}
