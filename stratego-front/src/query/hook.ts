import { useMutation, useQuery } from "@tanstack/react-query";
import { getAUsersBorad, getUserInfo, postABorad, postUserInfo } from "../services/apiSerives";
import { getQueryClient } from "./queryClient";
import { User } from "../models/user";


export const usePostBoradQuery = (user: string) => useQuery({
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

const queryClient = getQueryClient();

export const useMutationPostBoard = (user: string, board: string[][]) => useMutation({
    mutationFn: () => postABorad(user, board),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["boards", user] });
    }
});

export const useMutationPostUserInfo = (user: User) => useMutation({
    mutationFn: () => postUserInfo(user),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [user] });
    }
});

const boardKeys = {
    all: [`boards`] as const

}
