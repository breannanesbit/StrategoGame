import axios from "axios";
import toast from "react-hot-toast";
import { User } from "../models/user";

const url = "/stratego-api/myApi"

export const postABorad = async (user: string, board:  string[][]) => {
        try {
            const response = await axios.post(`url/${user}/board/gameID`, { board });
            if (response.status === 200) {
                console.log('Board saved:', response.data);
            }
            toast.success('Board has been saved');
        } catch (e) {
            toast.error("Board coudn't be save");
            console.log('Board try to send:', { board })
            console.error(e);
        }
    }

export const getAUsersBorad = async (user:string): Promise<string> => {
    try {
        const response = await axios.get(`url/${user}?key=defaultBorads`)
        return response.data;
    } catch (e) {
        console.log(e)
        return "failed"
    }
}


export const getUserInfo = async (username:string): Promise<User | unknown> => {
    try {
        const response = await axios.get(`${url}?ley=${username}`)
        return response.data
    } catch (e) {
        console.log(e)
        return e
    }
}

export const postUserInfo = async (username:User) => {
    try {
        const response = await axios.post(`${url}?ley=${username.userName}`)
        return response.data
    } catch (e) {
        console.log(e)
        return e
    }
}