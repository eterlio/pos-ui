import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { GetManyProps } from "../types";
import { UserProps } from "@/interfaces/users";
import { useBaseRequestService } from "./useAxiosPrivate";
import { getErrorMessageFromApi } from "@/utils";
import { toast } from "sonner";
import { BaseResponse } from "@/helpers/baseResponse";
import { GetManyProps } from "../types";

export const useFetchUsersQuery = (query: Record<string, any>) => {
  const { axiosInstance } = useBaseRequestService({ useToken: true, tokenType: "accessToken" });
  const { data, isFetching, isRefetching } = useQuery({
    queryKey: ["users", query],
    // staleTime: 10000,
    // refetchOnMount: true,
    enabled: !!query,
    retry: 0,
    refetchOnWindowFocus: false,
    // gcTime: 100000,
    queryFn: async () => {
      const {
        data: { response }
      } = await axiosInstance.get<BaseResponse<GetManyProps<UserProps[]>>>("/users", {
        params: query
      });
      return response;
    }
  });
  return { data, isFetching, isRefetching };
};
export const useFetchUserQuery = (id: string) => {
  const { axiosInstance } = useBaseRequestService({ useToken: true, tokenType: "accessToken" });
  const { data, isFetching, isRefetching } = useQuery({
    queryKey: ["users", id],
    // staleTime: 10000,
    // refetchOnMount: true,
    enabled: !!id,
    retry: 0,
    refetchOnWindowFocus: false,
    // gcTime: 100000,
    queryFn: async () => {
      const {
        data: { response }
      } = await axiosInstance.get<BaseResponse<UserProps>>(`/users/${id}`);
      return response;
    }
  });
  return { data, isFetching, isRefetching };
};

export const useCreateOrUpdateUserMutation = (id?: string) => {
  const { axiosInstance } = useBaseRequestService({ useToken: true, tokenType: "accessToken" });
  const { data, isPending, mutate } = useMutation({
    mutationFn: async (data: { payload: UserProps }) => {
      if (id) {
        return await axiosInstance.put<UserProps>(`/users/${id}`, data.payload);
      }
      return await axiosInstance.post<UserProps>(`/users`, data.payload);
    },
    mutationKey: ["createOrUpdateUser", id],
    onError(error) {
      toast.error("Error", { description: getErrorMessageFromApi(error) });
    }
  });

  return { data, isPending, mutate };
};
export const useDeleteUserMutation = (query: any) => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useBaseRequestService({ useToken: true, tokenType: "accessToken" });
  const { data, isPending, mutate } = useMutation({
    mutationFn: async (id: string) => await axiosInstance.delete<UserProps>(`/users/${id}`),
    mutationKey: ["deleteUser"],
    //@ts-ignore
    onError(error, id, context) {
      if ("previousResponse" in (context as any)) {
        queryClient.setQueryData(["users", query], (context as any).previousResponse);
      }
      toast.error("Error", { description: getErrorMessageFromApi(error) });
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["deleteUser"] });

      const previousResponse = queryClient.getQueryData<GetManyProps<UserProps[]>>(["users", query]);

      if (previousResponse && Object.keys(previousResponse).length) {
        queryClient.setQueryData(["users", query], (old: GetManyProps<UserProps>) => {
          const result = old.data.filter((user) => {
            return user.id !== id;
          });
          return { ...old, data: result };
        });
      }
      return { previousResponse };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["deleteUser"] });
    }
  });

  return { data, isPending, mutate };
};

// export function useCreateUpdatePostMutation(id?: string) {
//   const request = id ? usePutRequest : usePostRequest
//   const queryClient = useQueryClient()
//   const query = useMutation({
//     mutationKey: ["post", id],
//     mutationFn: async (post: Post) => {
//       const { data } = await request<Post>(`/posts` + (id ? `/${id}` : ""), post)
//       return data
//     },
//     onMutate: async (post) => {
//       await queryClient.cancelQueries({ queryKey: ["post", post.id] })
//       const previousPost = queryClient.getQueryData(["post", post.id]) as Post
//       queryClient.setQueryData(["post", post.id], post)
//       addToOrUpdatePostList(post, queryClient)
//       return { previousPost, post }
//     },
//     onError: (_err, newPost, context) => {
//       queryClient.setQueryData(["post", newPost.id], context?.previousPost)
//       if (id) {
//         addToOrUpdatePostList(context?.previousPost as Post, queryClient)
//       } else {
//         removePostItem(newPost.id, queryClient)
//       }
//     }
//   })

//   return query
// }

// export function addToOrUpdatePostList(userData:UserProps, queryClient: ReturnType<typeof useQueryClient>) {
//   queryClient.setQueryData(["users"], (userResponseData: GetManyProps<UserProps> | undefined) => {
//     if (!userResponseData) return
//     for (let i = 0; i < userResponseData.data.length; i++) {
//       if (userResponseData.data[i].id === post.id) {
//         posts[i] = post
//         return posts
//       }
//     }
//     return [...posts, post]
//   })
// }

// export function addToOrUpdatePostList(post: Post, queryClient: ReturnType<typeof useQueryClient>) {
//   queryClient.setQueryData(["posts"], (posts: Post[] | undefined) => {
//     if (!posts) return
//     for (let i = 0; i < posts.length; i++) {
//       if (posts[i].id === post.id) {
//         posts[i] = post
//         return posts
//       }
//     }
//     return [...posts, post]
//   })
// }

// export function removePostItem(id: string, queryClient: ReturnType<typeof useQueryClient>) {
//   queryClient.setQueryData(["posts"], (posts: Post[] | undefined) => {
//     if (!posts) {
//       return undefined
//     }
//     return posts.filter((post) => post.id !== id)
//   })
// }
