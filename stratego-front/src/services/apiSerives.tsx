import axios from "axios";
import toast from "react-hot-toast";
import { User } from "../models/user";

const url = "/stratego-api"

export const postABorad = async (user: string, board: string[][]) => {
    try {
        const response = await axios.post(`${url}/${user}/board/gameID`, { board });
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

export const postADefaultBorad = async (user: string, board: string[][], boardName: string) => {
    try {
      const response = await axios.post(`${url}/default?key=${boardName}`, { boards: board });
      if (response.status === 200) {
        console.log('Default board saved:', response.data);
      }
      toast.success('Default board has been saved');
    } catch (error) {
      console.error('Error while saving default board:', error);
      throw error;
    }
  };
  

export const getAllBoards = async (user: string) => {
    try {
        const response = await axios.get(`/${url}/${user}/default`);
        return response.data;
    } catch (error) {
        console.error('Error while fetching boards:', error);
        throw error;
    }
};

export const getAUsersBorad = async (user: string): Promise<string> => {
    try {
        const response = await axios.get(`${url}/${user}?key=defaultBorads`)
        return response.data;
    } catch (e) {
        console.log(e)
        return "failed"
    }
}


export const getUserInfo = async (username: string): Promise<User | unknown> => {
    try {
        const response = await axios.get(`${url}/user?key=${username}`)
        return response.data
    } catch (e) {
        console.log(e)
        return e
    }
}

export const postUserInfo = async (username: User) => {
    try {
        const response = await axios.post(`${url}/user?key=${username.userName}`, username)
        if (response.status === 200) {
            toast.success('Info successfully saved');
          }
        return response.data
    } catch (e) {
        toast.error('an error ocurred')
        return e
    }
}