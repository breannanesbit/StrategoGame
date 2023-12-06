import { useMutation, useQuery } from "@tanstack/react-query";
import { getAUsersBorad, getAllBoards, getUserInfo, postABorad, postADefaultBorad, postUserInfo } from "../services/apiSerives";
import { getQueryClient } from "./queryClient";
import { User } from "../models/user";


export const useGetaUserBorad = (user: string) => useQuery({
    queryKey: ["borads", user],
    queryFn: async () => {
        const response = getAUsersBorad(user)
        return response
    },
});

export const useUserInforQuery = (user: string) => useQuery({
    queryKey: [user],
    queryFn: async () => {
        const response = await getUserInfo(user)
        return response as User
    },
});

export const useUserBoardsQuery = (user: string) => useQuery({

    queryKey: ['boards', 'default', user],
    queryFn: async () => {
        const response = await getAllBoards(user);
        return response.data
    }
  });

const queryClient = getQueryClient();

export const useMutationPostBoard = (user: string, board: string[][]) => useMutation({
    mutationFn: () => postABorad(user, board),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["boards", user] });
    }
});

export const useMutationPostBoard1 = () => {
  
    return useMutation({
      mutationFn: (params: { user: string; board: string[][] }) => postABorad(params.user, params.board),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ['boards', variables.user] });
      },
    });
  };


  export const useMutationPostANewDefaultBorad = () => {
  
    return useMutation({
      mutationFn: (params: { user: string; board: string[][]; boardName:string }) => postADefaultBorad(params.user, params.board, params.boardName),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ['boards', 'defualt', variables.user] });
      },
    });
  };

export const useMutationPostUserInfo = () => useMutation({
    mutationFn: (params: {user: User}) => postUserInfo(params.user),
    onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: [variables.user] });
    }
});

// const boardKeys = {
//     all: [`boards`] as const

// }
